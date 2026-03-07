import type { ProblemDetail } from '../../types';

export const stackDetails: ProblemDetail[] = [
  {
    problemId: 21,
    functionName: 'isValid',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Examples:
  Input: \`s = "()"\`
  Output: \`true\`

  Input: \`s = "()[]{}"\`
  Output: \`true\`

  Input: \`s = "(]"\`
  Output: \`false\`

Constraints:
  - \`1 <= s.length <= 10^4\`
  - \`s\` consists of parentheses only \`'()[]{}'\``,
    sampleTestCases: [
      {
        inputArgs: ['()'],
        expectedOutput: true,
        inputDisplay: 's = "()"',
      },
      {
        inputArgs: ['()[]{}'],
        expectedOutput: true,
        inputDisplay: 's = "()[]{}"',
      },
      {
        inputArgs: ['(]'],
        expectedOutput: false,
        inputDisplay: 's = "(]"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['([])'],
        expectedOutput: true,
        inputDisplay: 's = "([])"',
      },
      {
        inputArgs: ['{[]}'],
        expectedOutput: true,
        inputDisplay: 's = "{[]}"',
      },
      {
        inputArgs: ['('],
        expectedOutput: false,
        inputDisplay: 's = "("',
      },
      {
        inputArgs: [')'],
        expectedOutput: false,
        inputDisplay: 's = ")"',
      },
      {
        inputArgs: ['((()))'],
        expectedOutput: true,
        inputDisplay: 's = "((()))"',
      },
      {
        inputArgs: ['([)]'],
        expectedOutput: false,
        inputDisplay: 's = "([)]"',
      },
      {
        inputArgs: ['{[()]}'],
        expectedOutput: true,
        inputDisplay: 's = "{[()]}"',
      },
      {
        inputArgs: [''],
        expectedOutput: true,
        inputDisplay: 's = ""',
      },
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    pass
`,
      javascript: `function isValid(s) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Stack', isBest: true },
      { complexity: 'O(n²)', name: 'Repeated Replacement', isBest: false, hint: 'Use a stack to match brackets in one pass' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const pairs = ['()', '[]', '{}'];
        let s = '';
        for (let i = 0; i < n / 2; i++) {
          const p = pairs[Math.floor(Math.random() * 3)];
          s = p[0] + s + p[1];
        }
        return [s];
      },
    },
  },
  {
    problemId: 22,
    mode: 'class',
    className: 'MinStack',
    functionName: 'MinStack',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` — Initializes the stack object.
- \`void push(int val)\` — Pushes the element \`val\` onto the stack.
- \`void pop()\` — Removes the element on the top of the stack.
- \`int top()\` — Gets the top element of the stack.
- \`int getMin()\` — Retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.

Examples:
  Input: ["MinStack","push","push","push","getMin","pop","top","getMin"]
         [[],[-2],[0],[-3],[],[],[],[]]
  Output: [null,null,null,null,-3,null,0,-2]

Constraints:
  - \`-2^31 <= val <= 2^31 - 1\`
  - Methods \`pop\`, \`top\`, and \`getMin\` will always be called on non-empty stacks
  - At most \`3 * 10^4\` calls will be made to \`push\`, \`pop\`, \`top\`, and \`getMin\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
        operationArgs: [[], [-2], [0], [-3], [], [], [], []],
        expected: [null, null, null, null, -3, null, 0, -2],
        inputDisplay: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['MinStack', 'push', 'push', 'getMin', 'pop', 'getMin'],
        operationArgs: [[], [1], [2], [], [], []],
        expected: [null, null, null, 1, null, 1],
        inputDisplay: '["MinStack","push","push","getMin","pop","getMin"]\n[[],[1],[2],[],[],[]]',
      },
      {
        operations: ['MinStack', 'push', 'push', 'push', 'top', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'top'],
        operationArgs: [[], [5], [3], [7], [], [], [], [], [], [], []],
        expected: [null, null, null, null, 7, 3, null, 3, null, 5, 5],
        inputDisplay: '["MinStack","push","push","push","top","getMin","pop","getMin","pop","getMin","top"]\n[[],[5],[3],[7],[],[],[],[],[],[],[]]',
      },
      {
        operations: ['MinStack', 'push', 'push', 'push', 'push', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'pop', 'getMin'],
        operationArgs: [[], [2], [0], [3], [0], [], [], [], [], [], [], []],
        expected: [null, null, null, null, null, 0, null, 0, null, 0, null, 2],
        inputDisplay: '["MinStack","push","push","push","push","getMin","pop","getMin","pop","getMin","pop","getMin"]\n[[],[2],[0],[3],[0],[],[],[],[],[],[],[]]',
      },
      {
        operations: ['MinStack', 'push', 'getMin', 'top', 'push', 'getMin', 'top', 'pop', 'getMin', 'top'],
        operationArgs: [[], [-1], [], [], [-2], [], [], [], [], []],
        expected: [null, null, -1, -1, null, -2, -2, null, -1, -1],
        inputDisplay: '["MinStack","push","getMin","top","push","getMin","top","pop","getMin","top"]\n[[],[-1],[],[],-2],[],[],[],[],[]]',
      },
    ],
    starterCode: {
      python: `class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass
`,
      javascript: `class MinStack {
    constructor() {
    }
    push(val) {
    }
    pop() {
    }
    top() {
    }
    getMin() {
    }
}
`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Two Stacks', isBest: true },
      { complexity: 'O(n)', name: 'Single Stack + Linear Scan', isBest: false, hint: 'Track the minimum alongside each element using a second stack' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 2001) - 1000)],
    },
  },
  {
    problemId: 23,
    functionName: 'evalRPN',
    description: `You are given an array of strings \`tokens\` that represents a valid arithmetic expression in Reverse Polish Notation.

Return the integer that represents the evaluation of the expression.

- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in reverse polish notation.
- The answer and all intermediate calculations can be represented in a 32-bit integer.

Examples:
  Input: \`tokens = ["2","1","+","3","*"]\`
  Output: \`9\` (explanation: ((2 + 1) * 3) = 9)

  Input: \`tokens = ["4","13","5","/","+"]\`
  Output: \`6\` (explanation: (4 + (13 / 5)) = 6)

  Input: \`tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]\`
  Output: \`22\`

Constraints:
  - \`1 <= tokens.length <= 10^4\`
  - \`tokens[i]\` is either an operator (\`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`) or an integer in the range \`[-200, 200]\``,
    sampleTestCases: [
      {
        inputArgs: [['2', '1', '+', '3', '*']],
        expectedOutput: 9,
        inputDisplay: 'tokens = ["2","1","+","3","*"]',
      },
      {
        inputArgs: [['4', '13', '5', '/', '+']],
        expectedOutput: 6,
        inputDisplay: 'tokens = ["4","13","5","/","+"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']],
        expectedOutput: 22,
        inputDisplay: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',
      },
      {
        inputArgs: [['3']],
        expectedOutput: 3,
        inputDisplay: 'tokens = ["3"]',
      },
      {
        inputArgs: [['5', '1', '2', '+', '4', '*', '+', '3', '-']],
        expectedOutput: 14,
        inputDisplay: 'tokens = ["5","1","2","+","4","*","+","3","-"]',
      },
      {
        inputArgs: [['6', '-3', '/']],
        expectedOutput: -2,
        inputDisplay: 'tokens = ["6","-3","/"]',
      },
      {
        inputArgs: [['7', '-3', '/']],
        expectedOutput: -2,
        inputDisplay: 'tokens = ["7","-3","/"]',
      },
      {
        inputArgs: [['18', '4', '-', '2', '/']],
        expectedOutput: 7,
        inputDisplay: 'tokens = ["18","4","-","2","/"]',
      },
    ],
    starterCode: {
      python: `def evalRPN(tokens: list[str]) -> int:
    pass
`,
      javascript: `function evalRPN(tokens) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Stack', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const tokens: string[] = [];
        const ops = ['+', '-', '*'];
        tokens.push(String(Math.floor(Math.random() * 100) + 1));
        for (let i = 1; i < n; i++) {
          tokens.push(String(Math.floor(Math.random() * 100) + 1));
          tokens.push(ops[Math.floor(Math.random() * ops.length)]);
        }
        return [tokens];
      },
    },
  },
  {
    problemId: 24,
    functionName: 'generateParenthesis',
    compareType: 'unorderedArray',
    description: `Given \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Examples:
  Input: \`n = 3\`
  Output: \`["((()))","(()())","(())()","()(())","()()()"]\`

  Input: \`n = 1\`
  Output: \`["()"]\`

Constraints:
  - \`1 <= n <= 8\``,
    sampleTestCases: [
      {
        inputArgs: [3],
        expectedOutput: ['((()))', '(()())', '(())()', '()(())', '()()()'],
        inputDisplay: 'n = 3',
      },
      {
        inputArgs: [1],
        expectedOutput: ['()'],
        inputDisplay: 'n = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [2],
        expectedOutput: ['(())', '()()'],
        inputDisplay: 'n = 2',
      },
      {
        inputArgs: [4],
        expectedOutput: [
          '(((())))', '((()()))', '((())())', '((()))()', '(()(()))',
          '(()()())', '(()())()', '(())(())', '(())()()', '()((()))',
          '()(()())', '()(())()', '()()(())', '()()()()',
        ],
        inputDisplay: 'n = 4',
      },
      {
        inputArgs: [5],
        expectedOutput: [
          '((((()))))', '(((()())))', '(((())()))', '(((()))())', '(((())))()',
          '((()(())))', '((()()()))', '((()())())', '((()()))()', '((())(()))',
          '((())()())', '((())())()', '((()))(())', '((()))()()', '(()((())))',
          '(()(()()))', '(()(())())', '(()(()))()', '(()()(()))', '(()()()())',
          '(()()())()', '(()())(())', '(()())()()', '(())((()))', '(())(()())',
          '(())(())()', '(())()(())', '(())()()()', '()(((())))', '()((()()))',
          '()((())())', '()((()))()', '()(()(()))', '()(()()())', '()(()())()',
          '()(())(())', '()(())()()', '()()((()))', '()()(()())', '()()(())()',
          '()()()(())', '()()()()()',
        ],
        inputDisplay: 'n = 5',
      },
    ],
    starterCode: {
      python: `def generateParenthesis(n: int) -> list[str]:
    pass
`,
      javascript: `function generateParenthesis(n) {

}
`,
    },
    solutions: [
      { complexity: 'O(4^n / √n)', name: 'Backtracking', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [5, 8, 11],
      generateInput: (n: number) => [n],
    },
  },
  {
    problemId: 25,
    functionName: 'dailyTemperatures',
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.

Examples:
  Input: \`temperatures = [73,74,75,71,69,72,76,73]\`
  Output: \`[1,1,4,2,1,1,0,0]\`

  Input: \`temperatures = [30,40,50,60]\`
  Output: \`[1,1,1,0]\`

  Input: \`temperatures = [30,60,90]\`
  Output: \`[1,1,0]\`

Constraints:
  - \`1 <= temperatures.length <= 10^5\`
  - \`30 <= temperatures[i] <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[73, 74, 75, 71, 69, 72, 76, 73]],
        expectedOutput: [1, 1, 4, 2, 1, 1, 0, 0],
        inputDisplay: 'temperatures = [73,74,75,71,69,72,76,73]',
      },
      {
        inputArgs: [[30, 40, 50, 60]],
        expectedOutput: [1, 1, 1, 0],
        inputDisplay: 'temperatures = [30,40,50,60]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[30, 60, 90]],
        expectedOutput: [1, 1, 0],
        inputDisplay: 'temperatures = [30,60,90]',
      },
      {
        inputArgs: [[90, 80, 70, 60]],
        expectedOutput: [0, 0, 0, 0],
        inputDisplay: 'temperatures = [90,80,70,60]',
      },
      {
        inputArgs: [[50]],
        expectedOutput: [0],
        inputDisplay: 'temperatures = [50]',
      },
      {
        inputArgs: [[55, 55, 55, 55]],
        expectedOutput: [0, 0, 0, 0],
        inputDisplay: 'temperatures = [55,55,55,55]',
      },
      {
        inputArgs: [[40, 35, 32, 37, 50]],
        expectedOutput: [4, 2, 1, 1, 0],
        inputDisplay: 'temperatures = [40,35,32,37,50]',
      },
      {
        inputArgs: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]],
        expectedOutput: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0],
        inputDisplay: 'temperatures = [89,62,70,58,47,47,46,76,100,70]',
      },
    ],
    starterCode: {
      python: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    pass
`,
      javascript: `function dailyTemperatures(temperatures) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Monotonic Stack', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use a stack to track indices of decreasing temperatures' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 71) + 30)],
    },
  },
  {
    problemId: 26,
    functionName: 'carFleet',
    description: `There are \`n\` cars at given miles away from the starting mile 0, heading to a target at \`target\` miles.

You are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the starting position of the \`i\`th car and \`speed[i]\` is the speed of the \`i\`th car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up and then travel at the same speed as the car ahead. A group of cars traveling at the same position and speed is called a car fleet.

If a car catches up to a car fleet at the exact point they reach the target, they are still considered one fleet.

Return the number of car fleets that will arrive at the destination.

Examples:
  Input: \`target = 12\`, \`position = [10,8,0,5,3]\`, \`speed = [2,4,1,1,3]\`
  Output: \`3\`

  Input: \`target = 10\`, \`position = [3]\`, \`speed = [3]\`
  Output: \`1\`

  Input: \`target = 100\`, \`position = [0,2,4]\`, \`speed = [4,2,1]\`
  Output: \`1\`

Constraints:
  - \`n == position.length == speed.length\`
  - \`1 <= n <= 10^5\`
  - \`0 < target <= 10^6\`
  - \`0 <= position[i] < target\`
  - \`0 < speed[i] <= 10^6\`
  - All values of \`position\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
        expectedOutput: 3,
        inputDisplay: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]',
      },
      {
        inputArgs: [10, [3], [3]],
        expectedOutput: 1,
        inputDisplay: 'target = 10, position = [3], speed = [3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [100, [0, 2, 4], [4, 2, 1]],
        expectedOutput: 1,
        inputDisplay: 'target = 100, position = [0,2,4], speed = [4,2,1]',
      },
      {
        inputArgs: [10, [6, 8], [3, 2]],
        expectedOutput: 2,
        inputDisplay: 'target = 10, position = [6,8], speed = [3,2]',
      },
      {
        inputArgs: [10, [0, 4, 2], [2, 1, 3]],
        expectedOutput: 1,
        inputDisplay: 'target = 10, position = [0,4,2], speed = [2,1,3]',
      },
      {
        inputArgs: [12, [4, 0, 5, 3, 1, 2], [6, 10, 9, 6, 7, 2]],
        expectedOutput: 1,
        inputDisplay: 'target = 12, position = [4,0,5,3,1,2], speed = [6,10,9,6,7,2]',
      },
      {
        inputArgs: [20, [5, 10, 15], [5, 5, 5]],
        expectedOutput: 3,
        inputDisplay: 'target = 20, position = [5,10,15], speed = [5,5,5]',
      },
      {
        inputArgs: [10, [0, 2, 5, 7], [5, 4, 1, 1]],
        expectedOutput: 2,
        inputDisplay: 'target = 10, position = [0,2,5,7], speed = [5,4,1,1]',
      },
    ],
    starterCode: {
      python: `def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    pass
`,
      javascript: `function carFleet(target, position, speed) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Sort + Stack', isBest: true },
      { complexity: 'O(n²)', name: 'Simulation', isBest: false, hint: 'Sort cars by position and compare arrival times' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const target = n * 10;
        const positions = new Set<number>();
        while (positions.size < n) {
          positions.add(Math.floor(Math.random() * target));
        }
        const position = Array.from(positions);
        const speed = Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1);
        return [target, position, speed];
      },
    },
  },
  {
    problemId: 27,
    functionName: 'largestRectangleArea',
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.

Examples:
  Input: \`heights = [2,1,5,6,2,3]\`
  Output: \`10\` (the largest rectangle has area = 5 * 2 = 10)

  Input: \`heights = [2,4]\`
  Output: \`4\`

Constraints:
  - \`1 <= heights.length <= 10^5\`
  - \`0 <= heights[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 1, 5, 6, 2, 3]],
        expectedOutput: 10,
        inputDisplay: 'heights = [2,1,5,6,2,3]',
      },
      {
        inputArgs: [[2, 4]],
        expectedOutput: 4,
        inputDisplay: 'heights = [2,4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'heights = [1]',
      },
      {
        inputArgs: [[5, 4, 3, 2, 1]],
        expectedOutput: 9,
        inputDisplay: 'heights = [5,4,3,2,1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 9,
        inputDisplay: 'heights = [1,2,3,4,5]',
      },
      {
        inputArgs: [[3, 3, 3, 3, 3]],
        expectedOutput: 15,
        inputDisplay: 'heights = [3,3,3,3,3]',
      },
      {
        inputArgs: [[0, 0, 0]],
        expectedOutput: 0,
        inputDisplay: 'heights = [0,0,0]',
      },
      {
        inputArgs: [[6, 2, 5, 4, 5, 1, 6]],
        expectedOutput: 12,
        inputDisplay: 'heights = [6,2,5,4,5,1,6]',
      },
      {
        inputArgs: [[2, 1, 2]],
        expectedOutput: 3,
        inputDisplay: 'heights = [2,1,2]',
      },
      {
        inputArgs: [[1, 1]],
        expectedOutput: 2,
        inputDisplay: 'heights = [1,1]',
      },
    ],
    starterCode: {
      python: `def largestRectangleArea(heights: list[int]) -> int:
    pass
`,
      javascript: `function largestRectangleArea(heights) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Monotonic Stack', isBest: true },
      { complexity: 'O(n log n)', name: 'Divide and Conquer', isBest: false, hint: 'Use a stack to find previous/next smaller elements' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Consider using a monotonic stack for O(n)' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 10001))],
    },
  },
];
