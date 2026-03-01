// Re-export types from data/problems
export type { Difficulty, Category, Problem } from '../data/problems';

// Import Difficulty for local use
import type { Difficulty } from '../data/problems';

// Per-problem user state
export interface ProblemProgress {
  completed: boolean;
  completedAt?: string;  // ISO timestamp or "legacy" for pre-tracking completions
  flagged: boolean;
  notes?: string;
}

// All user progress keyed by problem ID
export type UserProgressMap = Record<number, ProblemProgress>;

// App settings
export interface AppSettings {
  theme: 'light' | 'dark';
  activeTab: Difficulty;            // Currently selected difficulty tab
  hideCompleted: boolean;
  showCategories: boolean;          // Show category badges for completed problems
  showBookmarkedOnly: boolean;      // Show only bookmarked/flagged problems
  sortByCompletion: boolean;        // Sort completed problems by completion date (oldest first)
  categoryLastPicked: Record<string, number>; // Category name -> timestamp for weighted random
  collapsedGroups: Record<string, boolean>;   // Difficulty group -> collapsed state
}

// Default values for new users
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  activeTab: 'Easy',                // Default to Easy tab
  hideCompleted: false,
  showCategories: false,            // Hidden by default
  showBookmarkedOnly: false,        // Show all problems by default
  sortByCompletion: false,          // Default sort order (not by completion date)
  categoryLastPicked: {},
  collapsedGroups: {},              // No groups collapsed by default
};

export const DEFAULT_PROGRESS: ProblemProgress = {
  completed: false,
  flagged: false,
};

// Code execution types
export interface TestCase {
  inputArgs: unknown[];
  expectedOutput: unknown;
  inputDisplay: string;
}

export interface ProblemDetail {
  problemId: number;
  description: string;
  sampleTestCases: TestCase[];
  hiddenTestCases: TestCase[];
  starterCode: { python: string; javascript: string };
  functionName: string;
}

export type Language = 'python' | 'javascript';

export interface TestResult {
  passed: boolean;
  input: string;
  got?: unknown;
  error?: string;
}

export interface RunResult {
  testResults: TestResult[];
  passed: number;
  total: number;
  runtimeError?: string;
}
