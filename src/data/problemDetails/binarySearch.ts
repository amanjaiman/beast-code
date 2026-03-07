import type { ProblemDetail } from '../../types';

export const binarySearchDetails: ProblemDetail[] = [
  {
    problemId: 28,
    functionName: 'search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

Examples:
  Input: \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 9\`
  Output: \`4\`

  Input: \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 2\`
  Output: \`-1\`

Constraints:
  - \`1 <= nums.length <= 10^4\`
  - \`-10^4 < nums[i], target < 10^4\`
  - All integers in \`nums\` are unique
  - \`nums\` is sorted in ascending order`,
    sampleTestCases: [
      {
        inputArgs: [[-1, 0, 3, 5, 9, 12], 9],
        expectedOutput: 4,
        inputDisplay: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      },
      {
        inputArgs: [[-1, 0, 3, 5, 9, 12], 2],
        expectedOutput: -1,
        inputDisplay: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[5], 5],
        expectedOutput: 0,
        inputDisplay: 'nums = [5], target = 5',
      },
      {
        inputArgs: [[1, 3, 5, 7, 9], 1],
        expectedOutput: 0,
        inputDisplay: 'nums = [1, 3, 5, 7, 9], target = 1',
      },
      {
        inputArgs: [[1, 3, 5, 7, 9], 9],
        expectedOutput: 4,
        inputDisplay: 'nums = [1, 3, 5, 7, 9], target = 9',
      },
      {
        inputArgs: [[1, 3, 5, 7, 9], 6],
        expectedOutput: -1,
        inputDisplay: 'nums = [1, 3, 5, 7, 9], target = 6',
      },
      {
        inputArgs: [[-10, -5, 0, 5, 10], 0],
        expectedOutput: 2,
        inputDisplay: 'nums = [-10, -5, 0, 5, 10], target = 0',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7],
        expectedOutput: 6,
        inputDisplay: 'nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 7',
      },
    ],
    starterCode: {
      python: `def search(nums: list[int], target: int) -> int:
    pass
`,
      javascript: `function search(nums, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Binary Search', isBest: true },
      { complexity: 'O(n)', name: 'Linear Scan', isBest: false, hint: 'The array is sorted — can you eliminate half the elements each step?' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i), n - 1],
    },
  },
  {
    problemId: 29,
    functionName: 'searchMatrix',
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise. You must write a solution in \`O(log(m * n))\` time complexity.

Examples:
  Input: \`matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\`, \`target = 3\`
  Output: \`true\`

  Input: \`matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\`, \`target = 13\`
  Output: \`false\`

Constraints:
  - \`m == matrix.length\`
  - \`n == matrix[i].length\`
  - \`1 <= m, n <= 100\`
  - \`-10^4 <= matrix[i][j], target <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3],
        expectedOutput: true,
        inputDisplay: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
      },
      {
        inputArgs: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13],
        expectedOutput: false,
        inputDisplay: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]], 1],
        expectedOutput: true,
        inputDisplay: 'matrix = [[1]], target = 1',
      },
      {
        inputArgs: [[[1]], 2],
        expectedOutput: false,
        inputDisplay: 'matrix = [[1]], target = 2',
      },
      {
        inputArgs: [[[1,3],[5,7],[9,11]], 5],
        expectedOutput: true,
        inputDisplay: 'matrix = [[1,3],[5,7],[9,11]], target = 5',
      },
      {
        inputArgs: [[[1,3],[5,7],[9,11]], 4],
        expectedOutput: false,
        inputDisplay: 'matrix = [[1,3],[5,7],[9,11]], target = 4',
      },
      {
        inputArgs: [[[1,2,3,4,5]], 3],
        expectedOutput: true,
        inputDisplay: 'matrix = [[1,2,3,4,5]], target = 3',
      },
      {
        inputArgs: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 60],
        expectedOutput: true,
        inputDisplay: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 60',
      },
    ],
    starterCode: {
      python: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    pass
`,
      javascript: `function searchMatrix(matrix, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(log(m*n))', name: 'Binary Search', isBest: true },
      { complexity: 'O(m + n)', name: 'Staircase Search', isBest: false, hint: 'The entire matrix can be treated as a single sorted array.' },
    ],
    benchmarkConfig: {
      sizes: [100, 1000, 10000],
      generateInput: (n: number) => {
        const cols = Math.max(1, Math.floor(Math.sqrt(n)));
        const rows = Math.max(1, Math.floor(n / cols));
        const matrix = Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => r * cols + c)
        );
        return [matrix, rows * cols - 1];
      },
    },
  },
  {
    problemId: 30,
    functionName: 'minEatingSpeed',
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile and eats \`k\` bananas from it. If the pile has less than \`k\` bananas, she eats all of them and won't eat any more during that hour.

Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.

Examples:
  Input: \`piles = [3,6,7,11]\`, \`h = 8\`
  Output: \`4\`

  Input: \`piles = [30,11,23,4,20]\`, \`h = 5\`
  Output: \`30\`

  Input: \`piles = [30,11,23,4,20]\`, \`h = 6\`
  Output: \`23\`

Constraints:
  - \`1 <= piles.length <= 10^4\`
  - \`piles.length <= h <= 10^9\`
  - \`1 <= piles[i] <= 10^9\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 6, 7, 11], 8],
        expectedOutput: 4,
        inputDisplay: 'piles = [3, 6, 7, 11], h = 8',
      },
      {
        inputArgs: [[30, 11, 23, 4, 20], 5],
        expectedOutput: 30,
        inputDisplay: 'piles = [30, 11, 23, 4, 20], h = 5',
      },
      {
        inputArgs: [[30, 11, 23, 4, 20], 6],
        expectedOutput: 23,
        inputDisplay: 'piles = [30, 11, 23, 4, 20], h = 6',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: 1,
        inputDisplay: 'piles = [1], h = 1',
      },
      {
        inputArgs: [[1, 1, 1, 1], 4],
        expectedOutput: 1,
        inputDisplay: 'piles = [1, 1, 1, 1], h = 4',
      },
      {
        inputArgs: [[3, 6, 7, 11], 4],
        expectedOutput: 11,
        inputDisplay: 'piles = [3, 6, 7, 11], h = 4',
      },
      {
        inputArgs: [[2, 2], 2],
        expectedOutput: 2,
        inputDisplay: 'piles = [2, 2], h = 2',
      },
      {
        inputArgs: [[805306368, 805306368, 805306368], 1000000000],
        expectedOutput: 3,
        inputDisplay: 'piles = [805306368, 805306368, 805306368], h = 1000000000',
      },
    ],
    starterCode: {
      python: `def minEatingSpeed(piles: list[int], h: int) -> int:
    pass
`,
      javascript: `function minEatingSpeed(piles, h) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log m)', name: 'Binary Search on Speed', isBest: true },
      { complexity: 'O(n * m)', name: 'Linear Search', isBest: false, hint: 'Binary search the answer space — the speed ranges from 1 to max(piles).' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const piles = Array.from({ length: n }, () => Math.floor(Math.random() * 1000) + 1);
        return [piles, n * 2];
      },
    },
  },
  {
    problemId: 31,
    functionName: 'findMin',
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become:

- \`[4,5,6,7,0,1,2]\` if it was rotated 4 times.
- \`[0,1,2,4,5,6,7]\` if it was rotated 7 times.

Given the sorted rotated array \`nums\` of unique elements, return the minimum element.

You must write an algorithm that runs in \`O(log n)\` time.

Examples:
  Input: \`nums = [3,4,5,1,2]\`
  Output: \`1\`

  Input: \`nums = [4,5,6,7,0,1,2]\`
  Output: \`0\`

  Input: \`nums = [11,13,15,17]\`
  Output: \`11\`

Constraints:
  - \`n == nums.length\`
  - \`1 <= n <= 5000\`
  - \`-5000 <= nums[i] <= 5000\`
  - All values in \`nums\` are unique
  - \`nums\` is sorted and rotated between 1 and n times`,
    sampleTestCases: [
      {
        inputArgs: [[3, 4, 5, 1, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [3, 4, 5, 1, 2]',
      },
      {
        inputArgs: [[4, 5, 6, 7, 0, 1, 2]],
        expectedOutput: 0,
        inputDisplay: 'nums = [4, 5, 6, 7, 0, 1, 2]',
      },
      {
        inputArgs: [[11, 13, 15, 17]],
        expectedOutput: 11,
        inputDisplay: 'nums = [11, 13, 15, 17]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[2, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [2, 1]',
      },
      {
        inputArgs: [[2, 3, 4, 5, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [2, 3, 4, 5, 1]',
      },
      {
        inputArgs: [[5, 1, 2, 3, 4]],
        expectedOutput: 1,
        inputDisplay: 'nums = [5, 1, 2, 3, 4]',
      },
      {
        inputArgs: [[3, 4, 5, 6, 7, 8, 1, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [3, 4, 5, 6, 7, 8, 1, 2]',
      },
    ],
    starterCode: {
      python: `def findMin(nums: list[int]) -> int:
    pass
`,
      javascript: `function findMin(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Binary Search', isBest: true },
      { complexity: 'O(n)', name: 'Linear Scan', isBest: false, hint: 'One half of the array is always sorted — use that to narrow down the pivot.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const sorted = Array.from({ length: n }, (_, i) => i);
        const pivot = Math.floor(n / 3);
        return [[...sorted.slice(pivot), ...sorted.slice(0, pivot)]];
      },
    },
  },
  {
    problemId: 32,
    functionName: 'search',
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values).

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (0-indexed).

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not.

You must write an algorithm with \`O(log n)\` runtime complexity.

Examples:
  Input: \`nums = [4,5,6,7,0,1,2]\`, \`target = 0\`
  Output: \`4\`

  Input: \`nums = [4,5,6,7,0,1,2]\`, \`target = 3\`
  Output: \`-1\`

  Input: \`nums = [1]\`, \`target = 0\`
  Output: \`-1\`

Constraints:
  - \`1 <= nums.length <= 5000\`
  - \`-10^4 <= nums[i] <= 10^4\`
  - All values of \`nums\` are unique
  - \`nums\` is an ascending array that is possibly rotated`,
    sampleTestCases: [
      {
        inputArgs: [[4, 5, 6, 7, 0, 1, 2], 0],
        expectedOutput: 4,
        inputDisplay: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
      },
      {
        inputArgs: [[4, 5, 6, 7, 0, 1, 2], 3],
        expectedOutput: -1,
        inputDisplay: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3',
      },
      {
        inputArgs: [[1], 0],
        expectedOutput: -1,
        inputDisplay: 'nums = [1], target = 0',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: 0,
        inputDisplay: 'nums = [1], target = 1',
      },
      {
        inputArgs: [[3, 1], 1],
        expectedOutput: 1,
        inputDisplay: 'nums = [3, 1], target = 1',
      },
      {
        inputArgs: [[5, 1, 3], 5],
        expectedOutput: 0,
        inputDisplay: 'nums = [5, 1, 3], target = 5',
      },
      {
        inputArgs: [[4, 5, 6, 7, 8, 1, 2, 3], 8],
        expectedOutput: 4,
        inputDisplay: 'nums = [4, 5, 6, 7, 8, 1, 2, 3], target = 8',
      },
      {
        inputArgs: [[4, 5, 6, 7, 0, 1, 2], 6],
        expectedOutput: 2,
        inputDisplay: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 6',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 4],
        expectedOutput: 3,
        inputDisplay: 'nums = [1, 2, 3, 4, 5], target = 4',
      },
    ],
    starterCode: {
      python: `def search(nums: list[int], target: int) -> int:
    pass
`,
      javascript: `function search(nums, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Binary Search', isBest: true },
      { complexity: 'O(n)', name: 'Linear Scan', isBest: false, hint: 'Determine which half is sorted, then check if the target lies in that half.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const sorted = Array.from({ length: n }, (_, i) => i);
        const pivot = Math.floor(n / 3);
        const rotated = [...sorted.slice(pivot), ...sorted.slice(0, pivot)];
        return [rotated, 0];
      },
    },
  },
  {
    problemId: 33,
    functionName: 'TimeMap',
    mode: 'class',
    className: 'TimeMap',
    description: `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the \`TimeMap\` class:
- \`TimeMap()\` — Initializes the object.
- \`void set(String key, String value, int timestamp)\` — Stores the key \`key\` with the value \`value\` at the given time \`timestamp\`.
- \`String get(String key, int timestamp)\` — Returns a value such that \`set\` was called previously, with \`timestamp_prev <= timestamp\`. If there are multiple such values, it returns the value associated with the largest \`timestamp_prev\`. If there are no values, it returns \`""\`.

Examples:
  Input: ["TimeMap","set","get","get","set","get"]
         [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4]]
  Output: [null,null,"bar","bar",null,"bar2"]

Constraints:
  - \`1 <= key.length, value.length <= 100\`
  - \`key\` and \`value\` consist of lowercase English letters and digits
  - \`1 <= timestamp <= 10^7\`
  - All \`set\` timestamps are strictly increasing for each key
  - At most \`2 * 10^5\` calls to \`set\` and \`get\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['TimeMap', 'set', 'get', 'get', 'set', 'get'],
        operationArgs: [[], ['foo', 'bar', 1], ['foo', 1], ['foo', 3], ['foo', 'bar2', 4], ['foo', 4]],
        expected: [null, null, 'bar', 'bar', null, 'bar2'],
        inputDisplay: '["TimeMap","set","get","get","set","get"]\n[[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4]]',
      },
      {
        operations: ['TimeMap', 'set', 'set', 'get', 'get', 'get'],
        operationArgs: [[], ['love', 'high', 10], ['love', 'low', 20], ['love', 5], ['love', 10], ['love', 15]],
        expected: [null, null, null, '', 'high', 'high'],
        inputDisplay: '["TimeMap","set","set","get","get","get"]\n[[],["love","high",10],["love","low",20],["love",5],["love",10],["love",15]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['TimeMap', 'set', 'set', 'set', 'get', 'get', 'get', 'get'],
        operationArgs: [[], ['key', 'a', 1], ['key', 'b', 5], ['key', 'c', 10], ['key', 0], ['key', 3], ['key', 5], ['key', 12]],
        expected: [null, null, null, null, '', 'a', 'b', 'c'],
        inputDisplay: '["TimeMap","set","set","set","get","get","get","get"]\n[[],["key","a",1],["key","b",5],["key","c",10],["key",0],["key",3],["key",5],["key",12]]',
      },
      {
        operations: ['TimeMap', 'set', 'set', 'get', 'get'],
        operationArgs: [[], ['x', 'val1', 1], ['y', 'val2', 2], ['x', 1], ['y', 1]],
        expected: [null, null, null, 'val1', ''],
        inputDisplay: '["TimeMap","set","set","get","get"]\n[[],["x","val1",1],["y","val2",2],["x",1],["y",1]]',
      },
      {
        operations: ['TimeMap', 'set', 'get'],
        operationArgs: [[], ['a', 'b', 1], ['c', 1]],
        expected: [null, null, ''],
        inputDisplay: '["TimeMap","set","get"]\n[[],["a","b",1],["c",1]]',
      },
    ],
    starterCode: {
      python: `class TimeMap:
    def __init__(self):
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        pass

    def get(self, key: str, timestamp: int) -> str:
        pass
`,
      javascript: `class TimeMap {
    constructor() {

    }

    set(key, value, timestamp) {

    }

    get(key, timestamp) {

    }
}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'HashMap + Binary Search', isBest: true },
      { complexity: 'O(n)', name: 'HashMap + Linear Scan', isBest: false, hint: 'Store timestamps in sorted order per key — then binary search for the right value.' },
    ],
  },
  {
    problemId: 34,
    functionName: 'findMedianSortedArrays',
    compareType: 'float',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be \`O(log(m+n))\`.

Examples:
  Input: \`nums1 = [1,3]\`, \`nums2 = [2]\`
  Output: \`2.0\`

  Input: \`nums1 = [1,2]\`, \`nums2 = [3,4]\`
  Output: \`2.5\`

Constraints:
  - \`nums1.length == m\`
  - \`nums2.length == n\`
  - \`0 <= m <= 1000\`
  - \`0 <= n <= 1000\`
  - \`1 <= m + n <= 2000\`
  - \`-10^6 <= nums1[i], nums2[i] <= 10^6\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 3], [2]],
        expectedOutput: 2.0,
        inputDisplay: 'nums1 = [1, 3], nums2 = [2]',
      },
      {
        inputArgs: [[1, 2], [3, 4]],
        expectedOutput: 2.5,
        inputDisplay: 'nums1 = [1, 2], nums2 = [3, 4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[], [1]],
        expectedOutput: 1.0,
        inputDisplay: 'nums1 = [], nums2 = [1]',
      },
      {
        inputArgs: [[2], []],
        expectedOutput: 2.0,
        inputDisplay: 'nums1 = [2], nums2 = []',
      },
      {
        inputArgs: [[1, 2], [1, 2]],
        expectedOutput: 1.5,
        inputDisplay: 'nums1 = [1, 2], nums2 = [1, 2]',
      },
      {
        inputArgs: [[1, 3], [2, 4]],
        expectedOutput: 2.5,
        inputDisplay: 'nums1 = [1, 3], nums2 = [2, 4]',
      },
      {
        inputArgs: [[0, 0], [0, 0]],
        expectedOutput: 0.0,
        inputDisplay: 'nums1 = [0, 0], nums2 = [0, 0]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]],
        expectedOutput: 5.5,
        inputDisplay: 'nums1 = [1, 2, 3, 4, 5], nums2 = [6, 7, 8, 9, 10]',
      },
    ],
    starterCode: {
      python: `def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    pass
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {

}
`,
    },
    solutions: [
      { complexity: 'O(log(min(m,n)))', name: 'Binary Search on Partition', isBest: true },
      { complexity: 'O(m+n)', name: 'Merge and Find Middle', isBest: false, hint: 'Partition the smaller array and use binary search to find the correct split point.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const half = Math.floor(n / 2);
        const nums1 = Array.from({ length: half }, (_, i) => i * 2);
        const nums2 = Array.from({ length: n - half }, (_, i) => i * 2 + 1);
        return [nums1, nums2];
      },
    },
  },
];
