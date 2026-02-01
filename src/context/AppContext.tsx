import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
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
  DEFAULT_PROGRESS,
} from '../types';

// Storage keys
const STORAGE_KEYS = {
  PROGRESS: 'beast-progress',
  SETTINGS: 'beast-settings',
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
  problemsByDifficulty: ProblemsByDifficulty;
  stats: ProblemsStats;

  // Actions
  toggleCompleted: (problemId: number) => void;
  toggleFlagged: (problemId: number) => void;
  updateNotes: (problemId: number, notes: string) => void;
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
          notes: notes || undefined, // Remove empty strings to save storage
        },
      };
    });
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
      // Update category timestamp and switch to the problem's difficulty tab
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

    // Backup current data before importing
    saveBackup(userProgress, settings);

    // Apply imported data
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
      problemsByDifficulty,
      stats,
      toggleCompleted,
      toggleFlagged,
      updateNotes,
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
    [userProgress, settings, problemsByDifficulty, stats, exportData, importData, restoreBackupFn, hasBackupFn]
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
