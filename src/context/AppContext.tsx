import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useProblems, type ProblemsStats, type ProblemsByDifficulty } from '../hooks/useProblems';
import { weightedRandomPick } from '../utils/random';
import { generateSeed } from '../utils/shuffle';
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

// Default settings (seed generated on first load)
const createDefaultSettings = (): AppSettings => ({
  theme: 'light',
  shuffleSeed: generateSeed(),
  activeTab: 'Easy',
  hideCompleted: false,
  showCategories: false,
  showBookmarkedOnly: false,
  categoryLastPicked: {},
});

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
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setHideCompleted: (hide: boolean) => void;
  setShowCategories: (show: boolean) => void;
  setShowBookmarkedOnly: (show: boolean) => void;
  setActiveTab: (difficulty: Difficulty) => void;
  pickRandomProblem: (difficulties: Difficulty[]) => Problem | null;
  getProblemProgress: (problemId: number) => ProblemProgress;
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
    settings.shuffleSeed,
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

  // Actions
  const toggleCompleted = (problemId: number) => {
    setUserProgress((prev) => {
      const current = prev[problemId] || { ...DEFAULT_PROGRESS };
      return {
        ...prev,
        [problemId]: {
          ...current,
          completed: !current.completed,
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

  const value = useMemo(
    (): AppContextType => ({
      userProgress,
      settings,
      problemsByDifficulty,
      stats,
      toggleCompleted,
      toggleFlagged,
      setTheme,
      toggleTheme,
      setHideCompleted,
      setShowCategories,
      setShowBookmarkedOnly,
      setActiveTab,
      pickRandomProblem,
      getProblemProgress,
    }),
    [userProgress, settings, problemsByDifficulty, stats]
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
