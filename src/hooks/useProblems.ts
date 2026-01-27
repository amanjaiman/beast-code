import { useMemo } from 'react';
import { problems, type Problem, type Difficulty } from '../data/problems';
import type { UserProgressMap } from '../types';

export interface ProblemsByDifficulty {
  Easy: Problem[];
  Medium: Problem[];
  Hard: Problem[];
}

export interface ProblemsStats {
  total: number;
  completed: number;
  byDifficulty: {
    Easy: { total: number; completed: number };
    Medium: { total: number; completed: number };
    Hard: { total: number; completed: number };
  };
}

/**
 * Hook that provides problems grouped by difficulty
 * and computed statistics based on user progress.
 */
export function useProblems(
  userProgress: UserProgressMap,
  hideCompleted: boolean
) {
  // Group by difficulty
  const problemsByDifficulty = useMemo((): ProblemsByDifficulty => {
    const grouped: ProblemsByDifficulty = {
      Easy: [],
      Medium: [],
      Hard: [],
    };

    for (const problem of problems) {
      grouped[problem.difficulty].push(problem);
    }

    return grouped;
  }, []);

  // Filter out completed if hideCompleted is true
  const filteredProblemsByDifficulty = useMemo((): ProblemsByDifficulty => {
    if (!hideCompleted) return problemsByDifficulty;

    return {
      Easy: problemsByDifficulty.Easy.filter(
        (p) => !userProgress[p.id]?.completed
      ),
      Medium: problemsByDifficulty.Medium.filter(
        (p) => !userProgress[p.id]?.completed
      ),
      Hard: problemsByDifficulty.Hard.filter(
        (p) => !userProgress[p.id]?.completed
      ),
    };
  }, [problemsByDifficulty, userProgress, hideCompleted]);

  // Calculate stats
  const stats = useMemo((): ProblemsStats => {
    const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
    
    const byDifficulty = {} as ProblemsStats['byDifficulty'];
    let totalCompleted = 0;

    for (const diff of difficulties) {
      const problemsInDiff = problemsByDifficulty[diff];
      const completedInDiff = problemsInDiff.filter(
        (p) => userProgress[p.id]?.completed
      ).length;

      byDifficulty[diff] = {
        total: problemsInDiff.length,
        completed: completedInDiff,
      };
      totalCompleted += completedInDiff;
    }

    return {
      total: problems.length,
      completed: totalCompleted,
      byDifficulty,
    };
  }, [problemsByDifficulty, userProgress]);

  // Get non-completed problems for random selection
  const getEligibleProblems = useMemo(() => {
    return (selectedDifficulties: Difficulty[]): Problem[] => {
      return problems.filter(
        (p) =>
          selectedDifficulties.includes(p.difficulty) &&
          !userProgress[p.id]?.completed
      );
    };
  }, [userProgress]);

  return {
    problemsByDifficulty: filteredProblemsByDifficulty,
    allProblemsByDifficulty: problemsByDifficulty,
    stats,
    getEligibleProblems,
  };
}
