import type { ProblemDetail } from '../../types';

export const oneDDynamicProgrammingDetails: ProblemDetail[] = [
  {
    problemId: 99,
    functionName: 'climbStairs',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

Examples:
  Input: \`n = 2\`
  Output: \`2\`
  Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps

  Input: \`n = 3\`
  Output: \`3\`
  Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step

Constraints:
  - \`1 <= n <= 45\``,
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
    solutions: [
      { complexity: 'O(n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(2^n)', name: 'Naive Recursion', isBest: false, hint: 'Cache repeated subproblems or build the answer iteratively' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 35],
      generateInput: (n: number) => [n],
    },
  },
  {
    problemId: 100,
    functionName: 'minCostClimbingStairs',
    description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of the \`i\`th step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return the minimum cost to reach the top of the floor (past the last step).

Examples:
  Input: \`cost = [10, 15, 20]\`
  Output: \`15\`
  Explanation: Start at index 1, pay 15, and climb two steps to reach the top.

  Input: \`cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]\`
  Output: \`6\`

Constraints:
  - \`2 <= cost.length <= 1000\`
  - \`0 <= cost[i] <= 999\``,
    sampleTestCases: [
      {
        inputArgs: [[10, 15, 20]],
        expectedOutput: 15,
        inputDisplay: 'cost = [10, 15, 20]',
      },
      {
        inputArgs: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]],
        expectedOutput: 6,
        inputDisplay: 'cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0, 0]],
        expectedOutput: 0,
        inputDisplay: 'cost = [0, 0]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: 1,
        inputDisplay: 'cost = [1, 2]',
      },
      {
        inputArgs: [[10, 15]],
        expectedOutput: 10,
        inputDisplay: 'cost = [10, 15]',
      },
      {
        inputArgs: [[0, 1, 2, 3]],
        expectedOutput: 2,
        inputDisplay: 'cost = [0, 1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: 2,
        inputDisplay: 'cost = [1, 2, 3]',
      },
      {
        inputArgs: [[5, 5, 10, 1]],
        expectedOutput: 6,
        inputDisplay: 'cost = [5, 5, 10, 1]',
      },
    ],
    starterCode: {
      python: `def minCostClimbingStairs(cost: list[int]) -> int:
    pass
`,
      javascript: `function minCostClimbingStairs(cost) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(2^n)', name: 'Naive Recursion', isBest: false, hint: 'Many subproblems overlap — memoize or build bottom-up' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 100))],
    },
  },
  {
    problemId: 101,
    functionName: 'rob',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing all of them is that adjacent houses have security systems connected — if two adjacent houses are broken into on the same night, the police will be alerted.

Given an integer array \`nums\` representing the amount of money in each house, return the maximum amount of money you can rob tonight without alerting the police.

Examples:
  Input: \`nums = [1, 2, 3, 1]\`
  Output: \`4\`
  Explanation: Rob house 0 (money = 1) and house 2 (money = 3). Total = 1 + 3 = 4.

  Input: \`nums = [2, 7, 9, 3, 1]\`
  Output: \`12\`
  Explanation: Rob house 0 (money = 2), house 2 (money = 9) and house 4 (money = 1). Total = 2 + 9 + 1 = 12.

Constraints:
  - \`1 <= nums.length <= 100\`
  - \`0 <= nums[i] <= 400\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 1]],
        expectedOutput: 4,
        inputDisplay: 'nums = [1, 2, 3, 1]',
      },
      {
        inputArgs: [[2, 7, 9, 3, 1]],
        expectedOutput: 12,
        inputDisplay: 'nums = [2, 7, 9, 3, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0]],
        expectedOutput: 0,
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[2, 1]],
        expectedOutput: 2,
        inputDisplay: 'nums = [2, 1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: 2,
        inputDisplay: 'nums = [1, 2]',
      },
      {
        inputArgs: [[2, 1, 1, 2]],
        expectedOutput: 4,
        inputDisplay: 'nums = [2, 1, 1, 2]',
      },
      {
        inputArgs: [[1, 3, 1, 3, 100]],
        expectedOutput: 103,
        inputDisplay: 'nums = [1, 3, 1, 3, 100]',
      },
    ],
    starterCode: {
      python: `def rob(nums: list[int]) -> int:
    pass
`,
      javascript: `function rob(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(2^n)', name: 'Recursive Brute Force', isBest: false, hint: 'At each house decide to rob or skip — many choices repeat' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 400))],
    },
  },
  {
    problemId: 102,
    functionName: 'rob',
    description: `You are a professional robber planning to rob houses arranged in a circle. Each house has a certain amount of money stashed. Adjacent houses have security systems connected — robbing two adjacent houses will alert the police. Since the houses form a circle, the first house and the last house are also adjacent.

Given an integer array \`nums\` representing the amount of money in each house, return the maximum amount of money you can rob tonight without alerting the police.

Examples:
  Input: \`nums = [2, 3, 2]\`
  Output: \`3\`
  Explanation: You cannot rob house 0 and house 2 (they are adjacent in a circle). Rob house 1 for 3.

  Input: \`nums = [1, 2, 3, 1]\`
  Output: \`4\`
  Explanation: Rob house 0 (money = 1) and house 2 (money = 3). Total = 1 + 3 = 4.

Constraints:
  - \`1 <= nums.length <= 100\`
  - \`0 <= nums[i] <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 3, 2]],
        expectedOutput: 3,
        inputDisplay: 'nums = [2, 3, 2]',
      },
      {
        inputArgs: [[1, 2, 3, 1]],
        expectedOutput: 4,
        inputDisplay: 'nums = [1, 2, 3, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[2, 3]],
        expectedOutput: 3,
        inputDisplay: 'nums = [2, 3]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: 3,
        inputDisplay: 'nums = [1, 2, 3]',
      },
      {
        inputArgs: [[0, 0, 0]],
        expectedOutput: 0,
        inputDisplay: 'nums = [0, 0, 0]',
      },
      {
        inputArgs: [[1, 3, 1, 3, 100]],
        expectedOutput: 103,
        inputDisplay: 'nums = [1, 3, 1, 3, 100]',
      },
      {
        inputArgs: [[200, 3, 140, 20, 10]],
        expectedOutput: 340,
        inputDisplay: 'nums = [200, 3, 140, 20, 10]',
      },
    ],
    starterCode: {
      python: `def rob(nums: list[int]) -> int:
    pass
`,
      javascript: `function rob(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two-Pass DP', isBest: true, hint: 'Run House Robber on nums[0..n-2] and nums[1..n-1], take the max' },
      { complexity: 'O(2^n)', name: 'Recursive Brute Force', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 1000))],
    },
  },
  {
    problemId: 103,
    functionName: 'longestPalindrome',
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

A palindrome reads the same forward and backward.

Examples:
  Input: \`s = "babad"\`
  Output: \`"bab"\`
  Explanation: \`"aba"\` is also a valid answer.

  Input: \`s = "cbbd"\`
  Output: \`"bb"\`

Constraints:
  - \`1 <= s.length <= 1000\`
  - \`s\` consists of only digits and English letters`,
    sampleTestCases: [
      {
        inputArgs: ['babad'],
        expectedOutput: 'bab',
        inputDisplay: 's = "babad"',
      },
      {
        inputArgs: ['cbbd'],
        expectedOutput: 'bb',
        inputDisplay: 's = "cbbd"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a'],
        expectedOutput: 'a',
        inputDisplay: 's = "a"',
      },
      {
        inputArgs: ['bb'],
        expectedOutput: 'bb',
        inputDisplay: 's = "bb"',
      },
      {
        inputArgs: ['racecar'],
        expectedOutput: 'racecar',
        inputDisplay: 's = "racecar"',
      },
      {
        inputArgs: ['abcba'],
        expectedOutput: 'abcba',
        inputDisplay: 's = "abcba"',
      },
      {
        inputArgs: ['aaaa'],
        expectedOutput: 'aaaa',
        inputDisplay: 's = "aaaa"',
      },
      {
        inputArgs: ['aacabdkacaa'],
        expectedOutput: 'aca',
        inputDisplay: 's = "aacabdkacaa"',
      },
    ],
    starterCode: {
      python: `def longestPalindrome(s: str) -> str:
    pass
`,
      javascript: `function longestPalindrome(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: "Manacher's Algorithm", isBest: true },
      { complexity: 'O(n^2)', name: 'Expand Around Center', isBest: false, hint: 'For each index, expand outward while characters match — handle both odd and even lengths' },
      { complexity: 'O(n^2)', name: 'Dynamic Programming', isBest: false },
      { complexity: 'O(n^3)', name: 'Brute Force', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')],
    },
  },
  {
    problemId: 104,
    functionName: 'countSubstrings',
    description: `Given a string \`s\`, return the number of palindromic substrings in it.

A substring is a contiguous sequence of characters within the string. A string is a palindrome when it reads the same backward as forward.

Examples:
  Input: \`s = "abc"\`
  Output: \`3\`
  Explanation: Three palindromic substrings: "a", "b", "c".

  Input: \`s = "aaa"\`
  Output: \`6\`
  Explanation: Six palindromic substrings: "a", "a", "a", "aa", "aa", "aaa".

Constraints:
  - \`1 <= s.length <= 1000\`
  - \`s\` consists of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['abc'],
        expectedOutput: 3,
        inputDisplay: 's = "abc"',
      },
      {
        inputArgs: ['aaa'],
        expectedOutput: 6,
        inputDisplay: 's = "aaa"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a'],
        expectedOutput: 1,
        inputDisplay: 's = "a"',
      },
      {
        inputArgs: ['ab'],
        expectedOutput: 2,
        inputDisplay: 's = "ab"',
      },
      {
        inputArgs: ['aa'],
        expectedOutput: 3,
        inputDisplay: 's = "aa"',
      },
      {
        inputArgs: ['aba'],
        expectedOutput: 4,
        inputDisplay: 's = "aba"',
      },
      {
        inputArgs: ['abcba'],
        expectedOutput: 7,
        inputDisplay: 's = "abcba"',
      },
      {
        inputArgs: ['racecar'],
        expectedOutput: 10,
        inputDisplay: 's = "racecar"',
      },
    ],
    starterCode: {
      python: `def countSubstrings(s: str) -> int:
    pass
`,
      javascript: `function countSubstrings(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: "Manacher's Algorithm", isBest: true },
      { complexity: 'O(n^2)', name: 'Expand Around Center', isBest: false, hint: 'For each center (including between-character centers), expand and count while characters match' },
      { complexity: 'O(n^3)', name: 'Brute Force', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')],
    },
  },
  {
    problemId: 105,
    functionName: 'numDecodings',
    description: `A message containing letters from \`A-Z\` can be encoded into numbers using the mapping: \`'A' -> "1"\`, \`'B' -> "2"\`, ..., \`'Z' -> "26"\`.

Given a string \`s\` containing only digits, return the number of ways to decode it. A digit sequence with a leading \`0\` (like \`"06"\`) is invalid and cannot be mapped to a letter.

The answer is guaranteed to fit in a 32-bit integer.

Examples:
  Input: \`s = "12"\`
  Output: \`2\`
  Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

  Input: \`s = "226"\`
  Output: \`3\`
  Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Constraints:
  - \`1 <= s.length <= 100\`
  - \`s\` contains only digits and may contain leading zeros`,
    sampleTestCases: [
      {
        inputArgs: ['12'],
        expectedOutput: 2,
        inputDisplay: 's = "12"',
      },
      {
        inputArgs: ['226'],
        expectedOutput: 3,
        inputDisplay: 's = "226"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['0'],
        expectedOutput: 0,
        inputDisplay: 's = "0"',
      },
      {
        inputArgs: ['1'],
        expectedOutput: 1,
        inputDisplay: 's = "1"',
      },
      {
        inputArgs: ['10'],
        expectedOutput: 1,
        inputDisplay: 's = "10"',
      },
      {
        inputArgs: ['06'],
        expectedOutput: 0,
        inputDisplay: 's = "06"',
      },
      {
        inputArgs: ['11106'],
        expectedOutput: 2,
        inputDisplay: 's = "11106"',
      },
      {
        inputArgs: ['27'],
        expectedOutput: 1,
        inputDisplay: 's = "27"',
      },
    ],
    starterCode: {
      python: `def numDecodings(s: str) -> int:
    pass
`,
      javascript: `function numDecodings(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Dynamic Programming', isBest: true },
      { complexity: 'O(2^n)', name: 'Recursive Brute Force', isBest: false, hint: 'Overlapping subproblems — at each position, try taking one or two digits and recurse' },
    ],
    benchmarkConfig: {
      sizes: [10, 20, 30],
      generateInput: (n: number) => [Array.from({ length: n }, () => String(Math.floor(Math.random() * 9) + 1)).join('')],
    },
  },
  {
    problemId: 106,
    functionName: 'coinChange',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

Examples:
  Input: \`coins = [1, 2, 5]\`, \`amount = 11\`
  Output: \`3\`
  Explanation: 11 = 5 + 5 + 1

  Input: \`coins = [2]\`, \`amount = 3\`
  Output: \`-1\`

Constraints:
  - \`1 <= coins.length <= 12\`
  - \`1 <= coins[i] <= 2^31 - 1\`
  - \`0 <= amount <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 5], 11],
        expectedOutput: 3,
        inputDisplay: 'coins = [1, 2, 5], amount = 11',
      },
      {
        inputArgs: [[2], 3],
        expectedOutput: -1,
        inputDisplay: 'coins = [2], amount = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 0],
        expectedOutput: 0,
        inputDisplay: 'coins = [1], amount = 0',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: 1,
        inputDisplay: 'coins = [1], amount = 1',
      },
      {
        inputArgs: [[1], 5],
        expectedOutput: 5,
        inputDisplay: 'coins = [1], amount = 5',
      },
      {
        inputArgs: [[2], 4],
        expectedOutput: 2,
        inputDisplay: 'coins = [2], amount = 4',
      },
      {
        inputArgs: [[1, 2, 5], 100],
        expectedOutput: 20,
        inputDisplay: 'coins = [1, 2, 5], amount = 100',
      },
      {
        inputArgs: [[3, 7], 11],
        expectedOutput: -1,
        inputDisplay: 'coins = [3, 7], amount = 11',
      },
    ],
    starterCode: {
      python: `def coinChange(coins: list[int], amount: int) -> int:
    pass
`,
      javascript: `function coinChange(coins, amount) {

}
`,
    },
    solutions: [
      { complexity: 'O(n * m)', name: 'Dynamic Programming', isBest: true, hint: 'Build a DP table where dp[i] = min coins for amount i, iterating over each coin' },
      { complexity: 'O(m^n)', name: 'Recursive Brute Force', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [100, 1000, 5000],
      generateInput: (n: number) => [[1, 5, 10, 25], n],
    },
  },
  {
    problemId: 107,
    functionName: 'maxProduct',
    description: `Given an integer array \`nums\`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Examples:
  Input: \`nums = [2, 3, -2, 4]\`
  Output: \`6\`
  Explanation: [2, 3] has the largest product 6.

  Input: \`nums = [-2, 0, -1]\`
  Output: \`0\`
  Explanation: The subarray [0] has the largest product 0.

Constraints:
  - \`1 <= nums.length <= 2 * 10^4\`
  - \`-10 <= nums[i] <= 10\`
  - The product of any subarray fits in a 32-bit integer`,
    sampleTestCases: [
      {
        inputArgs: [[2, 3, -2, 4]],
        expectedOutput: 6,
        inputDisplay: 'nums = [2, 3, -2, 4]',
      },
      {
        inputArgs: [[-2, 0, -1]],
        expectedOutput: 0,
        inputDisplay: 'nums = [-2, 0, -1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[-1]],
        expectedOutput: -1,
        inputDisplay: 'nums = [-1]',
      },
      {
        inputArgs: [[0]],
        expectedOutput: 0,
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[-2, 3, -4]],
        expectedOutput: 24,
        inputDisplay: 'nums = [-2, 3, -4]',
      },
      {
        inputArgs: [[2, -5, -2, -4, 3]],
        expectedOutput: 24,
        inputDisplay: 'nums = [2, -5, -2, -4, 3]',
      },
      {
        inputArgs: [[-1, -2, -3, 0]],
        expectedOutput: 6,
        inputDisplay: 'nums = [-1, -2, -3, 0]',
      },
    ],
    starterCode: {
      python: `def maxProduct(nums: list[int]) -> int:
    pass
`,
      javascript: `function maxProduct(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Track Min/Max Product', isBest: true, hint: 'A negative number can flip the minimum product into the maximum — track both at each step' },
      { complexity: 'O(n^2)', name: 'Check All Subarrays', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 21) - 10)],
    },
  },
  {
    problemId: 108,
    functionName: 'wordBreak',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

The same word in the dictionary may be reused multiple times in the segmentation.

Examples:
  Input: \`s = "leetcode"\`, \`wordDict = ["leet", "code"]\`
  Output: \`true\`
  Explanation: "leetcode" can be segmented as "leet code".

  Input: \`s = "applepenapple"\`, \`wordDict = ["apple", "pen"]\`
  Output: \`true\`
  Explanation: "applepenapple" can be segmented as "apple pen apple". Note that "apple" is reused.

Constraints:
  - \`1 <= s.length <= 300\`
  - \`1 <= wordDict.length <= 1000\`
  - \`1 <= wordDict[i].length <= 20\`
  - \`s\` and \`wordDict[i]\` consist of only lowercase English letters
  - All the strings of \`wordDict\` are unique`,
    sampleTestCases: [
      {
        inputArgs: ['leetcode', ['leet', 'code']],
        expectedOutput: true,
        inputDisplay: 's = "leetcode", wordDict = ["leet", "code"]',
      },
      {
        inputArgs: ['applepenapple', ['apple', 'pen']],
        expectedOutput: true,
        inputDisplay: 's = "applepenapple", wordDict = ["apple", "pen"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', ['a']],
        expectedOutput: true,
        inputDisplay: 's = "a", wordDict = ["a"]',
      },
      {
        inputArgs: ['ab', ['a']],
        expectedOutput: false,
        inputDisplay: 's = "ab", wordDict = ["a"]',
      },
      {
        inputArgs: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']],
        expectedOutput: false,
        inputDisplay: 's = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]',
      },
      {
        inputArgs: ['cars', ['car', 'ca', 'rs']],
        expectedOutput: true,
        inputDisplay: 's = "cars", wordDict = ["car", "ca", "rs"]',
      },
      {
        inputArgs: ['aaaaaaa', ['aaa', 'aaaa']],
        expectedOutput: true,
        inputDisplay: 's = "aaaaaaa", wordDict = ["aaa", "aaaa"]',
      },
      {
        inputArgs: ['bb', ['a', 'b', 'bbb', 'bbbb']],
        expectedOutput: true,
        inputDisplay: 's = "bb", wordDict = ["a", "b", "bbb", "bbbb"]',
      },
    ],
    starterCode: {
      python: `def wordBreak(s: str, wordDict: list[str]) -> bool:
    pass
`,
      javascript: `function wordBreak(s, wordDict) {

}
`,
    },
    solutions: [
      { complexity: 'O(n * m * k)', name: 'Dynamic Programming', isBest: true, hint: 'dp[i] = true if s[0..i] can be segmented; for each position check all words' },
      { complexity: 'O(2^n)', name: 'Recursive Backtracking', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 1000],
      generateInput: (n: number) => [
        Array.from({ length: n }, () => 'abcdefgh'[Math.floor(Math.random() * 8)]).join(''),
        ['a', 'b', 'ab', 'cd', 'ef', 'gh', 'abc', 'efg'],
      ],
    },
  },
  {
    problemId: 109,
    functionName: 'lengthOfLIS',
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.

A subsequence is derived from an array by deleting some or no elements without changing the order of the remaining elements.

Examples:
  Input: \`nums = [10, 9, 2, 5, 3, 7, 101, 18]\`
  Output: \`4\`
  Explanation: The longest increasing subsequence is [2, 3, 7, 101], length 4.

  Input: \`nums = [0, 1, 0, 3, 2, 3]\`
  Output: \`4\`
  Explanation: The longest increasing subsequence is [0, 1, 2, 3], length 4.

Constraints:
  - \`1 <= nums.length <= 2500\`
  - \`-10^4 <= nums[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[10, 9, 2, 5, 3, 7, 101, 18]],
        expectedOutput: 4,
        inputDisplay: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]',
      },
      {
        inputArgs: [[0, 1, 0, 3, 2, 3]],
        expectedOutput: 4,
        inputDisplay: 'nums = [0, 1, 0, 3, 2, 3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[7, 7, 7, 7]],
        expectedOutput: 1,
        inputDisplay: 'nums = [7, 7, 7, 7]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 5,
        inputDisplay: 'nums = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[5, 4, 3, 2, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [5, 4, 3, 2, 1]',
      },
      {
        inputArgs: [[1, 3, 6, 7, 9, 4, 10, 5, 6]],
        expectedOutput: 6,
        inputDisplay: 'nums = [1, 3, 6, 7, 9, 4, 10, 5, 6]',
      },
      {
        inputArgs: [[2, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [2, 2]',
      },
    ],
    starterCode: {
      python: `def lengthOfLIS(nums: list[int]) -> int:
    pass
`,
      javascript: `function lengthOfLIS(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Binary Search + Patience Sorting', isBest: true, hint: 'Maintain a tails array — for each element, binary search for its position' },
      { complexity: 'O(n^2)', name: 'Dynamic Programming', isBest: false },
      { complexity: 'O(2^n)', name: 'Brute Force (all subsequences)', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * n))],
    },
  },
  {
    problemId: 110,
    functionName: 'canPartition',
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or \`false\` otherwise.

Examples:
  Input: \`nums = [1, 5, 11, 5]\`
  Output: \`true\`
  Explanation: The array can be partitioned as [1, 5, 5] and [11].

  Input: \`nums = [1, 2, 3, 5]\`
  Output: \`false\`
  Explanation: The array cannot be partitioned into equal sum subsets (total is 11, which is odd).

Constraints:
  - \`1 <= nums.length <= 200\`
  - \`1 <= nums[i] <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 5, 11, 5]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 5, 11, 5]',
      },
      {
        inputArgs: [[1, 2, 3, 5]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 2, 3, 5]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 1]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 2]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 2, 3]',
      },
      {
        inputArgs: [[3, 3, 3, 4, 5]],
        expectedOutput: true,
        inputDisplay: 'nums = [3, 3, 3, 4, 5]',
      },
      {
        inputArgs: [[1, 1, 1, 1, 1, 1, 1]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 1, 1, 1, 1, 1, 1]',
      },
      {
        inputArgs: [[2, 2, 1, 1]],
        expectedOutput: true,
        inputDisplay: 'nums = [2, 2, 1, 1]',
      },
    ],
    starterCode: {
      python: `def canPartition(nums: list[int]) -> bool:
    pass
`,
      javascript: `function canPartition(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n * sum)', name: 'DP (0/1 Knapsack)', isBest: true, hint: 'If total is odd, return false. Otherwise find if a subset sums to total/2' },
      { complexity: 'O(2^n)', name: 'Subset Enumeration', isBest: false },
    ],
    benchmarkConfig: {
      sizes: [50, 100, 200],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1)],
    },
  },
];
