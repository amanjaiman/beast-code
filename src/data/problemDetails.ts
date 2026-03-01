import type { ProblemDetail } from '../types';

export const problemDetails: ProblemDetail[] = [
  {
    problemId: 1,
    functionName: 'containsDuplicate',
    description: `Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

Examples:
  Input: nums = [1, 2, 3, 3]
  Output: true

  Input: nums = [1, 2, 3, 4]
  Output: false

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^9 <= nums[i] <= 10^9`,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 1]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 2, 3, 1]',
      },
      {
        inputArgs: [[1, 2, 3, 4]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 2, 3, 4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: false,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[]],
        expectedOutput: false,
        inputDisplay: 'nums = []',
      },
      {
        inputArgs: [[0, 0]],
        expectedOutput: true,
        inputDisplay: 'nums = [0, 0]',
      },
      {
        inputArgs: [[-1, -1]],
        expectedOutput: true,
        inputDisplay: 'nums = [-1, -1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
      },
    ],
    starterCode: {
      python: `def containsDuplicate(nums: list[int]) -> bool:
    pass
`,
      javascript: `function containsDuplicate(nums) {

}
`,
    },
  },
  {
    problemId: 2,
    functionName: 'isAnagram',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.

Examples:
  Input: s = "anagram", t = "nagaram"
  Output: true

  Input: s = "rat", t = "car"
  Output: false

Constraints:
  - 1 <= s.length, t.length <= 5 * 10^4
  - s and t consist of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['anagram', 'nagaram'],
        expectedOutput: true,
        inputDisplay: 's = "anagram", t = "nagaram"',
      },
      {
        inputArgs: ['rat', 'car'],
        expectedOutput: false,
        inputDisplay: 's = "rat", t = "car"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'a'],
        expectedOutput: true,
        inputDisplay: 's = "a", t = "a"',
      },
      {
        inputArgs: ['ab', 'a'],
        expectedOutput: false,
        inputDisplay: 's = "ab", t = "a"',
      },
      {
        inputArgs: ['aab', 'baa'],
        expectedOutput: true,
        inputDisplay: 's = "aab", t = "baa"',
      },
      {
        inputArgs: ['aacc', 'ccac'],
        expectedOutput: false,
        inputDisplay: 's = "aacc", t = "ccac"',
      },
      {
        inputArgs: ['listen', 'silent'],
        expectedOutput: true,
        inputDisplay: 's = "listen", t = "silent"',
      },
      {
        inputArgs: ['hello', 'world'],
        expectedOutput: false,
        inputDisplay: 's = "hello", t = "world"',
      },
    ],
    starterCode: {
      python: `def isAnagram(s: str, t: str) -> bool:
    pass
`,
      javascript: `function isAnagram(s, t) {

}
`,
    },
  },
  {
    problemId: 3,
    functionName: 'twoSum',
    description: `Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target, where i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

Examples:
  Input: nums = [3, 4, 5, 6], target = 7
  Output: [0, 1]

  Input: nums = [4, 5, 6], target = 10
  Output: [0, 2]

Constraints:
  - 2 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9
  - -10^9 <= target <= 10^9
  - Only one valid answer exists`,
    sampleTestCases: [
      {
        inputArgs: [[2, 7, 11, 15], 9],
        expectedOutput: [0, 1],
        inputDisplay: 'nums = [2, 7, 11, 15], target = 9',
      },
      {
        inputArgs: [[3, 2, 4], 6],
        expectedOutput: [1, 2],
        inputDisplay: 'nums = [3, 2, 4], target = 6',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[3, 3], 6],
        expectedOutput: [0, 1],
        inputDisplay: 'nums = [3, 3], target = 6',
      },
      {
        inputArgs: [[0, 4, 3, 0], 0],
        expectedOutput: [0, 3],
        inputDisplay: 'nums = [0, 4, 3, 0], target = 0',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 9],
        expectedOutput: [3, 4],
        inputDisplay: 'nums = [1, 2, 3, 4, 5], target = 9',
      },
      {
        inputArgs: [[-1, -2, -3, -4, -5], -8],
        expectedOutput: [2, 4],
        inputDisplay: 'nums = [-1, -2, -3, -4, -5], target = -8',
      },
      {
        inputArgs: [[1, 9, 2, 8], 10],
        expectedOutput: [0, 1],
        inputDisplay: 'nums = [1, 9, 2, 8], target = 10',
      },
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    pass
`,
      javascript: `function twoSum(nums, target) {

}
`,
    },
  },
  {
    problemId: 28,
    functionName: 'search',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Examples:
  Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
  Output: 4

  Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
  Output: -1

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^4 < nums[i], target < 10^4
  - All integers in nums are unique
  - nums is sorted in ascending order`,
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
  },
  {
    problemId: 99,
    functionName: 'climbStairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Examples:
  Input: n = 2
  Output: 2
  Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps

  Input: n = 3
  Output: 3
  Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step

Constraints:
  - 1 <= n <= 45`,
    sampleTestCases: [
      {
        inputArgs: [2],
        expectedOutput: 2,
        inputDisplay: 'n = 2',
      },
      {
        inputArgs: [3],
        expectedOutput: 3,
        inputDisplay: 'n = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1],
        expectedOutput: 1,
        inputDisplay: 'n = 1',
      },
      {
        inputArgs: [4],
        expectedOutput: 5,
        inputDisplay: 'n = 4',
      },
      {
        inputArgs: [5],
        expectedOutput: 8,
        inputDisplay: 'n = 5',
      },
      {
        inputArgs: [10],
        expectedOutput: 89,
        inputDisplay: 'n = 10',
      },
      {
        inputArgs: [20],
        expectedOutput: 10946,
        inputDisplay: 'n = 20',
      },
      {
        inputArgs: [45],
        expectedOutput: 1836311903,
        inputDisplay: 'n = 45',
      },
    ],
    starterCode: {
      python: `def climbStairs(n: int) -> int:
    pass
`,
      javascript: `function climbStairs(n) {

}
`,
    },
  },
];

export const problemDetailMap = new Map<number, ProblemDetail>(
  problemDetails.map((d) => [d.problemId, d])
);
