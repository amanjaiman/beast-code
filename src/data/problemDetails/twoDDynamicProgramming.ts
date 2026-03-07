import type { ProblemDetail } from '../../types';

export const twoDDynamicProgrammingDetails: ProblemDetail[] = [
  {
    problemId: 111,
    functionName: 'uniquePaths',
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner (i.e., \`grid[0][0]\`). The robot tries to move to the bottom-right corner (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

Examples:
  Input: \`m = 3\`, \`n = 7\`
  Output: \`28\`

  Input: \`m = 3\`, \`n = 2\`
  Output: \`3\`
  Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Down -> Down
    2. Down -> Down -> Right
    3. Down -> Right -> Down

Constraints:
  - \`1 <= m, n <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [3, 7],
        expectedOutput: 28,
        inputDisplay: 'm = 3, n = 7',
      },
      {
        inputArgs: [3, 2],
        expectedOutput: 3,
        inputDisplay: 'm = 3, n = 2',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1, 1],
        expectedOutput: 1,
        inputDisplay: 'm = 1, n = 1',
      },
      {
        inputArgs: [1, 5],
        expectedOutput: 1,
        inputDisplay: 'm = 1, n = 5',
      },
      {
        inputArgs: [7, 3],
        expectedOutput: 28,
        inputDisplay: 'm = 7, n = 3',
      },
      {
        inputArgs: [3, 3],
        expectedOutput: 6,
        inputDisplay: 'm = 3, n = 3',
      },
      {
        inputArgs: [5, 5],
        expectedOutput: 70,
        inputDisplay: 'm = 5, n = 5',
      },
      {
        inputArgs: [10, 10],
        expectedOutput: 48620,
        inputDisplay: 'm = 10, n = 10',
      },
    ],
    starterCode: {
      python: `def uniquePaths(m: int, n: int) -> int:
    pass
`,
      javascript: `function uniquePaths(m, n) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(m * n)', name: 'Combinatorics (Math)', isBest: true, hint: 'The answer is C(m+n-2, m-1)' },
      { complexity: 'O(2^(m+n))', name: 'Naive Recursion', isBest: false, hint: 'Cache overlapping subproblems to avoid exponential blowup' },
    ],
    benchmarkConfig: {
      sizes: [10, 50, 100],
      generateInput: (n: number) => [n, n],
    },
  },
  {
    problemId: 112,
    functionName: 'longestCommonSubsequence',
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, \`"ace"\` is a subsequence of \`"abcde"\`.

Examples:
  Input: \`text1 = "abcde"\`, \`text2 = "ace"\`
  Output: \`3\`
  Explanation: The longest common subsequence is \`"ace"\` and its length is \`3\`.

  Input: \`text1 = "abc"\`, \`text2 = "abc"\`
  Output: \`3\`
  Explanation: The longest common subsequence is \`"abc"\` and its length is \`3\`.

Constraints:
  - \`1 <= text1.length, text2.length <= 1000\`
  - \`text1\` and \`text2\` consist of only lowercase English characters`,
    sampleTestCases: [
      {
        inputArgs: ['abcde', 'ace'],
        expectedOutput: 3,
        inputDisplay: 'text1 = "abcde", text2 = "ace"',
      },
      {
        inputArgs: ['abc', 'abc'],
        expectedOutput: 3,
        inputDisplay: 'text1 = "abc", text2 = "abc"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['abc', 'def'],
        expectedOutput: 0,
        inputDisplay: 'text1 = "abc", text2 = "def"',
      },
      {
        inputArgs: ['a', 'a'],
        expectedOutput: 1,
        inputDisplay: 'text1 = "a", text2 = "a"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: 0,
        inputDisplay: 'text1 = "a", text2 = "b"',
      },
      {
        inputArgs: ['abcba', 'abcbcba'],
        expectedOutput: 5,
        inputDisplay: 'text1 = "abcba", text2 = "abcbcba"',
      },
      {
        inputArgs: ['oxcpqrsvwf', 'shmtulqrypy'],
        expectedOutput: 2,
        inputDisplay: 'text1 = "oxcpqrsvwf", text2 = "shmtulqrypy"',
      },
      {
        inputArgs: ['abcd', 'abdc'],
        expectedOutput: 3,
        inputDisplay: 'text1 = "abcd", text2 = "abdc"',
      },
    ],
    starterCode: {
      python: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    pass
`,
      javascript: `function longestCommonSubsequence(text1, text2) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(2^(m+n))', name: 'Naive Recursion', isBest: false, hint: 'Many subproblems repeat — use memoization or build a table bottom-up' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 1000],
      generateInput: (n: number) => {
        const chars = 'abcdefghij';
        const s1 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const s2 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return [s1, s2];
      },
    },
  },
  {
    problemId: 113,
    functionName: 'maxProfit',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restriction: after you sell your stock, you cannot buy stock on the next day (i.e., cooldown of 1 day).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Examples:
  Input: \`prices = [1, 2, 3, 0, 2]\`
  Output: \`3\`
  Explanation: transactions = [buy, sell, cooldown, buy, sell]

  Input: \`prices = [1]\`
  Output: \`0\`

Constraints:
  - \`1 <= prices.length <= 5000\`
  - \`0 <= prices[i] <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 0, 2]],
        expectedOutput: 3,
        inputDisplay: 'prices = [1, 2, 3, 0, 2]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 0,
        inputDisplay: 'prices = [1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[2, 1]],
        expectedOutput: 0,
        inputDisplay: 'prices = [2, 1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: 1,
        inputDisplay: 'prices = [1, 2]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 4,
        inputDisplay: 'prices = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[1, 4, 2]],
        expectedOutput: 3,
        inputDisplay: 'prices = [1, 4, 2]',
      },
      {
        inputArgs: [[6, 1, 3, 2, 4, 7]],
        expectedOutput: 6,
        inputDisplay: 'prices = [6, 1, 3, 2, 4, 7]',
      },
      {
        inputArgs: [[1, 2, 4]],
        expectedOutput: 3,
        inputDisplay: 'prices = [1, 2, 4]',
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
      { complexity: 'O(n)', name: 'State Machine DP', isBest: true },
      { complexity: 'O(n)', name: 'DP with Hold/Sold/Rest States', isBest: true },
      { complexity: 'O(2^n)', name: 'Brute Force Recursion', isBest: false, hint: 'Track buy/sell/cooldown states and memoize to avoid re-exploring' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 1000))],
    },
  },
  {
    problemId: 114,
    functionName: 'change',
    description: `You are given an integer \`amount\` and an array of integers \`coins\` representing coins of different denominations. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`0\`.

You may assume that you have an infinite number of each kind of coin.

Examples:
  Input: \`amount = 5\`, \`coins = [1, 2, 5]\`
  Output: \`4\`
  Explanation: there are four ways to make up the amount:
    5 = 5
    5 = 2 + 2 + 1
    5 = 2 + 1 + 1 + 1
    5 = 1 + 1 + 1 + 1 + 1

  Input: \`amount = 3\`, \`coins = [2]\`
  Output: \`0\`
  Explanation: the amount of 3 cannot be made up just with coins of 2.

Constraints:
  - \`1 <= coins.length <= 300\`
  - \`1 <= coins[i] <= 5000\`
  - \`0 <= amount <= 5000\``,
    sampleTestCases: [
      {
        inputArgs: [5, [1, 2, 5]],
        expectedOutput: 4,
        inputDisplay: 'amount = 5, coins = [1, 2, 5]',
      },
      {
        inputArgs: [3, [2]],
        expectedOutput: 0,
        inputDisplay: 'amount = 3, coins = [2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [0, [1, 2]],
        expectedOutput: 1,
        inputDisplay: 'amount = 0, coins = [1, 2]',
      },
      {
        inputArgs: [1, [1]],
        expectedOutput: 1,
        inputDisplay: 'amount = 1, coins = [1]',
      },
      {
        inputArgs: [10, [10]],
        expectedOutput: 1,
        inputDisplay: 'amount = 10, coins = [10]',
      },
      {
        inputArgs: [3, [1, 2]],
        expectedOutput: 2,
        inputDisplay: 'amount = 3, coins = [1, 2]',
      },
      {
        inputArgs: [4, [1, 2, 3]],
        expectedOutput: 4,
        inputDisplay: 'amount = 4, coins = [1, 2, 3]',
      },
      {
        inputArgs: [10, [2, 5, 3, 6]],
        expectedOutput: 5,
        inputDisplay: 'amount = 10, coins = [2, 5, 3, 6]',
      },
    ],
    starterCode: {
      python: `def change(amount: int, coins: list[int]) -> int:
    pass
`,
      javascript: `function change(amount, coins) {

}
`,
    },
    solutions: [
      { complexity: 'O(n * amount)', name: 'DP (Unbounded Knapsack)', isBest: true },
      { complexity: 'O(n * amount)', name: '2D DP Table', isBest: true, hint: 'Space can be optimized to a single 1D array' },
      { complexity: 'O(amount^n)', name: 'Brute Force Recursion', isBest: false, hint: 'Iterate coins in order and memoize to eliminate repeated counting' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [n, [1, 2, 5, 10, 25]],
    },
  },
  {
    problemId: 115,
    functionName: 'findTargetSumWays',
    description: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an expression out of \`nums\` by adding one of the symbols \`'+'\` and \`'-'\` before each integer in \`nums\` and then concatenate all the integers.

Return the number of different expressions that you can build, which evaluates to \`target\`.

Examples:
  Input: \`nums = [1, 1, 1, 1, 1]\`, \`target = 3\`
  Output: \`5\`
  Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3

  Input: \`nums = [1]\`, \`target = 1\`
  Output: \`1\`

Constraints:
  - \`1 <= nums.length <= 20\`
  - \`0 <= nums[i] <= 1000\`
  - \`0 <= sum(nums[i]) <= 1000\`
  - \`-1000 <= target <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 1, 1, 1, 1], 3],
        expectedOutput: 5,
        inputDisplay: 'nums = [1, 1, 1, 1, 1], target = 3',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: 1,
        inputDisplay: 'nums = [1], target = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 2],
        expectedOutput: 0,
        inputDisplay: 'nums = [1], target = 2',
      },
      {
        inputArgs: [[0, 0, 0, 0, 0], 0],
        expectedOutput: 32,
        inputDisplay: 'nums = [0, 0, 0, 0, 0], target = 0',
      },
      {
        inputArgs: [[1, 0], 1],
        expectedOutput: 2,
        inputDisplay: 'nums = [1, 0], target = 1',
      },
      {
        inputArgs: [[2, 1], 1],
        expectedOutput: 1,
        inputDisplay: 'nums = [2, 1], target = 1',
      },
      {
        inputArgs: [[1, 2, 1], 0],
        expectedOutput: 2,
        inputDisplay: 'nums = [1, 2, 1], target = 0',
      },
      {
        inputArgs: [[1, 1, 1, 1, 1], 5],
        expectedOutput: 1,
        inputDisplay: 'nums = [1, 1, 1, 1, 1], target = 5',
      },
    ],
    starterCode: {
      python: `def findTargetSumWays(nums: list[int], target: int) -> int:
    pass
`,
      javascript: `function findTargetSumWays(nums, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(n * sum)', name: 'DP (Subset Sum)', isBest: true },
      { complexity: 'O(n * sum)', name: 'Memoized DFS', isBest: true, hint: 'Convert to a subset sum problem for optimal DP' },
      { complexity: 'O(2^n)', name: 'Brute Force Recursion', isBest: false, hint: 'Many subproblems repeat — memoize on (index, currentSum)' },
    ],
    benchmarkConfig: {
      sizes: [10, 15, 20],
      generateInput: (n: number) => {
        const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 5));
        const target = Math.floor(Math.random() * n);
        return [nums, target];
      },
    },
  },
  {
    problemId: 116,
    functionName: 'isInterleave',
    description: `Given strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an interleaving of \`s1\` and \`s2\`.

An interleaving of two strings \`s\` and \`t\` is a configuration where \`s\` and \`t\` are divided into \`n\` and \`m\` substrings respectively, such that:
  - \`s = s1 + s2 + ... + sn\`
  - \`t = t1 + t2 + ... + tm\`
  - \`|n - m| <= 1\`
  - The interleaving is \`s1 + t1 + s2 + t2 + ...\` or \`t1 + s1 + t2 + s2 + ...\`

Note: \`a + b\` is the concatenation of strings \`a\` and \`b\`.

Examples:
  Input: \`s1 = "aabcc"\`, \`s2 = "dbbca"\`, \`s3 = "aadbbcbcac"\`
  Output: \`true\`

  Input: \`s1 = "aabcc"\`, \`s2 = "dbbca"\`, \`s3 = "aadbbbaccc"\`
  Output: \`false\`

Constraints:
  - \`0 <= s1.length, s2.length <= 100\`
  - \`0 <= s3.length <= 200\`
  - \`s1\`, \`s2\`, and \`s3\` consist of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['aabcc', 'dbbca', 'aadbbcbcac'],
        expectedOutput: true,
        inputDisplay: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"',
      },
      {
        inputArgs: ['aabcc', 'dbbca', 'aadbbbaccc'],
        expectedOutput: false,
        inputDisplay: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['', '', ''],
        expectedOutput: true,
        inputDisplay: 's1 = "", s2 = "", s3 = ""',
      },
      {
        inputArgs: ['a', 'b', 'ab'],
        expectedOutput: true,
        inputDisplay: 's1 = "a", s2 = "b", s3 = "ab"',
      },
      {
        inputArgs: ['a', 'b', 'ba'],
        expectedOutput: true,
        inputDisplay: 's1 = "a", s2 = "b", s3 = "ba"',
      },
      {
        inputArgs: ['a', 'b', 'a'],
        expectedOutput: false,
        inputDisplay: 's1 = "a", s2 = "b", s3 = "a"',
      },
      {
        inputArgs: ['abc', 'def', 'adbecf'],
        expectedOutput: true,
        inputDisplay: 's1 = "abc", s2 = "def", s3 = "adbecf"',
      },
      {
        inputArgs: ['abc', 'def', 'abcdef'],
        expectedOutput: true,
        inputDisplay: 's1 = "abc", s2 = "def", s3 = "abcdef"',
      },
    ],
    starterCode: {
      python: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    pass
`,
      javascript: `function isInterleave(s1, s2, s3) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(m * n)', name: 'Memoized Recursion', isBest: true, hint: 'An iterative DP table can reduce overhead' },
      { complexity: 'O(2^(m+n))', name: 'Brute Force Recursion', isBest: false, hint: 'Many (i, j) pairs are visited repeatedly — memoize them' },
    ],
    benchmarkConfig: {
      sizes: [20, 50, 100],
      generateInput: (n: number) => {
        const chars = 'abc';
        const s1 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const s2 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        let s3 = '';
        let i = 0, j = 0;
        while (i < s1.length && j < s2.length) {
          if (Math.random() < 0.5) { s3 += s1[i]; i++; } else { s3 += s2[j]; j++; }
        }
        while (i < s1.length) { s3 += s1[i]; i++; }
        while (j < s2.length) { s3 += s2[j]; j++; }
        return [s1, s2, s3];
      },
    },
  },
  {
    problemId: 117,
    functionName: 'longestIncreasingPath',
    description: `Given an \`m x n\` integers \`matrix\`, return the length of the longest increasing path in \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.

Examples:
  Input: \`matrix = [[9,9,4],[6,6,8],[2,1,1]]\`
  Output: \`4\`
  Explanation: The longest increasing path is \`[1, 2, 6, 9]\`.

  Input: \`matrix = [[3,4,5],[3,2,6],[2,2,1]]\`
  Output: \`4\`
  Explanation: The longest increasing path is \`[3, 4, 5, 6]\`. Moving diagonally is not allowed.

Constraints:
  - \`m == matrix.length\`
  - \`n == matrix[i].length\`
  - \`1 <= m, n <= 200\`
  - \`0 <= matrix[i][j] <= 2^31 - 1\``,
    sampleTestCases: [
      {
        inputArgs: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]],
        expectedOutput: 4,
        inputDisplay: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]',
      },
      {
        inputArgs: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]],
        expectedOutput: 4,
        inputDisplay: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]]],
        expectedOutput: 1,
        inputDisplay: 'matrix = [[1]]',
      },
      {
        inputArgs: [[[1, 2]]],
        expectedOutput: 2,
        inputDisplay: 'matrix = [[1,2]]',
      },
      {
        inputArgs: [[[1, 2], [3, 4]]],
        expectedOutput: 3,
        inputDisplay: 'matrix = [[1,2],[3,4]]',
      },
      {
        inputArgs: [[[3, 3, 3], [3, 3, 3]]],
        expectedOutput: 1,
        inputDisplay: 'matrix = [[3,3,3],[3,3,3]]',
      },
      {
        inputArgs: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        expectedOutput: 5,
        inputDisplay: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
      },
      {
        inputArgs: [[[7, 8, 9], [9, 7, 6], [7, 2, 3]]],
        expectedOutput: 6,
        inputDisplay: 'matrix = [[7,8,9],[9,7,6],[7,2,3]]',
      },
    ],
    starterCode: {
      python: `def longestIncreasingPath(matrix: list[list[int]]) -> int:
    pass
`,
      javascript: `function longestIncreasingPath(matrix) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'DFS + Memoization', isBest: true },
      { complexity: 'O(m * n)', name: 'Topological Sort (BFS)', isBest: true },
      { complexity: 'O(m * n * 4^(m*n))', name: 'Brute Force DFS', isBest: false, hint: 'Cache the result for each cell to avoid recomputing paths' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => {
        const matrix = Array.from({ length: n }, () =>
          Array.from({ length: n }, () => Math.floor(Math.random() * 1000))
        );
        return [matrix];
      },
    },
  },
  {
    problemId: 118,
    functionName: 'numDistinct',
    description: `Given two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.

The test cases are generated so that the answer fits on a 32-bit signed integer.

Examples:
  Input: \`s = "rabbbit"\`, \`t = "rabbit"\`
  Output: \`3\`
  Explanation: There are 3 ways you can generate \`"rabbit"\` from \`"rabbbit"\`:
    - ra**bb**b**it**
    - ra**b**b**bit**
    - rab**bb**i**t**

  Input: \`s = "babgbag"\`, \`t = "bag"\`
  Output: \`5\`
  Explanation: There are 5 ways you can generate \`"bag"\` from \`"babgbag"\`:
    - **ba**bgba**g**
    - **ba**bg**bag**
    - **b**abgb**ag**
    - ba**b**gb**ag**
    - babg**bag**

Constraints:
  - \`1 <= s.length, t.length <= 1000\`
  - \`s\` and \`t\` consist of English letters`,
    sampleTestCases: [
      {
        inputArgs: ['rabbbit', 'rabbit'],
        expectedOutput: 3,
        inputDisplay: 's = "rabbbit", t = "rabbit"',
      },
      {
        inputArgs: ['babgbag', 'bag'],
        expectedOutput: 5,
        inputDisplay: 's = "babgbag", t = "bag"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'a'],
        expectedOutput: 1,
        inputDisplay: 's = "a", t = "a"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: 0,
        inputDisplay: 's = "a", t = "b"',
      },
      {
        inputArgs: ['aaa', 'a'],
        expectedOutput: 3,
        inputDisplay: 's = "aaa", t = "a"',
      },
      {
        inputArgs: ['aaa', 'aa'],
        expectedOutput: 3,
        inputDisplay: 's = "aaa", t = "aa"',
      },
      {
        inputArgs: ['aabb', 'ab'],
        expectedOutput: 4,
        inputDisplay: 's = "aabb", t = "ab"',
      },
      {
        inputArgs: ['abc', 'def'],
        expectedOutput: 0,
        inputDisplay: 's = "abc", t = "def"',
      },
    ],
    starterCode: {
      python: `def numDistinct(s: str, t: str) -> int:
    pass
`,
      javascript: `function numDistinct(s, t) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(m * n)', name: 'Memoized Recursion', isBest: true, hint: 'An iterative 1D DP array can optimize space' },
      { complexity: 'O(2^m)', name: 'Brute Force (Enumerate Subsequences)', isBest: false, hint: 'Use DP on (i, j) positions to avoid enumerating all subsequences' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const chars = 'abcde';
        const s = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const tLen = Math.max(1, Math.floor(n / 3));
        const t = Array.from({ length: tLen }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return [s, t];
      },
    },
  },
  {
    problemId: 119,
    functionName: 'minDistance',
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
  - Insert a character
  - Delete a character
  - Replace a character

Examples:
  Input: \`word1 = "horse"\`, \`word2 = "ros"\`
  Output: \`3\`
  Explanation:
    horse -> rorse (replace 'h' with 'r')
    rorse -> rose (remove 'r')
    rose -> ros (remove 'e')

  Input: \`word1 = "intention"\`, \`word2 = "execution"\`
  Output: \`5\`
  Explanation:
    intention -> inention (remove 't')
    inention -> enention (replace 'i' with 'e')
    enention -> exention (replace 'n' with 'x')
    exention -> exection (replace 'n' with 'c')
    exection -> execution (insert 'u')

Constraints:
  - \`0 <= word1.length, word2.length <= 500\`
  - \`word1\` and \`word2\` consist of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['horse', 'ros'],
        expectedOutput: 3,
        inputDisplay: 'word1 = "horse", word2 = "ros"',
      },
      {
        inputArgs: ['intention', 'execution'],
        expectedOutput: 5,
        inputDisplay: 'word1 = "intention", word2 = "execution"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['', ''],
        expectedOutput: 0,
        inputDisplay: 'word1 = "", word2 = ""',
      },
      {
        inputArgs: ['abc', ''],
        expectedOutput: 3,
        inputDisplay: 'word1 = "abc", word2 = ""',
      },
      {
        inputArgs: ['abc', 'abc'],
        expectedOutput: 0,
        inputDisplay: 'word1 = "abc", word2 = "abc"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: 1,
        inputDisplay: 'word1 = "a", word2 = "b"',
      },
      {
        inputArgs: ['kitten', 'sitting'],
        expectedOutput: 3,
        inputDisplay: 'word1 = "kitten", word2 = "sitting"',
      },
      {
        inputArgs: ['saturday', 'sunday'],
        expectedOutput: 3,
        inputDisplay: 'word1 = "saturday", word2 = "sunday"',
      },
    ],
    starterCode: {
      python: `def minDistance(word1: str, word2: str) -> int:
    pass
`,
      javascript: `function minDistance(word1, word2) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(3^(m+n))', name: 'Brute Force Recursion', isBest: false, hint: 'Memoize on (i, j) positions to avoid recomputing subproblems' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 1000],
      generateInput: (n: number) => {
        const chars = 'abcdefghij';
        const w1 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const w2 = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return [w1, w2];
      },
    },
  },
  {
    problemId: 120,
    functionName: 'maxCoins',
    description: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by the array \`nums\`. You are asked to burst all the balloons.

If you burst the \`i\`th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

Examples:
  Input: \`nums = [3, 1, 5, 8]\`
  Output: \`167\`
  Explanation:
    nums = [3, 1, 5, 8] --> [3, 5, 8] --> [3, 8] --> [8] --> []
    coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 15 + 120 + 24 + 8 = 167

  Input: \`nums = [1, 5]\`
  Output: \`10\`

Constraints:
  - \`1 <= n <= 300\`
  - \`0 <= nums[i] <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 1, 5, 8]],
        expectedOutput: 167,
        inputDisplay: 'nums = [3, 1, 5, 8]',
      },
      {
        inputArgs: [[1, 5]],
        expectedOutput: 10,
        inputDisplay: 'nums = [1, 5]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[5]],
        expectedOutput: 5,
        inputDisplay: 'nums = [5]',
      },
      {
        inputArgs: [[2, 3]],
        expectedOutput: 9,
        inputDisplay: 'nums = [2, 3]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: 12,
        inputDisplay: 'nums = [1, 2, 3]',
      },
      {
        inputArgs: [[3, 1, 5]],
        expectedOutput: 35,
        inputDisplay: 'nums = [3, 1, 5]',
      },
      {
        inputArgs: [[1, 1, 1, 1]],
        expectedOutput: 4,
        inputDisplay: 'nums = [1, 1, 1, 1]',
      },
    ],
    starterCode: {
      python: `def maxCoins(nums: list[int]) -> int:
    pass
`,
      javascript: `function maxCoins(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n³)', name: 'Interval DP', isBest: true },
      { complexity: 'O(n³)', name: 'Memoized Recursion', isBest: true, hint: 'Think about which balloon is burst last in each interval' },
      { complexity: 'O(n! * n)', name: 'Brute Force (Try All Orders)', isBest: false, hint: 'Instead of choosing which balloon to burst first, think about which to burst last' },
    ],
    benchmarkConfig: {
      sizes: [10, 50, 100],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1)],
    },
  },
  {
    problemId: 121,
    functionName: 'isMatch',
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:

  - \`'.'\` matches any single character.
  - \`'*'\` matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Examples:
  Input: \`s = "aa"\`, \`p = "a"\`
  Output: \`false\`
  Explanation: \`"a"\` does not match the entire string \`"aa"\`.

  Input: \`s = "aa"\`, \`p = "a*"\`
  Output: \`true\`
  Explanation: \`'*'\` means zero or more of the preceding element, \`'a'\`. Therefore, by repeating \`'a'\` once, it becomes \`"aa"\`.

Constraints:
  - \`1 <= s.length <= 20\`
  - \`1 <= p.length <= 20\`
  - \`s\` contains only lowercase English letters
  - \`p\` contains only lowercase English letters, \`'.'\`, and \`'*'\`
  - It is guaranteed for each appearance of the character \`'*'\`, there will be a previous valid character to match`,
    sampleTestCases: [
      {
        inputArgs: ['aa', 'a'],
        expectedOutput: false,
        inputDisplay: 's = "aa", p = "a"',
      },
      {
        inputArgs: ['aa', 'a*'],
        expectedOutput: true,
        inputDisplay: 's = "aa", p = "a*"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'a'],
        expectedOutput: true,
        inputDisplay: 's = "a", p = "a"',
      },
      {
        inputArgs: ['a', 'b'],
        expectedOutput: false,
        inputDisplay: 's = "a", p = "b"',
      },
      {
        inputArgs: ['ab', '.*'],
        expectedOutput: true,
        inputDisplay: 's = "ab", p = ".*"',
      },
      {
        inputArgs: ['aab', 'c*a*b'],
        expectedOutput: true,
        inputDisplay: 's = "aab", p = "c*a*b"',
      },
      {
        inputArgs: ['aaa', 'a*a'],
        expectedOutput: true,
        inputDisplay: 's = "aaa", p = "a*a"',
      },
      {
        inputArgs: ['ab', '.*c'],
        expectedOutput: false,
        inputDisplay: 's = "ab", p = ".*c"',
      },
    ],
    starterCode: {
      python: `def isMatch(s: str, p: str) -> bool:
    pass
`,
      javascript: `function isMatch(s, p) {

}
`,
    },
    solutions: [
      { complexity: 'O(m * n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(m * n)', name: 'Memoized Recursion', isBest: true, hint: 'Bottom-up DP avoids recursion overhead' },
      { complexity: 'O(2^(m+n))', name: 'Brute Force Recursion', isBest: false, hint: 'Cache results of (i, j) to avoid redundant matching attempts' },
    ],
    benchmarkConfig: {
      sizes: [10, 15, 20],
      generateInput: (n: number) => {
        const chars = 'abc';
        const s = Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        let p = '';
        for (let i = 0; i < n; i++) {
          const c = chars[Math.floor(Math.random() * chars.length)];
          p += c;
          if (Math.random() < 0.3 && i < n - 1) { p += '*'; }
        }
        return [s, p];
      },
    },
  },
];
