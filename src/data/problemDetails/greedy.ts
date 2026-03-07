import type { ProblemDetail } from '../../types';

export const greedyDetails: ProblemDetail[] = [
  {
    problemId: 122,
    functionName: 'maxSubArray',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

Examples:
  Input: \`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\`
  Output: \`6\`
  Explanation: The subarray \`[4, -1, 2, 1]\` has the largest sum \`6\`.

  Input: \`nums = [5, 4, -1, 7, 8]\`
  Output: \`23\`

Constraints:
  - \`1 <= nums.length <= 10^5\`
  - \`-10^4 <= nums[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expectedOutput: 6,
        inputDisplay: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
      },
      {
        inputArgs: [[5, 4, -1, 7, 8]],
        expectedOutput: 23,
        inputDisplay: 'nums = [5, 4, -1, 7, 8]',
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
        inputArgs: [[-2, -1]],
        expectedOutput: -1,
        inputDisplay: 'nums = [-2, -1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 15,
        inputDisplay: 'nums = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[-1, -2, -3, -4]],
        expectedOutput: -1,
        inputDisplay: 'nums = [-1, -2, -3, -4]',
      },
      {
        inputArgs: [[3, -1, 2, -1]],
        expectedOutput: 4,
        inputDisplay: 'nums = [3, -1, 2, -1]',
      },
      {
        inputArgs: [[8, -19, 5, -4, 20]],
        expectedOutput: 21,
        inputDisplay: 'nums = [8, -19, 5, -4, 20]',
      },
    ],
    starterCode: {
      python: `def maxSubArray(nums: list[int]) -> int:\n    pass\n`,
      javascript: `function maxSubArray(nums) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: "Kadane's Algorithm", isBest: true },
      { complexity: 'O(n log n)', name: 'Divide and Conquer', isBest: false, hint: 'Can you solve this in a single pass?' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Track the running sum and reset when it drops below zero' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 201) - 100)],
    },
  },
  {
    problemId: 123,
    functionName: 'canJump',
    description: `You are given an integer array \`nums\`. You are initially positioned at the first index of the array, and each element represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.

Examples:
  Input: \`nums = [2, 3, 1, 1, 4]\`
  Output: \`true\`
  Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

  Input: \`nums = [3, 2, 1, 0, 4]\`
  Output: \`false\`
  Explanation: You will always arrive at index 3 whose value is \`0\`, so you can never reach the last index.

Constraints:
  - \`1 <= nums.length <= 10^4\`
  - \`0 <= nums[i] <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 3, 1, 1, 4]],
        expectedOutput: true,
        inputDisplay: 'nums = [2, 3, 1, 1, 4]',
      },
      {
        inputArgs: [[3, 2, 1, 0, 4]],
        expectedOutput: false,
        inputDisplay: 'nums = [3, 2, 1, 0, 4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[0]],
        expectedOutput: true,
        inputDisplay: 'nums = [0]',
      },
      {
        inputArgs: [[2, 0, 0]],
        expectedOutput: true,
        inputDisplay: 'nums = [2, 0, 0]',
      },
      {
        inputArgs: [[1, 0, 1]],
        expectedOutput: false,
        inputDisplay: 'nums = [1, 0, 1]',
      },
      {
        inputArgs: [[1, 1, 1, 0]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 1, 1, 0]',
      },
      {
        inputArgs: [[0, 1]],
        expectedOutput: false,
        inputDisplay: 'nums = [0, 1]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: true,
        inputDisplay: 'nums = [1, 2, 3]',
      },
      {
        inputArgs: [[2, 5, 0, 0]],
        expectedOutput: true,
        inputDisplay: 'nums = [2, 5, 0, 0]',
      },
      {
        inputArgs: [[3, 0, 0, 0]],
        expectedOutput: true,
        inputDisplay: 'nums = [3, 0, 0, 0]',
      },
    ],
    starterCode: {
      python: `def canJump(nums: list[int]) -> bool:\n    pass\n`,
      javascript: `function canJump(nums) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy', isBest: true },
      { complexity: 'O(n²)', name: 'Dynamic Programming', isBest: false, hint: 'Track the farthest reachable position as you scan' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 3) + 1)],
    },
  },
  {
    problemId: 124,
    functionName: 'jump',
    description: `You are given a 0-indexed array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`.

Return the minimum number of jumps to reach \`nums[n - 1]\`. The test cases are generated such that you can always reach \`nums[n - 1]\`.

Examples:
  Input: \`nums = [2, 3, 1, 1, 4]\`
  Output: \`2\`
  Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

  Input: \`nums = [2, 3, 0, 1, 4]\`
  Output: \`2\`

Constraints:
  - \`1 <= nums.length <= 10^4\`
  - \`0 <= nums[i] <= 1000\`
  - It is guaranteed that you can reach \`nums[n - 1]\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 3, 1, 1, 4]],
        expectedOutput: 2,
        inputDisplay: 'nums = [2, 3, 1, 1, 4]',
      },
      {
        inputArgs: [[2, 3, 0, 1, 4]],
        expectedOutput: 2,
        inputDisplay: 'nums = [2, 3, 0, 1, 4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 0,
        inputDisplay: 'nums = [1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1, 2]',
      },
      {
        inputArgs: [[1, 1, 1, 1]],
        expectedOutput: 3,
        inputDisplay: 'nums = [1, 1, 1, 1]',
      },
      {
        inputArgs: [[3, 2, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [3, 2, 1]',
      },
      {
        inputArgs: [[1, 2, 1, 1, 1]],
        expectedOutput: 3,
        inputDisplay: 'nums = [1, 2, 1, 1, 1]',
      },
      {
        inputArgs: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]],
        expectedOutput: 2,
        inputDisplay: 'nums = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]',
      },
      {
        inputArgs: [[4, 1, 1, 3, 1, 1, 1]],
        expectedOutput: 2,
        inputDisplay: 'nums = [4, 1, 1, 3, 1, 1, 1]',
      },
    ],
    starterCode: {
      python: `def jump(nums: list[int]) -> int:\n    pass\n`,
      javascript: `function jump(nums) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy (BFS Layers)', isBest: true },
      { complexity: 'O(n²)', name: 'Dynamic Programming', isBest: false, hint: 'Think of it as BFS where each level represents one jump' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 3) + 1)],
    },
  },
  {
    problemId: 125,
    functionName: 'canCompleteCircuit',
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`i-th\` station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i-th\` station to its next \`(i + 1)-th\` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is guaranteed to be unique.

Examples:
  Input: \`gas = [1, 2, 3, 4, 5]\`, \`cost = [3, 4, 5, 1, 2]\`
  Output: \`3\`

  Input: \`gas = [2, 3, 4]\`, \`cost = [3, 4, 3]\`
  Output: \`-1\`

Constraints:
  - \`n == gas.length == cost.length\`
  - \`1 <= n <= 10^5\`
  - \`0 <= gas[i], cost[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]],
        expectedOutput: 3,
        inputDisplay: 'gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]',
      },
      {
        inputArgs: [[2, 3, 4], [3, 4, 3]],
        expectedOutput: -1,
        inputDisplay: 'gas = [2, 3, 4], cost = [3, 4, 3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[2], [2]],
        expectedOutput: 0,
        inputDisplay: 'gas = [2], cost = [2]',
      },
      {
        inputArgs: [[1], [2]],
        expectedOutput: -1,
        inputDisplay: 'gas = [1], cost = [2]',
      },
      {
        inputArgs: [[3, 1, 1], [1, 2, 2]],
        expectedOutput: 0,
        inputDisplay: 'gas = [3, 1, 1], cost = [1, 2, 2]',
      },
      {
        inputArgs: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]],
        expectedOutput: 4,
        inputDisplay: 'gas = [5, 1, 2, 3, 4], cost = [4, 4, 1, 5, 1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        expectedOutput: 0,
        inputDisplay: 'gas = [1, 2, 3, 4, 5], cost = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[5, 8, 2, 8], [6, 5, 6, 6]],
        expectedOutput: 3,
        inputDisplay: 'gas = [5, 8, 2, 8], cost = [6, 5, 6, 6]',
      },
    ],
    starterCode: {
      python: `def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:\n    pass\n`,
      javascript: `function canCompleteCircuit(gas, cost) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Track total surplus and reset the starting station when the tank goes negative' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const gas = Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1);
        const cost = Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1);
        const totalGas = gas.reduce((a, b) => a + b, 0);
        const totalCost = cost.reduce((a, b) => a + b, 0);
        if (totalCost > totalGas) gas[0] += totalCost - totalGas;
        return [gas, cost];
      },
    },
  },
  {
    problemId: 126,
    functionName: 'isNStraightHand',
    description: `Alice has some number of cards in her hand given as an integer array \`hand\` where \`hand[i]\` is the value of the \`i-th\` card.

She wants to rearrange the cards into groups so that each group has exactly \`groupSize\` cards with consecutive values.

Return \`true\` if she can rearrange the cards, or \`false\` otherwise.

Examples:
  Input: \`hand = [1, 2, 3, 6, 2, 3, 4, 7, 8]\`, \`groupSize = 3\`
  Output: \`true\`
  Explanation: Cards can be rearranged as \`[1, 2, 3]\`, \`[2, 3, 4]\`, \`[6, 7, 8]\`.

  Input: \`hand = [1, 2, 3, 4, 5]\`, \`groupSize = 4\`
  Output: \`false\`
  Explanation: Cards cannot be rearranged into groups of \`4\`.

Constraints:
  - \`1 <= hand.length <= 10^4\`
  - \`0 <= hand[i] <= 10^9\`
  - \`1 <= groupSize <= hand.length\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3],
        expectedOutput: true,
        inputDisplay: 'hand = [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize = 3',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 4],
        expectedOutput: false,
        inputDisplay: 'hand = [1, 2, 3, 4, 5], groupSize = 4',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: true,
        inputDisplay: 'hand = [1], groupSize = 1',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6], 2],
        expectedOutput: true,
        inputDisplay: 'hand = [1, 2, 3, 4, 5, 6], groupSize = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6], 3],
        expectedOutput: true,
        inputDisplay: 'hand = [1, 2, 3, 4, 5, 6], groupSize = 3',
      },
      {
        inputArgs: [[1, 1, 2, 2, 3, 3], 3],
        expectedOutput: true,
        inputDisplay: 'hand = [1, 1, 2, 2, 3, 3], groupSize = 3',
      },
      {
        inputArgs: [[1, 1, 2, 3], 2],
        expectedOutput: false,
        inputDisplay: 'hand = [1, 1, 2, 3], groupSize = 2',
      },
      {
        inputArgs: [[8, 10, 12], 3],
        expectedOutput: false,
        inputDisplay: 'hand = [8, 10, 12], groupSize = 3',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7, 8], 3],
        expectedOutput: false,
        inputDisplay: 'hand = [1, 2, 3, 4, 5, 6, 7, 8], groupSize = 3',
      },
    ],
    starterCode: {
      python: `def isNStraightHand(hand: list[int], groupSize: int) -> bool:\n    pass\n`,
      javascript: `function isNStraightHand(hand, groupSize) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Sorted Frequency Map', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force Sort + Scan', isBest: false, hint: 'Use a frequency map and greedily build groups starting from the smallest card' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const groupSize = 3;
        const adjustedN = n - (n % groupSize);
        const hand = Array.from({ length: adjustedN }, (_, i) => Math.floor(i / groupSize) * groupSize + (i % groupSize) + 1);
        for (let i = hand.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [hand[i], hand[j]] = [hand[j], hand[i]];
        }
        return [hand, groupSize];
      },
    },
  },
  {
    problemId: 127,
    functionName: 'mergeTriplets',
    description: `A triplet is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [a_i, b_i, c_i]\` describes the \`i-th\` triplet.

You can perform the following operation any number of times: choose two triplets and update one of them to become \`[max(a_i, a_j), max(b_i, b_j), max(c_i, c_j)]\`.

Given an integer array \`target = [x, y, z]\`, return \`true\` if it is possible to obtain \`target\` as an element of \`triplets\` after performing the operations, or \`false\` otherwise.

Examples:
  Input: \`triplets = [[2, 5, 3], [1, 8, 4], [1, 7, 5]]\`, \`target = [2, 7, 5]\`
  Output: \`true\`
  Explanation: Merge the first and third triplets: \`[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]\`.

  Input: \`triplets = [[3, 4, 5], [4, 5, 6]]\`, \`target = [3, 2, 5]\`
  Output: \`false\`
  Explanation: No triplet has a value of \`2\` in the second position without exceeding the target in another.

Constraints:
  - \`1 <= triplets.length <= 10^5\`
  - \`triplets[i].length == target.length == 3\`
  - \`1 <= a_i, b_i, c_i, x, y, z <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]',
      },
      {
        inputArgs: [[[3, 4, 5], [4, 5, 6]], [3, 2, 5]],
        expectedOutput: false,
        inputDisplay: 'triplets = [[3,4,5],[4,5,6]], target = [3,2,5]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]',
      },
      {
        inputArgs: [[[1, 1, 1], [2, 2, 2]], [3, 3, 3]],
        expectedOutput: false,
        inputDisplay: 'triplets = [[1,1,1],[2,2,2]], target = [3,3,3]',
      },
      {
        inputArgs: [[[1, 3, 1], [1, 1, 3], [3, 1, 1]], [3, 3, 3]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[1,3,1],[1,1,3],[3,1,1]], target = [3,3,3]',
      },
      {
        inputArgs: [[[3, 3, 3]], [3, 3, 3]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[3,3,3]], target = [3,3,3]',
      },
      {
        inputArgs: [[[1, 2, 3]], [1, 2, 3]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[1,2,3]], target = [1,2,3]',
      },
      {
        inputArgs: [[[1, 2, 4]], [1, 2, 3]],
        expectedOutput: false,
        inputDisplay: 'triplets = [[1,2,4]], target = [1,2,3]',
      },
      {
        inputArgs: [[[2, 3, 5], [1, 7, 1], [5, 1, 1]], [5, 7, 5]],
        expectedOutput: true,
        inputDisplay: 'triplets = [[2,3,5],[1,7,1],[5,1,1]], target = [5,7,5]',
      },
    ],
    starterCode: {
      python: `def mergeTriplets(triplets: list[list[int]], target: list[int]) -> bool:\n    pass\n`,
      javascript: `function mergeTriplets(triplets, target) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy Filter', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force Merge', isBest: false, hint: 'Only consider triplets where no value exceeds the corresponding target value' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const target = [Math.floor(n / 3), Math.floor(n / 2), n];
        const triplets = Array.from({ length: n }, () => [
          Math.floor(Math.random() * n) + 1,
          Math.floor(Math.random() * n) + 1,
          Math.floor(Math.random() * n) + 1,
        ]);
        return [triplets, target];
      },
    },
  },
  {
    problemId: 128,
    functionName: 'partitionLabels',
    description: `You are given a string \`s\`. Partition the string into as many parts as possible so that each letter appears in at most one part.

The partition is done greedily: from left to right, find the smallest part that includes all occurrences of every letter in that part.

Return a list of integers representing the size of these parts.

Examples:
  Input: \`s = "ababcbacadefegdehijhklij"\`
  Output: \`[9, 7, 8]\`
  Explanation: The partitions are \`"ababcbaca"\`, \`"defegde"\`, \`"hijhklij"\`. Each letter appears in at most one part.

  Input: \`s = "eccbbbbdec"\`
  Output: \`[10]\`

Constraints:
  - \`1 <= s.length <= 500\`
  - \`s\` consists of lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: ['ababcbacadefegdehijhklij'],
        expectedOutput: [9, 7, 8],
        inputDisplay: 's = "ababcbacadefegdehijhklij"',
      },
      {
        inputArgs: ['eccbbbbdec'],
        expectedOutput: [10],
        inputDisplay: 's = "eccbbbbdec"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a'],
        expectedOutput: [1],
        inputDisplay: 's = "a"',
      },
      {
        inputArgs: ['abc'],
        expectedOutput: [1, 1, 1],
        inputDisplay: 's = "abc"',
      },
      {
        inputArgs: ['aabbcc'],
        expectedOutput: [2, 2, 2],
        inputDisplay: 's = "aabbcc"',
      },
      {
        inputArgs: ['abab'],
        expectedOutput: [4],
        inputDisplay: 's = "abab"',
      },
      {
        inputArgs: ['abcdefg'],
        expectedOutput: [1, 1, 1, 1, 1, 1, 1],
        inputDisplay: 's = "abcdefg"',
      },
      {
        inputArgs: ['aaaaaaa'],
        expectedOutput: [7],
        inputDisplay: 's = "aaaaaaa"',
      },
    ],
    starterCode: {
      python: `def partitionLabels(s: str) -> list[int]:\n    pass\n`,
      javascript: `function partitionLabels(s) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy (Last Occurrence Map)', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Precompute the last index of each character and greedily extend partitions' },
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
    problemId: 129,
    functionName: 'checkValidString',
    description: `Given a string \`s\` containing only three types of characters: \`'('\`, \`')'\`, and \`'*'\`, return \`true\` if \`s\` is valid.

The following rules define a valid string:
  - Any left parenthesis \`'('\` must have a corresponding right parenthesis \`')'\`.
  - Any right parenthesis \`')'\` must have a corresponding left parenthesis \`'('\`.
  - Left parenthesis \`'('\` must go before the corresponding right parenthesis \`')'\`.
  - \`'*'\` could be treated as a single right parenthesis \`')'\`, a single left parenthesis \`'('\`, or an empty string \`""\`.

Examples:
  Input: \`s = "()"\`
  Output: \`true\`

  Input: \`s = "(*)"\`
  Output: \`true\`

  Input: \`s = "(*))"\`
  Output: \`true\`

Constraints:
  - \`1 <= s.length <= 100\`
  - \`s[i]\` is \`'('\`, \`')'\`, or \`'*'\``,
    sampleTestCases: [
      {
        inputArgs: ['()'],
        expectedOutput: true,
        inputDisplay: 's = "()"',
      },
      {
        inputArgs: ['(*)'],
        expectedOutput: true,
        inputDisplay: 's = "(*)"',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['(*))'],
        expectedOutput: true,
        inputDisplay: 's = "(*))"',
      },
      {
        inputArgs: ['*'],
        expectedOutput: true,
        inputDisplay: 's = "*"',
      },
      {
        inputArgs: ['('],
        expectedOutput: false,
        inputDisplay: 's = "("',
      },
      {
        inputArgs: [')('],
        expectedOutput: false,
        inputDisplay: 's = ")("',
      },
      {
        inputArgs: ['(**)'],
        expectedOutput: true,
        inputDisplay: 's = "(**)"',
      },
      {
        inputArgs: ['(((*))'],
        expectedOutput: true,
        inputDisplay: 's = "(((*))"',
      },
      {
        inputArgs: ['(((*)'],
        expectedOutput: false,
        inputDisplay: 's = "(((*)"',
      },
      {
        inputArgs: ['(*)(*)(*)'],
        expectedOutput: true,
        inputDisplay: 's = "(*)(*)(*)"',
      },
    ],
    starterCode: {
      python: `def checkValidString(s: str) -> bool:\n    pass\n`,
      javascript: `function checkValidString(s) {\n\n}\n`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy (Min/Max Open Count)', isBest: true },
      { complexity: 'O(n²)', name: 'Dynamic Programming', isBest: false, hint: 'Track the range of possible open parenthesis counts as you scan left to right' },
      { complexity: 'O(3^n)', name: 'Brute Force (Try All *)', isBest: false, hint: 'Each * has only 3 options — greedily track min and max open counts' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const chars = '()*';
        let s = '';
        for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * 3)];
        return [s];
      },
    },
  },
];
