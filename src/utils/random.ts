import type { Problem } from '../data/problems';

/**
 * Select a random problem with category weighting.
 * Problems from categories that haven't been picked recently are more likely to be selected.
 * 
 * @param problems - Array of eligible problems to pick from
 * @param categoryLastPicked - Map of category name to timestamp of last pick
 * @returns The selected problem, or null if no problems available
 */
export function weightedRandomPick(
  problems: Problem[],
  categoryLastPicked: Record<string, number>
): Problem | null {
  if (problems.length === 0) return null;
  
  const now = Date.now();
  
  // Calculate weights - higher weight for categories not picked recently
  // Minimum weight of 1 to ensure all problems have some chance
  const weights = problems.map((p) => {
    const lastPicked = categoryLastPicked[p.category] ?? 0;
    // Time since last picked in minutes, minimum 1
    const timeSince = Math.max(1, (now - lastPicked) / 60000);
    return timeSince;
  });
  
  // Calculate total weight
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  
  // Pick a random value in the total weight range
  let random = Math.random() * totalWeight;
  
  // Find the problem that corresponds to this random value
  for (let i = 0; i < problems.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return problems[i];
    }
  }
  
  // Fallback to last problem (shouldn't happen due to floating point)
  return problems[problems.length - 1];
}
