import type { ProblemDetail } from '../../types';

export const linkedListDetails: ProblemDetail[] = [
  {
    problemId: 35,
    functionName: 'reverseList',
    inputTypes: ['list'],
    outputType: 'list',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Examples:
  Input: \`head = [1, 2, 3, 4, 5]\`
  Output: \`[5, 4, 3, 2, 1]\`

  Input: \`head = [1, 2]\`
  Output: \`[2, 1]\`

  Input: \`head = []\`
  Output: \`[]\`

Constraints:
  - The number of nodes in the list is in the range \`[0, 5000]\`
  - \`-5000 <= Node.val <= 5000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: [5, 4, 3, 2, 1],
        inputDisplay: 'head = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: [2, 1],
        inputDisplay: 'head = [1, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'head = []',
      },
      {
        inputArgs: [[1]],
        expectedOutput: [1],
        inputDisplay: 'head = [1]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [3, 2, 1],
        inputDisplay: 'head = [1, 2, 3]',
      },
      {
        inputArgs: [[-1, 0, 1]],
        expectedOutput: [1, 0, -1],
        inputDisplay: 'head = [-1, 0, 1]',
      },
      {
        inputArgs: [[1, 1, 1, 1]],
        expectedOutput: [1, 1, 1, 1],
        inputDisplay: 'head = [1, 1, 1, 1]',
      },
    ],
    starterCode: {
      python: `def reverseList(head: ListNode) -> ListNode:
    pass
`,
      javascript: `function reverseList(head) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Iterative', isBest: true },
      { complexity: 'O(n)', name: 'Recursive', isBest: false, hint: 'An iterative approach uses O(1) space' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i)],
    },
  },
  {
    problemId: 36,
    functionName: 'mergeTwoLists',
    inputTypes: ['list', 'list'],
    outputType: 'list',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Examples:
  Input: \`list1 = [1, 2, 4]\`, \`list2 = [1, 3, 4]\`
  Output: \`[1, 1, 2, 3, 4, 4]\`

  Input: \`list1 = []\`, \`list2 = []\`
  Output: \`[]\`

  Input: \`list1 = []\`, \`list2 = [0]\`
  Output: \`[0]\`

Constraints:
  - The number of nodes in both lists is in the range \`[0, 50]\`
  - \`-100 <= Node.val <= 100\`
  - Both \`list1\` and \`list2\` are sorted in non-decreasing order`,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 4], [1, 3, 4]],
        expectedOutput: [1, 1, 2, 3, 4, 4],
        inputDisplay: 'list1 = [1, 2, 4], list2 = [1, 3, 4]',
      },
      {
        inputArgs: [[], []],
        expectedOutput: [],
        inputDisplay: 'list1 = [], list2 = []',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[], [0]],
        expectedOutput: [0],
        inputDisplay: 'list1 = [], list2 = [0]',
      },
      {
        inputArgs: [[1], [2]],
        expectedOutput: [1, 2],
        inputDisplay: 'list1 = [1], list2 = [2]',
      },
      {
        inputArgs: [[1, 1], [1, 1]],
        expectedOutput: [1, 1, 1, 1],
        inputDisplay: 'list1 = [1, 1], list2 = [1, 1]',
      },
      {
        inputArgs: [[5], [1, 2, 3, 4]],
        expectedOutput: [1, 2, 3, 4, 5],
        inputDisplay: 'list1 = [5], list2 = [1, 2, 3, 4]',
      },
      {
        inputArgs: [[-3, -1, 0], [-2, 2, 4]],
        expectedOutput: [-3, -2, -1, 0, 2, 4],
        inputDisplay: 'list1 = [-3, -1, 0], list2 = [-2, 2, 4]',
      },
      {
        inputArgs: [[1, 3, 5, 7], [2, 4, 6, 8]],
        expectedOutput: [1, 2, 3, 4, 5, 6, 7, 8],
        inputDisplay: 'list1 = [1, 3, 5, 7], list2 = [2, 4, 6, 8]',
      },
    ],
    starterCode: {
      python: `def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
    pass
`,
      javascript: `function mergeTwoLists(list1, list2) {

}
`,
    },
    solutions: [
      { complexity: 'O(n + m)', name: 'Iterative', isBest: true },
      { complexity: 'O(n + m)', name: 'Recursive', isBest: false, hint: 'An iterative approach uses O(1) space' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const half = Math.floor(n / 2);
        const a = Array.from({ length: half }, (_, i) => i * 2);
        const b = Array.from({ length: n - half }, (_, i) => i * 2 + 1);
        return [a, b];
      },
    },
  },
  {
    problemId: 37,
    functionName: 'reorderList',
    inputTypes: ['list'],
    outputType: 'inPlace',
    inPlaceArgIndex: 0,
    description: `You are given the head of a singly linked list. The list can be represented as:

  L0 → L1 → … → Ln-1 → Ln

Reorder the list to be on the following form:

  L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Examples:
  Input: \`head = [1, 2, 3, 4]\`
  Output: \`[1, 4, 2, 3]\`

  Input: \`head = [1, 2, 3, 4, 5]\`
  Output: \`[1, 5, 2, 4, 3]\`

Constraints:
  - The number of nodes in the list is in the range \`[1, 5 * 10^4]\`
  - \`1 <= Node.val <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4]],
        expectedOutput: [1, 4, 2, 3],
        inputDisplay: 'head = [1, 2, 3, 4]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: [1, 5, 2, 4, 3],
        inputDisplay: 'head = [1, 2, 3, 4, 5]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: [1],
        inputDisplay: 'head = [1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: [1, 2],
        inputDisplay: 'head = [1, 2]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [1, 3, 2],
        inputDisplay: 'head = [1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6]],
        expectedOutput: [1, 6, 2, 5, 3, 4],
        inputDisplay: 'head = [1, 2, 3, 4, 5, 6]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: [1, 7, 2, 6, 3, 5, 4],
        inputDisplay: 'head = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `def reorderList(head: ListNode) -> None:
    pass
`,
      javascript: `function reorderList(head) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Find Middle + Reverse + Merge', isBest: true },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Find the middle, reverse the second half, then merge alternately' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 38,
    functionName: 'removeNthFromEnd',
    inputTypes: ['list', 'value'],
    outputType: 'list',
    description: `Given the head of a linked list, remove the \`n-th\` node from the end of the list and return its head.

Examples:
  Input: \`head = [1, 2, 3, 4, 5]\`, \`n = 2\`
  Output: \`[1, 2, 3, 5]\`

  Input: \`head = [1]\`, \`n = 1\`
  Output: \`[]\`

  Input: \`head = [1, 2]\`, \`n = 1\`
  Output: \`[1]\`

Constraints:
  - The number of nodes in the list is \`sz\`
  - \`1 <= sz <= 30\`
  - \`0 <= Node.val <= 100\`
  - \`1 <= n <= sz\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [1, 2, 3, 5],
        inputDisplay: 'head = [1, 2, 3, 4, 5], n = 2',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: [],
        inputDisplay: 'head = [1], n = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2], 1],
        expectedOutput: [1],
        inputDisplay: 'head = [1, 2], n = 1',
      },
      {
        inputArgs: [[1, 2], 2],
        expectedOutput: [2],
        inputDisplay: 'head = [1, 2], n = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 5],
        expectedOutput: [2, 3, 4, 5],
        inputDisplay: 'head = [1, 2, 3, 4, 5], n = 5',
      },
      {
        inputArgs: [[1, 2, 3], 3],
        expectedOutput: [2, 3],
        inputDisplay: 'head = [1, 2, 3], n = 3',
      },
      {
        inputArgs: [[1, 2, 3], 1],
        expectedOutput: [1, 2],
        inputDisplay: 'head = [1, 2, 3], n = 1',
      },
      {
        inputArgs: [[10, 20, 30, 40], 2],
        expectedOutput: [10, 20, 40],
        inputDisplay: 'head = [10, 20, 30, 40], n = 2',
      },
    ],
    starterCode: {
      python: `def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    pass
`,
      javascript: `function removeNthFromEnd(head, n) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Two Pointers (One Pass)', isBest: true },
      { complexity: 'O(n)', name: 'Two Pass', isBest: false, hint: 'Use two pointers spaced n apart to find the node in one pass' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i), Math.floor(n / 2)],
    },
  },
  {
    problemId: 39,
    functionName: 'copyRandomList',
    inputTypes: ['value'],
    description: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.

Construct a deep copy of the list. The deep copy should consist of exactly \`n\` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the \`next\` and \`random\` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

The input is represented as an array of \`[val, randomIndex]\` pairs where \`randomIndex\` is the index of the node that the \`random\` pointer points to, or \`null\` if it does not point to any node.

Return the copied list in the same format.

Examples:
  Input: \`head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\`
  Output: \`[[7,null],[13,0],[11,4],[10,2],[1,0]]\`

  Input: \`head = [[1,1],[2,1]]\`
  Output: \`[[1,1],[2,1]]\`

  Input: \`head = [[3,null],[3,0],[3,null]]\`
  Output: \`[[3,null],[3,0],[3,null]]\`

Constraints:
  - \`0 <= n <= 1000\`
  - \`-10^4 <= Node.val <= 10^4\`
  - \`Node.random\` is \`null\` or is pointing to some node in the linked list`,
    sampleTestCases: [
      {
        inputArgs: [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]],
        expectedOutput: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        inputDisplay: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
      },
      {
        inputArgs: [[[1, 1], [2, 1]]],
        expectedOutput: [[1, 1], [2, 1]],
        inputDisplay: 'head = [[1,1],[2,1]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[3, null], [3, 0], [3, null]]],
        expectedOutput: [[3, null], [3, 0], [3, null]],
        inputDisplay: 'head = [[3,null],[3,0],[3,null]]',
      },
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'head = []',
      },
      {
        inputArgs: [[[1, 0]]],
        expectedOutput: [[1, 0]],
        inputDisplay: 'head = [[1,0]]',
      },
      {
        inputArgs: [[[1, null], [2, null], [3, null]]],
        expectedOutput: [[1, null], [2, null], [3, null]],
        inputDisplay: 'head = [[1,null],[2,null],[3,null]]',
      },
      {
        inputArgs: [[[5, 2], [4, 0], [3, 1], [2, 3], [1, 4]]],
        expectedOutput: [[5, 2], [4, 0], [3, 1], [2, 3], [1, 4]],
        inputDisplay: 'head = [[5,2],[4,0],[3,1],[2,3],[1,4]]',
      },
    ],
    starterCode: {
      python: `def copyRandomList(head):
    pass
`,
      javascript: `function copyRandomList(head) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Hash Map', isBest: true },
      { complexity: 'O(n)', name: 'Interweaving Nodes', isBest: false, hint: 'A hash map approach is simpler and equally efficient' },
      { complexity: 'O(n²)', name: 'Brute Force', isBest: false, hint: 'Use a hash map to map original nodes to copies' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => {
        const nodes: [number, number | null][] = [];
        for (let i = 0; i < n; i++) {
          const randomIdx = Math.random() < 0.3 ? null : Math.floor(Math.random() * n);
          nodes.push([Math.floor(Math.random() * 100), randomIdx]);
        }
        return [nodes];
      },
    },
  },
  {
    problemId: 40,
    functionName: 'addTwoNumbers',
    inputTypes: ['list', 'list'],
    outputType: 'list',
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Examples:
  Input: \`l1 = [2, 4, 3]\`, \`l2 = [5, 6, 4]\`
  Output: \`[7, 0, 8]\` (342 + 465 = 807)

  Input: \`l1 = [0]\`, \`l2 = [0]\`
  Output: \`[0]\`

  Input: \`l1 = [9, 9, 9, 9, 9, 9, 9]\`, \`l2 = [9, 9, 9, 9]\`
  Output: \`[8, 9, 9, 9, 0, 0, 0, 1]\`

Constraints:
  - The number of nodes in each linked list is in the range \`[1, 100]\`
  - \`0 <= Node.val <= 9\`
  - The list represents a number that does not have leading zeros`,
    sampleTestCases: [
      {
        inputArgs: [[2, 4, 3], [5, 6, 4]],
        expectedOutput: [7, 0, 8],
        inputDisplay: 'l1 = [2, 4, 3], l2 = [5, 6, 4]',
      },
      {
        inputArgs: [[0], [0]],
        expectedOutput: [0],
        inputDisplay: 'l1 = [0], l2 = [0]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]],
        expectedOutput: [8, 9, 9, 9, 0, 0, 0, 1],
        inputDisplay: 'l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]',
      },
      {
        inputArgs: [[5], [5]],
        expectedOutput: [0, 1],
        inputDisplay: 'l1 = [5], l2 = [5]',
      },
      {
        inputArgs: [[1, 8], [0]],
        expectedOutput: [1, 8],
        inputDisplay: 'l1 = [1, 8], l2 = [0]',
      },
      {
        inputArgs: [[9], [1, 9, 9, 9, 9, 9, 9, 9, 9, 9]],
        expectedOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        inputDisplay: 'l1 = [9], l2 = [1, 9, 9, 9, 9, 9, 9, 9, 9, 9]',
      },
      {
        inputArgs: [[2, 4, 9], [5, 6, 4, 9]],
        expectedOutput: [7, 0, 4, 0, 1],
        inputDisplay: 'l1 = [2, 4, 9], l2 = [5, 6, 4, 9]',
      },
    ],
    starterCode: {
      python: `def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    pass
`,
      javascript: `function addTwoNumbers(l1, l2) {

}
`,
    },
    solutions: [
      { complexity: 'O(max(n, m))', name: 'Elementary Math', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const a = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
        const b = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
        return [a, b];
      },
    },
  },
  {
    problemId: 41,
    functionName: 'hasCycle',
    inputTypes: ['cyclicList'],
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. Note that \`pos\` is not passed as a parameter.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

Examples:
  Input: \`head = [3, 2, 0, -4]\`, \`pos = 1\`
  Output: \`true\` (tail connects to node index 1)

  Input: \`head = [1, 2]\`, \`pos = 0\`
  Output: \`true\` (tail connects to node index 0)

  Input: \`head = [1]\`, \`pos = -1\`
  Output: \`false\` (no cycle)

Constraints:
  - The number of nodes in the list is in the range \`[0, 10^4]\`
  - \`-10^5 <= Node.val <= 10^5\`
  - \`pos\` is \`-1\` or a valid index in the linked list`,
    sampleTestCases: [
      {
        inputArgs: [[3, 2, 0, -4], 1],
        expectedOutput: true,
        inputDisplay: 'head = [3, 2, 0, -4], pos = 1',
      },
      {
        inputArgs: [[1, 2], 0],
        expectedOutput: true,
        inputDisplay: 'head = [1, 2], pos = 0',
      },
      {
        inputArgs: [[1], -1],
        expectedOutput: false,
        inputDisplay: 'head = [1], pos = -1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2], -1],
        expectedOutput: false,
        inputDisplay: 'head = [1, 2], pos = -1',
      },
      {
        inputArgs: [[1], 0],
        expectedOutput: true,
        inputDisplay: 'head = [1], pos = 0',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 2],
        expectedOutput: true,
        inputDisplay: 'head = [1, 2, 3, 4, 5], pos = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], -1],
        expectedOutput: false,
        inputDisplay: 'head = [1, 2, 3, 4, 5], pos = -1',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 4],
        expectedOutput: true,
        inputDisplay: 'head = [1, 2, 3, 4, 5], pos = 4',
      },
    ],
    starterCode: {
      python: `def hasCycle(head: ListNode) -> bool:
    pass
`,
      javascript: `function hasCycle(head) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Floyd\'s Tortoise & Hare', isBest: true },
      { complexity: 'O(n)', name: 'Hash Set', isBest: false, hint: 'Floyd\'s algorithm uses O(1) space' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const values = Array.from({ length: n }, (_, i) => i);
        const pos = Math.floor(Math.random() * n);
        return [values, pos];
      },
    },
  },
  {
    problemId: 42,
    functionName: 'findDuplicate',
    description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only one repeated number in \`nums\`, return this repeated number.

You must solve the problem without modifying the array \`nums\` and using only constant extra space.

Examples:
  Input: \`nums = [1, 3, 4, 2, 2]\`
  Output: \`2\`

  Input: \`nums = [3, 1, 3, 4, 2]\`
  Output: \`3\`

  Input: \`nums = [3, 3, 3, 3, 3]\`
  Output: \`3\`

Constraints:
  - \`1 <= n <= 10^5\`
  - \`nums.length == n + 1\`
  - \`1 <= nums[i] <= n\`
  - There is only one repeated number in \`nums\`, but it could be repeated more than once`,
    sampleTestCases: [
      {
        inputArgs: [[1, 3, 4, 2, 2]],
        expectedOutput: 2,
        inputDisplay: 'nums = [1, 3, 4, 2, 2]',
      },
      {
        inputArgs: [[3, 1, 3, 4, 2]],
        expectedOutput: 3,
        inputDisplay: 'nums = [3, 1, 3, 4, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[3, 3, 3, 3, 3]],
        expectedOutput: 3,
        inputDisplay: 'nums = [3, 3, 3, 3, 3]',
      },
      {
        inputArgs: [[1, 1]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1, 1]',
      },
      {
        inputArgs: [[1, 1, 2]],
        expectedOutput: 1,
        inputDisplay: 'nums = [1, 1, 2]',
      },
      {
        inputArgs: [[2, 2, 2, 2, 2]],
        expectedOutput: 2,
        inputDisplay: 'nums = [2, 2, 2, 2, 2]',
      },
      {
        inputArgs: [[1, 4, 4, 2, 4]],
        expectedOutput: 4,
        inputDisplay: 'nums = [1, 4, 4, 2, 4]',
      },
      {
        inputArgs: [[2, 5, 9, 6, 9, 3, 8, 9, 7, 1]],
        expectedOutput: 9,
        inputDisplay: 'nums = [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]',
      },
    ],
    starterCode: {
      python: `def findDuplicate(nums: list[int]) -> int:
    pass
`,
      javascript: `function findDuplicate(nums) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Floyd\'s Cycle Detection', isBest: true },
      { complexity: 'O(n)', name: 'Hash Set', isBest: false, hint: 'Floyd\'s cycle detection uses O(1) space — treat indices as a linked list' },
      { complexity: 'O(n log n)', name: 'Binary Search on Value Range', isBest: false, hint: 'Can you detect cycles in O(n) time and O(1) space?' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const duplicate = Math.floor(Math.random() * (n - 1)) + 1;
        const nums = Array.from({ length: n - 1 }, (_, i) => i + 1);
        nums.push(duplicate);
        for (let i = nums.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        return [nums];
      },
    },
  },
  {
    problemId: 43,
    mode: 'class',
    className: 'LRUCache',
    functionName: 'LRUCache',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` — Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` — Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` — Update the value of the \`key\` if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.

Examples:
  Input: ["LRUCache","put","put","get","put","get","put","get","get","get"]
         [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
  Output: [null,null,null,1,null,-1,null,-1,3,4]

Constraints:
  - \`1 <= capacity <= 3000\`
  - \`0 <= key <= 10^4\`
  - \`0 <= value <= 10^5\`
  - At most \`2 * 10^5\` calls will be made to \`get\` and \`put\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
        operationArgs: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
        inputDisplay: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['LRUCache', 'put', 'put', 'get', 'get'],
        operationArgs: [[1], [1, 1], [2, 2], [1], [2]],
        expected: [null, null, null, -1, 2],
        inputDisplay: '["LRUCache","put","put","get","get"]\n[[1],[1,1],[2,2],[1],[2]]',
      },
      {
        operations: ['LRUCache', 'put', 'put', 'put', 'get', 'get'],
        operationArgs: [[2], [1, 1], [2, 2], [1, 10], [1], [2]],
        expected: [null, null, null, null, 10, 2],
        inputDisplay: '["LRUCache","put","put","put","get","get"]\n[[2],[1,1],[2,2],[1,10],[1],[2]]',
      },
      {
        operations: ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get'],
        operationArgs: [[2], [2, 1], [1, 1], [2, 3], [4, 1], [1], [2]],
        expected: [null, null, null, null, null, -1, 3],
        inputDisplay: '["LRUCache","put","put","put","put","get","get"]\n[[2],[2,1],[1,1],[2,3],[4,1],[1],[2]]',
      },
      {
        operations: ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get', 'get', 'get'],
        operationArgs: [[3], [1, 1], [2, 2], [3, 3], [4, 4], [4], [3], [2], [1]],
        expected: [null, null, null, null, null, 4, 3, 2, -1],
        inputDisplay: '["LRUCache","put","put","put","put","get","get","get","get"]\n[[3],[1,1],[2,2],[3,3],[4,4],[4],[3],[2],[1]]',
      },
      {
        operations: ['LRUCache', 'get', 'put', 'get', 'put', 'put', 'get', 'get'],
        operationArgs: [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]],
        expected: [null, -1, null, -1, null, null, 2, 6],
        inputDisplay: '["LRUCache","get","put","get","put","put","get","get"]\n[[2],[2],[2,6],[1],[1,5],[1,2],[1],[2]]',
      },
    ],
    starterCode: {
      python: `class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
`,
      javascript: `class LRUCache {
    constructor(capacity) {
    }
    get(key) {
    }
    put(key, value) {
    }
}
`,
    },
    solutions: [
      { complexity: 'O(1)', name: 'Hash Map + Doubly Linked List', isBest: true },
      { complexity: 'O(n)', name: 'Ordered Dict / Array Scan', isBest: false, hint: 'Use a doubly linked list with a hash map for O(1) get and put' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const keys = Array.from({ length: n }, () => Math.floor(Math.random() * Math.floor(n / 5)));
        return [keys];
      },
    },
  },
  {
    problemId: 44,
    functionName: 'mergeKLists',
    inputTypes: ['value'],
    outputType: 'list',
    description: `You are given an array of \`k\` linked lists \`lists\`, each linked list is sorted in ascending order.

Merge all the linked lists into one sorted linked list and return it.

Examples:
  Input: \`lists = [[1, 4, 5], [1, 3, 4], [2, 6]]\`
  Output: \`[1, 1, 2, 3, 4, 4, 5, 6]\`

  Input: \`lists = []\`
  Output: \`[]\`

  Input: \`lists = [[]]\`
  Output: \`[]\`

Constraints:
  - \`k == lists.length\`
  - \`0 <= k <= 10^4\`
  - \`0 <= lists[i].length <= 500\`
  - \`-10^4 <= lists[i][j] <= 10^4\`
  - \`lists[i]\` is sorted in ascending order
  - The sum of \`lists[i].length\` will not exceed \`10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 4, 5], [1, 3, 4], [2, 6]]],
        expectedOutput: [1, 1, 2, 3, 4, 4, 5, 6],
        inputDisplay: 'lists = [[1,4,5],[1,3,4],[2,6]]',
      },
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'lists = []',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[]]],
        expectedOutput: [],
        inputDisplay: 'lists = [[]]',
      },
      {
        inputArgs: [[[1]]],
        expectedOutput: [1],
        inputDisplay: 'lists = [[1]]',
      },
      {
        inputArgs: [[[1], [2], [3]]],
        expectedOutput: [1, 2, 3],
        inputDisplay: 'lists = [[1],[2],[3]]',
      },
      {
        inputArgs: [[[1, 2], [3, 4], [5, 6]]],
        expectedOutput: [1, 2, 3, 4, 5, 6],
        inputDisplay: 'lists = [[1,2],[3,4],[5,6]]',
      },
      {
        inputArgs: [[[-1, 0, 1], [-2, 2], [0]]],
        expectedOutput: [-2, -1, 0, 0, 1, 2],
        inputDisplay: 'lists = [[-1,0,1],[-2,2],[0]]',
      },
      {
        inputArgs: [[[1, 3, 5], [2, 4, 6], [0, 7, 8, 9]]],
        expectedOutput: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        inputDisplay: 'lists = [[1,3,5],[2,4,6],[0,7,8,9]]',
      },
    ],
    starterCode: {
      python: `def mergeKLists(lists: list[ListNode]) -> ListNode:
    pass
`,
      javascript: `function mergeKLists(lists) {

}
`,
    },
    solutions: [
      { complexity: 'O(N log k)', name: 'Min Heap / Divide and Conquer', isBest: true },
      { complexity: 'O(Nk)', name: 'Compare One by One', isBest: false, hint: 'Use a min-heap to efficiently pick the smallest element across k lists' },
    ],
    benchmarkConfig: {
      sizes: [10, 50, 200],
      generateInput: (k: number) => {
        const lists: number[][] = [];
        for (let i = 0; i < k; i++) {
          const list: number[] = [];
          let val = Math.floor(Math.random() * 10);
          for (let j = 0; j < 50; j++) {
            list.push(val);
            val += Math.floor(Math.random() * 5) + 1;
          }
          lists.push(list);
        }
        return [lists];
      },
    },
  },
  {
    problemId: 45,
    functionName: 'reverseKGroup',
    inputTypes: ['list', 'value'],
    outputType: 'list',
    description: `Given the \`head\` of a linked list, reverse the nodes of the list \`k\` at a time, and return the modified list.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Examples:
  Input: \`head = [1, 2, 3, 4, 5]\`, \`k = 2\`
  Output: \`[2, 1, 4, 3, 5]\`

  Input: \`head = [1, 2, 3, 4, 5]\`, \`k = 3\`
  Output: \`[3, 2, 1, 4, 5]\`

Constraints:
  - The number of nodes in the list is \`n\`
  - \`1 <= k <= n <= 5000\`
  - \`0 <= Node.val <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [2, 1, 4, 3, 5],
        inputDisplay: 'head = [1, 2, 3, 4, 5], k = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 3],
        expectedOutput: [3, 2, 1, 4, 5],
        inputDisplay: 'head = [1, 2, 3, 4, 5], k = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5], 1],
        expectedOutput: [1, 2, 3, 4, 5],
        inputDisplay: 'head = [1, 2, 3, 4, 5], k = 1',
      },
      {
        inputArgs: [[1], 1],
        expectedOutput: [1],
        inputDisplay: 'head = [1], k = 1',
      },
      {
        inputArgs: [[1, 2, 3, 4], 2],
        expectedOutput: [2, 1, 4, 3],
        inputDisplay: 'head = [1, 2, 3, 4], k = 2',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6], 3],
        expectedOutput: [3, 2, 1, 6, 5, 4],
        inputDisplay: 'head = [1, 2, 3, 4, 5, 6], k = 3',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 5],
        expectedOutput: [5, 4, 3, 2, 1],
        inputDisplay: 'head = [1, 2, 3, 4, 5], k = 5',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7, 8], 3],
        expectedOutput: [3, 2, 1, 6, 5, 4, 7, 8],
        inputDisplay: 'head = [1, 2, 3, 4, 5, 6, 7, 8], k = 3',
      },
    ],
    starterCode: {
      python: `def reverseKGroup(head: ListNode, k: int) -> ListNode:
    pass
`,
      javascript: `function reverseKGroup(head, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Iterative K-Reversal', isBest: true },
      { complexity: 'O(n)', name: 'Recursive', isBest: false, hint: 'An iterative approach avoids O(n/k) stack frames' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1), Math.max(2, Math.floor(Math.sqrt(n)))],
    },
  },
];
