# Design: CodeMirror Editor + Row Expansion Animation

**Date:** 2026-03-01

## Overview

Two UI improvements to the inline solve flow:
1. Replace the plain `<textarea>` code editor with CodeMirror 6 for proper syntax highlighting
2. Replace the fade-in modal with a row-expansion animation where the problem row visually grows to fill the screen

---

## Change 1: CodeMirror 6 Syntax Highlighting

**Packages:**
- `@uiw/react-codemirror` — React component wrapper
- `@codemirror/lang-python` — Python language support
- `@codemirror/lang-javascript` — JavaScript language support
- `@codemirror/theme-one-dark` — Dark theme (always used regardless of app theme)

**Implementation:** Replace the `<textarea>` in the editor panel with a `<CodeMirror>` component. The `onChange` callback provides the new value string — same interface as the current textarea. Tab indentation, bracket matching, and syntax highlighting are built-in.

---

## Change 2: Row Expansion Animation

### State machine

```
pre-expand → expanding → expanded → closing → (unmount)
```

| Phase | Position | Opacity | Transition |
|---|---|---|---|
| `pre-expand` | row's bounding rect | 0 | none |
| `expanding` | `inset: 0` (full screen) | 1 | 350ms cubic-bezier |
| `expanded` | `inset: 0` | 1 | — |
| `closing` | re-measured row rect | 0 | 350ms cubic-bezier, then `onClose()` |

Since body scroll is locked while open, re-measuring on close gives the same rect as on open.

### Data flow

- `ProblemRow` — ref on outer div, `onOpenModal(id, HTMLElement)` passes DOM element up
- `ProblemList` — state becomes `{ problemId, rowElement: HTMLElement } | null`
- `ProblemSolver` — captures `originRect` from `rowElement.getBoundingClientRect()` on mount

### Solver header

Mirrors the problem row's left side, with solver controls on the right:

```
[← Back]  [Easy]  Two Sum  ·  Arrays & Hashing        [Python|JS]  [Run]
```

- Difficulty uses the existing CSS gradient variables (`var(--easy-gradient)` etc.)
- Problem name and category from the `problem` prop
- Body (description + editor) fades in 150ms after expansion starts

### Closing

On close trigger (button or Escape):
1. Re-measure `rowElement.getBoundingClientRect()`
2. Start CSS transition back to that rect with opacity 0
3. After 350ms, call `onClose()` to unmount
