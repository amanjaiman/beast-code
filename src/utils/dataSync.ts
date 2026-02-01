import { problems } from '../data/problems';
import type { UserProgressMap, AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

// Storage keys
export const BACKUP_STORAGE_KEY = 'beast-backup';

// Export data format
export interface ExportData {
  version: 1;
  exportedAt: string;
  progress: UserProgressMap;
  settings: AppSettings;
}

// Import result
export interface ImportResult {
  success: boolean;
  data?: {
    progress: UserProgressMap;
    settings: AppSettings;
  };
  warnings?: string[];
  error?: string;
}

// Get all valid problem IDs for validation
const validProblemIds = new Set(problems.map((p) => p.id));

/**
 * Export user data as a downloadable JSON file
 */
export function exportData(
  progress: UserProgressMap,
  settings: AppSettings
): void {
  const data: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    settings,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create filename with date
  const date = new Date().toISOString().split('T')[0];
  const filename = `beast-progress-${date}.json`;

  // Trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse and validate imported JSON file
 */
export async function parseImportFile(file: File): Promise<ImportResult> {
  const warnings: string[] = [];

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    // Validate version
    if (data.version !== 1) {
      return {
        success: false,
        error: `Unsupported file version: ${data.version ?? 'missing'}. Expected version 1.`,
      };
    }

    // Validate progress exists and is an object
    if (!data.progress || typeof data.progress !== 'object' || Array.isArray(data.progress)) {
      return {
        success: false,
        error: 'Invalid file format: missing or invalid "progress" field.',
      };
    }

    // Validate and clean progress data
    const progress: UserProgressMap = {};
    const unknownIds: number[] = [];

    for (const [idStr, value] of Object.entries(data.progress)) {
      const id = Number(idStr);
      
      if (isNaN(id)) {
        continue; // Skip non-numeric keys
      }

      if (!validProblemIds.has(id)) {
        unknownIds.push(id);
      }

      // Validate progress entry structure
      const entry = value as Record<string, unknown>;
      progress[id] = {
        completed: Boolean(entry.completed),
        flagged: Boolean(entry.flagged),
        ...(entry.completedAt && typeof entry.completedAt === 'string' 
          ? { completedAt: entry.completedAt } 
          : {}),
        ...(entry.notes && typeof entry.notes === 'string' 
          ? { notes: entry.notes } 
          : {}),
      };
    }

    if (unknownIds.length > 0) {
      warnings.push(
        `${unknownIds.length} problem ID(s) not recognized and will be ignored: ${unknownIds.slice(0, 5).join(', ')}${unknownIds.length > 5 ? '...' : ''}`
      );
    }

    // Validate and merge settings with defaults
    const importedSettings = data.settings || {};
    const settings: AppSettings = {
      ...DEFAULT_SETTINGS,
      // Only copy valid settings fields
      ...(importedSettings.theme === 'light' || importedSettings.theme === 'dark'
        ? { theme: importedSettings.theme }
        : {}),
      ...(importedSettings.activeTab === 'Easy' || 
          importedSettings.activeTab === 'Medium' || 
          importedSettings.activeTab === 'Hard'
        ? { activeTab: importedSettings.activeTab }
        : {}),
      ...(typeof importedSettings.hideCompleted === 'boolean'
        ? { hideCompleted: importedSettings.hideCompleted }
        : {}),
      ...(typeof importedSettings.showCategories === 'boolean'
        ? { showCategories: importedSettings.showCategories }
        : {}),
      ...(typeof importedSettings.showBookmarkedOnly === 'boolean'
        ? { showBookmarkedOnly: importedSettings.showBookmarkedOnly }
        : {}),
      ...(typeof importedSettings.sortByCompletion === 'boolean'
        ? { sortByCompletion: importedSettings.sortByCompletion }
        : {}),
      ...(importedSettings.categoryLastPicked && 
          typeof importedSettings.categoryLastPicked === 'object'
        ? { categoryLastPicked: importedSettings.categoryLastPicked }
        : {}),
      ...(importedSettings.collapsedGroups && 
          typeof importedSettings.collapsedGroups === 'object'
        ? { collapsedGroups: importedSettings.collapsedGroups }
        : {}),
    };

    return {
      success: true,
      data: { progress, settings },
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        success: false,
        error: 'Invalid JSON file. Please select a valid export file.',
      };
    }
    return {
      success: false,
      error: `Failed to import file: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

/**
 * Save current data as backup before import
 */
export function saveBackup(progress: UserProgressMap, settings: AppSettings): void {
  const backup = {
    progress,
    settings,
    backedUpAt: new Date().toISOString(),
  };
  localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backup));
}

/**
 * Check if a backup exists
 */
export function hasBackup(): boolean {
  return localStorage.getItem(BACKUP_STORAGE_KEY) !== null;
}

/**
 * Get backup data if available
 */
export function getBackup(): { progress: UserProgressMap; settings: AppSettings } | null {
  const backupStr = localStorage.getItem(BACKUP_STORAGE_KEY);
  if (!backupStr) return null;

  try {
    const backup = JSON.parse(backupStr);
    return {
      progress: backup.progress || {},
      settings: { ...DEFAULT_SETTINGS, ...backup.settings },
    };
  } catch {
    return null;
  }
}

/**
 * Clear the backup
 */
export function clearBackup(): void {
  localStorage.removeItem(BACKUP_STORAGE_KEY);
}
