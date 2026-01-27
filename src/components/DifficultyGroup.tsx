import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProblemRow } from './ProblemRow';
import type { Difficulty, Problem } from '../types';

interface DifficultyGroupProps {
  difficulty: Difficulty;
  problems: Problem[];
  index?: number;
}

const difficultyConfig = {
  Easy: {
    gradient: 'var(--easy-gradient)',
    bg: 'var(--easy-bg)',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  Medium: {
    gradient: 'var(--medium-gradient)',
    bg: 'var(--medium-bg)',
    textColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  Hard: {
    gradient: 'var(--hard-gradient)',
    bg: 'var(--hard-bg)',
    textColor: 'text-rose-700 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800/50',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
};

export function DifficultyGroup({ difficulty, problems, index = 0 }: DifficultyGroupProps) {
  const { isGroupCollapsed, toggleGroupCollapsed, stats } = useApp();
  const isCollapsed = isGroupCollapsed(difficulty);
  const config = difficultyConfig[difficulty];
  
  // State for accordion notes - only one problem's notes can be expanded at a time
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  
  // Get completion stats for this group (from stats, not filtered problems array)
  const completedInGroup = stats.byDifficulty[difficulty].completed;
  const totalInGroup = stats.byDifficulty[difficulty].total;
  const unsolvedInGroup = totalInGroup - completedInGroup;
  const progressPercent = totalInGroup > 0 ? (completedInGroup / totalInGroup) * 100 : 0;

  return (
    <div 
      className={`
        rounded-xl overflow-hidden border transition-all duration-200
        ${config.borderColor}
        ${isCollapsed ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-secondary)]'}
        animate-fade-in-up
      `}
      style={{ 
        animationDelay: `${index * 80 + 100}ms`,
        animationFillMode: 'backwards'
      }}
    >
      {/* Header */}
      <button
        onClick={() => toggleGroupCollapsed(difficulty)}
        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-elevated)] transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {/* Gradient badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-sm"
            style={{ background: config.gradient }}
          >
            {config.icon}
            {difficulty}
          </div>
          
          {/* Problem count */}
          <span className="text-sm text-[var(--text-muted)]">
            <span className="font-medium text-[var(--text-secondary)]">{unsolvedInGroup}</span>
            {' '}unsolved {unsolvedInGroup === 1 ? 'problem' : 'problems'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Mini progress indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-[var(--border-color)] overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`,
                  background: config.gradient 
                }}
              />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] min-w-[32px]">
              {completedInGroup}/{totalInGroup}
            </span>
          </div>

          {/* Chevron */}
          <div className={`
            w-7 h-7 rounded-lg flex items-center justify-center
            bg-[var(--bg-elevated)] group-hover:bg-[var(--border-color)]
            transition-all duration-200
          `}>
            <svg
              className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${
                isCollapsed ? '' : 'rotate-180'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Collapsible content */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
        }`}
      >
        <div className="overflow-hidden">
          {/* Subtle separator */}
          <div className="h-px bg-[var(--border-subtle)]" />
          
          <div className="divide-y divide-[var(--border-subtle)]">
            {problems.length > 0 ? (
              problems.map((problem, idx) => (
                <ProblemRow 
                  key={problem.id} 
                  problem={problem} 
                  index={idx}
                  expandedNoteId={expandedNoteId}
                  setExpandedNoteId={setExpandedNoteId}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                  style={{ background: config.bg }}
                >
                  <svg className={`w-6 h-6 ${config.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">All {difficulty.toLowerCase()} problems completed!</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Amazing work!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
