import type { ProblemDetail } from '../../types';
import { arraysAndHashingDetails } from './arraysAndHashing';
import { twoPointersDetails } from './twoPointers';
import { slidingWindowDetails } from './slidingWindow';
import { stackDetails } from './stack';
import { binarySearchDetails } from './binarySearch';
import { linkedListDetails } from './linkedList';
import { treesDetails } from './trees';
import { triesDetails } from './tries';
import { heapPriorityQueueDetails } from './heapPriorityQueue';
import { backtrackingDetails } from './backtracking';
import { graphsDetails } from './graphs';
import { advancedGraphsDetails } from './advancedGraphs';
import { oneDDynamicProgrammingDetails } from './oneDDynamicProgramming';
import { twoDDynamicProgrammingDetails } from './twoDDynamicProgramming';
import { greedyDetails } from './greedy';
import { intervalsDetails } from './intervals';
import { mathAndGeometryDetails } from './mathAndGeometry';
import { bitManipulationDetails } from './bitManipulation';

export const problemDetails: ProblemDetail[] = [
  ...arraysAndHashingDetails,
  ...twoPointersDetails,
  ...slidingWindowDetails,
  ...stackDetails,
  ...binarySearchDetails,
  ...linkedListDetails,
  ...treesDetails,
  ...triesDetails,
  ...heapPriorityQueueDetails,
  ...backtrackingDetails,
  ...graphsDetails,
  ...advancedGraphsDetails,
  ...oneDDynamicProgrammingDetails,
  ...twoDDynamicProgrammingDetails,
  ...greedyDetails,
  ...intervalsDetails,
  ...mathAndGeometryDetails,
  ...bitManipulationDetails,
];

export const problemDetailMap = new Map<number, ProblemDetail>(
  problemDetails.map((d) => [d.problemId, d])
);
