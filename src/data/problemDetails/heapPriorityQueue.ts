import type { ProblemDetail } from '../../types';

export const heapPriorityQueueDetails: ProblemDetail[] = [
  {
    problemId: 64,
    functionName: 'KthLargest',
    mode: 'class',
    className: 'KthLargest',
    description: `Design a class to find the \`k-th\` largest element in a stream. Note that it is the \`k-th\` largest element in the sorted order, not the \`k-th\` distinct element.

Implement \`KthLargest\` class:
- \`KthLargest(int k, int[] nums)\` — Initializes the object with the integer \`k\` and the stream of integers \`nums\`.
- \`int add(int val)\` — Appends the integer \`val\` to the stream and returns the element representing the \`k-th\` largest element in the stream.

Examples:
  Input: ["KthLargest","add","add","add","add","add"]
         [[3,[4,5,8,2]],[3],[5],[10],[9],[4]]
  Output: [null,4,5,5,8,8]

Constraints:
  - \`1 <= k <= 10^4\`
  - \`0 <= nums.length <= 10^4\`
  - \`-10^4 <= nums[i] <= 10^4\`
  - \`-10^4 <= val <= 10^4\`
  - At most \`10^4\` calls will be made to \`add\`
  - It is guaranteed that there will be at least \`k\` elements when you search for the \`k-th\` element`,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['KthLargest', 'add', 'add', 'add', 'add', 'add'],
        operationArgs: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
        expected: [null, 4, 5, 5, 8, 8],
        inputDisplay: '["KthLargest","add","add","add","add","add"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['KthLargest', 'add', 'add', 'add', 'add'],
        operationArgs: [[1, []], [-3], [-2], [-4], [0]],
        expected: [null, -3, -2, -2, 0],
        inputDisplay: '["KthLargest","add","add","add","add"]\n[[1,[]],[-3],[-2],[-4],[0]]',
      },
      {
        operations: ['KthLargest', 'add', 'add', 'add', 'add'],
        operationArgs: [[2, [0]], [-1], [1], [-2], [3]],
        expected: [null, -1, 0, 0, 1],
        inputDisplay: '["KthLargest","add","add","add","add"]\n[[2,[0]],[-1],[1],[-2],[3]]',
      },
      {
        operations: ['KthLargest', 'add', 'add', 'add'],
        operationArgs: [[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9]],
        expected: [null, 7, 7, 7],
        inputDisplay: '["KthLargest","add","add","add"]\n[[4,[7,7,7,7,8,3]],[2],[10],[9]]',
      },
    ],
    starterCode: {
      python: `class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        pass

    def add(self, val: int) -> int:
        pass
`,
      javascript: `class KthLargest {
    constructor(k, nums) {

    }

    add(val) {

    }
}
`,
    },
    solutions: [
      { complexity: 'O(n log k)', name: 'Min-Heap of Size k', isBest: true },
      { complexity: 'O(n log n)', name: 'Sort on Each Add', isBest: false, hint: 'Maintain a min-heap of size k — the root is always the k-th largest.' },
    ],
  },
  {
    problemId: 65,
    functionName: 'lastStoneWeight',
    description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i-th\` stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:
- If \`x == y\`, both stones are destroyed, and
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return \`0\`.

Examples:
  Input: \`stones = [2,7,4,1,8,1]\`
  Output: \`1\`

  Input: \`stones = [1]\`
  Output: \`1\`

Constraints:
  - \`1 <= stones.length <= 30\`
  - \`1 <= stones[i] <= 1000\``,
    sampleTestCases: [
      {
        inputArgs: [[2, 7, 4, 1, 8, 1]],
        expectedOutput: 1,
        inputDisplay: 'stones = [2, 7, 4, 1, 8, 1]',
      },
      {
        inputArgs: [[1]],
        expectedOutput: 1,
        inputDisplay: 'stones = [1]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[2, 2]],
        expectedOutput: 0,
        inputDisplay: 'stones = [2, 2]',
      },
      {
        inputArgs: [[10, 4, 2, 10]],
        expectedOutput: 2,
        inputDisplay: 'stones = [10, 4, 2, 10]',
      },
      {
        inputArgs: [[1, 3]],
        expectedOutput: 2,
        inputDisplay: 'stones = [1, 3]',
      },
      {
        inputArgs: [[3, 7, 2]],
        expectedOutput: 2,
        inputDisplay: 'stones = [3, 7, 2]',
      },
      {
        inputArgs: [[5, 5, 5, 5]],
        expectedOutput: 0,
        inputDisplay: 'stones = [5, 5, 5, 5]',
      },
    ],
    starterCode: {
      python: `def lastStoneWeight(stones: list[int]) -> int:
    pass
`,
      javascript: `function lastStoneWeight(stones) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log n)', name: 'Max-Heap', isBest: true },
      { complexity: 'O(n^2)', name: 'Sort Each Round', isBest: false, hint: 'Use a max-heap to efficiently get the two heaviest stones each round.' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 1000) + 1)],
    },
  },
  {
    problemId: 66,
    functionName: 'kClosest',
    compareType: 'unorderedArray',
    description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance (\`sqrt(x1^2 + y1^2)\`).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Examples:
  Input: \`points = [[1,3],[-2,2]]\`, \`k = 1\`
  Output: \`[[-2,2]]\`

  Input: \`points = [[3,3],[5,-1],[-2,4]]\`, \`k = 2\`
  Output: \`[[3,3],[-2,4]]\`

Constraints:
  - \`1 <= k <= points.length <= 10^4\`
  - \`-10^4 <= xi, yi <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[[1, 3], [-2, 2]], 1],
        expectedOutput: [[-2, 2]],
        inputDisplay: 'points = [[1,3],[-2,2]], k = 1',
      },
      {
        inputArgs: [[[3, 3], [5, -1], [-2, 4]], 2],
        expectedOutput: [[3, 3], [-2, 4]],
        inputDisplay: 'points = [[3,3],[5,-1],[-2,4]], k = 2',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0, 1], [1, 0]], 2],
        expectedOutput: [[0, 1], [1, 0]],
        inputDisplay: 'points = [[0,1],[1,0]], k = 2',
      },
      {
        inputArgs: [[[1, 1], [2, 2], [3, 3]], 1],
        expectedOutput: [[1, 1]],
        inputDisplay: 'points = [[1,1],[2,2],[3,3]], k = 1',
      },
      {
        inputArgs: [[[-5, 4], [-3, -2], [0, 1], [1, 5], [3, -1]], 3],
        expectedOutput: [[0, 1], [3, -1], [-3, -2]],
        inputDisplay: 'points = [[-5,4],[-3,-2],[0,1],[1,5],[3,-1]], k = 3',
      },
      {
        inputArgs: [[[2, 2]], 1],
        expectedOutput: [[2, 2]],
        inputDisplay: 'points = [[2,2]], k = 1',
      },
    ],
    starterCode: {
      python: `def kClosest(points: list[list[int]], k: int) -> list[list[int]]:
    pass
`,
      javascript: `function kClosest(points, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n log k)', name: 'Max-Heap of Size k', isBest: true },
      { complexity: 'O(n log n)', name: 'Sort by Distance', isBest: false, hint: 'A max-heap of size k avoids sorting the entire array.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const points = Array.from({ length: n }, () => [
          Math.floor(Math.random() * 2001) - 1000,
          Math.floor(Math.random() * 2001) - 1000,
        ]);
        return [points, Math.floor(n / 2)];
      },
    },
  },
  {
    problemId: 67,
    functionName: 'findKthLargest',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k-th\` largest element in the array.

Note that it is the \`k-th\` largest element in the sorted order, not the \`k-th\` distinct element.

Can you solve it without sorting?

Examples:
  Input: \`nums = [3,2,1,5,6,4]\`, \`k = 2\`
  Output: \`5\`

  Input: \`nums = [3,2,3,1,2,4,5,5,6]\`, \`k = 4\`
  Output: \`4\`

Constraints:
  - \`1 <= k <= nums.length <= 10^5\`
  - \`-10^4 <= nums[i] <= 10^4\``,
    sampleTestCases: [
      {
        inputArgs: [[3, 2, 1, 5, 6, 4], 2],
        expectedOutput: 5,
        inputDisplay: 'nums = [3, 2, 1, 5, 6, 4], k = 2',
      },
      {
        inputArgs: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
        expectedOutput: 4,
        inputDisplay: 'nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[1], 1],
        expectedOutput: 1,
        inputDisplay: 'nums = [1], k = 1',
      },
      {
        inputArgs: [[1, 2, 3, 4, 5], 3],
        expectedOutput: 3,
        inputDisplay: 'nums = [1, 2, 3, 4, 5], k = 3',
      },
      {
        inputArgs: [[7, 6, 5, 4, 3, 2, 1], 5],
        expectedOutput: 3,
        inputDisplay: 'nums = [7, 6, 5, 4, 3, 2, 1], k = 5',
      },
      {
        inputArgs: [[1, 1, 1, 1], 2],
        expectedOutput: 1,
        inputDisplay: 'nums = [1, 1, 1, 1], k = 2',
      },
      {
        inputArgs: [[-1, -2, -3, -4], 1],
        expectedOutput: -1,
        inputDisplay: 'nums = [-1, -2, -3, -4], k = 1',
      },
    ],
    starterCode: {
      python: `def findKthLargest(nums: list[int], k: int) -> int:
    pass
`,
      javascript: `function findKthLargest(nums, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Quickselect', isBest: true },
      { complexity: 'O(n log k)', name: 'Min-Heap of Size k', isBest: false, hint: 'Use quickselect or a min-heap of size k to avoid fully sorting.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => [Array.from({ length: n }, () => Math.floor(Math.random() * 20001) - 10000), Math.floor(n / 2)],
    },
  },
  {
    problemId: 68,
    functionName: 'leastInterval',
    description: `You are given an array of CPU \`tasks\`, each represented by a single character letter, and a cooling interval \`n\`. Each cycle or interval allows completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least \`n\` intervals.

Return the minimum number of intervals the CPU will take to finish all the given tasks.

Examples:
  Input: \`tasks = ["A","A","A","B","B","B"]\`, \`n = 2\`
  Output: \`8\`

  Input: \`tasks = ["A","C","A","B","D","B"]\`, \`n = 1\`
  Output: \`6\`

  Input: \`tasks = ["A","A","A","B","B","B"]\`, \`n = 3\`
  Output: \`10\`

Constraints:
  - \`1 <= tasks.length <= 10^4\`
  - \`tasks[i]\` is an uppercase English letter
  - \`0 <= n <= 100\``,
    sampleTestCases: [
      {
        inputArgs: [['A', 'A', 'A', 'B', 'B', 'B'], 2],
        expectedOutput: 8,
        inputDisplay: 'tasks = ["A","A","A","B","B","B"], n = 2',
      },
      {
        inputArgs: [['A', 'C', 'A', 'B', 'D', 'B'], 1],
        expectedOutput: 6,
        inputDisplay: 'tasks = ["A","C","A","B","D","B"], n = 1',
      },
      {
        inputArgs: [['A', 'A', 'A', 'B', 'B', 'B'], 3],
        expectedOutput: 10,
        inputDisplay: 'tasks = ["A","A","A","B","B","B"], n = 3',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [['A'], 0],
        expectedOutput: 1,
        inputDisplay: 'tasks = ["A"], n = 0',
      },
      {
        inputArgs: [['A', 'A', 'A'], 2],
        expectedOutput: 7,
        inputDisplay: 'tasks = ["A","A","A"], n = 2',
      },
      {
        inputArgs: [['A', 'B', 'A', 'B'], 2],
        expectedOutput: 5,
        inputDisplay: 'tasks = ["A","B","A","B"], n = 2',
      },
      {
        inputArgs: [['A', 'A', 'A', 'B', 'B', 'B'], 0],
        expectedOutput: 6,
        inputDisplay: 'tasks = ["A","A","A","B","B","B"], n = 0',
      },
      {
        inputArgs: [['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 1],
        expectedOutput: 12,
        inputDisplay: 'tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 1',
      },
    ],
    starterCode: {
      python: `def leastInterval(tasks: list[str], n: int) -> int:
    pass
`,
      javascript: `function leastInterval(tasks, n) {

}
`,
    },
    solutions: [
      { complexity: 'O(n)', name: 'Greedy / Math Formula', isBest: true },
      { complexity: 'O(n log n)', name: 'Max-Heap Simulation', isBest: false, hint: 'The answer depends on the max frequency and how many tasks share it.' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const tasks = Array.from({ length: n }, () => letters[Math.floor(Math.random() * 26)]);
        return [tasks, 2];
      },
    },
  },
  {
    problemId: 69,
    functionName: 'Twitter',
    mode: 'class',
    className: 'Twitter',
    description: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and retrieve the 10 most recent tweet IDs in the user's news feed.

Implement the \`Twitter\` class:
- \`Twitter()\` — Initializes your twitter object.
- \`void postTweet(int userId, int tweetId)\` — Composes a new tweet with ID \`tweetId\` by the user \`userId\`. Each call to this function will be made with a unique \`tweetId\`.
- \`List<int> getNewsFeed(int userId)\` — Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themselves. Tweets must be ordered from most recent to least recent.
- \`void follow(int followerId, int followeeId)\` — The user with ID \`followerId\` started following the user with ID \`followeeId\`.
- \`void unfollow(int followerId, int followeeId)\` — The user with ID \`followerId\` started unfollowing the user with ID \`followeeId\`.

Examples:
  Input: ["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]
         [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]
  Output: [null,null,[5],null,null,[6,5],null,[5]]

Constraints:
  - \`1 <= userId, followerId, followeeId <= 500\`
  - \`0 <= tweetId <= 10^4\`
  - All tweets have unique IDs
  - At most \`3 * 10^4\` calls to \`postTweet\`, \`getNewsFeed\`, \`follow\`, and \`unfollow\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['Twitter', 'postTweet', 'getNewsFeed', 'follow', 'postTweet', 'getNewsFeed', 'unfollow', 'getNewsFeed'],
        operationArgs: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
        expected: [null, null, [5], null, null, [6, 5], null, [5]],
        inputDisplay: '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['Twitter', 'postTweet', 'postTweet', 'postTweet', 'getNewsFeed'],
        operationArgs: [[], [1, 1], [1, 2], [1, 3], [1]],
        expected: [null, null, null, null, [3, 2, 1]],
        inputDisplay: '["Twitter","postTweet","postTweet","postTweet","getNewsFeed"]\n[[],[1,1],[1,2],[1,3],[1]]',
      },
      {
        operations: ['Twitter', 'postTweet', 'postTweet', 'follow', 'getNewsFeed', 'unfollow', 'getNewsFeed'],
        operationArgs: [[], [1, 1], [2, 2], [1, 2], [1], [1, 2], [1]],
        expected: [null, null, null, null, [2, 1], null, [1]],
        inputDisplay: '["Twitter","postTweet","postTweet","follow","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,1],[2,2],[1,2],[1],[1,2],[1]]',
      },
      {
        operations: ['Twitter', 'postTweet', 'follow', 'getNewsFeed'],
        operationArgs: [[], [1, 5], [1, 1], [1]],
        expected: [null, null, null, [5]],
        inputDisplay: '["Twitter","postTweet","follow","getNewsFeed"]\n[[],[1,5],[1,1],[1]]',
      },
      {
        operations: ['Twitter', 'getNewsFeed'],
        operationArgs: [[], [1]],
        expected: [null, []],
        inputDisplay: '["Twitter","getNewsFeed"]\n[[],[1]]',
      },
    ],
    starterCode: {
      python: `class Twitter:
    def __init__(self):
        pass

    def postTweet(self, userId: int, tweetId: int) -> None:
        pass

    def getNewsFeed(self, userId: int) -> list[int]:
        pass

    def follow(self, followerId: int, followeeId: int) -> None:
        pass

    def unfollow(self, followerId: int, followeeId: int) -> None:
        pass
`,
      javascript: `class Twitter {
    constructor() {

    }

    postTweet(userId, tweetId) {

    }

    getNewsFeed(userId) {

    }

    follow(followerId, followeeId) {

    }

    unfollow(followerId, followeeId) {

    }
}
`,
    },
    solutions: [
      { complexity: 'O(k log k)', name: 'HashMap + Min-Heap Merge', isBest: true },
      { complexity: 'O(n log n)', name: 'Collect and Sort All Tweets', isBest: false, hint: 'Use a heap to merge the k most recent tweet lists from followed users.' },
    ],
  },
  {
    problemId: 70,
    functionName: 'MedianFinder',
    mode: 'class',
    className: 'MedianFinder',
    description: `The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the \`MedianFinder\` class:
- \`MedianFinder()\` — Initializes the \`MedianFinder\` object.
- \`void addNum(int num)\` — Adds the integer \`num\` from the data stream to the data structure.
- \`double findMedian()\` — Returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.

Examples:
  Input: ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
         [[],[1],[2],[],[3],[]]
  Output: [null,null,null,1.5,null,2.0]

Constraints:
  - \`-10^5 <= num <= 10^5\`
  - There will be at least one element before calling \`findMedian\`
  - At most \`5 * 10^4\` calls to \`addNum\` and \`findMedian\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
        operationArgs: [[], [1], [2], [], [3], []],
        expected: [null, null, null, 1.5, null, 2.0],
        inputDisplay: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['MedianFinder', 'addNum', 'findMedian'],
        operationArgs: [[], [42], []],
        expected: [null, null, 42.0],
        inputDisplay: '["MedianFinder","addNum","findMedian"]\n[[],[42],[]]',
      },
      {
        operations: ['MedianFinder', 'addNum', 'addNum', 'addNum', 'addNum', 'findMedian'],
        operationArgs: [[], [1], [2], [3], [4], []],
        expected: [null, null, null, null, null, 2.5],
        inputDisplay: '["MedianFinder","addNum","addNum","addNum","addNum","findMedian"]\n[[],[1],[2],[3],[4],[]]',
      },
      {
        operations: ['MedianFinder', 'addNum', 'addNum', 'addNum', 'findMedian'],
        operationArgs: [[], [-1], [-2], [-3], []],
        expected: [null, null, null, null, -2.0],
        inputDisplay: '["MedianFinder","addNum","addNum","addNum","findMedian"]\n[[],[-1],[-2],[-3],[]]',
      },
      {
        operations: ['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
        operationArgs: [[], [6], [], [10], [], [2], [], [6], []],
        expected: [null, null, 6.0, null, 8.0, null, 6.0, null, 6.0],
        inputDisplay: '["MedianFinder","addNum","findMedian","addNum","findMedian","addNum","findMedian","addNum","findMedian"]\n[[],[6],[],[10],[],[2],[],[6],[]]',
      },
    ],
    starterCode: {
      python: `class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass
`,
      javascript: `class MedianFinder {
    constructor() {

    }

    addNum(num) {

    }

    findMedian() {

    }
}
`,
    },
    solutions: [
      { complexity: 'O(log n)', name: 'Two Heaps (Max + Min)', isBest: true },
      { complexity: 'O(n)', name: 'Insertion Sort / Sorted List', isBest: false, hint: 'Use a max-heap for the lower half and a min-heap for the upper half.' },
    ],
  },
];
