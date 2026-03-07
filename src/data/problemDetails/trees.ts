import type { ProblemDetail } from '../../types';

function generateBalancedBST(n: number): (number | null)[] {
  const result: (number | null)[] = [];
  const build = (lo: number, hi: number, idx: number) => {
    if (lo > hi) return;
    while (result.length <= idx) result.push(null);
    const mid = (lo + hi) >>> 1;
    result[idx] = mid;
    build(lo, mid - 1, 2 * idx + 1);
    build(mid + 1, hi, 2 * idx + 2);
  };
  build(0, n - 1, 0);
  while (result.length > 0 && result[result.length - 1] === null) result.pop();
  return result;
}

export const treesDetails: ProblemDetail[] = [
  {
    problemId: 46,
    functionName: 'invertTree',
    inputTypes: ['tree'],
    outputType: 'tree',
    description: `Given the \`root\` of a binary tree, invert the tree and return its root.

Examples:
  Input: \`root = [4, 2, 7, 1, 3, 6, 9]\`
  Output: \`[4, 7, 2, 9, 6, 3, 1]\`

  Input: \`root = [2, 1, 3]\`
  Output: \`[2, 3, 1]\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 100]\`
  - \`-100 <= Node.val <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[4, 2, 7, 1, 3, 6, 9]],
        expectedOutput: [4, 7, 2, 9, 6, 3, 1],
        inputDisplay: 'root = [4, 2, 7, 1, 3, 6, 9]',
      },
      {
        inputArgs: [[2, 1, 3]],
        expectedOutput: [2, 3, 1],
        inputDisplay: 'root = [2, 1, 3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'root = []',
      },
      {
        inputArgs: [[1]],
        expectedOutput: [1],
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: [1, null, 2],
        inputDisplay: 'root = [1, 2]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: [1, 3, 2, 7, 6, 5, 4],
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invertTree(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function invertTree(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Recursive DFS', isBest: true },
      { complexity: 'O(n)', name: 'Iterative BFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 47,
    functionName: 'maxDepth',
    inputTypes: ['tree'],
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Examples:
  Input: \`root = [3, 9, 20, null, null, 15, 7]\`
  Output: \`3\`

  Input: \`root = [1, null, 2]\`
  Output: \`2\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 10^4]\`
  - \`-100 <= Node.val <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 9, 20, null, null, 15, 7]],
        expectedOutput: 3,
        inputDisplay: 'root = [3, 9, 20, null, null, 15, 7]',
      },
      {
        inputArgs: [[1, null, 2]],
        expectedOutput: 2,
        inputDisplay: 'root = [1, null, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: 0,
        inputDisplay: 'root = []',
      },
      {
        inputArgs: [[0]],
        expectedOutput: 1,
        inputDisplay: 'root = [0]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 3,
        inputDisplay: 'root = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: 3,
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function maxDepth(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Recursive DFS', isBest: true },
      { complexity: 'O(n)', name: 'Iterative BFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 48,
    functionName: 'diameterOfBinaryTree',
    inputTypes: ['tree'],
    description: `Given the \`root\` of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.

The length of a path between two nodes is represented by the number of edges between them.

Examples:
  Input: \`root = [1, 2, 3, 4, 5]\`
  Output: \`3\`
  Explanation: 3 is the length of the path [4, 2, 1, 3] or [5, 2, 1, 3].

  Input: \`root = [1, 2]\`
  Output: \`1\`

Constraints:
  - The number of nodes in the tree is in the range \`[1, 10^4]\`
  - \`-100 <= Node.val <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, 4, 5]],
        expectedOutput: 3,
        inputDisplay: 'root = [1, 2, 3, 4, 5]',
      },
      {
        inputArgs: [[1, 2]],
        expectedOutput: 1,
        inputDisplay: 'root = [1, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 0,
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: 2,
        inputDisplay: 'root = [1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: 4,
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameterOfBinaryTree(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function diameterOfBinaryTree(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'DFS', isBest: true },
      { complexity: 'O(n\u00B2)', name: 'Brute Force', isBest: false, hint: 'Track the diameter while computing depth in a single DFS pass' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 49,
    functionName: 'isBalanced',
    inputTypes: ['tree'],
    description: `Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

Examples:
  Input: \`root = [3, 9, 20, null, null, 15, 7]\`
  Output: \`true\`

  Input: \`root = [1, 2, 2, 3, 3, null, null, 4, 4]\`
  Output: \`false\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 5000]\`
  - \`-10^4 <= Node.val <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 9, 20, null, null, 15, 7]],
        expectedOutput: true,
        inputDisplay: 'root = [3, 9, 20, null, null, 15, 7]',
      },
      {
        inputArgs: [[1, 2, 2, 3, 3, null, null, 4, 4]],
        expectedOutput: false,
        inputDisplay: 'root = [1, 2, 2, 3, 3, null, null, 4, 4]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: true,
        inputDisplay: 'root = []',
      },
      {
        inputArgs: [[1]],
        expectedOutput: true,
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: true,
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
      {
        inputArgs: [[1, 2, null, 3, null, 4]],
        expectedOutput: false,
        inputDisplay: 'root = [1, 2, null, 3, null, 4]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isBalanced(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isBalanced(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Bottom-Up DFS', isBest: true },
      { complexity: 'O(n\u00B2)', name: 'Top-Down', isBest: false, hint: 'Compute height bottom-up and check balance in a single pass' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 50,
    functionName: 'isSameTree',
    inputTypes: ['tree', 'tree'],
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Examples:
  Input: \`p = [1, 2, 3]\`, \`q = [1, 2, 3]\`
  Output: \`true\`

  Input: \`p = [1, 2]\`, \`q = [1, null, 2]\`
  Output: \`false\`

Constraints:
  - The number of nodes in both trees is in the range \`[0, 100]\`
  - \`-10^4 <= Node.val <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3], [1, 2, 3]],
        expectedOutput: true,
        inputDisplay: 'p = [1, 2, 3], q = [1, 2, 3]',
      },
      {
        inputArgs: [[1, 2], [1, null, 2]],
        expectedOutput: false,
        inputDisplay: 'p = [1, 2], q = [1, null, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[], []],
        expectedOutput: true,
        inputDisplay: 'p = [], q = []',
      },
      {
        inputArgs: [[1], []],
        expectedOutput: false,
        inputDisplay: 'p = [1], q = []',
      },
      {
        inputArgs: [[1, 2, 1], [1, 1, 2]],
        expectedOutput: false,
        inputDisplay: 'p = [1, 2, 1], q = [1, 1, 2]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        expectedOutput: true,
        inputDisplay: 'p = [1, 2, 3, 4, 5], q = [1, 2, 3, 4, 5]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSameTree(p, q):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isSameTree(p, q) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Recursive DFS', isBest: true },
      { complexity: 'O(n)', name: 'Iterative BFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => {
        const tree = Array.from({ length: n }, (_, i) => i + 1);
        return [tree, tree];
      },
    },
  },
  {
    problemId: 51,
    functionName: 'isSubtree',
    inputTypes: ['tree', 'tree'],
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

A subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.

Examples:
  Input: \`root = [3, 4, 5, 1, 2]\`, \`subRoot = [4, 1, 2]\`
  Output: \`true\`

  Input: \`root = [3, 4, 5, 1, 2, null, null, null, null, 0]\`, \`subRoot = [4, 1, 2]\`
  Output: \`false\`

Constraints:
  - The number of nodes in the \`root\` tree is in the range \`[1, 2000]\`
  - The number of nodes in the \`subRoot\` tree is in the range \`[1, 1000]\`
  - \`-10^4 <= root.val <= 10^4\`
  - \`-10^4 <= subRoot.val <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 4, 5, 1, 2], [4, 1, 2]],
        expectedOutput: true,
        inputDisplay: 'root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]',
      },
      {
        inputArgs: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]],
        expectedOutput: false,
        inputDisplay: 'root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 1], [1]],
        expectedOutput: true,
        inputDisplay: 'root = [1, 1], subRoot = [1]',
      },
      {
        inputArgs: [[1, 2, 3], [2]],
        expectedOutput: true,
        inputDisplay: 'root = [1, 2, 3], subRoot = [2]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], [1, 2, 3]],
        expectedOutput: false,
        inputDisplay: 'root = [1, 2, 3, 4, 5], subRoot = [1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3], [1, 2, 3]],
        expectedOutput: true,
        inputDisplay: 'root = [1, 2, 3], subRoot = [1, 2, 3]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSubtree(root, subRoot):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isSubtree(root, subRoot) {

}
`,
    },
    solutions: [
      { complexity: 'O(m + n)', name: 'Tree Hashing', isBest: true },
      { complexity: 'O(m * n)', name: 'DFS Comparison', isBest: false, hint: 'Serialize or hash subtrees for O(1) comparison' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => {
        const tree = Array.from({ length: n }, (_, i) => i + 1);
        const sub = Array.from({ length: Math.max(1, n >>> 2) }, (_, i) => i + 1);
        return [tree, sub];
      },
    },
  },
  {
    problemId: 52,
    functionName: 'lowestCommonAncestor',
    inputTypes: ['tree', 'value', 'value'],
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in the tree that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself).

Given integer values \`p\` and \`q\`, return the value of their LCA.

Examples:
  Input: \`root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]\`, \`p = 2\`, \`q = 8\`
  Output: \`6\`

  Input: \`root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]\`, \`p = 2\`, \`q = 4\`
  Output: \`2\`

Constraints:
  - The number of nodes in the tree is in the range \`[2, 10^5]\`
  - \`-10^9 <= Node.val <= 10^9\`
  - All \`Node.val\` are unique
  - \`p != q\`
  - \`p\` and \`q\` will exist in the BST`,
    sampleTestCases: [
      {
        inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8],
        expectedOutput: 6,
        inputDisplay: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8',
      },
      {
        inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4],
        expectedOutput: 2,
        inputDisplay: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 0, 5],
        expectedOutput: 2,
        inputDisplay: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 0, q = 5',
      },
      {
        inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 3, 5],
        expectedOutput: 4,
        inputDisplay: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 3, q = 5',
      },
      {
        inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 7, 9],
        expectedOutput: 8,
        inputDisplay: 'root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 7, q = 9',
      },
      {
        inputArgs: [[2, 1], 2, 1],
        expectedOutput: 2,
        inputDisplay: 'root = [2, 1], p = 2, q = 1',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(root, p, q):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function lowestCommonAncestor(root, p, q) {

}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Iterative BST', isBest: true },
      { complexity: 'O(n)', name: 'Recursive Generic', isBest: false, hint: 'Use BST property: go left if both values are smaller, right if both larger' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [generateBalancedBST(n), 0, n - 1],
    },
  },
  {
    problemId: 53,
    functionName: 'levelOrder',
    inputTypes: ['tree'],
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

Examples:
  Input: \`root = [3, 9, 20, null, null, 15, 7]\`
  Output: \`[[3], [9, 20], [15, 7]]\`

  Input: \`root = [1]\`
  Output: \`[[1]]\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 2000]\`
  - \`-1000 <= Node.val <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 9, 20, null, null, 15, 7]],
        expectedOutput: [[3], [9, 20], [15, 7]],
        inputDisplay: 'root = [3, 9, 20, null, null, 15, 7]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: [[1]],
        inputDisplay: 'root = [1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'root = []',
      },
      {
        inputArgs: [[3, 9, 20]],
        expectedOutput: [[3], [9, 20]],
        inputDisplay: 'root = [3, 9, 20]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: [[1], [2, 3], [4, 5, 6, 7]],
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function levelOrder(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'BFS Queue', isBest: true },
      { complexity: 'O(n)', name: 'DFS with Level Tracking', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 54,
    functionName: 'rightSideView',
    inputTypes: ['tree'],
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.

Examples:
  Input: \`root = [1, 2, 3, null, 5, null, 4]\`
  Output: \`[1, 3, 4]\`

  Input: \`root = [1, null, 3]\`
  Output: \`[1, 3]\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 100]\`
  - \`-100 <= Node.val <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, null, 5, null, 4]],
        expectedOutput: [1, 3, 4],
        inputDisplay: 'root = [1, 2, 3, null, 5, null, 4]',
      },
      {
        inputArgs: [[1, null, 3]],
        expectedOutput: [1, 3],
        inputDisplay: 'root = [1, null, 3]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'root = []',
      },
      {
        inputArgs: [[1]],
        expectedOutput: [1],
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[1, 2, 3, 4]],
        expectedOutput: [1, 3, 4],
        inputDisplay: 'root = [1, 2, 3, 4]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: [1, 3, 7],
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def rightSideView(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function rightSideView(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'BFS (Last per Level)', isBest: true },
      { complexity: 'O(n)', name: 'DFS (Right First)', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
  {
    problemId: 55,
    functionName: 'goodNodes',
    inputTypes: ['tree'],
    description: `Given a binary tree \`root\`, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

Examples:
  Input: \`root = [3, 1, 4, 3, null, 1, 5]\`
  Output: \`4\`
  Explanation: Root 3 is always good. Node 4 (3 <= 4). Node 3 at depth 2 (3 <= 3). Node 5 (3 <= 4 <= 5).

  Input: \`root = [3, 3, null, 4, 2]\`
  Output: \`3\`
  Explanation: Root 3, node 3, and node 4 are good.

Constraints:
  - The number of nodes in the binary tree is in the range \`[1, 10^5]\`
  - \`-10^4 <= Node.val <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 1, 4, 3, null, 1, 5]],
        expectedOutput: 4,
        inputDisplay: 'root = [3, 1, 4, 3, null, 1, 5]',
      },
      {
        inputArgs: [[3, 3, null, 4, 2]],
        expectedOutput: 3,
        inputDisplay: 'root = [3, 3, null, 4, 2]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[2, 1, 3]],
        expectedOutput: 2,
        inputDisplay: 'root = [2, 1, 3]',
      },
      {
        inputArgs: [[1, 1, 1, 1, 1]],
        expectedOutput: 5,
        inputDisplay: 'root = [1, 1, 1, 1, 1]',
      },
      {
        inputArgs: [[9, 3, 6]],
        expectedOutput: 1,
        inputDisplay: 'root = [9, 3, 6]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def goodNodes(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function goodNodes(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'DFS with Max Tracking', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 2001) - 1000)],
    },
  },
  {
    problemId: 56,
    functionName: 'isValidBST',
    inputTypes: ['tree'],
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Examples:
  Input: \`root = [2, 1, 3]\`
  Output: \`true\`

  Input: \`root = [5, 1, 4, null, null, 3, 6]\`
  Output: \`false\`
  Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:
  - The number of nodes in the tree is in the range \`[1, 10^4]\`
  - \`-2^31 <= Node.val <= 2^31 - 1\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 1, 3]],
        expectedOutput: true,
        inputDisplay: 'root = [2, 1, 3]',
      },
      {
        inputArgs: [[5, 1, 4, null, null, 3, 6]],
        expectedOutput: false,
        inputDisplay: 'root = [5, 1, 4, null, null, 3, 6]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: true,
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[2, 2, 2]],
        expectedOutput: false,
        inputDisplay: 'root = [2, 2, 2]',
      },
      {
        inputArgs: [[5, 4, 6, null, null, 3, 7]],
        expectedOutput: false,
        inputDisplay: 'root = [5, 4, 6, null, null, 3, 7]',
      },
      {
        inputArgs: [[10, 5, 15, null, null, 6, 20]],
        expectedOutput: false,
        inputDisplay: 'root = [10, 5, 15, null, null, 6, 20]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isValidBST(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'DFS with Bounds', isBest: true },
      { complexity: 'O(n)', name: 'In-Order Traversal', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [generateBalancedBST(n)],
    },
  },
  {
    problemId: 57,
    functionName: 'kthSmallest',
    inputTypes: ['tree', 'value'],
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`k-th\` smallest value (1-indexed) of all the values of the nodes in the tree.

Examples:
  Input: \`root = [3, 1, 4, null, 2]\`, \`k = 1\`
  Output: \`1\`

  Input: \`root = [5, 3, 6, 2, 4, null, null, 1]\`, \`k = 3\`
  Output: \`3\`

Constraints:
  - The number of nodes in the tree is \`n\`
  - \`1 <= k <= n <= 10^4\`
  - \`0 <= Node.val <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 1, 4, null, 2], 1],
        expectedOutput: 1,
        inputDisplay: 'root = [3, 1, 4, null, 2], k = 1',
      },
      {
        inputArgs: [[5, 3, 6, 2, 4, null, null, 1], 3],
        expectedOutput: 3,
        inputDisplay: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: 1,
        inputDisplay: 'root = [1], k = 1',
      },
      {
        inputArgs: [[3, 1, 4, null, 2], 2],
        expectedOutput: 2,
        inputDisplay: 'root = [3, 1, 4, null, 2], k = 2',
      },
      {
        inputArgs: [[3, 1, 4, null, 2], 4],
        expectedOutput: 4,
        inputDisplay: 'root = [3, 1, 4, null, 2], k = 4',
      },
      {
        inputArgs: [[5, 3, 6, 2, 4, null, null, 1], 6],
        expectedOutput: 6,
        inputDisplay: 'root = [5, 3, 6, 2, 4, null, null, 1], k = 6',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kthSmallest(root, k):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function kthSmallest(root, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(h + k)', name: 'Iterative In-Order', isBest: true },
      { complexity: 'O(n)', name: 'Full In-Order', isBest: false, hint: 'Stop the in-order traversal early once you reach the k-th element' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [generateBalancedBST(n), Math.ceil(n / 2)],
    },
  },
  {
    problemId: 58,
    functionName: 'buildTree',
    outputType: 'tree',
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.

Examples:
  Input: \`preorder = [3, 9, 20, 15, 7]\`, \`inorder = [9, 3, 15, 20, 7]\`
  Output: \`[3, 9, 20, null, null, 15, 7]\`

  Input: \`preorder = [-1]\`, \`inorder = [-1]\`
  Output: \`[-1]\`

Constraints:
  - \`1 <= preorder.length <= 3000\`
  - \`inorder.length == preorder.length\`
  - \`-3000 <= preorder[i], inorder[i] <= 3000\`
  - \`preorder\` and \`inorder\` consist of unique values
  - Each value of \`inorder\` also appears in \`preorder\`
  - \`preorder\` is guaranteed to be the preorder traversal of the tree
  - \`inorder\` is guaranteed to be the inorder traversal of the tree`,
    sampleTestCases: [
      {
        inputArgs: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]],
        expectedOutput: [3, 9, 20, null, null, 15, 7],
        inputDisplay: 'preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]',
      },
      {
        inputArgs: [[-1], [-1]],
        expectedOutput: [-1],
        inputDisplay: 'preorder = [-1], inorder = [-1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1, 2, 3], [3, 2, 1]],
        expectedOutput: [1, 2, null, 3],
        inputDisplay: 'preorder = [1, 2, 3], inorder = [3, 2, 1]',
      },
      {
        inputArgs: [[1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7]],
        expectedOutput: [1, 2, 3, 4, 5, 6, 7],
        inputDisplay: 'preorder = [1, 2, 4, 5, 3, 6, 7], inorder = [4, 2, 5, 1, 6, 3, 7]',
      },
      {
        inputArgs: [[1, 2], [2, 1]],
        expectedOutput: [1, 2],
        inputDisplay: 'preorder = [1, 2], inorder = [2, 1]',
      },
      {
        inputArgs: [[1, 2], [1, 2]],
        expectedOutput: [1, null, 2],
        inputDisplay: 'preorder = [1, 2], inorder = [1, 2]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(preorder, inorder):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(preorder, inorder) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Recursive + Hash Map', isBest: true },
      { complexity: 'O(n\u00B2)', name: 'Recursive + Linear Search', isBest: false, hint: 'Use a hash map to find the root index in inorder in O(1)' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => {
        const inorder = Array.from({ length: n }, (_, i) => i);
        const preorder: number[] = [];
        const build = (lo: number, hi: number) => {
          if (lo > hi) return;
          const mid = (lo + hi) >>> 1;
          preorder.push(inorder[mid]);
          build(lo, mid - 1);
          build(mid + 1, hi);
        };
        build(0, n - 1);
        return [preorder, inorder];
      },
    },
  },
  {
    problemId: 59,
    functionName: 'maxPathSum',
    inputTypes: ['tree'],
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum path sum of any non-empty path.

Examples:
  Input: \`root = [1, 2, 3]\`
  Output: \`6\`
  Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

  Input: \`root = [-10, 9, 20, null, null, 15, 7]\`
  Output: \`42\`
  Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

Constraints:
  - The number of nodes in the tree is in the range \`[1, 3 * 10^4]\`
  - \`-1000 <= Node.val <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: 6,
        inputDisplay: 'root = [1, 2, 3]',
      },
      {
        inputArgs: [[-10, 9, 20, null, null, 15, 7]],
        expectedOutput: 42,
        inputDisplay: 'root = [-10, 9, 20, null, null, 15, 7]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[-3]],
        expectedOutput: -3,
        inputDisplay: 'root = [-3]',
      },
      {
        inputArgs: [[2, -1]],
        expectedOutput: 2,
        inputDisplay: 'root = [2, -1]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: 18,
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
      {
        inputArgs: [[-1, -2, -3]],
        expectedOutput: -1,
        inputDisplay: 'root = [-1, -2, -3]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root):
    pass
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function maxPathSum(root) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'DFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 2001) - 1000)],
    },
  },
  {
    problemId: 60,
    mode: 'class',
    className: 'Codec',
    functionName: 'codec_roundtrip',
    inputTypes: ['tree'],
    outputType: 'tree',
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Implement the \`Codec\` class:
- \`serialize(root)\` — Encodes a tree to a single string.
- \`deserialize(data)\` — Decodes your encoded data to tree.

The test will call \`codec_roundtrip(root)\` which creates a \`Codec\` instance, serializes the tree, then deserializes it, and returns the result.

Examples:
  Input: \`root = [1, 2, 3, null, null, 4, 5]\`
  Output: \`[1, 2, 3, null, null, 4, 5]\`

  Input: \`root = []\`
  Output: \`[]\`

Constraints:
  - The number of nodes in the tree is in the range \`[0, 10^4]\`
  - \`-1000 <= Node.val <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[1, 2, 3, null, null, 4, 5]],
        expectedOutput: [1, 2, 3, null, null, 4, 5],
        inputDisplay: 'root = [1, 2, 3, null, null, 4, 5]',
      },
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'root = []',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1]],
        expectedOutput: [1],
        inputDisplay: 'root = [1]',
      },
      {
        inputArgs: [[1, 2, 3]],
        expectedOutput: [1, 2, 3],
        inputDisplay: 'root = [1, 2, 3]',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5, 6, 7]],
        expectedOutput: [1, 2, 3, 4, 5, 6, 7],
        inputDisplay: 'root = [1, 2, 3, 4, 5, 6, 7]',
      },
      {
        inputArgs: [[5, 2, 7, 1, null, 6, 9]],
        expectedOutput: [5, 2, 7, 1, null, 6, 9],
        inputDisplay: 'root = [5, 2, 7, 1, null, 6, 9]',
      },
    ],
    starterCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        pass

    def deserialize(self, data):
        pass

def codec_roundtrip(root):
    codec = Codec()
    return codec.deserialize(codec.serialize(root))
`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Codec {
    serialize(root) {

    }

    deserialize(data) {

    }
}

function codec_roundtrip(root) {
    const codec = new Codec();
    return codec.deserialize(codec.serialize(root));
}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'BFS / Preorder DFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, (_, i) => i + 1)],
    },
  },
];
