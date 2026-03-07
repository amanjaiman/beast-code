import type { ProblemDetail } from '../../types';

export const twoPointersDetails: ProblemDetail[] = [
  {
    problemId: 10,
    functionName: 'isPalindrome',
    description: `Given a string \`s\`, return \`true\` if it is a palindrome, otherwise return \`false\`.

A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

Examples:
  Input: \`s = "A man, a plan, a canal: Panama"\`
  Output: \`true\`

  Input: \`s = "race a car"\`
  Output: \`false\`

Constraints:
  - \`1 <= s.length <= 1000\`
  - \`s\` consists only of printable ASCII characters`,
    sampleTestCases: [
      {
        inputArgs: ['A man, a plan, a canal: Panama'],
        expectedOutput: true,
        inputDisplay: 's = "A man, a plan, a canal: Panama"',
      },
      {
        inputArgs: ['race a car'],
        expectedOutput: false,
        inputDisplay: 's = "race a car"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [' '],
        expectedOutput: true,
        inputDisplay: 's = " "',
      },
      {
        inputArgs: ['a.'],
        expectedOutput: true,
        inputDisplay: 's = "a."',
      },
      {
        inputArgs: ['0P'],
        expectedOutput: false,
        inputDisplay: 's = "0P"',
      },
      {
        inputArgs: ['ab'],
        expectedOutput: false,
        inputDisplay: 's = "ab"',
      },
      {
        inputArgs: ['aba'],
        expectedOutput: true,
        inputDisplay: 's = "aba"',
      },
      {
        inputArgs: ['.,!'],
        expectedOutput: true,
        inputDisplay: 's = ".,!"',
      },
    ],
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    pass
`,
      javascript: `function isPalindrome(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two Pointers', isBest: true },
      { complexity: 'O(n)', name: 'Reverse & Compare', isBest: false, hint: 'Can you avoid creating a new string?' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const half = Array.from({ length: Math.floor(n / 2) }, () => chars[Math.floor(Math.random() * 26)]);
        const s = half.join('') + (n % 2 ? chars[Math.floor(Math.random() * 26)] : '') + [...half].reverse().join('');
        return [s];
      },
    },
  },
  {
    problemId: 11,
    functionName: 'twoSum',
    description: `Given an array of integers \`numbers\` that is sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.

Return the indices of the two numbers (1-indexed) as an integer array \`[index1, index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

There is exactly one solution. You may not use the same element twice.

Examples:
  Input: \`numbers = [2, 7, 11, 15]\`, \`target = 9\`
  Output: \`[1, 2]\`

  Input: \`numbers = [2, 3, 4]\`, \`target = 6\`
  Output: \`[1, 3]\`

Constraints:
  - \`2 <= numbers.length <= 3 * 10^4\`
  - \`-1000 <= numbers[i] <= 1000\`
  - \`numbers\` is sorted in non-decreasing order
  - Exactly one solution exists`,
    sampleTestCases: [
      {
        inputArgs: [[2, 7, 11, 15], 9],
        expectedOutput: [1, 2],
        inputDisplay: 'numbers = [2, 7, 11, 15], target = 9',
      },
      {
        inputArgs: [[2, 3, 4], 6],
        expectedOutput: [1, 3],
        inputDisplay: 'numbers = [2, 3, 4], target = 6',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[-1, 0], -1],
        expectedOutput: [1, 2],
        inputDisplay: 'numbers = [-1, 0], target = -1',
      },
      {
        inputArgs: [[1, 2, 3, 4, 4, 9, 56, 90], 8],
        expectedOutput: [4, 5],
        inputDisplay: 'numbers = [1, 2, 3, 4, 4, 9, 56, 90], target = 8',
      },
      {
        inputArgs: [[5, 25, 75], 100],
        expectedOutput: [2, 3],
        inputDisplay: 'numbers = [5, 25, 75], target = 100',
      },
      {
        inputArgs: [[0, 0, 3, 4], 0],
        expectedOutput: [1, 2],
        inputDisplay: 'numbers = [0, 0, 3, 4], target = 0',
      },
      {
        inputArgs: [[3, 24, 50, 79, 88, 150, 345], 200],
        expectedOutput: [3, 6],
        inputDisplay: 'numbers = [3, 24, 50, 79, 88, 150, 345], target = 200',
      },
      {
        inputArgs: [[1, 3, 4, 5, 7, 10, 11], 15],
        expectedOutput: [4, 6],
        inputDisplay: 'numbers = [1, 3, 4, 5, 7, 10, 11], target = 15',
      },
    ],
    starterCode: {
      python: `def twoSum(numbers: list[int], target: int) -> list[int]:
    pass
`,
      javascript: `function twoSum(numbers, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two Pointers', isBest: true },
      { complexity: 'O(n log n)', name: 'Binary Search', isBest: false, hint: 'The array is sorted — can you use that with two pointers?' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use the sorted property to avoid checking all pairs' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const numbers = Array.from({ length: n }, (_, i) => i * 2 + 1);
        const target = numbers[0] + numbers[n - 1];
        return [numbers, target];
      },
    },
  },
  {
    problemId: 12,
    functionName: 'threeSum',
    compareType: 'unorderedNestedArray',
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets. Each inner triplet must be sorted in non-decreasing order.

Examples:
  Input: \`nums = [-1, 0, 1, 2, -1, -4]\`
  Output: \`[[-1, -1, 2], [-1, 0, 1]]\`

  Input: \`nums = [0, 1, 1]\`
  Output: \`[]\`

Constraints:
  - \`0 <= nums.length <= 3000\`
  - \`-10^5 <= nums[i] <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [[-1, 0, 1, 2, -1, -4]],
        expectedOutput: [[-1, -1, 2], [-1, 0, 1]],
        inputDisplay: 'nums = [-1, 0, 1, 2, -1, -4]',
      },
      {
        inputArgs: [[0, 1, 1]],
        expectedOutput: [],
        inputDisplay: 'nums = [0, 1, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0, 0, 0]],
        expectedOutput: [[0, 0, 0]],
        inputDisplay: 'nums = [0, 0, 0]',
      },
      {
        inputArgs: [[-2, 0, 1, 1, 2]],
        expectedOutput: [[-2, 0, 2], [-2, 1, 1]],
        inputDisplay: 'nums = [-2, 0, 1, 1, 2]',
      },
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'nums = []',
      },
      {
        inputArgs: [[0]],
        expectedOutput: [],
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[-1, 0, 1, 0]],
        expectedOutput: [[-1, 0, 1]],
        inputDisplay: 'nums = [-1, 0, 1, 0]',
      },
      {
        inputArgs: [[-2, 0, 0, 2, 2]],
        expectedOutput: [[-2, 0, 2]],
        inputDisplay: 'nums = [-2, 0, 0, 2, 2]',
      },
    ],
    starterCode: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    pass
`,
      javascript: `function threeSum(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n²)', name: 'Sort + Two Pointers', isBest: true },
      { complexity: 'O(n²)', name: 'Hash Set', isBest: false, hint: 'Sorting first lets you skip duplicates and use two pointers' },
      { complexity: 'O(n³)', name: 'Brute Force', isBest: false, hint: 'Fix one element and reduce to two-sum' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        return [Array.from({ length: n }, () => Math.floor(Math.random() * 2001) - 1000)];
      },
    },
  },
  {
    problemId: 13,
    functionName: 'maxArea',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Examples:
  Input: \`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]\`
  Output: \`49\`

  Input: \`height = [1, 1]\`
  Output: \`1\`

Constraints:
  - \`2 <= height.length <= 10^5\`
  - \`0 <= height[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
        expectedOutput: 49,
        inputDisplay: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
      },
      {
        inputArgs: [[1, 1]],
        expectedOutput: 1,
        inputDisplay: 'height = [1, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[4, 3, 2, 1, 4]],
        expectedOutput: 16,
        inputDisplay: 'height = [4, 3, 2, 1, 4]',
      },
      {
        inputArgs: [[1, 2, 1]],
        expectedOutput: 2,
        inputDisplay: 'height = [1, 2, 1]',
      },
      {
        inputArgs: [[1, 2, 4, 3]],
        expectedOutput: 4,
        inputDisplay: 'height = [1, 2, 4, 3]',
      },
      {
        inputArgs: [[3, 1, 2, 4, 5]],
        expectedOutput: 12,
        inputDisplay: 'height = [3, 1, 2, 4, 5]',
      },
      {
        inputArgs: [[2, 3, 10, 5, 7, 8, 9]],
        expectedOutput: 36,
        inputDisplay: 'height = [2, 3, 10, 5, 7, 8, 9]',
      },
      {
        inputArgs: [[1, 8, 100, 2, 100, 4, 8, 3, 7]],
        expectedOutput: 200,
        inputDisplay: 'height = [1, 8, 100, 2, 100, 4, 8, 3, 7]',
      },
    ],
    starterCode: {
      python: `def maxArea(height: list[int]) -> int:
    pass
`,
      javascript: `function maxArea(height) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two Pointers', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Move the pointer at the shorter line inward' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        return [Array.from({ length: n }, () => Math.floor(Math.random() * 10000))];
      },
    },
  },
  {
    problemId: 14,
    functionName: 'trap',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

Examples:
  Input: \`height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\`
  Output: \`6\`

  Input: \`height = [4, 2, 0, 3, 2, 5]\`
  Output: \`9\`

Constraints:
  - \`0 <= height.length <= 2 * 10^4\`
  - \`0 <= height[i] <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expectedOutput: 6,
        inputDisplay: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
      },
      {
        inputArgs: [[4, 2, 0, 3, 2, 5]],
        expectedOutput: 9,
        inputDisplay: 'height = [4, 2, 0, 3, 2, 5]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 0, 2]],
        expectedOutput: 1,
        inputDisplay: 'height = [1, 0, 2]',
      },
      {
        inputArgs: [[3, 0, 0, 2, 0, 4]],
        expectedOutput: 10,
        inputDisplay: 'height = [3, 0, 0, 2, 0, 4]',
      },
      {
        inputArgs: [[0, 0, 0]],
        expectedOutput: 0,
        inputDisplay: 'height = [0, 0, 0]',
      },
      {
        inputArgs: [[]],
        expectedOutput: 0,
        inputDisplay: 'height = []',
      },
      {
        inputArgs: [[2, 0, 2]],
        expectedOutput: 2,
        inputDisplay: 'height = [2, 0, 2]',
      },
      {
        inputArgs: [[3, 0, 2, 0, 4]],
        expectedOutput: 7,
        inputDisplay: 'height = [3, 0, 2, 0, 4]',
      },
      {
        inputArgs: [[5, 4, 1, 2]],
        expectedOutput: 1,
        inputDisplay: 'height = [5, 4, 1, 2]',
      },
      {
        inputArgs: [[0, 7, 1, 4, 6]],
        expectedOutput: 7,
        inputDisplay: 'height = [0, 7, 1, 4, 6]',
      },
    ],
    starterCode: {
      python: `def trap(height: list[int]) -> int:
    pass
`,
      javascript: `function trap(height) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two Pointers', isBest: true },
      { complexity: 'O(n)', name: 'Monotonic Stack', isBest: false, hint: 'Two pointers avoids extra space' },
      { complexity: 'O(n)', name: 'Prefix/Suffix Max Arrays', isBest: false, hint: 'Can you compute this without storing the arrays?' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Precompute left and right maxima for each position' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        return [Array.from({ length: n }, () => Math.floor(Math.random() * 10000))];
      },
    },
  },
];
