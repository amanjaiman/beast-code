// Re-export types from data/problems
export type { Difficulty, Category, Problem } from '../data/problems';

// Import Difficulty for local use
import type { Difficulty } from '../data/problems';

// Per-problem user state
export interface ProblemProgress {
  completed: boolean;
  flagged: boolean;
}

// All user progress keyed by problem ID
export type UserProgressMap = Record<number, ProblemProgress>;

// App settings
export interface AppSettings {
  theme: 'light' | 'dark';
  shuffleSeed: number;              // Generated once, never changes
  activeTab: Difficulty;            // Currently selected difficulty tab
  hideCompleted: boolean;
  showCategories: boolean;          // Show category badges for completed problems
  showBookmarkedOnly: boolean;      // Show only bookmarked/flagged problems
  categoryLastPicked: Record<string, number>; // Category name -> timestamp for weighted random
}

// Default values for new users
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  shuffleSeed: Math.floor(Math.random() * 1000000),
  activeTab: 'Easy',                // Default to Easy tab
  hideCompleted: false,
  showCategories: false,            // Hidden by default
  showBookmarkedOnly: false,        // Show all problems by default
  categoryLastPicked: {},
};

export const DEFAULT_PROGRESS: ProblemProgress = {
  completed: false,
  flagged: false,
};
