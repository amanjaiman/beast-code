import { useApp } from '../context/AppContext';
import { useState } from 'react';
import type { Problem } from '../types';

interface ProblemRowProps {
  problem: Problem;
  index?: number;
}

export function ProblemRow({ problem, index = 0 }: ProblemRowProps) {
  const { getProblemProgress, toggleCompleted, toggleFlagged, settings } = useApp();
  const progress = getProblemProgress(problem.id);
  const isCompleted = progress.completed;
  const isFlagged = progress.flagged;
  const showCategory = isCompleted && settings.showCategories;
  const [justCompleted, setJustCompleted] = useState(false);

  const handleToggleComplete = () => {
    if (!isCompleted) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    toggleCompleted(problem.id);
  };

  return (
    <div 
      className={`
        interactive-row flex items-center gap-3 py-3 px-4 
        hover:bg-[var(--bg-elevated)] transition-all duration-200
        ${isCompleted ? 'opacity-70' : ''}
      `}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Animated Checkbox */}
      <button
        onClick={handleToggleComplete}
        className={`
          relative w-5 h-5 rounded-md flex items-center justify-center cursor-pointer 
          transition-all duration-200 border-2
          ${isCompleted
            ? 'border-emerald-500 bg-emerald-500 scale-100'
            : 'border-[var(--border-color)] hover:border-emerald-400 hover:scale-110'
          }
        `}
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {/* Check icon with animation */}
        <svg
          className={`
            w-3 h-3 text-white transition-all duration-200
            ${isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            ${justCompleted ? 'animate-check-bounce' : ''}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        
        {/* Completion burst effect */}
        {justCompleted && (
          <span 
            className="absolute inset-0 rounded-md bg-emerald-400 animate-confetti"
            style={{ zIndex: -1 }}
          />
        )}
      </button>

      {/* Problem name link */}
      <a
        href={problem.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex-1 text-sm font-medium transition-all duration-200 group/link
          ${isCompleted 
            ? 'text-[var(--text-muted)] line-through decoration-[var(--border-color)]' 
            : 'text-[var(--text-primary)] hover:text-cyan-600 dark:hover:text-cyan-400'
          }
        `}
      >
        <span className="relative">
          {problem.name}
          {/* External link indicator on hover */}
          <svg 
            className="inline-block w-3 h-3 ml-1 opacity-0 group-hover/link:opacity-50 transition-opacity -translate-y-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </a>

      {/* Category badge - only visible when completed AND showCategories is enabled */}
      {showCategory && (
        <span className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium whitespace-nowrap">
          {problem.category}
        </span>
      )}

      {/* Flag/bookmark button */}
      <button
        onClick={() => toggleFlagged(problem.id)}
        className={`
          relative p-1.5 rounded-lg transition-all duration-200
          ${isFlagged
            ? 'text-amber-500 bg-amber-500/10'
            : 'text-[var(--text-muted)] hover:text-amber-500 hover:bg-amber-500/10'
          }
        `}
        aria-label={isFlagged ? 'Unflag problem' : 'Flag problem'}
      >
        {isFlagged ? (
          // Filled bookmark icon
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        ) : (
          // Outline bookmark icon
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
