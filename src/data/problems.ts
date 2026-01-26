export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category =
  | "Arrays & Hashing"
  | "Two Pointers"
  | "Sliding Window"
  | "Stack"
  | "Binary Search"
  | "Linked List"
  | "Trees"
  | "Tries"
  | "Heap / Priority Queue"
  | "Backtracking"
  | "Graphs"
  | "Advanced Graphs"
  | "1-D Dynamic Programming"
  | "2-D Dynamic Programming"
  | "Greedy"
  | "Intervals"
  | "Math & Geometry"
  | "Bit Manipulation";

export interface Problem {
  id: number;
  name: string;
  difficulty: Difficulty;
  category: Category;
  link: string;
}

export const problems: Problem[] = [
  // ==================== Arrays & Hashing ====================
  {
    id: 1,
    name: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/duplicate-integer",
  },
  {
    id: 2,
    name: "Valid Anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/is-anagram",
  },
  {
    id: 3,
    name: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/two-integer-sum",
  },
  {
    id: 4,
    name: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/anagram-groups",
  },
  {
    id: 5,
    name: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/top-k-elements-in-list",
  },
  {
    id: 6,
    name: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/products-of-array-discluding-self",
  },
  {
    id: 7,
    name: "Valid Sudoku",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/valid-sudoku",
  },
  {
    id: 8,
    name: "Encode and Decode Strings",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/string-encode-and-decode",
  },
  {
    id: 9,
    name: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    link: "https://neetcode.io/problems/longest-consecutive-sequence",
  },

  // ==================== Two Pointers ====================
  {
    id: 10,
    name: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    link: "https://neetcode.io/problems/is-palindrome",
  },
  {
    id: 11,
    name: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    category: "Two Pointers",
    link: "https://neetcode.io/problems/two-integer-sum-ii",
  },
  {
    id: 12,
    name: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    link: "https://neetcode.io/problems/three-integer-sum",
  },
  {
    id: 13,
    name: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    link: "https://neetcode.io/problems/max-water-container",
  },
  {
    id: 14,
    name: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    link: "https://neetcode.io/problems/trapping-rain-water",
  },

  // ==================== Sliding Window ====================
  {
    id: 15,
    name: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/buy-and-sell-crypto",
  },
  {
    id: 16,
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/longest-substring-without-duplicates",
  },
  {
    id: 17,
    name: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/longest-repeating-substring-with-replacement",
  },
  {
    id: 18,
    name: "Permutation in String",
    difficulty: "Medium",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/permutation-string",
  },
  {
    id: 19,
    name: "Minimum Window Substring",
    difficulty: "Hard",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/minimum-window-with-characters",
  },
  {
    id: 20,
    name: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Sliding Window",
    link: "https://neetcode.io/problems/sliding-window-maximum",
  },

  // ==================== Stack ====================
  {
    id: 21,
    name: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    link: "https://neetcode.io/problems/validate-parentheses",
  },
  {
    id: 22,
    name: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    link: "https://neetcode.io/problems/minimum-stack",
  },
  {
    id: 23,
    name: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack",
    link: "https://neetcode.io/problems/evaluate-reverse-polish-notation",
  },
  {
    id: 24,
    name: "Generate Parentheses",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/generate-parentheses",
  },
  {
    id: 25,
    name: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    link: "https://neetcode.io/problems/daily-temperatures",
  },
  {
    id: 26,
    name: "Car Fleet",
    difficulty: "Medium",
    category: "Stack",
    link: "https://neetcode.io/problems/car-fleet",
  },
  {
    id: 27,
    name: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack",
    link: "https://neetcode.io/problems/largest-rectangle-in-histogram",
  },

  // ==================== Binary Search ====================
  {
    id: 28,
    name: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    link: "https://neetcode.io/problems/binary-search",
  },
  {
    id: 29,
    name: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    link: "https://neetcode.io/problems/search-2d-matrix",
  },
  {
    id: 30,
    name: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "Binary Search",
    link: "https://neetcode.io/problems/eating-bananas",
  },
  {
    id: 31,
    name: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    link: "https://neetcode.io/problems/find-minimum-in-rotated-sorted-array",
  },
  {
    id: 32,
    name: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    link: "https://neetcode.io/problems/find-target-in-rotated-sorted-array",
  },
  {
    id: 33,
    name: "Time Based Key-Value Store",
    difficulty: "Medium",
    category: "Binary Search",
    link: "https://neetcode.io/problems/time-based-key-value-store",
  },
  {
    id: 34,
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    link: "https://neetcode.io/problems/median-of-two-sorted-arrays",
  },

  // ==================== Linked List ====================
  {
    id: 35,
    name: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    link: "https://neetcode.io/problems/reverse-a-linked-list",
  },
  {
    id: 36,
    name: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    link: "https://neetcode.io/problems/merge-two-sorted-linked-lists",
  },
  {
    id: 37,
    name: "Reorder List",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/reorder-linked-list",
  },
  {
    id: 38,
    name: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/remove-node-from-end-of-linked-list",
  },
  {
    id: 39,
    name: "Copy List with Random Pointer",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/copy-linked-list-with-random-pointer",
  },
  {
    id: 40,
    name: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/add-two-numbers",
  },
  {
    id: 41,
    name: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    link: "https://neetcode.io/problems/linked-list-cycle-detection",
  },
  {
    id: 42,
    name: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/find-duplicate-integer",
  },
  {
    id: 43,
    name: "LRU Cache",
    difficulty: "Medium",
    category: "Linked List",
    link: "https://neetcode.io/problems/lru-cache",
  },
  {
    id: 44,
    name: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    link: "https://neetcode.io/problems/merge-k-sorted-linked-lists",
  },
  {
    id: 45,
    name: "Reverse Nodes in K-Group",
    difficulty: "Hard",
    category: "Linked List",
    link: "https://neetcode.io/problems/reverse-nodes-in-k-group",
  },

  // ==================== Trees ====================
  {
    id: 46,
    name: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/invert-a-binary-tree",
  },
  {
    id: 47,
    name: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/depth-of-binary-tree",
  },
  {
    id: 48,
    name: "Diameter of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/binary-tree-diameter",
  },
  {
    id: 49,
    name: "Balanced Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/balanced-binary-tree",
  },
  {
    id: 50,
    name: "Same Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/same-binary-tree",
  },
  {
    id: 51,
    name: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "Trees",
    link: "https://neetcode.io/problems/subtree-of-a-binary-tree",
  },
  {
    id: 52,
    name: "Lowest Common Ancestor of a Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree",
  },
  {
    id: 53,
    name: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/level-order-traversal-of-binary-tree",
  },
  {
    id: 54,
    name: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/binary-tree-right-side-view",
  },
  {
    id: 55,
    name: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/count-good-nodes-in-binary-tree",
  },
  {
    id: 56,
    name: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/valid-binary-search-tree",
  },
  {
    id: 57,
    name: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/kth-smallest-integer-in-bst",
  },
  {
    id: 58,
    name: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "Trees",
    link: "https://neetcode.io/problems/binary-tree-from-preorder-and-inorder-traversal",
  },
  {
    id: 59,
    name: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Trees",
    link: "https://neetcode.io/problems/binary-tree-maximum-path-sum",
  },
  {
    id: 60,
    name: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Trees",
    link: "https://neetcode.io/problems/serialize-and-deserialize-binary-tree",
  },

  // ==================== Tries ====================
  {
    id: 61,
    name: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Tries",
    link: "https://neetcode.io/problems/implement-prefix-tree",
  },
  {
    id: 62,
    name: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    category: "Tries",
    link: "https://neetcode.io/problems/design-word-search-data-structure",
  },
  {
    id: 63,
    name: "Word Search II",
    difficulty: "Hard",
    category: "Tries",
    link: "https://neetcode.io/problems/search-for-word-ii",
  },

  // ==================== Heap / Priority Queue ====================
  {
    id: 64,
    name: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/kth-largest-integer-in-a-stream",
  },
  {
    id: 65,
    name: "Last Stone Weight",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/last-stone-weight",
  },
  {
    id: 66,
    name: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/k-closest-points-to-origin",
  },
  {
    id: 67,
    name: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/kth-largest-element-in-an-array",
  },
  {
    id: 68,
    name: "Task Scheduler",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/task-scheduling",
  },
  {
    id: 69,
    name: "Design Twitter",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/design-twitter-feed",
  },
  {
    id: 70,
    name: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "Heap / Priority Queue",
    link: "https://neetcode.io/problems/find-median-in-a-data-stream",
  },

  // ==================== Backtracking ====================
  {
    id: 71,
    name: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/subsets",
  },
  {
    id: 72,
    name: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/combination-target-sum",
  },
  {
    id: 73,
    name: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/permutations",
  },
  {
    id: 74,
    name: "Subsets II",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/subsets-ii",
  },
  {
    id: 75,
    name: "Combination Sum II",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/combination-target-sum-ii",
  },
  {
    id: 76,
    name: "Word Search",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/search-for-word",
  },
  {
    id: 77,
    name: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/palindrome-partitioning",
  },
  {
    id: 78,
    name: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "Backtracking",
    link: "https://neetcode.io/problems/combinations-of-a-phone-number",
  },
  {
    id: 79,
    name: "N-Queens",
    difficulty: "Hard",
    category: "Backtracking",
    link: "https://neetcode.io/problems/n-queens",
  },

  // ==================== Graphs ====================
  {
    id: 80,
    name: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/count-number-of-islands",
  },
  {
    id: 81,
    name: "Clone Graph",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/clone-graph",
  },
  {
    id: 82,
    name: "Max Area of Island",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/max-area-of-island",
  },
  {
    id: 83,
    name: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/pacific-atlantic-water-flow",
  },
  {
    id: 84,
    name: "Surrounded Regions",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/surrounded-regions",
  },
  {
    id: 85,
    name: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/rotting-fruit",
  },
  {
    id: 86,
    name: "Walls and Gates",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/islands-and-treasure",
  },
  {
    id: 87,
    name: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/course-schedule",
  },
  {
    id: 88,
    name: "Course Schedule II",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/course-schedule-ii",
  },
  {
    id: 89,
    name: "Redundant Connection",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/redundant-connection",
  },
  {
    id: 90,
    name: "Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/count-connected-components",
  },
  {
    id: 91,
    name: "Graph Valid Tree",
    difficulty: "Medium",
    category: "Graphs",
    link: "https://neetcode.io/problems/valid-tree",
  },
  {
    id: 92,
    name: "Word Ladder",
    difficulty: "Hard",
    category: "Graphs",
    link: "https://neetcode.io/problems/word-ladder",
  },

  // ==================== Advanced Graphs ====================
  {
    id: 93,
    name: "Reconstruct Itinerary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/reconstruct-flight-path",
  },
  {
    id: 94,
    name: "Min Cost to Connect All Points",
    difficulty: "Medium",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/min-cost-to-connect-points",
  },
  {
    id: 95,
    name: "Network Delay Time",
    difficulty: "Medium",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/network-delay-time",
  },
  {
    id: 96,
    name: "Swim in Rising Water",
    difficulty: "Hard",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/swim-in-rising-water",
  },
  {
    id: 97,
    name: "Alien Dictionary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/foreign-dictionary",
  },
  {
    id: 98,
    name: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "Advanced Graphs",
    link: "https://neetcode.io/problems/cheapest-flight-path",
  },

  // ==================== 1-D Dynamic Programming ====================
  {
    id: 99,
    name: "Climbing Stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/climbing-stairs",
  },
  {
    id: 100,
    name: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/min-cost-climbing-stairs",
  },
  {
    id: 101,
    name: "House Robber",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/house-robber",
  },
  {
    id: 102,
    name: "House Robber II",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/house-robber-ii",
  },
  {
    id: 103,
    name: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/longest-palindromic-substring",
  },
  {
    id: 104,
    name: "Palindromic Substrings",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/palindromic-substrings",
  },
  {
    id: 105,
    name: "Decode Ways",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/decode-ways",
  },
  {
    id: 106,
    name: "Coin Change",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/coin-change",
  },
  {
    id: 107,
    name: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/maximum-product-subarray",
  },
  {
    id: 108,
    name: "Word Break",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/word-break",
  },
  {
    id: 109,
    name: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/longest-increasing-subsequence",
  },
  {
    id: 110,
    name: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    link: "https://neetcode.io/problems/partition-equal-subset-sum",
  },

  // ==================== 2-D Dynamic Programming ====================
  {
    id: 111,
    name: "Unique Paths",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/count-paths",
  },
  {
    id: 112,
    name: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/longest-common-subsequence",
  },
  {
    id: 113,
    name: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/buy-and-sell-crypto-with-cooldown",
  },
  {
    id: 114,
    name: "Coin Change II",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/coin-change-ii",
  },
  {
    id: 115,
    name: "Target Sum",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/target-sum",
  },
  {
    id: 116,
    name: "Interleaving String",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/interleaving-string",
  },
  {
    id: 117,
    name: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/longest-increasing-path-in-matrix",
  },
  {
    id: 118,
    name: "Distinct Subsequences",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/count-subsequences",
  },
  {
    id: 119,
    name: "Edit Distance",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/edit-distance",
  },
  {
    id: 120,
    name: "Burst Balloons",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/burst-balloons",
  },
  {
    id: 121,
    name: "Regular Expression Matching",
    difficulty: "Hard",
    category: "2-D Dynamic Programming",
    link: "https://neetcode.io/problems/regular-expression-matching",
  },

  // ==================== Greedy ====================
  {
    id: 122,
    name: "Maximum Subarray",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/maximum-subarray",
  },
  {
    id: 123,
    name: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/jump-game",
  },
  {
    id: 124,
    name: "Jump Game II",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/jump-game-ii",
  },
  {
    id: 125,
    name: "Gas Station",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/gas-station",
  },
  {
    id: 126,
    name: "Hand of Straights",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/hand-of-straights",
  },
  {
    id: 127,
    name: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/merge-triplets-to-form-target",
  },
  {
    id: 128,
    name: "Partition Labels",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/partition-labels",
  },
  {
    id: 129,
    name: "Valid Parenthesis String",
    difficulty: "Medium",
    category: "Greedy",
    link: "https://neetcode.io/problems/valid-parenthesis-string",
  },

  // ==================== Intervals ====================
  {
    id: 130,
    name: "Insert Interval",
    difficulty: "Medium",
    category: "Intervals",
    link: "https://neetcode.io/problems/insert-new-interval",
  },
  {
    id: 131,
    name: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    link: "https://neetcode.io/problems/merge-intervals",
  },
  {
    id: 132,
    name: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Intervals",
    link: "https://neetcode.io/problems/non-overlapping-intervals",
  },
  {
    id: 133,
    name: "Meeting Rooms",
    difficulty: "Easy",
    category: "Intervals",
    link: "https://neetcode.io/problems/meeting-schedule",
  },
  {
    id: 134,
    name: "Meeting Rooms II",
    difficulty: "Medium",
    category: "Intervals",
    link: "https://neetcode.io/problems/meeting-schedule-ii",
  },
  {
    id: 135,
    name: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    category: "Intervals",
    link: "https://neetcode.io/problems/minimum-interval-including-query",
  },

  // ==================== Math & Geometry ====================
  {
    id: 136,
    name: "Rotate Image",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/rotate-matrix",
  },
  {
    id: 137,
    name: "Spiral Matrix",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/spiral-matrix",
  },
  {
    id: 138,
    name: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/set-zeroes-in-matrix",
  },
  {
    id: 139,
    name: "Happy Number",
    difficulty: "Easy",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/non-cyclical-number",
  },
  {
    id: 140,
    name: "Plus One",
    difficulty: "Easy",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/plus-one",
  },
  {
    id: 141,
    name: "Pow(x, n)",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/pow-x-n",
  },
  {
    id: 142,
    name: "Multiply Strings",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/multiply-strings",
  },
  {
    id: 143,
    name: "Detect Squares",
    difficulty: "Medium",
    category: "Math & Geometry",
    link: "https://neetcode.io/problems/detect-squares",
  },

  // ==================== Bit Manipulation ====================
  {
    id: 144,
    name: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/single-number",
  },
  {
    id: 145,
    name: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/number-of-one-bits",
  },
  {
    id: 146,
    name: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/counting-bits",
  },
  {
    id: 147,
    name: "Reverse Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/reverse-bits",
  },
  {
    id: 148,
    name: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/missing-number",
  },
  {
    id: 149,
    name: "Sum of Two Integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/sum-of-two-integers",
  },
  {
    id: 150,
    name: "Reverse Integer",
    difficulty: "Medium",
    category: "Bit Manipulation",
    link: "https://neetcode.io/problems/reverse-integer",
  },
];

// Helper function to get problems by category
export const getProblemsByCategory = (category: Category): Problem[] => {
  return problems.filter((problem) => problem.category === category);
};

// Helper function to get problems by difficulty
export const getProblemsByDifficulty = (difficulty: Difficulty): Problem[] => {
  return problems.filter((problem) => problem.difficulty === difficulty);
};

// Get all unique categories in order
export const categories: Category[] = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
];

// Get completion stats (completedIds comes from localStorage)
export const getStats = (problemList: Problem[], completedIds: Set<number>) => {
  const total = problemList.length;
  const completed = problemList.filter((p) => completedIds.has(p.id)).length;
  const easy = problemList.filter((p) => p.difficulty === "Easy");
  const medium = problemList.filter((p) => p.difficulty === "Medium");
  const hard = problemList.filter((p) => p.difficulty === "Hard");

  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    easy: {
      total: easy.length,
      completed: easy.filter((p) => completedIds.has(p.id)).length,
    },
    medium: {
      total: medium.length,
      completed: medium.filter((p) => completedIds.has(p.id)).length,
    },
    hard: {
      total: hard.length,
      completed: hard.filter((p) => completedIds.has(p.id)).length,
    },
  };
};
