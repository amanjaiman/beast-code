import type { ProblemDetail } from '../../types';

export const intervalsDetails: ProblemDetail[] = [
  {
    problemId: 130,
    functionName: 'insert',
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` represent the start and end of the \`i\`th interval and \`intervals\` is sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\`.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` after the insertion.

Examples:
  Input: \`intervals = [[1,3],[6,9]]\`, \`newInterval = [2,5]\`
  Output: \`[[1,5],[6,9]]\`

  Input: \`intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]\`, \`newInterval = [4,8]\`
  Output: \`[[1,2],[3,10],[12,16]]\`

Constraints:
  - \`0 <= intervals.length <= 10^4\`
  - \`intervals[i].length == 2\`
  - \`0 <= start_i <= end_i <= 10^5\`
  - \`intervals\` is sorted by \`start_i\` in ascending order
  - \`newInterval.length == 2\`
  - \`0 <= start <= end <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 3], [6, 9]], [2, 5]],
        expectedOutput: [[1, 5], [6, 9]],
        inputDisplay: 'intervals = [[1,3],[6,9]], newInterval = [2,5]',
      },
      {
        inputArgs: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]],
        expectedOutput: [[1, 2], [3, 10], [12, 16]],
        inputDisplay: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[], [5, 7]],
        expectedOutput: [[5, 7]],
        inputDisplay: 'intervals = [], newInterval = [5,7]',
      },
      {
        inputArgs: [[[1, 5]], [2, 3]],
        expectedOutput: [[1, 5]],
        inputDisplay: 'intervals = [[1,5]], newInterval = [2,3]',
      },
      {
        inputArgs: [[[1, 5]], [6, 8]],
        expectedOutput: [[1, 5], [6, 8]],
        inputDisplay: 'intervals = [[1,5]], newInterval = [6,8]',
      },
      {
        inputArgs: [[[1, 5]], [0, 3]],
        expectedOutput: [[0, 5]],
        inputDisplay: 'intervals = [[1,5]], newInterval = [0,3]',
      },
      {
        inputArgs: [[[1, 5]], [0, 0]],
        expectedOutput: [[0, 0], [1, 5]],
        inputDisplay: 'intervals = [[1,5]], newInterval = [0,0]',
      },
      {
        inputArgs: [[[3, 5], [12, 15]], [6, 6]],
        expectedOutput: [[3, 5], [6, 6], [12, 15]],
        inputDisplay: 'intervals = [[3,5],[12,15]], newInterval = [6,6]',
      },
      {
        inputArgs: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [0, 20]],
        expectedOutput: [[0, 20]],
        inputDisplay: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [0,20]',
      },
      {
        inputArgs: [[[2, 5], [6, 7], [8, 11]], [0, 1]],
        expectedOutput: [[0, 1], [2, 5], [6, 7], [8, 11]],
        inputDisplay: 'intervals = [[2,5],[6,7],[8,11]], newInterval = [0,1]',
      },
    ],
    starterCode: {
      python: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    pass
`,
      javascript: `function insert(intervals, newInterval) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Linear Scan & Merge', isBest: true },
      { complexity: 'O(n log n)', name: 'Binary Search + Merge', isBest: false, hint: 'A single pass through the array is sufficient' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        let pos = 0;
        for (let i = 0; i < n; i++) {
          const start = pos + Math.floor(Math.random() * 5) + 1;
          const end = start + Math.floor(Math.random() * 10) + 1;
          intervals.push([start, end]);
          pos = end;
        }
        const newStart = Math.floor(Math.random() * pos);
        const newEnd = newStart + Math.floor(Math.random() * 50) + 1;
        return [intervals, [newStart, newEnd]];
      },
    },
  },
  {
    problemId: 131,
    functionName: 'merge',
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Examples:
  Input: \`intervals = [[1,3],[2,6],[8,10],[15,18]]\`
  Output: \`[[1,6],[8,10],[15,18]]\`

  Input: \`intervals = [[1,4],[4,5]]\`
  Output: \`[[1,5]]\`

Constraints:
  - \`1 <= intervals.length <= 10^4\`
  - \`intervals[i].length == 2\`
  - \`0 <= start_i <= end_i <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 3], [2, 6], [8, 10], [15, 18]]],
        expectedOutput: [[1, 6], [8, 10], [15, 18]],
        inputDisplay: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
      },
      {
        inputArgs: [[[1, 4], [4, 5]]],
        expectedOutput: [[1, 5]],
        inputDisplay: 'intervals = [[1,4],[4,5]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1, 4], [0, 4]]],
        expectedOutput: [[0, 4]],
        inputDisplay: 'intervals = [[1,4],[0,4]]',
      },
      {
        inputArgs: [[[1, 4], [2, 3]]],
        expectedOutput: [[1, 4]],
        inputDisplay: 'intervals = [[1,4],[2,3]]',
      },
      {
        inputArgs: [[[1, 4], [0, 0]]],
        expectedOutput: [[0, 0], [1, 4]],
        inputDisplay: 'intervals = [[1,4],[0,0]]',
      },
      {
        inputArgs: [[[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]],
        expectedOutput: [[1, 10]],
        inputDisplay: 'intervals = [[2,3],[4,5],[6,7],[8,9],[1,10]]',
      },
      {
        inputArgs: [[[1, 3]]],
        expectedOutput: [[1, 3]],
        inputDisplay: 'intervals = [[1,3]]',
      },
      {
        inputArgs: [[[1, 4], [0, 2], [3, 5]]],
        expectedOutput: [[0, 5]],
        inputDisplay: 'intervals = [[1,4],[0,2],[3,5]]',
      },
    ],
    starterCode: {
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    pass
`,
      javascript: `function merge(intervals) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Sort & Merge', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Sorting by start time makes merging a single pass' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        for (let i = 0; i < n; i++) {
          const start = Math.floor(Math.random() * n);
          const end = start + Math.floor(Math.random() * 50) + 1;
          intervals.push([start, end]);
        }
        return [intervals];
      },
    },
  },
  {
    problemId: 132,
    functionName: 'eraseOverlapIntervals',
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Intervals that only touch at a point are non-overlapping. For example, \`[1, 2]\` and \`[2, 3]\` are non-overlapping.

Examples:
  Input: \`intervals = [[1,2],[2,3],[3,4],[1,3]]\`
  Output: \`1\`

  Input: \`intervals = [[1,2],[1,2],[1,2]]\`
  Output: \`2\`

Constraints:
  - \`1 <= intervals.length <= 10^5\`
  - \`intervals[i].length == 2\`
  - \`-5 * 10^4 <= start_i < end_i <= 5 * 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 2], [2, 3], [3, 4], [1, 3]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
      },
      {
        inputArgs: [[[1, 2], [1, 2], [1, 2]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[1,2],[1,2],[1,2]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1, 2], [2, 3]]],
        expectedOutput: 0,
        inputDisplay: 'intervals = [[1,2],[2,3]]',
      },
      {
        inputArgs: [[[1, 100], [11, 22], [1, 11], [2, 12]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[1,100],[11,22],[1,11],[2,12]]',
      },
      {
        inputArgs: [[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[0,2],[1,3],[2,4],[3,5],[4,6]]',
      },
      {
        inputArgs: [[[1, 2]]],
        expectedOutput: 0,
        inputDisplay: 'intervals = [[1,2]]',
      },
      {
        inputArgs: [[[1, 3], [2, 4], [3, 5]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[1,3],[2,4],[3,5]]',
      },
      {
        inputArgs: [[[1, 5], [2, 3], [3, 4], [4, 5]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[1,5],[2,3],[3,4],[4,5]]',
      },
    ],
    starterCode: {
      python: `def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    pass
`,
      javascript: `function eraseOverlapIntervals(intervals) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Greedy (Sort by End)', isBest: true },
      { complexity: 'O(n²)', name: 'Dynamic Programming', isBest: false, hint: 'A greedy approach sorting by end time is optimal' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        for (let i = 0; i < n; i++) {
          const start = Math.floor(Math.random() * n);
          const end = start + Math.floor(Math.random() * 50) + 1;
          intervals.push([start, end]);
        }
        return [intervals];
      },
    },
  },
  {
    problemId: 133,
    functionName: 'canAttendMeetings',
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, determine if a person could attend all meetings.

Two meetings \`[a, b]\` and \`[c, d]\` conflict if \`a < d\` and \`c < b\`. Meetings that start exactly when another ends do not conflict.

Examples:
  Input: \`intervals = [[0,30],[5,10],[15,20]]\`
  Output: \`false\`

  Input: \`intervals = [[7,10],[2,4]]\`
  Output: \`true\`

Constraints:
  - \`0 <= intervals.length <= 10^4\`
  - \`intervals[i].length == 2\`
  - \`0 <= start_i < end_i <= 10^6\``,
    sampleTestCases: [
      {
        inputArgs: [[[0, 30], [5, 10], [15, 20]]],
        expectedOutput: false,
        inputDisplay: 'intervals = [[0,30],[5,10],[15,20]]',
      },
      {
        inputArgs: [[[7, 10], [2, 4]]],
        expectedOutput: true,
        inputDisplay: 'intervals = [[7,10],[2,4]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1, 5], [5, 10]]],
        expectedOutput: true,
        inputDisplay: 'intervals = [[1,5],[5,10]]',
      },
      {
        inputArgs: [[]],
        expectedOutput: true,
        inputDisplay: 'intervals = []',
      },
      {
        inputArgs: [[[1, 2]]],
        expectedOutput: true,
        inputDisplay: 'intervals = [[1,2]]',
      },
      {
        inputArgs: [[[1, 5], [2, 3]]],
        expectedOutput: false,
        inputDisplay: 'intervals = [[1,5],[2,3]]',
      },
      {
        inputArgs: [[[6, 10], [13, 14], [12, 14]]],
        expectedOutput: false,
        inputDisplay: 'intervals = [[6,10],[13,14],[12,14]]',
      },
      {
        inputArgs: [[[1, 3], [3, 6], [6, 9]]],
        expectedOutput: true,
        inputDisplay: 'intervals = [[1,3],[3,6],[6,9]]',
      },
    ],
    starterCode: {
      python: `def canAttendMeetings(intervals: list[list[int]]) -> bool:
    pass
`,
      javascript: `function canAttendMeetings(intervals) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Sort & Scan', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Sorting lets you check only adjacent meetings' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        for (let i = 0; i < n; i++) {
          const start = Math.floor(Math.random() * n * 10);
          const end = start + Math.floor(Math.random() * 50) + 1;
          intervals.push([start, end]);
        }
        return [intervals];
      },
    },
  },
  {
    problemId: 134,
    functionName: 'minMeetingRooms',
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of conference rooms required.

Examples:
  Input: \`intervals = [[0,30],[5,10],[15,20]]\`
  Output: \`2\`

  Input: \`intervals = [[7,10],[2,4]]\`
  Output: \`1\`

Constraints:
  - \`0 <= intervals.length <= 10^4\`
  - \`0 <= start_i < end_i <= 10^6\``,
    sampleTestCases: [
      {
        inputArgs: [[[0, 30], [5, 10], [15, 20]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[0,30],[5,10],[15,20]]',
      },
      {
        inputArgs: [[[7, 10], [2, 4]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[7,10],[2,4]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0, 30], [5, 10], [10, 20]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[0,30],[5,10],[10,20]]',
      },
      {
        inputArgs: [[[1, 5], [2, 3], [4, 6], [5, 7]]],
        expectedOutput: 2,
        inputDisplay: 'intervals = [[1,5],[2,3],[4,6],[5,7]]',
      },
      {
        inputArgs: [[[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]],
        expectedOutput: 4,
        inputDisplay: 'intervals = [[1,10],[2,7],[3,19],[8,12],[10,20],[11,30]]',
      },
      {
        inputArgs: [[[13, 15], [1, 13]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[13,15],[1,13]]',
      },
      {
        inputArgs: [[[2, 4], [7, 10]]],
        expectedOutput: 1,
        inputDisplay: 'intervals = [[2,4],[7,10]]',
      },
      {
        inputArgs: [[]],
        expectedOutput: 0,
        inputDisplay: 'intervals = []',
      },
    ],
    starterCode: {
      python: `def minMeetingRooms(intervals: list[list[int]]) -> int:
    pass
`,
      javascript: `function minMeetingRooms(intervals) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Sort Events / Min Heap', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use a sweep line or min heap to track overlapping meetings' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        for (let i = 0; i < n; i++) {
          const start = Math.floor(Math.random() * n * 10);
          const end = start + Math.floor(Math.random() * 50) + 1;
          intervals.push([start, end]);
        }
        return [intervals];
      },
    },
  },
  {
    problemId: 135,
    functionName: 'minInterval',
    description: `You are given a 2D integer array \`intervals\` where \`intervals[i] = [left_i, right_i]\` describes the \`i\`th interval starting at \`left_i\` and ending at \`right_i\` (inclusive). The size of an interval is \`right_i - left_i + 1\`.

You are also given an integer array \`queries\`. The answer to the \`j\`th query is the size of the smallest interval \`i\` such that \`left_i <= queries[j] <= right_i\`. If no such interval exists, the answer is \`-1\`.

Return an array containing the answers to the queries.

Examples:
  Input: \`intervals = [[1,4],[2,4],[3,6],[4,4]]\`, \`queries = [2,3,4,5]\`
  Output: \`[3,3,1,4]\`

  Input: \`intervals = [[2,3],[2,5],[1,8],[20,25]]\`, \`queries = [2,19,5,22]\`
  Output: \`[2,-1,4,6]\`

Constraints:
  - \`1 <= intervals.length <= 10^5\`
  - \`1 <= queries.length <= 10^5\`
  - \`intervals[i].length == 2\`
  - \`1 <= left_i <= right_i <= 10^7\`
  - \`1 <= queries[j] <= 10^7\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]],
        expectedOutput: [3, 3, 1, 4],
        inputDisplay: 'intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]',
      },
      {
        inputArgs: [[[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]],
        expectedOutput: [2, -1, 4, 6],
        inputDisplay: 'intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1, 1]], [1]],
        expectedOutput: [1],
        inputDisplay: 'intervals = [[1,1]], queries = [1]',
      },
      {
        inputArgs: [[[1, 5], [3, 7], [4, 8]], [2, 5, 6]],
        expectedOutput: [5, 5, 5],
        inputDisplay: 'intervals = [[1,5],[3,7],[4,8]], queries = [2,5,6]',
      },
      {
        inputArgs: [[[1, 3], [2, 6]], [1, 4, 6]],
        expectedOutput: [3, 5, 5],
        inputDisplay: 'intervals = [[1,3],[2,6]], queries = [1,4,6]',
      },
      {
        inputArgs: [[[1, 10]], [1, 5, 10, 11]],
        expectedOutput: [10, 10, 10, -1],
        inputDisplay: 'intervals = [[1,10]], queries = [1,5,10,11]',
      },
      {
        inputArgs: [[[3, 5], [1, 2]], [4, 1, 3]],
        expectedOutput: [3, 2, 3],
        inputDisplay: 'intervals = [[3,5],[1,2]], queries = [4,1,3]',
      },
      {
        inputArgs: [[[1, 3], [1, 6], [5, 7]], [2, 6, 1, 5]],
        expectedOutput: [3, 3, 3, 3],
        inputDisplay: 'intervals = [[1,3],[1,6],[5,7]], queries = [2,6,1,5]',
      },
    ],
    starterCode: {
      python: `def minInterval(intervals: list[list[int]], queries: list[int]) -> list[int]:
    pass
`,
      javascript: `function minInterval(intervals, queries) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n + q log q)', name: 'Offline Sort + Min Heap', isBest: true },
      { complexity: 'O(n * q)', name: 'Brute Force', isBest: false, hint: 'Sort intervals and queries, then use a heap to track active intervals' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const intervals: number[][] = [];
        for (let i = 0; i < n; i++) {
          const start = Math.floor(Math.random() * n) + 1;
          const end = start + Math.floor(Math.random() * 50);
          intervals.push([start, end]);
        }
        const queries = Array.from({ length: n }, () => Math.floor(Math.random() * n) + 1);
        return [intervals, queries];
      },
    },
  },
];
