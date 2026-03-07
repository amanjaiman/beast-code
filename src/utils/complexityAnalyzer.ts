import type { SolutionTier, BenchmarkResult, BenchmarkConfig, Language } from '../types';
import { benchmarkCode, type RunOptions } from './codeRunner';

const COMPLEXITY_FN: Record<string, (n: number) => number> = {
  'O(1)': () => 1,
  'O(log n)': (n) => Math.log2(n),
  'O(n)': (n) => n,
  'O(n log n)': (n) => n * Math.log2(n),
  'O(n²)': (n) => n * n,
  'O(2^n)': (n) => Math.pow(2, n),
};

const COMPLEXITY_ORDER = Object.keys(COMPLEXITY_FN);

/**
 * Classify the detected complexity by fitting timing data against only the
 * candidate complexities (the problem's known solution tiers). When two
 * candidates produce similar fit errors, prefer the simpler one (Occam's razor).
 */
export function classifyComplexity(
  timings: { size: number; ms: number }[],
  candidates: string[]
): string {
  const sorted = [...candidates]
    .filter(c => c in COMPLEXITY_FN)
    .sort((a, b) => COMPLEXITY_ORDER.indexOf(a) - COMPLEXITY_ORDER.indexOf(b));

  if (sorted.length === 0) return candidates[0] ?? 'Unknown';

  if (timings.some(t => t.ms < 0)) {
    return sorted[sorted.length - 1];
  }

  const valid = timings.filter(t => t.ms > 0.05);

  if (valid.length < 2) {
    return sorted[0];
  }

  // Check for extreme growth suggesting exponential
  const firstValid = valid[0];
  const lastValid = valid[valid.length - 1];
  const actualRatio = lastValid.ms / firstValid.ms;
  const sizeRatio = lastValid.size / firstValid.size;
  if (actualRatio > sizeRatio * sizeRatio * 10) {
    return sorted[sorted.length - 1];
  }

  const base = valid[0];
  const fits: { name: string; error: number; orderIdx: number }[] = [];

  for (const cName of sorted) {
    const fn = COMPLEXITY_FN[cName];
    let totalError = 0;
    let count = 0;

    for (let i = 1; i < valid.length; i++) {
      const ar = valid[i].ms / base.ms;
      const pr = fn(valid[i].size) / fn(base.size);

      if (ar > 0 && pr > 0) {
        const logErr = Math.log(ar) - Math.log(pr);
        totalError += logErr * logErr;
        count++;
      }
    }

    if (count > 0) {
      fits.push({
        name: cName,
        error: totalError / count,
        orderIdx: COMPLEXITY_ORDER.indexOf(cName),
      });
    }
  }

  if (fits.length === 0) return sorted[0];

  fits.sort((a, b) => a.error - b.error);

  // Occam's razor: if top two fits have close errors, prefer the simpler one
  if (fits.length >= 2) {
    const best = fits[0];
    const runnerUp = fits[1];
    const minErr = Math.min(best.error, runnerUp.error);

    const isClose = minErr < 0.001
      || Math.abs(best.error - runnerUp.error) / minErr < 1.0;

    if (isClose && runnerUp.orderIdx < best.orderIdx) {
      return runnerUp.name;
    }
  }

  return fits[0].name;
}

export async function analyzeSolution(
  userCode: string,
  language: Language,
  functionName: string,
  benchmarkConfig: BenchmarkConfig,
  solutions: SolutionTier[],
  opts?: RunOptions
): Promise<BenchmarkResult> {
  const timings = await benchmarkCode(userCode, language, functionName, benchmarkConfig, opts);
  const candidates = solutions.map(s => s.complexity);
  const detectedComplexity = classifyComplexity(timings, candidates);
  const matchedTier = solutions.find(s => s.complexity === detectedComplexity) ?? null;
  const bestTier = solutions.find(s => s.isBest)!;
  const canDoBetter = matchedTier ? !matchedTier.isBest : detectedComplexity !== bestTier.complexity;

  return { detectedComplexity, matchedTier, bestTier, canDoBetter, timings };
}
