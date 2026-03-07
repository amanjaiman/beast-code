import type { ProblemDetail } from '../../types';

export const backtrackingDetails: ProblemDetail[] = [
  {
    problemId: 71,
    functionName: 'subsets',
    compareType: 'unorderedNestedArray',
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Examples:
  Input: \`nums = [1,2,3]\`
  Output: \`[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]\`

  Input: \`nums = [0]\`
  Output: \`[[],[0]]\`

Constraints:
  - \`1 <= nums.length <= 10\`
  - \`-10 <= nums[i] <= 10\`
  - All the numbers of \`nums\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        inputDisplay: 'nums = [1,2,3]',
      },
      {
        inputArgs: [[0]],
        expectedOutput: [[], [0]],
        inputDisplay: 'nums = [0]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: [[], [1]],
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: [[], [1], [1, 2], [2]],
        inputDisplay: 'nums = [1,2]',
      },
      {
        inputArgs: [[5, 9]],
        expectedOutput: [[], [5], [5, 9], [9]],
        inputDisplay: 'nums = [5,9]',
      },
      {
        inputArgs: [[-1, 0, 1]],
        expectedOutput: [[], [-1], [-1, 0], [-1, 0, 1], [-1, 1], [0], [0, 1], [1]],
        inputDisplay: 'nums = [-1,0,1]',
      },
      {
        inputArgs: [[1, 2, 3, 4]],
        expectedOutput: [
          [], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 4], [1, 3], [1, 3, 4], [1, 4],
          [2], [2, 3], [2, 3, 4], [2, 4], [3], [3, 4], [4],
        ],
        inputDisplay: 'nums = [1,2,3,4]',
      },
    ],
    starterCode: {
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    pass
`,
      javascript: `function subsets(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·2^n)', name: 'Backtracking', isBest: true },
      { complexity: 'O(n·2^n)', name: 'Iterative', isBest: false, hint: 'Backtracking gives a cleaner recursive structure' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 72,
    functionName: 'combinationSum',
    compareType: 'unorderedNestedArray',
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

Examples:
  Input: \`candidates = [2,3,6,7]\`, \`target = 7\`
  Output: \`[[2,2,3],[7]]\`

  Input: \`candidates = [2,3,5]\`, \`target = 8\`
  Output: \`[[2,2,2,2],[2,3,3],[3,5]]\`

Constraints:
  - \`1 <= candidates.length <= 30\`
  - \`2 <= candidates[i] <= 40\`
  - All elements of \`candidates\` are distinct
  - \`1 <= target <= 40\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 3, 6, 7], 7],
        expectedOutput: [[2, 2, 3], [7]],
        inputDisplay: 'candidates = [2,3,6,7], target = 7',
      },
      {
        inputArgs: [[2, 3, 5], 8],
        expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        inputDisplay: 'candidates = [2,3,5], target = 8',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[2], 1],
        expectedOutput: [],
        inputDisplay: 'candidates = [2], target = 1',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: [[1]],
        inputDisplay: 'candidates = [1], target = 1',
      },
      {
        inputArgs: [[1], 2],
        expectedOutput: [[1, 1]],
        inputDisplay: 'candidates = [1], target = 2',
      },
      {
        inputArgs: [[1, 2], 4],
        expectedOutput: [[1, 1, 1, 1], [1, 1, 2], [2, 2]],
        inputDisplay: 'candidates = [1,2], target = 4',
      },
      {
        inputArgs: [[3, 5, 8], 11],
        expectedOutput: [[3, 3, 5], [3, 8]],
        inputDisplay: 'candidates = [3,5,8], target = 11',
      },
    ],
    starterCode: {
      python: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    pass
`,
      javascript: `function combinationSum(candidates, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(n^(T/M))', name: 'Backtracking', isBest: true },
      { complexity: 'O(n^T)', name: 'Brute Force', isBest: false, hint: 'Avoid exploring candidates smaller than the current to prevent duplicates' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 2), n * 2],
    },
  },
  {
    problemId: 73,
    functionName: 'permute',
    compareType: 'unorderedNestedArray',
    description: `Given an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in any order.

Examples:
  Input: \`nums = [1,2,3]\`
  Output: \`[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\`

  Input: \`nums = [0,1]\`
  Output: \`[[0,1],[1,0]]\`

Constraints:
  - \`1 <= nums.length <= 6\`
  - \`-10 <= nums[i] <= 10\`
  - All the integers of \`nums\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
        inputDisplay: 'nums = [1,2,3]',
      },
      {
        inputArgs: [[0, 1]],
        expectedOutput: [[0, 1], [1, 0]],
        inputDisplay: 'nums = [0,1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: [[1]],
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[0]],
        expectedOutput: [[0]],
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: [[1, 2], [2, 1]],
        inputDisplay: 'nums = [1,2]',
      },
      {
        inputArgs: [[5, 4, 6]],
        expectedOutput: [
          [4, 5, 6], [4, 6, 5], [5, 4, 6], [5, 6, 4], [6, 4, 5], [6, 5, 4],
        ],
        inputDisplay: 'nums = [5,4,6]',
      },
    ],
    starterCode: {
      python: `def permute(nums: list[int]) -> list[list[int]]:
    pass
`,
      javascript: `function permute(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·n!)', name: 'Backtracking', isBest: true },
      { complexity: 'O(n·n!)', name: 'Iterative Insertion', isBest: false, hint: 'Backtracking is the standard approach' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 74,
    functionName: 'subsetsWithDup',
    compareType: 'unorderedNestedArray',
    description: `Given an integer array \`nums\` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Examples:
  Input: \`nums = [1,2,2]\`
  Output: \`[[],[1],[1,2],[1,2,2],[2],[2,2]]\`

  Input: \`nums = [0]\`
  Output: \`[[],[0]]\`

Constraints:
  - \`1 <= nums.length <= 10\`
  - \`-10 <= nums[i] <= 10\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 2]],
        expectedOutput: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
        inputDisplay: 'nums = [1,2,2]',
      },
      {
        inputArgs: [[0]],
        expectedOutput: [[], [0]],
        inputDisplay: 'nums = [0]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: [[], [1]],
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[1, 1]],
        expectedOutput: [[], [1], [1, 1]],
        inputDisplay: 'nums = [1,1]',
      },
      {
        inputArgs: [[1, 2, 1]],
        expectedOutput: [[], [1], [1, 1], [1, 1, 2], [1, 2], [2]],
        inputDisplay: 'nums = [1,2,1]',
      },
      {
        inputArgs: [[4, 4, 4, 1, 4]],
        expectedOutput: [
          [], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4],
          [4], [4, 4], [4, 4, 4], [4, 4, 4, 4],
        ],
        inputDisplay: 'nums = [4,4,4,1,4]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        inputDisplay: 'nums = [1,2,3]',
      },
    ],
    starterCode: {
      python: `def subsetsWithDup(nums: list[int]) -> list[list[int]]:
    pass
`,
      javascript: `function subsetsWithDup(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·2^n)', name: 'Backtracking with Skip', isBest: true },
      { complexity: 'O(n·2^n)', name: 'Iterative with Dedup', isBest: false, hint: 'Sort first, then skip duplicate elements at each level' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i % Math.ceil(n / 2)).sort((a, b) => a - b)],
    },
  },
  {
    problemId: 75,
    functionName: 'combinationSum2',
    compareType: 'unorderedNestedArray',
    description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used once in the combination. The solution set must not contain duplicate combinations.

Examples:
  Input: \`candidates = [10,1,2,7,6,1,5]\`, \`target = 8\`
  Output: \`[[1,1,6],[1,2,5],[1,7],[2,6]]\`

  Input: \`candidates = [2,5,2,1,2]\`, \`target = 5\`
  Output: \`[[1,2,2],[5]]\`

Constraints:
  - \`1 <= candidates.length <= 100\`
  - \`1 <= candidates[i] <= 50\`
  - \`1 <= target <= 30\``,
    sampleTestCases: [
      {
        inputArgs: [[10, 1, 2, 7, 6, 1, 5], 8],
        expectedOutput: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
        inputDisplay: 'candidates = [10,1,2,7,6,1,5], target = 8',
      },
      {
        inputArgs: [[2, 5, 2, 1, 2], 5],
        expectedOutput: [[1, 2, 2], [5]],
        inputDisplay: 'candidates = [2,5,2,1,2], target = 5',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: [[1]],
        inputDisplay: 'candidates = [1], target = 1',
      },
      {
        inputArgs: [[1], 2],
        expectedOutput: [],
        inputDisplay: 'candidates = [1], target = 2',
      },
      {
        inputArgs: [[1, 1, 1, 1, 1], 3],
        expectedOutput: [[1, 1, 1]],
        inputDisplay: 'candidates = [1,1,1,1,1], target = 3',
      },
      {
        inputArgs: [[2, 3, 5], 8],
        expectedOutput: [[3, 5]],
        inputDisplay: 'candidates = [2,3,5], target = 8',
      },
      {
        inputArgs: [[3, 1, 3, 5, 1, 1], 8],
        expectedOutput: [[1, 1, 1, 5], [1, 1, 3, 3], [3, 5]],
        inputDisplay: 'candidates = [3,1,3,5,1,1], target = 8',
      },
    ],
    starterCode: {
      python: `def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:
    pass
`,
      javascript: `function combinationSum2(candidates, target) {

}
`,
    },
    solutions: [
      { complexity: 'O(2^n)', name: 'Backtracking with Dedup', isBest: true },
      { complexity: 'O(n·2^n)', name: 'Backtracking + Set Filter', isBest: false, hint: 'Sort first and skip duplicates at the same depth to avoid the set' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => {
        const arr: number[] = [];
        for (let i = 0; i < n * 3; i++) arr.push(Math.floor(Math.random() * n) + 1);
        return [arr, n * 2];
      },
    },
  },
  {
    problemId: 76,
    functionName: 'exist',
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Examples:
  Input: \`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\`, \`word = "ABCCED"\`
  Output: \`true\`

  Input: \`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\`, \`word = "SEE"\`
  Output: \`true\`

Constraints:
  - \`m == board.length\`
  - \`n == board[i].length\`
  - \`1 <= m, n <= 6\`
  - \`1 <= word.length <= 15\`
  - \`board\` and \`word\` consist of only lowercase and uppercase English letters`,
    sampleTestCases: [
      {
        inputArgs: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'],
        expectedOutput: true,
        inputDisplay: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
      },
      {
        inputArgs: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'SEE'],
        expectedOutput: true,
        inputDisplay: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'],
        expectedOutput: false,
        inputDisplay: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
      },
      {
        inputArgs: [[['A']], 'A'],
        expectedOutput: true,
        inputDisplay: 'board = [["A"]], word = "A"',
      },
      {
        inputArgs: [[['A']], 'B'],
        expectedOutput: false,
        inputDisplay: 'board = [["A"]], word = "B"',
      },
      {
        inputArgs: [[['A','B'],['C','D']], 'ABDC'],
        expectedOutput: true,
        inputDisplay: 'board = [["A","B"],["C","D"]], word = "ABDC"',
      },
      {
        inputArgs: [[['A','B'],['C','D']], 'ABCD'],
        expectedOutput: false,
        inputDisplay: 'board = [["A","B"],["C","D"]], word = "ABCD"',
      },
      {
        inputArgs: [[['A','A']], 'AAA'],
        expectedOutput: false,
        inputDisplay: 'board = [["A","A"]], word = "AAA"',
      },
    ],
    starterCode: {
      python: `def exist(board: list[list[str]], word: str) -> bool:
    pass
`,
      javascript: `function exist(board, word) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n·4^L)', name: 'Backtracking', isBest: true },
      { complexity: 'O(m·n·4^L)', name: 'DFS without Pruning', isBest: false, hint: 'Prune early when the current cell does not match' },
    ],
    benchmarkConfig: {
      sizes: [4, 6, 8],
      generateInput: (n: number) => {
        const chars = 'ABCDEFGHIJ';
        const board = Array.from({ length: n }, () =>
          Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)])
        );
        let word = '';
        for (let i = 0; i < Math.min(n, 5); i++) word += chars[Math.floor(Math.random() * chars.length)];
        return [board, word];
      },
    },
  },
  {
    problemId: 77,
    functionName: 'partition',
    compareType: 'unorderedNestedArray',
    description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of \`s\`.

Examples:
  Input: \`s = "aab"\`
  Output: \`[["a","a","b"],["aa","b"]]\`

  Input: \`s = "a"\`
  Output: \`[["a"]]\`

Constraints:
  - \`1 <= s.length <= 16\`
  - \`s\` contains only lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['aab'],
        expectedOutput: [['a', 'a', 'b'], ['aa', 'b']],
        inputDisplay: 's = "aab"',
      },
      {
        inputArgs: ['a'],
        expectedOutput: [['a']],
        inputDisplay: 's = "a"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['ab'],
        expectedOutput: [['a', 'b']],
        inputDisplay: 's = "ab"',
      },
      {
        inputArgs: ['aba'],
        expectedOutput: [['a', 'b', 'a'], ['aba']],
        inputDisplay: 's = "aba"',
      },
      {
        inputArgs: ['aaa'],
        expectedOutput: [['a', 'a', 'a'], ['a', 'aa'], ['aa', 'a'], ['aaa']],
        inputDisplay: 's = "aaa"',
      },
      {
        inputArgs: ['abba'],
        expectedOutput: [['a', 'b', 'b', 'a'], ['a', 'bb', 'a'], ['abba']],
        inputDisplay: 's = "abba"',
      },
      {
        inputArgs: ['racecar'],
        expectedOutput: [
          ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
          ['r', 'a', 'cec', 'a', 'r'],
          ['r', 'aceca', 'r'],
          ['racecar'],
        ],
        inputDisplay: 's = "racecar"',
      },
    ],
    starterCode: {
      python: `def partition(s: str) -> list[list[str]]:
    pass
`,
      javascript: `function partition(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·2^n)', name: 'Backtracking', isBest: true },
      { complexity: 'O(n²·2^n)', name: 'Backtracking without DP Palindrome Check', isBest: false, hint: 'Pre-compute palindrome checks with DP to avoid repeated work' },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 10],
      generateInput: (n: number) => {
        const chars = 'abc';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return [s];
      },
    },
  },
  {
    problemId: 78,
    functionName: 'letterCombinations',
    compareType: 'unorderedArray',
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons):
  2 → abc, 3 → def, 4 → ghi, 5 → jkl, 6 → mno, 7 → pqrs, 8 → tuv, 9 → wxyz

Note that \`1\` does not map to any letters.

Examples:
  Input: \`digits = "23"\`
  Output: \`["ad","ae","af","bd","be","bf","cd","ce","cf"]\`

  Input: \`digits = ""\`
  Output: \`[]\`

Constraints:
  - \`0 <= digits.length <= 4\`
  - \`digits[i]\` is a digit in the range \`['2', '9']\``,
    sampleTestCases: [
      {
        inputArgs: ['23'],
        expectedOutput: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
        inputDisplay: 'digits = "23"',
      },
      {
        inputArgs: [''],
        expectedOutput: [],
        inputDisplay: 'digits = ""',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['2'],
        expectedOutput: ['a', 'b', 'c'],
        inputDisplay: 'digits = "2"',
      },
      {
        inputArgs: ['7'],
        expectedOutput: ['p', 'q', 'r', 's'],
        inputDisplay: 'digits = "7"',
      },
      {
        inputArgs: ['9'],
        expectedOutput: ['w', 'x', 'y', 'z'],
        inputDisplay: 'digits = "9"',
      },
      {
        inputArgs: ['79'],
        expectedOutput: [
          'pw', 'px', 'py', 'pz', 'qw', 'qx', 'qy', 'qz',
          'rw', 'rx', 'ry', 'rz', 'sw', 'sx', 'sy', 'sz',
        ],
        inputDisplay: 'digits = "79"',
      },
      {
        inputArgs: ['22'],
        expectedOutput: ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc'],
        inputDisplay: 'digits = "22"',
      },
    ],
    starterCode: {
      python: `def letterCombinations(digits: str) -> list[str]:
    pass
`,
      javascript: `function letterCombinations(digits) {

}
`,
    },
    solutions: [
      { complexity: 'O(4^n)', name: 'Backtracking', isBest: true },
      { complexity: 'O(4^n)', name: 'Iterative BFS', isBest: false, hint: 'Recursive backtracking is often cleaner for this problem' },
    ],
    benchmarkConfig: {
      sizes: [3, 5, 7],
      generateInput: (n: number) => {
        const digits = '23456789';
        let s = '';
        for (let i = 0; i < n; i++) s += digits[Math.floor(Math.random() * digits.length)];
        return [s];
      },
    },
  },
  {
    problemId: 79,
    functionName: 'solveNQueens',
    compareType: 'unorderedNestedArray',
    description: `The n-queens puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` indicate a queen and an empty space, respectively.

Examples:
  Input: \`n = 4\`
  Output: \`[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]\`

  Input: \`n = 1\`
  Output: \`[["Q"]]\`

Constraints:
  - \`1 <= n <= 9\``,
    sampleTestCases: [
      {
        inputArgs: [4],
        expectedOutput: [
          ['.Q..', '...Q', 'Q...', '..Q.'],
          ['..Q.', 'Q...', '...Q', '.Q..'],
        ],
        inputDisplay: 'n = 4',
      },
      {
        inputArgs: [1],
        expectedOutput: [['Q']],
        inputDisplay: 'n = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [2],
        expectedOutput: [],
        inputDisplay: 'n = 2',
      },
      {
        inputArgs: [3],
        expectedOutput: [],
        inputDisplay: 'n = 3',
      },
      {
        inputArgs: [5],
        expectedOutput: [
          ['Q....', '..Q..', '....Q', '.Q...', '...Q.'],
          ['Q....', '...Q.', '.Q...', '....Q', '..Q..'],
          ['.Q...', '...Q.', 'Q....', '..Q..', '....Q'],
          ['.Q...', '....Q', '..Q..', 'Q....', '...Q.'],
          ['..Q..', 'Q....', '...Q.', '.Q...', '....Q'],
          ['..Q..', '....Q', '.Q...', '...Q.', 'Q....'],
          ['...Q.', 'Q....', '..Q..', '....Q', '.Q...'],
          ['...Q.', '.Q...', '....Q', '..Q..', 'Q....'],
          ['....Q', '.Q...', '...Q.', 'Q....', '..Q..'],
          ['....Q', '..Q..', 'Q....', '...Q.', '.Q...'],
        ],
        inputDisplay: 'n = 5',
      },
    ],
    starterCode: {
      python: `def solveNQueens(n: int) -> list[list[str]]:
    pass
`,
      javascript: `function solveNQueens(n) {

}
`,
    },
    solutions: [
      { complexity: 'O(n!)', name: 'Backtracking', isBest: true },
      { complexity: 'O(n^n)', name: 'Brute Force', isBest: false, hint: 'Use column and diagonal constraints to prune branches early' },
    ],
    benchmarkConfig: {
      sizes: [4, 6, 8],
      generateInput: (n: number) => [n],
    },
  },
];
