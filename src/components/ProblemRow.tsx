import { useApp } from "../context/AppContext";
import { useState, useEffect, useRef, useMemo } from "react";
import type { Problem } from "../types";
import { leetcodeByName, leetcodePremium } from "../data/leetcodeLinks";

// Format completion date for display
function formatCompletionDate(completedAt: string | undefined): string | null {
  if (!completedAt) return null;
  if (completedAt === "legacy") return null; // Don't show date for legacy completions

  const date = new Date(completedAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const completedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (completedDate.getTime() === today.getTime()) {
    return "Today";
  }
  if (completedDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  // Check if same year
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  // Different year
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface ProblemRowProps {
  problem: Problem;
  index?: number;
  expandedNoteId: number | null;
  setExpandedNoteId: (id: number | null) => void;
  hasDetail?: boolean;
  onOpenModal?: (problemId: number, rowElement: HTMLElement) => void;
}

export function ProblemRow({
  problem,
  index = 0,
  expandedNoteId,
  setExpandedNoteId,
  hasDetail = false,
  onOpenModal,
}: ProblemRowProps) {
  const {
    getProblemProgress,
    toggleCompleted,
    toggleFlagged,
    updateNotes,
    settings,
  } = useApp();
  const rowRef = useRef<HTMLDivElement>(null);
  const progress = getProblemProgress(problem.id);
  const isCompleted = progress.completed;
  const isFlagged = progress.flagged;
  const hasNotes = Boolean(progress.notes);
  const showCategory = isCompleted && settings.showCategories;
  const [justCompleted, setJustCompleted] = useState(false);

  // Format completion date
  const completionDateText = useMemo(() => {
    if (!isCompleted) return null;
    return formatCompletionDate(progress.completedAt);
  }, [isCompleted, progress.completedAt]);

  // Notes state
  const isNotesExpanded = expandedNoteId === problem.id;
  const [notesText, setNotesText] = useState(progress.notes || "");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local state when progress.notes changes externally
  useEffect(() => {
    setNotesText(progress.notes || "");
  }, [progress.notes]);

  // Auto-save notes with debounce
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only save if notes have actually changed from stored value
    if (notesText !== (progress.notes || "")) {
      debounceTimerRef.current = setTimeout(() => {
        updateNotes(problem.id, notesText);
      }, 400);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [notesText, problem.id, updateNotes, progress.notes]);

  const handleToggleNotes = () => {
    if (isNotesExpanded) {
      setExpandedNoteId(null);
    } else {
      setExpandedNoteId(problem.id);
    }
  };

  const handleToggleComplete = () => {
    if (!isCompleted) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    toggleCompleted(problem.id);
  };

  return (
    <div
      ref={rowRef}
      className="interactive-row"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Main row */}
      <div
        className={`
          flex items-center gap-3 py-3 px-4 
          hover:bg-[var(--bg-elevated)] transition-all duration-200
          ${isCompleted ? "opacity-70" : ""}
        `}
      >
        {/* Animated Checkbox */}
        <button
          onClick={handleToggleComplete}
          className={`
            relative w-5 h-5 rounded-md flex items-center justify-center cursor-pointer 
            transition-all duration-200 border-2
            ${
              isCompleted
                ? "border-emerald-500 bg-emerald-500 scale-100"
                : "border-[var(--border-color)] hover:border-emerald-400 hover:scale-110"
            }
          `}
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {/* Check icon with animation */}
          <svg
            className={`
              w-3 h-3 text-white transition-all duration-200
              ${isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"}
              ${justCompleted ? "animate-check-bounce" : ""}
            `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* Completion burst effect */}
          {justCompleted && (
            <span
              className="absolute inset-0 rounded-md bg-emerald-400 animate-confetti"
              style={{ zIndex: -1 }}
            />
          )}
        </button>

        {/* Problem name — opens editor if detail exists, otherwise plain text */}
        {hasDetail ? (
          <button
            onClick={() =>
              rowRef.current && onOpenModal?.(problem.id, rowRef.current)
            }
            className={`
              flex-1 text-left text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                isCompleted
                  ? "text-[var(--text-muted)] line-through decoration-[var(--border-color)]"
                  : "text-[var(--text-primary)] hover:text-cyan-600 dark:hover:text-cyan-400"
              }
            `}
          >
            {problem.name}
          </button>
        ) : (
          <span
            className={`
              flex-1 text-sm font-medium
              ${
                isCompleted
                  ? "text-[var(--text-muted)] line-through decoration-[var(--border-color)]"
                  : "text-[var(--text-primary)]"
              }
            `}
          >
            {problem.name}
          </span>
        )}

        {/* Category badge - only visible when completed AND showCategories is enabled */}
        {showCategory && (
          <span className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium whitespace-nowrap">
            {problem.category}
          </span>
        )}

        {/* Completion date - only visible when completed and has a date */}
        {isCompleted && completionDateText && (
          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
            {completionDateText}
          </span>
        )}

        {/* NeetCode link button */}
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          aria-label="Open on NeetCode"
          title="Open on NeetCode"
        >
          <img
            src="https://neetcode.io/favicon.ico"
            className="w-4 h-4 rounded-sm"
            alt="NeetCode"
            loading="lazy"
          />
        </a>

        {/* LeetCode link button */}
        {leetcodeByName[problem.name] &&
          (leetcodePremium.has(problem.name) ? (
            <button
              disabled
              className="p-1.5 rounded-lg opacity-30 cursor-not-allowed"
              aria-label="LeetCode Premium required"
              title="LeetCode Premium required"
            >
              <img
                src="https://leetcode.com/favicon-96x96.png"
                className="w-4 h-4 rounded-sm"
                alt="LeetCode"
                loading="lazy"
              />
            </button>
          ) : (
            <a
              href={leetcodeByName[problem.name]}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-orange-500/10 transition-all duration-200"
              aria-label="Open on LeetCode"
              title="Open on LeetCode"
            >
              <img
                src="https://leetcode.com/favicon-96x96.png"
                className="w-4 h-4 rounded-sm"
                alt="LeetCode"
                loading="lazy"
              />
            </a>
          ))}

        {/* Flag/bookmark button */}
        <button
          onClick={() => toggleFlagged(problem.id)}
          className={`
            relative p-1.5 rounded-lg transition-all duration-200
            ${
              isFlagged
                ? "text-amber-500 bg-amber-500/10"
                : "text-[var(--text-muted)] hover:text-amber-500 hover:bg-amber-500/10"
            }
          `}
          aria-label={isFlagged ? "Unflag problem" : "Flag problem"}
          title={isFlagged ? "Remove bookmark" : "Bookmark problem"}
        >
          {isFlagged ? (
            // Filled bookmark icon
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            // Outline bookmark icon
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
        </button>

        {/* Notes button */}
        <button
          onClick={handleToggleNotes}
          className={`
            relative p-1.5 rounded-lg transition-all duration-200
            ${
              isNotesExpanded || hasNotes
                ? "text-cyan-500 bg-cyan-500/10"
                : "text-[var(--text-muted)] hover:text-cyan-500 hover:bg-cyan-500/10"
            }
          `}
          aria-label={isNotesExpanded ? "Collapse notes" : "Expand notes"}
          aria-expanded={isNotesExpanded}
          title={
            isNotesExpanded
              ? "Collapse notes"
              : hasNotes
                ? "View notes"
                : "Add notes"
          }
        >
          {hasNotes ? (
            // Filled document icon when notes exist
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Outline document icon
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Expandable notes section */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isNotesExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-3 pt-0">
          <div className="ml-8">
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add notes about this problem..."
              className="
                w-full h-20 px-3 py-2 text-sm rounded-lg resize-none
                bg-[var(--bg-primary)] border border-[var(--border-color)]
                text-[var(--text-primary)] placeholder-[var(--text-muted)]
                focus:outline-none focus:border-[var(--border-color)]
                transition-all duration-200
                notes-textarea
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
