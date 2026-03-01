import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProblemRow } from './ProblemRow';
import { ProblemSolver } from './ProblemSolver';
import { problemDetailMap } from '../data/problemDetails';
import type { Difficulty, Problem } from '../types';

// Tab configuration for each difficulty
const tabConfig = {
  Easy: {
    gradient: 'var(--easy-gradient)',
    activeBg: 'bg-emerald-50 dark:bg-emerald-500/15',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBg: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10',
  },
  Medium: {
    gradient: 'var(--medium-gradient)',
    activeBg: 'bg-amber-50 dark:bg-amber-500/15',
    textColor: 'text-amber-600 dark:text-amber-400',
    hoverBg: 'hover:bg-amber-50/50 dark:hover:bg-amber-500/10',
  },
  Hard: {
    gradient: 'var(--hard-gradient)',
    activeBg: 'bg-rose-50 dark:bg-rose-500/15',
    textColor: 'text-rose-600 dark:text-rose-400',
    hoverBg: 'hover:bg-rose-50/50 dark:hover:bg-rose-500/10',
  },
};

// Icon-only toggle button component with tooltip
function IconToggle({ 
  tooltip, 
  icon, 
  isActive, 
  onToggle 
}: { 
  tooltip: string; 
  icon: React.ReactNode;
  isActive: boolean; 
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      title={tooltip}
      className={`
        flex items-center justify-center w-8 h-8 rounded-lg
        transition-all duration-200 border
        ${isActive 
          ? 'bg-slate-100 dark:bg-slate-500/20 border-slate-300 dark:border-slate-500/40 text-[var(--text-primary)]' 
          : 'bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
        }
      `}
      role="switch"
      aria-checked={isActive}
      aria-label={tooltip}
    >
      {icon}
    </button>
  );
}

// Tab button component
function DifficultyTab({
  difficulty,
  isActive,
  unsolvedCount,
  totalCount,
  onClick,
}: {
  difficulty: Difficulty;
  isActive: boolean;
  unsolvedCount: number;
  totalCount: number;
  onClick: () => void;
}) {
  const config = tabConfig[difficulty];
  const completedCount = totalCount - unsolvedCount;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className={`
        relative flex-1 py-3 px-4 text-sm font-medium transition-all duration-200
        ${isActive 
          ? `${config.activeBg} ${config.textColor}` 
          : `text-[var(--text-muted)] ${config.hoverBg} hover:text-[var(--text-secondary)]`
        }
      `}
      role="tab"
      aria-selected={isActive}
    >
      <div className="flex items-center justify-center gap-2">
        <span>{difficulty}</span>
        <span className={`
          text-xs px-1.5 py-0.5 rounded-md
          ${isActive 
            ? 'bg-current/10' 
            : 'bg-[var(--bg-elevated)]'
          }
        `}>
          {unsolvedCount}
        </span>
      </div>
      
      {/* Progress bar under tab */}
      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${progressPercent}%`,
            background: config.gradient 
          }}
        />
      </div>
    </button>
  );
}

export function ProblemList() {
  const { problemsByDifficulty, settings, setHideCompleted, setShowCategories, setShowBookmarkedOnly, setSortByCompletion, stats, pickRandomProblem, setActiveTab, getProblemProgress } = useApp();
  const hideCompleted = settings.hideCompleted;
  const showCategories = settings.showCategories;
  const showBookmarkedOnly = settings.showBookmarkedOnly;
  const sortByCompletion = settings.sortByCompletion;
  const activeTab = settings.activeTab;
  
  // State for search and random spinner
  const [searchQuery, setSearchQuery] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  
  // State for accordion notes - only one problem's notes can be expanded at a time
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);

  // State for the solve overlay
  const [activeSolver, setActiveSolver] = useState<{ problemId: number; rowElement: HTMLElement } | null>(null);
  const activeModalDetail = activeSolver ? problemDetailMap.get(activeSolver.problemId) : undefined;
  const activeModalProblem = useMemo(() => {
    if (!activeSolver) return undefined;
    const all = [...problemsByDifficulty.Easy, ...problemsByDifficulty.Medium, ...problemsByDifficulty.Hard];
    return all.find((p) => p.id === activeSolver.problemId);
  }, [activeSolver, problemsByDifficulty]);

  // Helper to sort problems by completion date
  const sortByCompletionDate = (problems: Problem[]): Problem[] => {
    if (!sortByCompletion) return problems;
    
    // Partition into completed and uncompleted
    const completed: Problem[] = [];
    const uncompleted: Problem[] = [];
    
    for (const problem of problems) {
      const progress = getProblemProgress(problem.id);
      if (progress.completed) {
        completed.push(problem);
      } else {
        uncompleted.push(problem);
      }
    }
    
    // Sort completed by completedAt (oldest first, "legacy" treated as oldest)
    completed.sort((a, b) => {
      const progressA = getProblemProgress(a.id);
      const progressB = getProblemProgress(b.id);
      const dateA = progressA.completedAt;
      const dateB = progressB.completedAt;
      
      // "legacy" or undefined goes first (oldest)
      if (dateA === 'legacy' || !dateA) return -1;
      if (dateB === 'legacy' || !dateB) return 1;
      
      // Sort by ISO date string (works because ISO format is lexicographically sortable)
      return dateA.localeCompare(dateB);
    });
    
    // Concatenate: completed first (oldest to newest), then uncompleted in original order
    return [...completed, ...uncompleted];
  };

  // Filter problems by search query and bookmarked status, then optionally sort by completion
  const filteredProblemsByDifficulty = useMemo(() => {
    const filterAndSortProblems = (problems: Problem[]) => {
      let filtered = problems;
      
      // Filter by bookmarked status if enabled
      if (showBookmarkedOnly) {
        filtered = filtered.filter(p => getProblemProgress(p.id).flagged);
      }
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
      }
      
      // Sort by completion date if enabled
      filtered = sortByCompletionDate(filtered);
      
      return filtered;
    };
    
    return {
      Easy: filterAndSortProblems(problemsByDifficulty.Easy),
      Medium: filterAndSortProblems(problemsByDifficulty.Medium),
      Hard: filterAndSortProblems(problemsByDifficulty.Hard),
    };
  }, [problemsByDifficulty, searchQuery, showBookmarkedOnly, sortByCompletion, getProblemProgress]);

  // Get problems for the active tab
  const activeProblems = filteredProblemsByDifficulty[activeTab];

  // Check if there are any remaining problems
  const hasRemainingProblems = stats.total > stats.completed;

  // Handle random pick - sets the search query to a random problem's name
  const handlePickRandom = () => {
    if (!hasRemainingProblems) return;
    
    setIsSpinning(true);
    
    setTimeout(() => {
      const problem = pickRandomProblem(['Easy', 'Medium', 'Hard']);
      if (problem) {
        setSearchQuery(problem.name);
        // pickRandomProblem already switches to the correct tab
      }
      setIsSpinning(false);
    }, 250);
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
    {activeModalDetail && activeModalProblem && activeSolver && (
      <ProblemSolver
        detail={activeModalDetail}
        problem={activeModalProblem}
        rowElement={activeSolver.rowElement}
        onClose={() => setActiveSolver(null)}
      />
    )}
    <div className="card-elevated overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Problems
          </h2>
          
          {/* Search box */}
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`
                w-64 pl-9 py-1.5 rounded-lg text-sm
                bg-[var(--bg-primary)] border border-[var(--border-color)]
                text-[var(--text-primary)] placeholder-[var(--text-muted)]
                focus:outline-none focus:border-[var(--text-muted)] focus:ring-1 focus:ring-[var(--text-muted)]
                transition-all duration-200
                ${searchQuery ? 'pr-8' : 'pr-3'}
              `}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Random button - keeps text */}
          <button
            onClick={handlePickRandom}
            disabled={!hasRemainingProblems}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
              transition-all duration-200 border
              ${hasRemainingProblems
                ? 'bg-cyan-50 dark:bg-cyan-500/15 border-cyan-300 dark:border-cyan-500/40 text-[var(--text-primary)] hover:border-cyan-400 dark:hover:border-cyan-500/60'
                : 'bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
              }
            `}
          >
            <svg 
              className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''} ${hasRemainingProblems ? 'text-cyan-500' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            Random
          </button>
          
          {/* Divider */}
          <div className="w-px h-6 bg-[var(--border-color)]" />
          
          {/* Icon-only toggles */}
          <IconToggle
            tooltip="Show categories"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            isActive={showCategories}
            onToggle={() => setShowCategories(!showCategories)}
          />
          
          <IconToggle
            tooltip="Hide completed"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            }
            isActive={hideCompleted}
            onToggle={() => setHideCompleted(!hideCompleted)}
          />
          
          <IconToggle
            tooltip="Show bookmarked only"
            icon={
              <svg className="w-4 h-4" fill={showBookmarkedOnly ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            }
            isActive={showBookmarkedOnly}
            onToggle={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
          />
          
          <IconToggle
            tooltip="Sort by completion date"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            }
            isActive={sortByCompletion}
            onToggle={() => setSortByCompletion(!sortByCompletion)}
          />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-[var(--border-subtle)]" role="tablist">
        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((difficulty) => (
          <DifficultyTab
            key={difficulty}
            difficulty={difficulty}
            isActive={activeTab === difficulty}
            unsolvedCount={stats.byDifficulty[difficulty].total - stats.byDifficulty[difficulty].completed}
            totalCount={stats.byDifficulty[difficulty].total}
            onClick={() => setActiveTab(difficulty)}
          />
        ))}
      </div>

      {/* Content - Problems for active tab */}
      <div className="divide-y divide-[var(--border-subtle)]">
        {activeProblems.length > 0 ? (
          activeProblems.map((problem, idx) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              index={idx}
              expandedNoteId={expandedNoteId}
              setExpandedNoteId={setExpandedNoteId}
              hasDetail={problemDetailMap.has(problem.id)}
              onOpenModal={(id, el) => setActiveSolver({ problemId: id, rowElement: el })}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <div 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
              style={{ background: `var(--${activeTab.toLowerCase()}-bg)` }}
            >
              <svg className={`w-6 h-6 ${tabConfig[activeTab].textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {searchQuery ? (
              <>
                <p className="text-sm font-medium text-[var(--text-secondary)]">No matching problems</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Try a different search term</p>
              </>
            ) : showBookmarkedOnly ? (
              <>
                <p className="text-sm font-medium text-[var(--text-secondary)]">No bookmarked {activeTab.toLowerCase()} problems</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Bookmark problems to see them here</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-[var(--text-secondary)]">All {activeTab.toLowerCase()} problems completed!</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Amazing work!</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
