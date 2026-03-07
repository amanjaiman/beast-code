import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useProblems, type ProblemsStats, type ProblemsByDifficulty } from '../hooks/useProblems';
import { weightedRandomPick } from '../utils/random';
import {
  exportData as exportDataUtil,
  parseImportFile,
  saveBackup,
  getBackup,
  hasBackup,
} from '../utils/dataSync';
import {
  type Difficulty,
  type Problem,
  type AppSettings,
  type UserProgressMap,
  type ProblemProgress,
  type SavedCodesMap,
  DEFAULT_PROGRESS,
} from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

// Storage keys
const STORAGE_KEYS = {
  PROGRESS: 'beast-progress',
  SETTINGS: 'beast-settings',
  SAVED_CODES: 'beast-code',
} as const;

// Default settings
const createDefaultSettings = (): AppSettings => ({
  theme: 'light',
  activeTab: 'Easy',
  hideCompleted: false,
  showCategories: false,
  showBookmarkedOnly: false,
  sortByCompletion: false,
  categoryLastPicked: {},
  collapsedGroups: {},
});

// Import result type
export interface ImportResult {
  success: boolean;
  warnings?: string[];
  error?: string;
}

// Context type
interface AppContextType {
  // State
  userProgress: UserProgressMap;
  settings: AppSettings;
  savedCodes: SavedCodesMap;
  problemsByDifficulty: ProblemsByDifficulty;
  stats: ProblemsStats;
  syncStatus: 'idle' | 'syncing' | 'error';

  // Actions
  toggleCompleted: (problemId: number) => void;
  toggleFlagged: (problemId: number) => void;
  updateNotes: (problemId: number, notes: string) => void;
  updateSavedCode: (problemId: number, language: 'python' | 'javascript', code: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setHideCompleted: (hide: boolean) => void;
  setShowCategories: (show: boolean) => void;
  setShowBookmarkedOnly: (show: boolean) => void;
  setSortByCompletion: (sort: boolean) => void;
  setActiveTab: (difficulty: Difficulty) => void;
  pickRandomProblem: (difficulties: Difficulty[]) => Problem | null;
  getProblemProgress: (problemId: number) => ProblemProgress;
  isGroupCollapsed: (difficulty: Difficulty) => boolean;
  toggleGroupCollapsed: (difficulty: Difficulty) => void;
  
  // Data sync actions
  exportData: () => void;
  importData: (file: File) => Promise<ImportResult>;
  restoreBackup: () => boolean;
  hasBackup: () => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // Load/persist user progress
  const [userProgress, setUserProgress] = useLocalStorage<UserProgressMap>(
    STORAGE_KEYS.PROGRESS,
    {}
  );

  // Load/persist settings
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    STORAGE_KEYS.SETTINGS,
    createDefaultSettings()
  );

  // Load/persist saved codes (lifted from ProblemSolver)
  const [savedCodes, setSavedCodes] = useLocalStorage<SavedCodesMap>(
    STORAGE_KEYS.SAVED_CODES,
    {}
  );

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  // Track whether initial load from Supabase has happened for this user session
  const initialLoadDone = useRef(false);
  const prevUserId = useRef<string | null>(null);

  // Refs to always have latest values in debounced sync without re-triggering the effect
  const progressRef = useRef(userProgress);
  progressRef.current = userProgress;
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const savedCodesRef = useRef(savedCodes);
  savedCodesRef.current = savedCodes;

  // ── Supabase: load data on login ──
  useEffect(() => {
    if (!user) {
      initialLoadDone.current = false;
      prevUserId.current = null;
      return;
    }

    if (prevUserId.current === user.id && initialLoadDone.current) return;
    prevUserId.current = user.id;

    const loadFromSupabase = async () => {
      const { data, error } = await supabase
        .from('user_data')
        .select('progress, settings, saved_codes')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.warn('Failed to load from Supabase:', error.message);
        initialLoadDone.current = true;
        return;
      }

      if (data) {
        // Returning user — Supabase is source of truth
        const remoteProgress = (data.progress ?? {}) as UserProgressMap;
        const remoteSettings = { ...createDefaultSettings(), ...((data.settings ?? {}) as Partial<AppSettings>) };
        const remoteCodes = (data.saved_codes ?? {}) as SavedCodesMap;
        setUserProgress(remoteProgress);
        setSettings(remoteSettings);
        setSavedCodes(remoteCodes);
      } else {
        // New user (no row yet) — push current local data to Supabase
        const localProgress = progressRef.current;
        const localSettings = settingsRef.current;
        const localCodes = savedCodesRef.current;

        await supabase.from('user_data').upsert({
          id: user.id,
          progress: localProgress,
          settings: localSettings,
          saved_codes: localCodes,
          updated_at: new Date().toISOString(),
        });
      }

      initialLoadDone.current = true;
    };

    loadFromSupabase();
  }, [user, setUserProgress, setSettings, setSavedCodes]);

  // ── Supabase: debounced save on data changes ──
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user || !initialLoadDone.current) return;

    if (syncTimer.current) clearTimeout(syncTimer.current);

    syncTimer.current = setTimeout(async () => {
      setSyncStatus('syncing');
      const { error } = await supabase.from('user_data').upsert({
        id: user.id,
        progress: progressRef.current,
        settings: settingsRef.current,
        saved_codes: savedCodesRef.current,
        updated_at: new Date().toISOString(),
      });
      setSyncStatus(error ? 'error' : 'idle');
    }, 1000);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [user, userProgress, settings, savedCodes]);

  // Get problems data
  const { problemsByDifficulty, stats, getEligibleProblems } = useProblems(
    userProgress,
    settings.hideCompleted
  );

  // Apply theme to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Migrate legacy completions on first load (completed but no completedAt)
  useEffect(() => {
    const needsMigration = Object.entries(userProgress).some(
      ([, progress]) => progress.completed && !progress.completedAt
    );
    
    if (needsMigration) {
      setUserProgress((prev) => {
        const migrated = { ...prev };
        for (const [id, progress] of Object.entries(migrated)) {
          if (progress.completed && !progress.completedAt) {
            migrated[Number(id)] = {
              ...progress,
              completedAt: 'legacy',
            };
          }
        }
        return migrated;
      });
    }
  }, []); // Only run once on mount

  // Actions
  const toggleCompleted = (problemId: number) => {
    setUserProgress((prev) => {
      const current = prev[problemId] || { ...DEFAULT_PROGRESS };
      const willBeCompleted = !current.completed;
      return {
        ...prev,
        [problemId]: {
          ...current,
          completed: willBeCompleted,
          completedAt: willBeCompleted ? new Date().toISOString() : undefined,
        },
      };
    });
  };

  const toggleFlagged = (problemId: number) => {
    setUserProgress((prev) => {
      const current = prev[problemId] || { ...DEFAULT_PROGRESS };
      return {
        ...prev,
        [problemId]: {
          ...current,
          flagged: !current.flagged,
        },
      };
    });
  };

  const updateNotes = (problemId: number, notes: string) => {
    setUserProgress((prev) => {
      const current = prev[problemId] || { ...DEFAULT_PROGRESS };
      return {
        ...prev,
        [problemId]: {
          ...current,
          notes: notes || undefined,
        },
      };
    });
  };

  const updateSavedCode = (problemId: number, language: 'python' | 'javascript', code: string) => {
    setSavedCodes((prev) => ({
      ...prev,
      [problemId]: { ...prev[problemId], [language]: code },
    }));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const setHideCompleted = (hideCompleted: boolean) => {
    setSettings((prev) => ({ ...prev, hideCompleted }));
  };

  const setShowCategories = (showCategories: boolean) => {
    setSettings((prev) => ({ ...prev, showCategories }));
  };

  const setShowBookmarkedOnly = (showBookmarkedOnly: boolean) => {
    setSettings((prev) => ({ ...prev, showBookmarkedOnly }));
  };

  const setSortByCompletion = (sortByCompletion: boolean) => {
    setSettings((prev) => ({ ...prev, sortByCompletion }));
  };

  const setActiveTab = (difficulty: Difficulty) => {
    setSettings((prev) => ({ ...prev, activeTab: difficulty }));
  };

  const pickRandomProblem = (difficulties: Difficulty[]): Problem | null => {
    const eligible = getEligibleProblems(difficulties);
    const picked = weightedRandomPick(eligible, settings.categoryLastPicked);

    if (picked) {
      setSettings((prev) => ({
        ...prev,
        activeTab: picked.difficulty,
        categoryLastPicked: {
          ...prev.categoryLastPicked,
          [picked.category]: Date.now(),
        },
      }));
    }

    return picked;
  };

  const getProblemProgress = (problemId: number): ProblemProgress => {
    return userProgress[problemId] || { ...DEFAULT_PROGRESS };
  };

  const isGroupCollapsed = (difficulty: Difficulty): boolean => {
    return settings.collapsedGroups[difficulty] ?? false;
  };

  const toggleGroupCollapsed = (difficulty: Difficulty): void => {
    setSettings((prev) => ({
      ...prev,
      collapsedGroups: {
        ...prev.collapsedGroups,
        [difficulty]: !prev.collapsedGroups[difficulty],
      },
    }));
  };

  // Data sync actions
  const exportData = useCallback(() => {
    exportDataUtil(userProgress, settings);
  }, [userProgress, settings]);

  const importData = useCallback(async (file: File): Promise<ImportResult> => {
    const result = await parseImportFile(file);
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error,
      };
    }

    saveBackup(userProgress, settings);

    setUserProgress(result.data.progress);
    setSettings(result.data.settings);

    return {
      success: true,
      warnings: result.warnings,
    };
  }, [userProgress, settings, setUserProgress, setSettings]);

  const restoreBackupFn = useCallback((): boolean => {
    const backup = getBackup();
    if (!backup) return false;

    setUserProgress(backup.progress);
    setSettings(backup.settings);
    return true;
  }, [setUserProgress, setSettings]);

  const hasBackupFn = useCallback((): boolean => {
    return hasBackup();
  }, []);

  const value = useMemo(
    (): AppContextType => ({
      userProgress,
      settings,
      savedCodes,
      problemsByDifficulty,
      stats,
      syncStatus,
      toggleCompleted,
      toggleFlagged,
      updateNotes,
      updateSavedCode,
      setTheme,
      toggleTheme,
      setHideCompleted,
      setShowCategories,
      setShowBookmarkedOnly,
      setSortByCompletion,
      setActiveTab,
      pickRandomProblem,
      getProblemProgress,
      isGroupCollapsed,
      toggleGroupCollapsed,
      exportData,
      importData,
      restoreBackup: restoreBackupFn,
      hasBackup: hasBackupFn,
    }),
    [userProgress, settings, savedCodes, problemsByDifficulty, stats, syncStatus, exportData, importData, restoreBackupFn, hasBackupFn]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
