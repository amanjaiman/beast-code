# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build
npm run lint      # ESLint with zero warnings tolerance
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

**beast-code** is a LeetCode/NeetCode problem tracker — a pure frontend React + TypeScript app with no backend. All state is persisted to `localStorage`.

### Data flow

```
src/data/problems.ts          Static list of problems (Problem[])
        ↓
src/hooks/useProblems.ts      Groups problems by difficulty, computes stats, filters completed
        ↓
src/context/AppContext.tsx     Single global context (AppProvider) — holds userProgress + settings,
                               exposes all actions, persists both to localStorage via useLocalStorage
        ↓
src/components/               UI components consume context via useApp()
```

### Key concepts

- **`UserProgressMap`** (`Record<number, ProblemProgress>`) — user state keyed by problem ID, stored under `beast-progress`
- **`AppSettings`** — UI preferences (theme, active tab, filters, sort order, collapsedGroups, categoryLastPicked), stored under `beast-settings`
- **`completedAt`** — ISO timestamp set on completion; legacy completions (no timestamp) are migrated to `"legacy"` on first load
- **Weighted random pick** (`src/utils/random.ts`) — categories not recently selected get higher weight, tracked via `categoryLastPicked` timestamps in settings
- **Data sync** (`src/utils/dataSync.ts`) — export as JSON, import with validation, auto-backup before import (stored under `beast-backup`)
- **`ContributionGraph`** — GitHub-style activity grid built from `completedAt` timestamps using local time for date grouping

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Theme switching adds/removes the `dark` class on `<html>`. Custom CSS variables for `--bg-primary` are used in `App.tsx`.
