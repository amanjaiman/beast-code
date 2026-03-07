import type { ProblemDetail } from '../../types';

export const bitManipulationDetails: ProblemDetail[] = [
  {
    problemId: 144,
    functionName: 'singleNumber',
    description: `Given a non-empty array of integers \`nums\`, every element appears exactly twice except for one. Find that single element.

You must implement a solution with \`O(n)\` runtime complexity and use only \`O(1)\` extra space.

Examples:
  Input: \`nums = [2, 2, 1]\`
  Output: \`1\`

  Input: \`nums = [4, 1, 2, 1, 2]\`
  Output: \`4\`

Constraints:
  - \`1 <= nums.length <= 3 * 10^4\`
  - \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`
  - Each element appears exactly twice except for one element which appears exactly once`,
    sampleTestCases: [
      {
        inputArgs: [[2, 2, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [2, 2, 1]',
      },
      {
        inputArgs: [[4, 1, 2, 1, 2]],
        expectedOutput: 4,
        inputDisplay: 'nums = [4, 1, 2, 1, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[0, 1, 0]],
        expectedOutput: 1,
        inputDisplay: 'nums = [0, 1, 0]',
      },
      {
        inputArgs: [[-1, 1, -1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [-1, 1, -1]',
      },
      {
        inputArgs: [[5, 3, 5, 3, 7]],
        expectedOutput: 7,
        inputDisplay: 'nums = [5, 3, 5, 3, 7]',
      },
      {
        inputArgs: [[100000, 3, 100000]],
        expectedOutput: 3,
        inputDisplay: 'nums = [100000, 3, 100000]',
      },
      {
        inputArgs: [[0, 0, 42]],
        expectedOutput: 42,
        inputDisplay: 'nums = [0, 0, 42]',
      },
    ],
    starterCode: {
      python: `def singleNumber(nums: list[int]) -> int:\n    pass\n`,
      javascript: `function singleNumber(nums) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'XOR', isBest: true },
      { complexity: 'O(n)', name: 'Hash Set', isBest: false, hint: 'Can you solve it with O(1) extra space using a bitwise trick?' },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'Think about how XOR cancels out duplicate pairs' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const arr: number[] = [];
        for (let i = 0; i < n; i++) arr.push(i, i);
        arr.push(n);
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return [arr];
      },
    },
  },
  {
    problemId: 145,
    functionName: 'hammingWeight',
    description: `Given a positive integer \`n\`, return the number of set bits in its binary representation (also known as the Hamming weight).

Examples:
  Input: \`n = 11\`
  Output: \`3\`
  Explanation: The binary representation of \`11\` is \`1011\`, which has \`3\` set bits.

  Input: \`n = 128\`
  Output: \`1\`
  Explanation: The binary representation of \`128\` is \`10000000\`, which has \`1\` set bit.

Constraints:
  - \`1 <= n <= 2^31 - 1\``,
    sampleTestCases: [
      {
        inputArgs: [11],
        expectedOutput: 3,
        inputDisplay: 'n = 11',
      },
      {
        inputArgs: [128],
        expectedOutput: 1,
        inputDisplay: 'n = 128',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1],
        expectedOutput: 1,
        inputDisplay: 'n = 1',
      },
      {
        inputArgs: [7],
        expectedOutput: 3,
        inputDisplay: 'n = 7',
      },
      {
        inputArgs: [255],
        expectedOutput: 8,
        inputDisplay: 'n = 255',
      },
      {
        inputArgs: [1024],
        expectedOutput: 1,
        inputDisplay: 'n = 1024',
      },
      {
        inputArgs: [1023],
        expectedOutput: 10,
        inputDisplay: 'n = 1023',
      },
      {
        inputArgs: [2147483647],
        expectedOutput: 31,
        inputDisplay: 'n = 2147483647',
      },
    ],
    starterCode: {
      python: `def hammingWeight(n: int) -> int:\n    pass\n`,
      javascript: `function hammingWeight(n) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Brian Kernighan', isBest: true },
      { complexity: 'O(1)', name: 'Bit Shift', isBest: false, hint: 'Can you skip zero bits entirely using n & (n - 1)?' },
    ],
    benchmarkConfig: {
      sizes: [1000, 10000, 100000],
      generateInput: (n: number) => [Math.floor(Math.random() * n)],
    },
  },
  {
    problemId: 146,
    functionName: 'countBits',
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the number of \`1\`'s in the binary representation of \`i\`.

Examples:
  Input: \`n = 2\`
  Output: \`[0, 1, 1]\`
  Explanation: \`0 --> 0\`, \`1 --> 1\`, \`2 --> 10\`

  Input: \`n = 5\`
  Output: \`[0, 1, 1, 2, 1, 2]\`
  Explanation: \`0 --> 0\`, \`1 --> 1\`, \`2 --> 10\`, \`3 --> 11\`, \`4 --> 100\`, \`5 --> 101\`

Constraints:
  - \`0 <= n <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [2],
        expectedOutput: [0, 1, 1],
        inputDisplay: 'n = 2',
      },
      {
        inputArgs: [5],
        expectedOutput: [0, 1, 1, 2, 1, 2],
        inputDisplay: 'n = 5',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [0],
        expectedOutput: [0],
        inputDisplay: 'n = 0',
      },
      {
        inputArgs: [1],
        expectedOutput: [0, 1],
        inputDisplay: 'n = 1',
      },
      {
        inputArgs: [3],
        expectedOutput: [0, 1, 1, 2],
        inputDisplay: 'n = 3',
      },
      {
        inputArgs: [7],
        expectedOutput: [0, 1, 1, 2, 1, 2, 2, 3],
        inputDisplay: 'n = 7',
      },
      {
        inputArgs: [8],
        expectedOutput: [0, 1, 1, 2, 1, 2, 2, 3, 1],
        inputDisplay: 'n = 8',
      },
      {
        inputArgs: [15],
        expectedOutput: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4],
        inputDisplay: 'n = 15',
      },
    ],
    starterCode: {
      python: `def countBits(n: int) -> list[int]:\n    pass\n`,
      javascript: `function countBits(n) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'DP with Bit Manipulation', isBest: true },
      { complexity: 'O(n log n)', name: 'Count Each Number', isBest: false, hint: 'Can you use previously computed results to avoid recounting bits?' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [n],
    },
  },
  {
    problemId: 147,
    functionName: 'reverseBits',
    description: `Reverse the bits of a given 32-bit unsigned integer.

Examples:
  Input: \`n = 43261596\`
  Output: \`964176192\`
  Explanation: The binary representation of \`43261596\` is \`00000010100101000001111010011100\`, which when reversed gives \`00111001011110000010100101000000\` representing \`964176192\`.

  Input: \`n = 4294967293\`
  Output: \`3221225471\`
  Explanation: The binary representation of \`4294967293\` is \`11111111111111111111111111111101\`, which when reversed gives \`10111111111111111111111111111111\` representing \`3221225471\`.

Constraints:
  - The input is a 32-bit unsigned integer (range \`0\` to \`2^32 - 1\`)`,
    sampleTestCases: [
      {
        inputArgs: [43261596],
        expectedOutput: 964176192,
        inputDisplay: 'n = 43261596',
      },
      {
        inputArgs: [4294967293],
        expectedOutput: 3221225471,
        inputDisplay: 'n = 4294967293',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [0],
        expectedOutput: 0,
        inputDisplay: 'n = 0',
      },
      {
        inputArgs: [1],
        expectedOutput: 2147483648,
        inputDisplay: 'n = 1',
      },
      {
        inputArgs: [2147483648],
        expectedOutput: 1,
        inputDisplay: 'n = 2147483648',
      },
      {
        inputArgs: [4294967295],
        expectedOutput: 4294967295,
        inputDisplay: 'n = 4294967295',
      },
      {
        inputArgs: [2],
        expectedOutput: 1073741824,
        inputDisplay: 'n = 2',
      },
      {
        inputArgs: [3],
        expectedOutput: 3221225472,
        inputDisplay: 'n = 3',
      },
    ],
    starterCode: {
      python: `def reverseBits(n: int) -> int:\n    pass\n`,
      javascript: `function reverseBits(n) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Bit-by-Bit Reversal', isBest: true },
      { complexity: 'O(1)', name: 'Divide and Conquer', isBest: false, hint: 'Can you swap bits in progressively larger groups?' },
    ],
    benchmarkConfig: {
      sizes: [1000, 10000, 100000],
      generateInput: () => [Math.floor(Math.random() * (2 ** 32))],
    },
  },
  {
    problemId: 148,
    functionName: 'missingNumber',
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.

Examples:
  Input: \`nums = [3, 0, 1]\`
  Output: \`2\`

  Input: \`nums = [0, 1]\`
  Output: \`2\`

Constraints:
  - \`n == nums.length\`
  - \`1 <= n <= 10^4\`
  - \`0 <= nums[i] <= n\`
  - All numbers in \`nums\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [[3, 0, 1]],
        expectedOutput: 2,
        inputDisplay: 'nums = [3, 0, 1]',
      },
      {
        inputArgs: [[0, 1]],
        expectedOutput: 2,
        inputDisplay: 'nums = [0, 1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0]],
        expectedOutput: 1,
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 0,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
        expectedOutput: 8,
        inputDisplay: 'nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]',
      },
      {
        inputArgs: [[0, 1, 2, 3]],
        expectedOutput: 4,
        inputDisplay: 'nums = [0, 1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 0,
        inputDisplay: 'nums = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[0, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [0, 2]',
      },
    ],
    starterCode: {
      python: `def missingNumber(nums: list[int]) -> int:\n    pass\n`,
      javascript: `function missingNumber(nums) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'XOR', isBest: true },
      { complexity: 'O(n)', name: 'Gauss Sum', isBest: false, hint: 'Can you solve it with bitwise operations instead of arithmetic?' },
      { complexity: 'O(n log n)', name: 'Sorting', isBest: false, hint: 'A mathematical or bitwise approach can solve this in O(n) time' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const missing = Math.floor(Math.random() * (n + 1));
        const arr: number[] = [];
        for (let i = 0; i <= n; i++) {
          if (i !== missing) arr.push(i);
        }
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return [arr];
      },
    },
  },
  {
    problemId: 149,
    functionName: 'getSum',
    description: `Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.

Examples:
  Input: \`a = 1\`, \`b = 2\`
  Output: \`3\`

  Input: \`a = 2\`, \`b = 3\`
  Output: \`5\`

Constraints:
  - \`-1000 <= a, b <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [1, 2],
        expectedOutput: 3,
        inputDisplay: 'a = 1, b = 2',
      },
      {
        inputArgs: [2, 3],
        expectedOutput: 5,
        inputDisplay: 'a = 2, b = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [0, 0],
        expectedOutput: 0,
        inputDisplay: 'a = 0, b = 0',
      },
      {
        inputArgs: [-1, 1],
        expectedOutput: 0,
        inputDisplay: 'a = -1, b = 1',
      },
      {
        inputArgs: [-1, -1],
        expectedOutput: -2,
        inputDisplay: 'a = -1, b = -1',
      },
      {
        inputArgs: [100, 200],
        expectedOutput: 300,
        inputDisplay: 'a = 100, b = 200',
      },
      {
        inputArgs: [-500, 300],
        expectedOutput: -200,
        inputDisplay: 'a = -500, b = 300',
      },
      {
        inputArgs: [1000, -1000],
        expectedOutput: 0,
        inputDisplay: 'a = 1000, b = -1000',
      },
    ],
    starterCode: {
      python: `def getSum(a: int, b: int) -> int:\n    pass\n`,
      javascript: `function getSum(a, b) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Bit Manipulation with Carry', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 1000],
      generateInput: (n: number) => {
        const a = Math.floor(Math.random() * (2 * n + 1)) - n;
        const b = Math.floor(Math.random() * (2 * n + 1)) - n;
        return [a, b];
      },
    },
  },
  {
    problemId: 150,
    functionName: 'reverse',
    description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

Examples:
  Input: \`x = 123\`
  Output: \`321\`

  Input: \`x = -123\`
  Output: \`-321\`

Constraints:
  - \`-2^31 <= x <= 2^31 - 1\``,
    sampleTestCases: [
      {
        inputArgs: [123],
        expectedOutput: 321,
        inputDisplay: 'x = 123',
      },
      {
        inputArgs: [-123],
        expectedOutput: -321,
        inputDisplay: 'x = -123',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [120],
        expectedOutput: 21,
        inputDisplay: 'x = 120',
      },
      {
        inputArgs: [0],
        expectedOutput: 0,
        inputDisplay: 'x = 0',
      },
      {
        inputArgs: [1534236469],
        expectedOutput: 0,
        inputDisplay: 'x = 1534236469',
      },
      {
        inputArgs: [-2147483648],
        expectedOutput: 0,
        inputDisplay: 'x = -2147483648',
      },
      {
        inputArgs: [10],
        expectedOutput: 1,
        inputDisplay: 'x = 10',
      },
      {
        inputArgs: [-321],
        expectedOutput: -123,
        inputDisplay: 'x = -321',
      },
    ],
    starterCode: {
      python: `def reverse(x: int) -> int:\n    pass\n`,
      javascript: `function reverse(x) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(log x)', name: 'Mathematical Digit Reversal', isBest: true },
      { complexity: 'O(log x)', name: 'String Conversion', isBest: false, hint: 'Can you reverse the digits mathematically without converting to a string?' },
    ],
    benchmarkConfig: {
      sizes: [1000, 100000, 1000000000],
      generateInput: (n: number) => [Math.floor(Math.random() * (2 * n + 1)) - n],
    },
  },
];
