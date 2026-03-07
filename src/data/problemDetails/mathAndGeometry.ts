import type { ProblemDetail } from '../../types';

export const mathAndGeometryDetails: ProblemDetail[] = [
  {
    problemId: 136,
    functionName: 'rotate',
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image. Rotate the image by 90 degrees clockwise. You must rotate the image in-place, modifying the input matrix directly. Do not allocate another 2D matrix.

Examples:
  Input: \`matrix = [[1,2,3],[4,5,6],[7,8,9]]\`
  Output: \`[[7,4,1],[8,5,2],[9,6,3]]\`

  Input: \`matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\`
  Output: \`[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\`

Constraints:
  - \`n == matrix.length == matrix[i].length\`
  - \`1 <= n <= 20\`
  - \`-1000 <= matrix[i][j] <= 1000\``,
    outputType: 'inPlace',
    inPlaceArgIndex: 0,
    sampleTestCases: [
      {
        inputArgs: [[[1,2,3],[4,5,6],[7,8,9]]],
        expectedOutput: [[7,4,1],[8,5,2],[9,6,3]],
        inputDisplay: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
      },
      {
        inputArgs: [[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]],
        expectedOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]],
        inputDisplay: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]]],
        expectedOutput: [[1]],
        inputDisplay: 'matrix = [[1]]',
      },
      {
        inputArgs: [[[1,2],[3,4]]],
        expectedOutput: [[3,1],[4,2]],
        inputDisplay: 'matrix = [[1,2],[3,4]]',
      },
      {
        inputArgs: [[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]],
        expectedOutput: [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]],
        inputDisplay: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]',
      },
      {
        inputArgs: [[[0,0],[0,0]]],
        expectedOutput: [[0,0],[0,0]],
        inputDisplay: 'matrix = [[0,0],[0,0]]',
      },
      {
        inputArgs: [[[-1,2],[-3,4]]],
        expectedOutput: [[-3,-1],[4,2]],
        inputDisplay: 'matrix = [[-1,2],[-3,4]]',
      },
      {
        inputArgs: [[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]],
        expectedOutput: [[21,16,11,6,1],[22,17,12,7,2],[23,18,13,8,3],[24,19,14,9,4],[25,20,15,10,5]],
        inputDisplay: 'matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]',
      },
    ],
    starterCode: {
      python: `def rotate(matrix: list[list[int]]) -> None:
    pass
`,
      javascript: `function rotate(matrix) {

}
`,
    },
    solutions: [
      { complexity: 'O(n²)', name: 'Transpose + Reverse', isBest: true },
      { complexity: 'O(n²)', name: 'Four-way Swap', isBest: true },
      { complexity: 'O(n²)', name: 'Layer-by-layer Rotation', isBest: false, hint: 'Can you simplify with transpose then reverse each row?' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i * n + j))],
    },
  },
  {
    problemId: 137,
    functionName: 'spiralOrder',
    description: `Given an \`m x n\` \`matrix\`, return all elements of the matrix in spiral order.

Examples:
  Input: \`matrix = [[1,2,3],[4,5,6],[7,8,9]]\`
  Output: \`[1,2,3,6,9,8,7,4,5]\`

  Input: \`matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\`
  Output: \`[1,2,3,4,8,12,11,10,9,5,6,7]\`

Constraints:
  - \`m == matrix.length\`
  - \`n == matrix[i].length\`
  - \`1 <= m, n <= 10\`
  - \`-100 <= matrix[i][j] <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[[1,2,3],[4,5,6],[7,8,9]]],
        expectedOutput: [1,2,3,6,9,8,7,4,5],
        inputDisplay: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
      },
      {
        inputArgs: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]],
        expectedOutput: [1,2,3,4,8,12,11,10,9,5,6,7],
        inputDisplay: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]]],
        expectedOutput: [1],
        inputDisplay: 'matrix = [[1]]',
      },
      {
        inputArgs: [[[1,2],[3,4]]],
        expectedOutput: [1,2,4,3],
        inputDisplay: 'matrix = [[1,2],[3,4]]',
      },
      {
        inputArgs: [[[1,2,3]]],
        expectedOutput: [1,2,3],
        inputDisplay: 'matrix = [[1,2,3]]',
      },
      {
        inputArgs: [[[1],[2],[3]]],
        expectedOutput: [1,2,3],
        inputDisplay: 'matrix = [[1],[2],[3]]',
      },
      {
        inputArgs: [[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]],
        expectedOutput: [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10],
        inputDisplay: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]',
      },
      {
        inputArgs: [[[1,2],[3,4],[5,6],[7,8]]],
        expectedOutput: [1,2,4,6,8,7,5,3],
        inputDisplay: 'matrix = [[1,2],[3,4],[5,6],[7,8]]',
      },
    ],
    starterCode: {
      python: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    pass
`,
      javascript: `function spiralOrder(matrix) {

}
`,
    },
    solutions: [
      { complexity: 'O(m*n)', name: 'Boundary Simulation', isBest: true },
      { complexity: 'O(m*n)', name: 'Layer-by-layer', isBest: true },
      { complexity: 'O(m*n)', name: 'Direction Array', isBest: false, hint: 'Try shrinking boundaries after each traversal' },
    ],
    benchmarkConfig: {
      sizes: [10, 100, 500],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i * n + j + 1))],
    },
  },
  {
    problemId: 138,
    functionName: 'setZeroes',
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s. You must do it in-place.

Examples:
  Input: \`matrix = [[1,1,1],[1,0,1],[1,1,1]]\`
  Output: \`[[1,0,1],[0,0,0],[1,0,1]]\`

  Input: \`matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\`
  Output: \`[[0,0,0,0],[0,4,5,0],[0,3,1,0]]\`

Constraints:
  - \`m == matrix.length\`
  - \`n == matrix[0].length\`
  - \`1 <= m, n <= 200\`
  - \`-2^31 <= matrix[i][j] <= 2^31 - 1\``,
    outputType: 'inPlace',
    inPlaceArgIndex: 0,
    sampleTestCases: [
      {
        inputArgs: [[[1,1,1],[1,0,1],[1,1,1]]],
        expectedOutput: [[1,0,1],[0,0,0],[1,0,1]],
        inputDisplay: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
      },
      {
        inputArgs: [[[0,1,2,0],[3,4,5,2],[1,3,1,5]]],
        expectedOutput: [[0,0,0,0],[0,4,5,0],[0,3,1,0]],
        inputDisplay: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]]],
        expectedOutput: [[1]],
        inputDisplay: 'matrix = [[1]]',
      },
      {
        inputArgs: [[[0]]],
        expectedOutput: [[0]],
        inputDisplay: 'matrix = [[0]]',
      },
      {
        inputArgs: [[[1,2,3],[4,0,6],[7,8,9]]],
        expectedOutput: [[1,0,3],[0,0,0],[7,0,9]],
        inputDisplay: 'matrix = [[1,2,3],[4,0,6],[7,8,9]]',
      },
      {
        inputArgs: [[[0,0,0],[0,0,0]]],
        expectedOutput: [[0,0,0],[0,0,0]],
        inputDisplay: 'matrix = [[0,0,0],[0,0,0]]',
      },
      {
        inputArgs: [[[1,2],[3,4]]],
        expectedOutput: [[1,2],[3,4]],
        inputDisplay: 'matrix = [[1,2],[3,4]]',
      },
      {
        inputArgs: [[[1,0,3],[0,5,6],[7,8,0]]],
        expectedOutput: [[0,0,0],[0,0,0],[0,0,0]],
        inputDisplay: 'matrix = [[1,0,3],[0,5,6],[7,8,0]]',
      },
    ],
    starterCode: {
      python: `def setZeroes(matrix: list[list[int]]) -> None:
    pass
`,
      javascript: `function setZeroes(matrix) {

}
`,
    },
    solutions: [
      { complexity: 'O(m*n)', name: 'First Row/Col as Markers (O(1) space)', isBest: true },
      { complexity: 'O(m*n)', name: 'Extra Sets for Rows/Cols (O(m+n) space)', isBest: false, hint: 'Can you use the matrix itself as storage?' },
      { complexity: 'O(m*n*(m+n))', name: 'Brute Force Copy', isBest: false, hint: 'Track which rows and columns need zeroing first' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i + j) % 7 === 0 ? 0 : i * n + j + 1))],
    },
  },
  {
    problemId: 139,
    functionName: 'isHappy',
    description: `Write an algorithm to determine if a number \`n\` is a happy number.

A happy number is defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals \`1\` (where it will stay), or it loops endlessly in a cycle which does not include \`1\`.
- Those numbers where the process ends in \`1\` are happy.

Return \`true\` if \`n\` is a happy number, and \`false\` if not.

Examples:
  Input: \`n = 19\`
  Output: \`true\` (1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1)

  Input: \`n = 2\`
  Output: \`false\`

Constraints:
  - \`1 <= n <= 2^31 - 1\``,
    sampleTestCases: [
      {
        inputArgs: [19],
        expectedOutput: true,
        inputDisplay: 'n = 19',
      },
      {
        inputArgs: [2],
        expectedOutput: false,
        inputDisplay: 'n = 2',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1],
        expectedOutput: true,
        inputDisplay: 'n = 1',
      },
      {
        inputArgs: [7],
        expectedOutput: true,
        inputDisplay: 'n = 7',
      },
      {
        inputArgs: [4],
        expectedOutput: false,
        inputDisplay: 'n = 4',
      },
      {
        inputArgs: [100],
        expectedOutput: true,
        inputDisplay: 'n = 100',
      },
      {
        inputArgs: [116],
        expectedOutput: false,
        inputDisplay: 'n = 116',
      },
      {
        inputArgs: [23],
        expectedOutput: true,
        inputDisplay: 'n = 23',
      },
    ],
    starterCode: {
      python: `def isHappy(n: int) -> bool:
    pass
`,
      javascript: `function isHappy(n) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Floyd Cycle Detection', isBest: true },
      { complexity: 'O(log n)', name: 'Hash Set', isBest: true },
      { complexity: 'O(log n)', name: 'Hardcoded Cycle Check', isBest: false, hint: 'Try detecting cycles with two pointers' },
    ],
    benchmarkConfig: {
      sizes: [100, 10000, 1000000],
      generateInput: (n: number) => [n],
    },
  },
  {
    problemId: 140,
    functionName: 'plusOne',
    description: `You are given a large integer represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i-th\` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s.

Increment the large integer by one and return the resulting array of digits.

Examples:
  Input: \`digits = [1,2,3]\`
  Output: \`[1,2,4]\`

  Input: \`digits = [9,9,9]\`
  Output: \`[1,0,0,0]\`

Constraints:
  - \`1 <= digits.length <= 100\`
  - \`0 <= digits[i] <= 9\`
  - \`digits\` does not contain any leading \`0\`'s`,
    sampleTestCases: [
      {
        inputArgs: [[1,2,3]],
        expectedOutput: [1,2,4],
        inputDisplay: 'digits = [1,2,3]',
      },
      {
        inputArgs: [[9,9,9]],
        expectedOutput: [1,0,0,0],
        inputDisplay: 'digits = [9,9,9]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0]],
        expectedOutput: [1],
        inputDisplay: 'digits = [0]',
      },
      {
        inputArgs: [[9]],
        expectedOutput: [1,0],
        inputDisplay: 'digits = [9]',
      },
      {
        inputArgs: [[4,3,2,1]],
        expectedOutput: [4,3,2,2],
        inputDisplay: 'digits = [4,3,2,1]',
      },
      {
        inputArgs: [[1,9,9]],
        expectedOutput: [2,0,0],
        inputDisplay: 'digits = [1,9,9]',
      },
      {
        inputArgs: [[8,9,9,9]],
        expectedOutput: [9,0,0,0],
        inputDisplay: 'digits = [8,9,9,9]',
      },
      {
        inputArgs: [[1,0,0,0]],
        expectedOutput: [1,0,0,1],
        inputDisplay: 'digits = [1,0,0,0]',
      },
    ],
    starterCode: {
      python: `def plusOne(digits: list[int]) -> list[int]:
    pass
`,
      javascript: `function plusOne(digits) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Right-to-left Carry', isBest: true },
      { complexity: 'O(n)', name: 'Convert to Number and Back', isBest: false, hint: 'This fails for very large numbers — process digits directly' },
    ],
    benchmarkConfig: {
      sizes: [100, 1000, 10000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i === 0 ? 1 : Math.floor(Math.random() * 10))],
    },
  },
  {
    problemId: 141,
    functionName: 'myPow',
    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).

Examples:
  Input: \`x = 2.00000\`, \`n = 10\`
  Output: \`1024.00000\`

  Input: \`x = 2.10000\`, \`n = 3\`
  Output: \`9.26100\`

  Input: \`x = 2.00000\`, \`n = -2\`
  Output: \`0.25000\`

Constraints:
  - \`-100.0 < x < 100.0\`
  - \`-2^31 <= n <= 2^31 - 1\`
  - \`n\` is an integer
  - Either \`x\` is not zero, or \`n > 0\`
  - \`-10^4 <= x^n <= 10^4\``,
    compareType: 'float',
    sampleTestCases: [
      {
        inputArgs: [2.0, 10],
        expectedOutput: 1024.0,
        inputDisplay: 'x = 2.00000, n = 10',
      },
      {
        inputArgs: [2.1, 3],
        expectedOutput: 9.261,
        inputDisplay: 'x = 2.10000, n = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [2.0, -2],
        expectedOutput: 0.25,
        inputDisplay: 'x = 2.00000, n = -2',
      },
      {
        inputArgs: [1.0, 1000000],
        expectedOutput: 1.0,
        inputDisplay: 'x = 1.00000, n = 1000000',
      },
      {
        inputArgs: [0.5, 2],
        expectedOutput: 0.25,
        inputDisplay: 'x = 0.50000, n = 2',
      },
      {
        inputArgs: [3.0, 0],
        expectedOutput: 1.0,
        inputDisplay: 'x = 3.00000, n = 0',
      },
      {
        inputArgs: [-2.0, 3],
        expectedOutput: -8.0,
        inputDisplay: 'x = -2.00000, n = 3',
      },
      {
        inputArgs: [-2.0, 4],
        expectedOutput: 16.0,
        inputDisplay: 'x = -2.00000, n = 4',
      },
    ],
    starterCode: {
      python: `def myPow(x: float, n: int) -> float:
    pass
`,
      javascript: `function myPow(x, n) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Binary Exponentiation (Iterative)', isBest: true },
      { complexity: 'O(log n)', name: 'Binary Exponentiation (Recursive)', isBest: true },
      { complexity: 'O(n)', name: 'Linear Multiplication', isBest: false, hint: 'Square the base and halve the exponent each step' },
    ],
    benchmarkConfig: {
      sizes: [100, 10000, 1000000],
      generateInput: (n: number) => [1.00001, n],
    },
  },
  {
    problemId: 142,
    functionName: 'multiply',
    description: `Given two non-negative integers \`num1\` and \`num2\` represented as strings, return the product of \`num1\` and \`num2\`, also represented as a string.

You must not use any built-in big integer library or convert the inputs to integer directly.

Examples:
  Input: \`num1 = "2"\`, \`num2 = "3"\`
  Output: \`"6"\`

  Input: \`num1 = "123"\`, \`num2 = "456"\`
  Output: \`"56088"\`

Constraints:
  - \`1 <= num1.length, num2.length <= 200\`
  - \`num1\` and \`num2\` consist of digits only
  - Both \`num1\` and \`num2\` do not contain any leading zero, except the number \`0\` itself`,
    sampleTestCases: [
      {
        inputArgs: ['2', '3'],
        expectedOutput: '6',
        inputDisplay: 'num1 = "2", num2 = "3"',
      },
      {
        inputArgs: ['123', '456'],
        expectedOutput: '56088',
        inputDisplay: 'num1 = "123", num2 = "456"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['0', '0'],
        expectedOutput: '0',
        inputDisplay: 'num1 = "0", num2 = "0"',
      },
      {
        inputArgs: ['1', '1'],
        expectedOutput: '1',
        inputDisplay: 'num1 = "1", num2 = "1"',
      },
      {
        inputArgs: ['999', '999'],
        expectedOutput: '998001',
        inputDisplay: 'num1 = "999", num2 = "999"',
      },
      {
        inputArgs: ['0', '52345'],
        expectedOutput: '0',
        inputDisplay: 'num1 = "0", num2 = "52345"',
      },
      {
        inputArgs: ['12', '34'],
        expectedOutput: '408',
        inputDisplay: 'num1 = "12", num2 = "34"',
      },
      {
        inputArgs: ['498828660196', '840477629533'],
        expectedOutput: '419254329864656431168468',
        inputDisplay: 'num1 = "498828660196", num2 = "840477629533"',
      },
    ],
    starterCode: {
      python: `def multiply(num1: str, num2: str) -> str:
    pass
`,
      javascript: `function multiply(num1, num2) {

}
`,
    },
    solutions: [
      { complexity: 'O(m*n)', name: 'Grade-school Multiplication', isBest: true },
      { complexity: 'O(m*n)', name: 'Position-based Product Array', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => [
        Array.from({ length: n }, () => String(Math.floor(Math.random() * 10))).join('') || '1',
        Array.from({ length: n }, () => String(Math.floor(Math.random() * 10))).join('') || '1',
      ],
    },
  },
  {
    problemId: 143,
    functionName: 'DetectSquares',
    mode: 'class',
    className: 'DetectSquares',
    description: `You are given a stream of points on the X-Y plane. Design a data structure that:

- **Adds** new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.
- Given a query point, **counts** the number of ways to choose three points from the data structure such that the three points and the query point form an **axis-aligned square** with **positive area**.

An axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.

Implement the \`DetectSquares\` class:
- \`DetectSquares()\` — Initializes the object with an empty data structure.
- \`void add(int[] point)\` — Adds a new point \`point = [x, y]\` to the data structure.
- \`int count(int[] point)\` — Counts the number of ways to form axis-aligned squares with point \`[x, y]\` as described above.

Examples:
  Input: ["DetectSquares","add","add","add","count","count","add","count"]
         [[],[3,10],[11,1],[3,1],[11,10],[14,8],[11,10],[11,10]]
  Output: [null,null,null,null,1,0,null,2]

Constraints:
  - \`point.length == 2\`
  - \`0 <= x, y <= 1000\`
  - At most \`5000\` calls total to \`add\` and \`count\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'count', 'count', 'add', 'count'],
        operationArgs: [[], [[3,10]], [[11,1]], [[3,1]], [[11,10]], [[14,8]], [[11,10]], [[11,10]]],
        expected: [null, null, null, null, 1, 0, null, 2],
        inputDisplay: '["DetectSquares","add","add","add","count","count","add","count"]\n[[],[3,10],[11,1],[3,1],[11,10],[14,8],[11,10],[11,10]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'add', 'count'],
        operationArgs: [[], [[0,0]], [[0,1]], [[1,0]], [[1,1]], [[0,0]]],
        expected: [null, null, null, null, null, 1],
        inputDisplay: '["DetectSquares","add","add","add","add","count"]\n[[],[0,0],[0,1],[1,0],[1,1],[0,0]]',
      },
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'count'],
        operationArgs: [[], [[5,5]], [[5,10]], [[10,5]], [[10,10]]],
        expected: [null, null, null, null, 1],
        inputDisplay: '["DetectSquares","add","add","add","count"]\n[[],[5,5],[5,10],[10,5],[10,10]]',
      },
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'add', 'add', 'add', 'count'],
        operationArgs: [[], [[0,0]], [[0,1]], [[1,0]], [[1,1]], [[0,1]], [[1,0]], [[0,0]]],
        expected: [null, null, null, null, null, null, null, 2],
        inputDisplay: '["DetectSquares","add","add","add","add","add","add","count"]\n[[],[0,0],[0,1],[1,0],[1,1],[0,1],[1,0],[0,0]]',
      },
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'add', 'add', 'add', 'count', 'count'],
        operationArgs: [[], [[0,0]], [[0,2]], [[2,0]], [[2,2]], [[0,1]], [[1,0]], [[0,0]], [[1,1]]],
        expected: [null, null, null, null, null, null, null, 1, 0],
        inputDisplay: '["DetectSquares","add","add","add","add","add","add","count","count"]\n[[],[0,0],[0,2],[2,0],[2,2],[0,1],[1,0],[0,0],[1,1]]',
      },
      {
        operations: ['DetectSquares', 'add', 'add', 'add', 'add', 'add', 'add', 'count', 'count'],
        operationArgs: [[], [[1,1]], [[1,3]], [[3,1]], [[3,3]], [[1,1]], [[3,3]], [[1,1]], [[3,3]]],
        expected: [null, null, null, null, null, null, null, 2, 2],
        inputDisplay: '["DetectSquares","add","add","add","add","add","add","count","count"]\n[[],[1,1],[1,3],[3,1],[3,3],[1,1],[3,3],[1,1],[3,3]]',
      },
      {
        operations: ['DetectSquares', 'count'],
        operationArgs: [[], [[5,5]]],
        expected: [null, 0],
        inputDisplay: '["DetectSquares","count"]\n[[],[5,5]]',
      },
    ],
    starterCode: {
      python: `class DetectSquares:
    def __init__(self):
        pass

    def add(self, point: list[int]) -> None:
        pass

    def count(self, point: list[int]) -> int:
        pass
`,
      javascript: `class DetectSquares {
    constructor() {
    }

    add(point) {
    }

    count(point) {
    }
}
`,
    },
    solutions: [
      { complexity: 'O(n) per count', name: 'Hash Map with Point Counts', isBest: true },
      { complexity: 'O(n²) per count', name: 'Brute Force Pair Check', isBest: false, hint: 'For each query, iterate only points with matching x or y' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)])],
    },
  },
];
