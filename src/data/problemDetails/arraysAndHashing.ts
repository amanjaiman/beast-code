import type { ProblemDetail } from '../../types';

export const arraysAndHashingDetails: ProblemDetail[] = [
  {
    problemId: 1,
    functionName: 'containsDuplicate',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears more than once in the array, otherwise return \`false\`.

Examples:
  Input: \`nums = [1, 2, 3, 3]\`
  Output: \`true\`

  Input: \`nums = [1, 2, 3, 4]\`
  Output: \`false\`

Constraints:
  - \`1 <= nums.length <= 10^5\`
  - \`-10^9 <= nums[i] <= 10^9\``,
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
    solutions: [
      { complexity: 'O(n)', name: 'Hash Set', isBest: true },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'Can you check without sorting?' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Consider using a data structure for O(1) lookups' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i)],
    },
  },
  {
    problemId: 2,
    functionName: 'isAnagram',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.

Examples:
  Input: \`s = "anagram"\`, \`t = "nagaram"\`
  Output: \`true\`

  Input: \`s = "rat"\`, \`t = "car"\`
  Output: \`false\`

Constraints:
  - \`1 <= s.length, t.length <= 5 * 10^4\`
  - \`s\` and \`t\` consist of lowercase English letters`,
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
    solutions: [
      { complexity: 'O(n)', name: 'Frequency Count', isBest: true },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'Can you solve it without sorting?' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Try counting character frequencies' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[i % 26];
        const arr = s.split('');
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return [s, arr.join('')];
      },
    },
  },
  {
    problemId: 3,
    functionName: 'twoSum',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices \`i\` and \`j\` such that \`nums[i] + nums[j] == target\`, where \`i != j\`.

You may assume that every input has exactly one pair of indices \`i\` and \`j\` that satisfy the condition.

Return the answer with the smaller index first.

Examples:
  Input: \`nums = [3, 4, 5, 6]\`, \`target = 7\`
  Output: \`[0, 1]\`

  Input: \`nums = [4, 5, 6]\`, \`target = 10\`
  Output: \`[0, 2]\`

Constraints:
  - \`2 <= nums.length <= 10^4\`
  - \`-10^9 <= nums[i] <= 10^9\`
  - \`-10^9 <= target <= 10^9\`
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
    solutions: [
      { complexity: 'O(n)', name: 'Hash Map', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use a hash map to find complements in O(1)' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const nums = Array.from({ length: n }, (_, i) => i + 1);
        const target = nums[n - 2] + nums[n - 1];
        return [nums, target];
      },
    },
  },
  {
    problemId: 4,
    functionName: 'groupAnagrams',
    compareType: 'unorderedNestedArray',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An anagram is a string that contains the exact same characters as another string but in a different order.

Examples:
  Input: \`strs = ["eat","tea","tan","ate","nat","bat"]\`
  Output: \`[["bat"],["nat","tan"],["ate","eat","tea"]]\`

  Input: \`strs = [""]\`
  Output: \`[[""]]\`

Constraints:
  - \`1 <= strs.length <= 10^4\`
  - \`0 <= strs[i].length <= 100\`
  - \`strs[i]\` consists of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
        expectedOutput: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']],
        inputDisplay: 'strs = ["eat","tea","tan","ate","nat","bat"]',
      },
      {
        inputArgs: [['']],
        expectedOutput: [['']],
        inputDisplay: 'strs = [""]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [['a']],
        expectedOutput: [['a']],
        inputDisplay: 'strs = ["a"]',
      },
      {
        inputArgs: [['', '']],
        expectedOutput: [['', '']],
        inputDisplay: 'strs = ["",""]',
      },
      {
        inputArgs: [['abc', 'bca', 'cab', 'xyz', 'zyx']],
        expectedOutput: [['abc', 'bca', 'cab'], ['xyz', 'zyx']],
        inputDisplay: 'strs = ["abc","bca","cab","xyz","zyx"]',
      },
      {
        inputArgs: [['listen', 'silent', 'hello', 'world', 'enlist']],
        expectedOutput: [['enlist', 'listen', 'silent'], ['hello'], ['world']],
        inputDisplay: 'strs = ["listen","silent","hello","world","enlist"]',
      },
      {
        inputArgs: [['a', 'b', 'c']],
        expectedOutput: [['a'], ['b'], ['c']],
        inputDisplay: 'strs = ["a","b","c"]',
      },
      {
        inputArgs: [['dddd', 'dddd', 'dddd']],
        expectedOutput: [['dddd', 'dddd', 'dddd']],
        inputDisplay: 'strs = ["dddd","dddd","dddd"]',
      },
    ],
    starterCode: {
      python: `def groupAnagrams(strs: list[str]) -> list[list[str]]:
    pass
`,
      javascript: `function groupAnagrams(strs) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·k)', name: 'Frequency Key', isBest: true },
      { complexity: 'O(n·k log k)', name: 'Sorted Key', isBest: false, hint: 'Can you avoid sorting each string?' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const strs: string[] = [];
        const chars = 'abcdefghij';
        for (let i = 0; i < n; i++) {
          let s = '';
          const len = 3 + Math.floor(Math.random() * 5);
          for (let j = 0; j < len; j++) s += chars[Math.floor(Math.random() * chars.length)];
          strs.push(s);
        }
        return [strs];
      },
    },
  },
  {
    problemId: 5,
    functionName: 'topKFrequent',
    compareType: 'unorderedArray',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.

Examples:
  Input: \`nums = [1,1,1,2,2,3]\`, \`k = 2\`
  Output: \`[1,2]\`

  Input: \`nums = [1]\`, \`k = 1\`
  Output: \`[1]\`

Constraints:
  - \`1 <= nums.length <= 10^5\`
  - \`-10^4 <= nums[i] <= 10^4\`
  - \`k\` is in the range \`[1, number of unique elements]\`
  - The answer is guaranteed to be unique`,
    sampleTestCases: [
      {
        inputArgs: [[1, 1, 1, 2, 2, 3], 2],
        expectedOutput: [1, 2],
        inputDisplay: 'nums = [1,1,1,2,2,3], k = 2',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: [1],
        inputDisplay: 'nums = [1], k = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2], 2],
        expectedOutput: [1, 2],
        inputDisplay: 'nums = [1,2], k = 2',
      },
      {
        inputArgs: [[4, 1, -1, 2, -1, 2, 3], 2],
        expectedOutput: [-1, 2],
        inputDisplay: 'nums = [4,1,-1,2,-1,2,3], k = 2',
      },
      {
        inputArgs: [[3, 0, 1, 0], 1],
        expectedOutput: [0],
        inputDisplay: 'nums = [3,0,1,0], k = 1',
      },
      {
        inputArgs: [[5, 3, 1, 1, 1, 3, 73], 2],
        expectedOutput: [1, 3],
        inputDisplay: 'nums = [5,3,1,1,1,3,73], k = 2',
      },
      {
        inputArgs: [[-1, -1], 1],
        expectedOutput: [-1],
        inputDisplay: 'nums = [-1,-1], k = 1',
      },
      {
        inputArgs: [[1, 2, 3, 1, 2, 3, 4], 3],
        expectedOutput: [1, 2, 3],
        inputDisplay: 'nums = [1,2,3,1,2,3,4], k = 3',
      },
    ],
    starterCode: {
      python: `def topKFrequent(nums: list[int], k: int) -> list[int]:
    pass
`,
      javascript: `function topKFrequent(nums, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Bucket Sort', isBest: true },
      { complexity: 'O(n log k)', name: 'Heap', isBest: false, hint: 'Can you solve it in O(n) time?' },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'Try using a heap or bucket sort' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const nums: number[] = [];
        const uniqueCount = Math.max(1, Math.floor(n / 10));
        for (let i = 0; i < n; i++) {
          nums.push(Math.floor(Math.random() * uniqueCount));
        }
        return [nums, Math.min(uniqueCount, 10)];
      },
    },
  },
  {
    problemId: 6,
    functionName: 'productExceptSelf',
    description: `Given an integer array \`nums\`, return an array \`output\` where \`output[i]\` is the product of all the elements of \`nums\` except \`nums[i]\`.

Each product is guaranteed to fit in a 32-bit integer.

Solve it without using the division operator.

Examples:
  Input: \`nums = [1,2,3,4]\`
  Output: \`[24,12,8,6]\`

  Input: \`nums = [-1,1,0,-3,3]\`
  Output: \`[0,0,9,0,0]\`

Constraints:
  - \`2 <= nums.length <= 10^5\`
  - \`-30 <= nums[i] <= 30\`
  - The product of any prefix or suffix of \`nums\` fits in a 32-bit integer`,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4]],
        expectedOutput: [24, 12, 8, 6],
        inputDisplay: 'nums = [1,2,3,4]',
      },
      {
        inputArgs: [[-1, 1, 0, -3, 3]],
        expectedOutput: [0, 0, 9, 0, 0],
        inputDisplay: 'nums = [-1,1,0,-3,3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[2, 3]],
        expectedOutput: [3, 2],
        inputDisplay: 'nums = [2,3]',
      },
      {
        inputArgs: [[0, 0]],
        expectedOutput: [0, 0],
        inputDisplay: 'nums = [0,0]',
      },
      {
        inputArgs: [[1, 1, 1, 1]],
        expectedOutput: [1, 1, 1, 1],
        inputDisplay: 'nums = [1,1,1,1]',
      },
      {
        inputArgs: [[-1, -1, -1, -1]],
        expectedOutput: [-1, -1, -1, -1],
        inputDisplay: 'nums = [-1,-1,-1,-1]',
      },
      {
        inputArgs: [[2, 3, 4, 5]],
        expectedOutput: [60, 40, 30, 24],
        inputDisplay: 'nums = [2,3,4,5]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: [120, 60, 40, 30, 24],
        inputDisplay: 'nums = [1,2,3,4,5]',
      },
    ],
    starterCode: {
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    pass
`,
      javascript: `function productExceptSelf(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Prefix & Suffix', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use prefix and suffix products to avoid nested loops' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1)],
    },
  },
  {
    problemId: 7,
    functionName: 'isValidSudoku',
    description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits \`1-9\` without repetition.
2. Each column must contain the digits \`1-9\` without repetition.
3. Each of the nine \`3 x 3\` sub-boxes must contain the digits \`1-9\` without repetition.

A Sudoku board may be partially filled, where empty cells are represented by \`'.'\`.

Examples:
  Input: A partially filled valid board
  Output: \`true\`

  Input: A board with duplicate \`8\` in the first column and top-left box
  Output: \`false\`

Constraints:
  - \`board.length == 9\`
  - \`board[i].length == 9\`
  - \`board[i][j]\` is a digit \`1-9\` or \`'.'\``,
    sampleTestCases: [
      {
        inputArgs: [[
          ['5','3','.','.','7','.','.','.','.'],
          ['6','.','.','1','9','5','.','.','.'],
          ['.','9','8','.','.','.','.','6','.'],
          ['8','.','.','.','6','.','.','.','3'],
          ['4','.','.','8','.','3','.','.','1'],
          ['7','.','.','.','2','.','.','.','6'],
          ['.','6','.','.','.','.','2','8','.'],
          ['.','.','.','4','1','9','.','.','5'],
          ['.','.','.','.','8','.','.','7','9'],
        ]],
        expectedOutput: true,
        inputDisplay: 'board = [[5,3,.,.,7,.,.,.,.],[6,.,.,1,9,5,.,.,.],[.,9,8,.,.,.,.6,.],[8,.,.,.,6,.,.,.,3],[4,.,.,8,.,3,.,.,1],[7,.,.,.,2,.,.,.,6],[.,6,.,.,.,.,2,8,.],[.,.,.,4,1,9,.,.,5],[.,.,.,.,8,.,.,7,9]]',
      },
      {
        inputArgs: [[
          ['8','3','.','.','7','.','.','.','.'],
          ['6','.','.','1','9','5','.','.','.'],
          ['.','9','8','.','.','.','.','6','.'],
          ['8','.','.','.','6','.','.','.','3'],
          ['4','.','.','8','.','3','.','.','1'],
          ['7','.','.','.','2','.','.','.','6'],
          ['.','6','.','.','.','.','2','8','.'],
          ['.','.','.','4','1','9','.','.','5'],
          ['.','.','.','.','8','.','.','7','9'],
        ]],
        expectedOutput: false,
        inputDisplay: 'board = [[8,3,.,.,7,.,.,.,.],[6,.,.,1,9,5,.,.,.],[.,9,8,.,.,.,.6,.],[8,.,.,.,6,.,.,.,3],[4,.,.,8,.,3,.,.,1],[7,.,.,.,2,.,.,.,6],[.,6,.,.,.,.,2,8,.],[.,.,.,4,1,9,.,.,5],[.,.,.,.,8,.,.,7,9]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],
        ]],
        expectedOutput: true,
        inputDisplay: 'board = all empty',
      },
      {
        inputArgs: [[
          ['1','1','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],
        ]],
        expectedOutput: false,
        inputDisplay: 'board = duplicate 1 in first row',
      },
      {
        inputArgs: [[
          ['1','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['1','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],
        ]],
        expectedOutput: false,
        inputDisplay: 'board = duplicate 1 in first column',
      },
      {
        inputArgs: [[
          ['1','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','1','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],
        ]],
        expectedOutput: false,
        inputDisplay: 'board = duplicate 1 in top-left 3x3 box',
      },
      {
        inputArgs: [[
          ['1','2','3','4','5','6','7','8','9'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],
        ]],
        expectedOutput: true,
        inputDisplay: 'board = single valid row',
      },
      {
        inputArgs: [[
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','1','.','.'],
          ['.','.','.','.','.','.','.','.','1'],
        ]],
        expectedOutput: false,
        inputDisplay: 'board = duplicate 1 in bottom-right 3x3 box',
      },
    ],
    starterCode: {
      python: `def isValidSudoku(board: list[list[str]]) -> bool:
    pass
`,
      javascript: `function isValidSudoku(board) {

}
`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Hash Sets', isBest: true },
      { complexity: 'O(1)', name: 'Array Flags', isBest: false, hint: 'Sets give cleaner code with the same complexity' },
    ],
    benchmarkConfig: {
      sizes: [10, 30, 50],
      generateInput: (n: number) => {
        const board = Array.from({ length: 9 }, () =>
          Array.from({ length: 9 }, () => '.')
        );
        const digits = '123456789';
        for (let i = 0; i < n; i++) {
          board[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = digits[Math.floor(Math.random() * 9)];
        }
        return [board];
      },
    },
  },
  {
    problemId: 8,
    functionName: 'encode',
    description: `Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Implement \`encode\` and \`decode\`:
  - \`encode(strs)\`: Takes a list of strings and returns a single encoded string.
  - \`decode(s)\`: Takes the encoded string and returns the original list of strings.

The algorithm must handle any valid string characters including delimiters, empty strings, etc.

Examples:
  Input: \`strs = ["hello","world"]\`
  Encode → some string → Decode
  Output: \`["hello","world"]\`

  Input: \`strs = ["we","say",":","yes"]\`
  Encode → some string → Decode
  Output: \`["we","say",":","yes"]\`

Constraints:
  - \`0 <= strs.length <= 200\`
  - \`0 <= strs[i].length <= 200\`
  - \`strs[i]\` can contain any 256 ASCII characters`,
    sampleTestCases: [
      {
        inputArgs: [['hello', 'world']],
        expectedOutput: ['hello', 'world'],
        inputDisplay: 'strs = ["hello","world"]',
      },
      {
        inputArgs: [['we', 'say', ':', 'yes']],
        expectedOutput: ['we', 'say', ':', 'yes'],
        inputDisplay: 'strs = ["we","say",":","yes"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'strs = []',
      },
      {
        inputArgs: [['']],
        expectedOutput: [''],
        inputDisplay: 'strs = [""]',
      },
      {
        inputArgs: [['', '', '']],
        expectedOutput: ['', '', ''],
        inputDisplay: 'strs = ["","",""]',
      },
      {
        inputArgs: [['a']],
        expectedOutput: ['a'],
        inputDisplay: 'strs = ["a"]',
      },
      {
        inputArgs: [['contains#special:chars!', 'and spaces too']],
        expectedOutput: ['contains#special:chars!', 'and spaces too'],
        inputDisplay: 'strs = ["contains#special:chars!","and spaces too"]',
      },
      {
        inputArgs: [['4#abc', '0#', '#']],
        expectedOutput: ['4#abc', '0#', '#'],
        inputDisplay: 'strs = ["4#abc","0#","#"]',
      },
    ],
    starterCode: {
      python: `def encode(strs: list[str]) -> str:
    pass

def decode(s: str) -> list[str]:
    pass
`,
      javascript: `function encode(strs) {

}

function decode(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Length Prefix', isBest: true },
      { complexity: 'O(n)', name: 'Delimiter with Escaping', isBest: false, hint: 'Length-prefixing avoids escaping complexity' },
    ],
    benchmarkConfig: {
      sizes: [100, 1000, 10000],
      generateInput: (n: number) => {
        const strs: string[] = [];
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < n; i++) {
          let s = '';
          const len = Math.floor(Math.random() * 20) + 1;
          for (let j = 0; j < len; j++) s += chars[Math.floor(Math.random() * 26)];
          strs.push(s);
        }
        return [strs];
      },
    },
  },
  {
    problemId: 9,
    functionName: 'longestConsecutive',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive sequence of elements.

A consecutive sequence is a sequence of elements such that each element is exactly 1 greater than the previous element. The elements do not have to be consecutive in the original array.

You must write an algorithm that runs in \`O(n)\` time.

Examples:
  Input: \`nums = [100,4,200,1,3,2]\`
  Output: \`4\` (the longest consecutive sequence is \`[1,2,3,4]\`)

  Input: \`nums = [0,3,7,2,5,8,4,6,0,1]\`
  Output: \`9\` (the sequence is \`[0,1,2,3,4,5,6,7,8]\`)

Constraints:
  - \`0 <= nums.length <= 10^5\`
  - \`-10^9 <= nums[i] <= 10^9\``,
    sampleTestCases: [
      {
        inputArgs: [[100, 4, 200, 1, 3, 2]],
        expectedOutput: 4,
        inputDisplay: 'nums = [100,4,200,1,3,2]',
      },
      {
        inputArgs: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
        expectedOutput: 9,
        inputDisplay: 'nums = [0,3,7,2,5,8,4,6,0,1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: 0,
        inputDisplay: 'nums = []',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 5,
        inputDisplay: 'nums = [1,2,3,4,5]',
      },
      {
        inputArgs: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]],
        expectedOutput: 7,
        inputDisplay: 'nums = [9,1,4,7,3,-1,0,5,8,-1,6]',
      },
      {
        inputArgs: [[1, 3, 5, 7, 9]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1,3,5,7,9]',
      },
      {
        inputArgs: [[0, 0, 0, 0]],
        expectedOutput: 1,
        inputDisplay: 'nums = [0,0,0,0]',
      },
    ],
    starterCode: {
      python: `def longestConsecutive(nums: list[int]) -> int:
    pass
`,
      javascript: `function longestConsecutive(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Hash Set', isBest: true },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'Use a set to check sequence starts in O(1)' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Consider sorting or using a hash set' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * n))],
    },
  },
];
