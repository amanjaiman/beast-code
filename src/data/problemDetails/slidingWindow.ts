import type { ProblemDetail } from '../../types';

export const slidingWindowDetails: ProblemDetail[] = [
  {
    problemId: 15,
    functionName: 'maxProfit',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.

Examples:
  Input: \`prices = [7, 1, 5, 3, 6, 4]\`
  Output: \`5\`
  Explanation: Buy on day 2 (\`price = 1\`) and sell on day 5 (\`price = 6\`), profit = \`6 - 1 = 5\`.

  Input: \`prices = [7, 6, 4, 3, 1]\`
  Output: \`0\`
  Explanation: No profitable transaction is possible.

Constraints:
  - \`1 <= prices.length <= 10^5\`
  - \`0 <= prices[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[7, 1, 5, 3, 6, 4]],
        expectedOutput: 5,
        inputDisplay: 'prices = [7, 1, 5, 3, 6, 4]',
      },
      {
        inputArgs: [[7, 6, 4, 3, 1]],
        expectedOutput: 0,
        inputDisplay: 'prices = [7, 6, 4, 3, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2]],
        expectedOutput: 1,
        inputDisplay: 'prices = [1, 2]',
      },
      {
        inputArgs: [[2, 4, 1]],
        expectedOutput: 2,
        inputDisplay: 'prices = [2, 4, 1]',
      },
      {
        inputArgs: [[3, 3]],
        expectedOutput: 0,
        inputDisplay: 'prices = [3, 3]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 0,
        inputDisplay: 'prices = [1]',
      },
      {
        inputArgs: [[2, 1, 2, 1, 0, 1, 2]],
        expectedOutput: 2,
        inputDisplay: 'prices = [2, 1, 2, 1, 0, 1, 2]',
      },
      {
        inputArgs: [[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]],
        expectedOutput: 8,
        inputDisplay: 'prices = [1, 2, 4, 2, 5, 7, 2, 4, 9, 0]',
      },
    ],
    starterCode: {
      python: `def maxProfit(prices: list[int]) -> int:
    pass
`,
      javascript: `function maxProfit(prices) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'One Pass (Track Min)', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Track the minimum price seen so far and compute profit at each step' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 10000))],
    },
  },
  {
    problemId: 16,
    functionName: 'lengthOfLongestSubstring',
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.

A substring is a contiguous sequence of characters within a string.

Examples:
  Input: \`s = "abcabcbb"\`
  Output: \`3\`
  Explanation: The longest substring without repeating characters is \`"abc"\` with length \`3\`.

  Input: \`s = "bbbbb"\`
  Output: \`1\`
  Explanation: The longest substring without repeating characters is \`"b"\` with length \`1\`.

Constraints:
  - \`0 <= s.length <= 5 * 10^4\`
  - \`s\` consists of English letters, digits, symbols, and spaces`,
    sampleTestCases: [
      {
        inputArgs: ['abcabcbb'],
        expectedOutput: 3,
        inputDisplay: 's = "abcabcbb"',
      },
      {
        inputArgs: ['bbbbb'],
        expectedOutput: 1,
        inputDisplay: 's = "bbbbb"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['pwwkew'],
        expectedOutput: 3,
        inputDisplay: 's = "pwwkew"',
      },
      {
        inputArgs: [''],
        expectedOutput: 0,
        inputDisplay: 's = ""',
      },
      {
        inputArgs: [' '],
        expectedOutput: 1,
        inputDisplay: 's = " "',
      },
      {
        inputArgs: ['au'],
        expectedOutput: 2,
        inputDisplay: 's = "au"',
      },
      {
        inputArgs: ['dvdf'],
        expectedOutput: 3,
        inputDisplay: 's = "dvdf"',
      },
      {
        inputArgs: ['aab'],
        expectedOutput: 2,
        inputDisplay: 's = "aab"',
      },
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    pass
`,
      javascript: `function lengthOfLongestSubstring(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Sliding Window + Hash Map', isBest: true },
      { complexity: 'O(n)', name: 'Sliding Window + Set', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use a sliding window with a set to track characters' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * 26)];
        return [s];
      },
    },
  },
  {
    problemId: 17,
    functionName: 'characterReplacement',
    description: `You are given a string \`s\` consisting of only uppercase English letters and an integer \`k\`. You can choose any character and change it to any other uppercase English letter at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Examples:
  Input: \`s = "ABAB"\`, \`k = 2\`
  Output: \`4\`
  Explanation: Replace both \`'A'\`s with \`'B'\`s or vice versa.

  Input: \`s = "AABABBA"\`, \`k = 1\`
  Output: \`4\`
  Explanation: Replace the \`'B'\` at index \`3\` to get \`"AAAAABA"\`, substring \`"AAAA"\` has length \`4\`.

Constraints:
  - \`1 <= s.length <= 10^5\`
  - \`s\` consists of only uppercase English letters
  - \`0 <= k <= s.length\``,
    sampleTestCases: [
      {
        inputArgs: ['ABAB', 2],
        expectedOutput: 4,
        inputDisplay: 's = "ABAB", k = 2',
      },
      {
        inputArgs: ['AABABBA', 1],
        expectedOutput: 4,
        inputDisplay: 's = "AABABBA", k = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['ABCDE', 1],
        expectedOutput: 2,
        inputDisplay: 's = "ABCDE", k = 1',
      },
      {
        inputArgs: ['AAAA', 0],
        expectedOutput: 4,
        inputDisplay: 's = "AAAA", k = 0',
      },
      {
        inputArgs: ['AAAA', 2],
        expectedOutput: 4,
        inputDisplay: 's = "AAAA", k = 2',
      },
      {
        inputArgs: ['ABBB', 2],
        expectedOutput: 4,
        inputDisplay: 's = "ABBB", k = 2',
      },
      {
        inputArgs: ['ABAA', 1],
        expectedOutput: 4,
        inputDisplay: 's = "ABAA", k = 1',
      },
      {
        inputArgs: ['A', 0],
        expectedOutput: 1,
        inputDisplay: 's = "A", k = 0',
      },
    ],
    starterCode: {
      python: `def characterReplacement(s: str, k: int) -> int:
    pass
`,
      javascript: `function characterReplacement(s, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Sliding Window', isBest: true },
      { complexity: 'O(26 * n)', name: 'Binary Search + Frequency', isBest: false, hint: 'Use a sliding window tracking the most frequent character in the window' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Expand a window while replacements needed <= k' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * 26)];
        return [s, Math.floor(n / 4)];
      },
    },
  },
  {
    problemId: 18,
    functionName: 'checkInclusion',
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is a substring of \`s2\`.

Examples:
  Input: \`s1 = "ab"\`, \`s2 = "eidbaooo"\`
  Output: \`true\`
  Explanation: \`s2\` contains one permutation of \`s1\` (\`"ba"\`).

  Input: \`s1 = "ab"\`, \`s2 = "eidboaoo"\`
  Output: \`false\`

Constraints:
  - \`1 <= s1.length, s2.length <= 10^4\`
  - \`s1\` and \`s2\` consist of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['ab', 'eidbaooo'],
        expectedOutput: true,
        inputDisplay: 's1 = "ab", s2 = "eidbaooo"',
      },
      {
        inputArgs: ['ab', 'eidboaoo'],
        expectedOutput: false,
        inputDisplay: 's1 = "ab", s2 = "eidboaoo"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'a'],
        expectedOutput: true,
        inputDisplay: 's1 = "a", s2 = "a"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: false,
        inputDisplay: 's1 = "a", s2 = "b"',
      },
      {
        inputArgs: ['abc', 'bbbca'],
        expectedOutput: true,
        inputDisplay: 's1 = "abc", s2 = "bbbca"',
      },
      {
        inputArgs: ['adc', 'dcda'],
        expectedOutput: true,
        inputDisplay: 's1 = "adc", s2 = "dcda"',
      },
      {
        inputArgs: ['abc', 'ccccbbbbaaaa'],
        expectedOutput: false,
        inputDisplay: 's1 = "abc", s2 = "ccccbbbbaaaa"',
      },
      {
        inputArgs: ['ab', 'a'],
        expectedOutput: false,
        inputDisplay: 's1 = "ab", s2 = "a"',
      },
    ],
    starterCode: {
      python: `def checkInclusion(s1: str, s2: str) -> bool:
    pass
`,
      javascript: `function checkInclusion(s1, s2) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Sliding Window + Frequency Match', isBest: true },
      { complexity: 'O(n * 26)', name: 'Sliding Window + Array Compare', isBest: false, hint: 'Track frequency matches instead of comparing full arrays each step' },
      { complexity: 'O(n * m)', name: 'Brute Force', isBest: false, hint: 'Use a fixed-size sliding window matching character frequencies' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let s1 = '';
        for (let i = 0; i < 10; i++) s1 += chars[Math.floor(Math.random() * 26)];
        let s2 = '';
        for (let i = 0; i < n; i++) s2 += chars[Math.floor(Math.random() * 26)];
        return [s1, s2];
      },
    },
  },
  {
    problemId: 19,
    functionName: 'minWindow',
    description: `Given two strings \`s\` and \`t\`, return the shortest substring of \`s\` such that every character in \`t\` (including duplicates) is included in the substring. If no such substring exists, return \`""\`.

Examples:
  Input: \`s = "ADOBECODEBANC"\`, \`t = "ABC"\`
  Output: \`"BANC"\`
  Explanation: \`"BANC"\` is the shortest substring that contains \`'A'\`, \`'B'\`, and \`'C'\`.

  Input: \`s = "a"\`, \`t = "a"\`
  Output: \`"a"\`

Constraints:
  - \`1 <= s.length, t.length <= 10^5\`
  - \`s\` and \`t\` consist of uppercase and lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['ADOBECODEBANC', 'ABC'],
        expectedOutput: 'BANC',
        inputDisplay: 's = "ADOBECODEBANC", t = "ABC"',
      },
      {
        inputArgs: ['a', 'a'],
        expectedOutput: 'a',
        inputDisplay: 's = "a", t = "a"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'aa'],
        expectedOutput: '',
        inputDisplay: 's = "a", t = "aa"',
      },
      {
        inputArgs: ['aa', 'aa'],
        expectedOutput: 'aa',
        inputDisplay: 's = "aa", t = "aa"',
      },
      {
        inputArgs: ['abc', 'ac'],
        expectedOutput: 'abc',
        inputDisplay: 's = "abc", t = "ac"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: '',
        inputDisplay: 's = "a", t = "b"',
      },
      {
        inputArgs: ['ab', 'b'],
        expectedOutput: 'b',
        inputDisplay: 's = "ab", t = "b"',
      },
      {
        inputArgs: ['bdab', 'ab'],
        expectedOutput: 'ab',
        inputDisplay: 's = "bdab", t = "ab"',
      },
    ],
    starterCode: {
      python: `def minWindow(s: str, t: str) -> str:
    pass
`,
      javascript: `function minWindow(s, t) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Sliding Window + Hash Map', isBest: true },
      { complexity: 'O(n * m)', name: 'Sliding Window + Recount', isBest: false, hint: 'Use a match counter to avoid recounting characters each step' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Expand and contract a window while tracking character counts' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * 52)];
        let t = '';
        for (let i = 0; i < Math.max(3, Math.floor(n / 50)); i++) t += chars[Math.floor(Math.random() * 52)];
        return [s, t];
      },
    },
  },
  {
    problemId: 20,
    functionName: 'maxSlidingWindow',
    description: `You are given an array of integers \`nums\` and an integer \`k\` representing the size of a sliding window. The window moves from the very left to the very right, one position at a time. Return an array containing the maximum value in each window.

Examples:
  Input: \`nums = [1, 3, -1, -3, 5, 3, 6, 7]\`, \`k = 3\`
  Output: \`[3, 3, 5, 5, 6, 7]\`
  Explanation:
    Window \`[1, 3, -1]\` -> max \`3\`
    Window \`[3, -1, -3]\` -> max \`3\`
    Window \`[-1, -3, 5]\` -> max \`5\`
    Window \`[-3, 5, 3]\` -> max \`5\`
    Window \`[5, 3, 6]\` -> max \`6\`
    Window \`[3, 6, 7]\` -> max \`7\`

  Input: \`nums = [1]\`, \`k = 1\`
  Output: \`[1]\`

Constraints:
  - \`1 <= nums.length <= 10^5\`
  - \`-10^4 <= nums[i] <= 10^4\`
  - \`1 <= k <= nums.length\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
        expectedOutput: [3, 3, 5, 5, 6, 7],
        inputDisplay: 'nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: [1],
        inputDisplay: 'nums = [1], k = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, -1], 1],
        expectedOutput: [1, -1],
        inputDisplay: 'nums = [1, -1], k = 1',
      },
      {
        inputArgs: [[9, 11], 2],
        expectedOutput: [11],
        inputDisplay: 'nums = [9, 11], k = 2',
      },
      {
        inputArgs: [[4, -2], 2],
        expectedOutput: [4],
        inputDisplay: 'nums = [4, -2], k = 2',
      },
      {
        inputArgs: [[1, 3, 1, 2, 0, 5], 3],
        expectedOutput: [3, 3, 2, 5],
        inputDisplay: 'nums = [1, 3, 1, 2, 0, 5], k = 3',
      },
      {
        inputArgs: [[7, 2, 4], 2],
        expectedOutput: [7, 4],
        inputDisplay: 'nums = [7, 2, 4], k = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 1],
        expectedOutput: [1, 2, 3, 4, 5],
        inputDisplay: 'nums = [1, 2, 3, 4, 5], k = 1',
      },
    ],
    starterCode: {
      python: `def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    pass
`,
      javascript: `function maxSlidingWindow(nums, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Monotonic Deque', isBest: true },
      { complexity: 'O(n log n)', name: 'Heap / Priority Queue', isBest: false, hint: 'A deque can track the max in O(1) per element' },
      { complexity: 'O(n * k)', name: 'Brute Force', isBest: false, hint: 'Use a monotonic deque to efficiently track the window maximum' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 20001) - 10000);
        return [nums, Math.max(1, Math.floor(n / 10))];
      },
    },
  },
];
