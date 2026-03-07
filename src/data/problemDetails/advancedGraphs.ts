import type { ProblemDetail } from '../../types';

export const advancedGraphsDetails: ProblemDetail[] = [
  {
    problemId: 93,
    functionName: 'findItinerary',
    description: `Given a list of airline \`tickets\` where \`tickets[i] = [from, to]\` represents a flight from airport \`from\` to airport \`to\`, reconstruct the itinerary starting from \`"JFK"\` and return it.

All tickets must be used exactly once. If there are multiple valid itineraries, return the one with the smallest lexicographic order when read as a single list.

You may assume all tickets form at least one valid itinerary.

Examples:
  Input: \`tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]\`
  Output: \`["JFK","MUC","LHR","SFO","SJC"]\`

  Input: \`tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\`
  Output: \`["JFK","ATL","JFK","SFO","ATL","SFO"]\`

Constraints:
  - \`1 <= tickets.length <= 300\`
  - \`tickets[i].length == 2\`
  - \`tickets[i][0] != tickets[i][1]\`
  - \`from\` and \`to\` consist of three uppercase English letters`,
    sampleTestCases: [
      {
        inputArgs: [[['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]],
        expectedOutput: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
        inputDisplay: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
      },
      {
        inputArgs: [[['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']]],
        expectedOutput: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'],
        inputDisplay: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[['JFK', 'AAA']]],
        expectedOutput: ['JFK', 'AAA'],
        inputDisplay: 'tickets = [["JFK","AAA"]]',
      },
      {
        inputArgs: [[['JFK', 'BBB'], ['JFK', 'AAA'], ['AAA', 'JFK']]],
        expectedOutput: ['JFK', 'AAA', 'JFK', 'BBB'],
        inputDisplay: 'tickets = [["JFK","BBB"],["JFK","AAA"],["AAA","JFK"]]',
      },
      {
        inputArgs: [[['JFK', 'AAA'], ['AAA', 'BBB'], ['BBB', 'JFK'], ['JFK', 'CCC'], ['CCC', 'DDD'], ['DDD', 'JFK']]],
        expectedOutput: ['JFK', 'AAA', 'BBB', 'JFK', 'CCC', 'DDD', 'JFK'],
        inputDisplay: 'tickets = [["JFK","AAA"],["AAA","BBB"],["BBB","JFK"],["JFK","CCC"],["CCC","DDD"],["DDD","JFK"]]',
      },
      {
        inputArgs: [[['JFK', 'AAA'], ['AAA', 'BBB'], ['BBB', 'AAA'], ['AAA', 'JFK'], ['JFK', 'AAA']]],
        expectedOutput: ['JFK', 'AAA', 'BBB', 'AAA', 'JFK', 'AAA'],
        inputDisplay: 'tickets = [["JFK","AAA"],["AAA","BBB"],["BBB","AAA"],["AAA","JFK"],["JFK","AAA"]]',
      },
      {
        inputArgs: [[['JFK', 'BBB'], ['BBB', 'CCC'], ['CCC', 'JFK'], ['JFK', 'DDD'], ['DDD', 'EEE'], ['EEE', 'JFK']]],
        expectedOutput: ['JFK', 'BBB', 'CCC', 'JFK', 'DDD', 'EEE', 'JFK'],
        inputDisplay: 'tickets = [["JFK","BBB"],["BBB","CCC"],["CCC","JFK"],["JFK","DDD"],["DDD","EEE"],["EEE","JFK"]]',
      },
      {
        inputArgs: [[['JFK', 'CCC'], ['CCC', 'JFK'], ['JFK', 'BBB'], ['BBB', 'CCC'], ['CCC', 'DDD']]],
        expectedOutput: ['JFK', 'BBB', 'CCC', 'JFK', 'CCC', 'DDD'],
        inputDisplay: 'tickets = [["JFK","CCC"],["CCC","JFK"],["JFK","BBB"],["BBB","CCC"],["CCC","DDD"]]',
      },
    ],
    starterCode: {
      python: `def findItinerary(tickets: list[list[str]]) -> list[str]:
    pass
`,
      javascript: `function findItinerary(tickets) {

}
`,
    },
    solutions: [
      { complexity: 'O(E log E)', name: "Hierholzer's Algorithm", isBest: true },
      { complexity: 'O(E! · E)', name: 'Backtracking', isBest: false, hint: "Use Hierholzer's algorithm with a sorted adjacency list" },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const airports = ['JFK'];
        for (let i = 0; i < n; i++) {
          const a = String.fromCharCode(65 + (i % 26));
          const b = String.fromCharCode(65 + (((i / 26) | 0) % 26));
          const c = String.fromCharCode(65 + (((i / 676) | 0) % 26));
          airports.push(c + b + a);
        }
        const tickets: string[][] = [];
        for (let i = 0; i < n; i++) tickets.push([airports[i], airports[i + 1]]);
        for (let i = tickets.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tickets[i], tickets[j]] = [tickets[j], tickets[i]];
        }
        return [tickets];
      },
    },
  },
  {
    problemId: 94,
    functionName: 'minCostConnectPoints',
    description: `Given an array \`points\` where \`points[i] = [xi, yi]\` represents a point on the 2D plane, return the minimum cost to connect all points together.

The cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the Manhattan distance: \`|xi - xj| + |yi - yj|\`.

Return the minimum total cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

Examples:
  Input: \`points = [[0,0],[2,2],[3,10],[5,2],[7,0]]\`
  Output: \`20\`

  Input: \`points = [[0,0],[1,1],[1,0],[-1,1]]\`
  Output: \`4\`

Constraints:
  - \`1 <= points.length <= 1000\`
  - \`-10^6 <= xi, yi <= 10^6\`
  - All pairs \`(xi, yi)\` are distinct`,
    sampleTestCases: [
      {
        inputArgs: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]],
        expectedOutput: 20,
        inputDisplay: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]',
      },
      {
        inputArgs: [[[0, 0], [1, 1], [1, 0], [-1, 1]]],
        expectedOutput: 4,
        inputDisplay: 'points = [[0,0],[1,1],[1,0],[-1,1]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0, 0]]],
        expectedOutput: 0,
        inputDisplay: 'points = [[0,0]]',
      },
      {
        inputArgs: [[[0, 0], [1, 1]]],
        expectedOutput: 2,
        inputDisplay: 'points = [[0,0],[1,1]]',
      },
      {
        inputArgs: [[[0, 0], [1, 0], [2, 0]]],
        expectedOutput: 2,
        inputDisplay: 'points = [[0,0],[1,0],[2,0]]',
      },
      {
        inputArgs: [[[0, 0], [10, 0], [0, 10], [10, 10]]],
        expectedOutput: 30,
        inputDisplay: 'points = [[0,0],[10,0],[0,10],[10,10]]',
      },
      {
        inputArgs: [[[3, 12], [-2, 5], [-4, 1]]],
        expectedOutput: 18,
        inputDisplay: 'points = [[3,12],[-2,5],[-4,1]]',
      },
      {
        inputArgs: [[[0, 0], [0, 1], [1, 0], [1, 1], [0, 5]]],
        expectedOutput: 7,
        inputDisplay: 'points = [[0,0],[0,1],[1,0],[1,1],[0,5]]',
      },
    ],
    starterCode: {
      python: `def minCostConnectPoints(points: list[list[int]]) -> int:
    pass
`,
      javascript: `function minCostConnectPoints(points) {

}
`,
    },
    solutions: [
      { complexity: 'O(n²)', name: "Prim's Algorithm", isBest: true },
      { complexity: 'O(n² log n)', name: "Kruskal's Algorithm", isBest: false, hint: "Prim's with adjacency matrix avoids edge sorting overhead" },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const points: number[][] = [];
        for (let i = 0; i < n; i++) {
          points.push([
            Math.floor(Math.random() * 2000) - 1000,
            Math.floor(Math.random() * 2000) - 1000,
          ]);
        }
        return [points];
      },
    },
  },
  {
    problemId: 95,
    functionName: 'networkDelayTime',
    description: `You are given a network of \`n\` nodes labeled from \`1\` to \`n\`, and a list \`times\` where \`times[i] = [ui, vi, wi]\` means a signal travels from node \`ui\` to node \`vi\` in \`wi\` time units.

Send a signal from node \`k\`. Return the minimum time it takes for all \`n\` nodes to receive the signal. If it is impossible for all nodes to receive the signal, return \`-1\`.

Examples:
  Input: \`times = [[2,1,1],[2,3,1],[3,4,1]]\`, \`n = 4\`, \`k = 2\`
  Output: \`2\`

  Input: \`times = [[1,2,1]]\`, \`n = 2\`, \`k = 1\`
  Output: \`1\`

Constraints:
  - \`1 <= k <= n <= 100\`
  - \`1 <= times.length <= 6000\`
  - \`1 <= ui, vi <= n\`
  - \`ui != vi\`
  - \`0 <= wi <= 100\`
  - All pairs \`(ui, vi)\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2],
        expectedOutput: 2,
        inputDisplay: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
      },
      {
        inputArgs: [[[1, 2, 1]], 2, 1],
        expectedOutput: 1,
        inputDisplay: 'times = [[1,2,1]], n = 2, k = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1, 2, 1]], 2, 2],
        expectedOutput: -1,
        inputDisplay: 'times = [[1,2,1]], n = 2, k = 2',
      },
      {
        inputArgs: [[], 1, 1],
        expectedOutput: 0,
        inputDisplay: 'times = [], n = 1, k = 1',
      },
      {
        inputArgs: [[[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1],
        expectedOutput: 3,
        inputDisplay: 'times = [[1,2,1],[2,3,2],[1,3,4]], n = 3, k = 1',
      },
      {
        inputArgs: [[[1, 2, 1], [2, 3, 2], [3, 4, 3]], 4, 1],
        expectedOutput: 6,
        inputDisplay: 'times = [[1,2,1],[2,3,2],[3,4,3]], n = 4, k = 1',
      },
      {
        inputArgs: [[[1, 2, 1], [1, 3, 2], [2, 4, 3], [3, 4, 1]], 4, 1],
        expectedOutput: 3,
        inputDisplay: 'times = [[1,2,1],[1,3,2],[2,4,3],[3,4,1]], n = 4, k = 1',
      },
      {
        inputArgs: [[[1, 2, 10], [1, 3, 1], [3, 2, 1]], 3, 1],
        expectedOutput: 2,
        inputDisplay: 'times = [[1,2,10],[1,3,1],[3,2,1]], n = 3, k = 1',
      },
    ],
    starterCode: {
      python: `def networkDelayTime(times: list[list[int]], n: int, k: int) -> int:
    pass
`,
      javascript: `function networkDelayTime(times, n, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(E log V)', name: "Dijkstra's Algorithm", isBest: true },
      { complexity: 'O(V · E)', name: 'Bellman-Ford', isBest: false, hint: "Dijkstra's with a min-heap is more efficient for this problem" },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const times: number[][] = [];
        for (let i = 1; i < n; i++) {
          times.push([i, i + 1, Math.floor(Math.random() * 100) + 1]);
        }
        for (let i = 0; i < n; i++) {
          const u = Math.floor(Math.random() * n) + 1;
          let v = Math.floor(Math.random() * n) + 1;
          while (v === u) v = Math.floor(Math.random() * n) + 1;
          times.push([u, v, Math.floor(Math.random() * 100) + 1]);
        }
        return [times, n, 1];
      },
    },
  },
  {
    problemId: 96,
    functionName: 'swimInWater',
    description: `You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at position \`(i, j)\`.

Rain starts to fall. At time \`t\`, the depth of water everywhere is \`t\`. You can swim from one position to an adjacent (up/down/left/right) position if and only if the elevation of both positions is at most \`t\`.

You start at position \`(0, 0)\`. Return the minimum time when you can reach position \`(n - 1, n - 1)\`.

The grid contains each integer in \`[0, n * n - 1]\` exactly once.

Examples:
  Input: \`grid = [[0,2],[1,3]]\`
  Output: \`3\`

  Input: \`grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]\`
  Output: \`16\`

Constraints:
  - \`n == grid.length == grid[i].length\`
  - \`1 <= n <= 50\`
  - Each value in \`grid\` is unique
  - \`grid[i][j]\` is in range \`[0, n * n - 1]\``,
    sampleTestCases: [
      {
        inputArgs: [[[0, 2], [1, 3]]],
        expectedOutput: 3,
        inputDisplay: 'grid = [[0,2],[1,3]]',
      },
      {
        inputArgs: [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]],
        expectedOutput: 16,
        inputDisplay: 'grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[0]]',
      },
      {
        inputArgs: [[[0, 3], [2, 1]]],
        expectedOutput: 2,
        inputDisplay: 'grid = [[0,3],[2,1]]',
      },
      {
        inputArgs: [[[3, 1], [0, 2]]],
        expectedOutput: 3,
        inputDisplay: 'grid = [[3,1],[0,2]]',
      },
      {
        inputArgs: [[[0, 3, 8], [7, 1, 2], [5, 4, 6]]],
        expectedOutput: 6,
        inputDisplay: 'grid = [[0,3,8],[7,1,2],[5,4,6]]',
      },
      {
        inputArgs: [[[0, 1, 3], [5, 2, 4], [8, 6, 7]]],
        expectedOutput: 7,
        inputDisplay: 'grid = [[0,1,3],[5,2,4],[8,6,7]]',
      },
      {
        inputArgs: [[[5, 3, 1], [4, 0, 2], [6, 8, 7]]],
        expectedOutput: 7,
        inputDisplay: 'grid = [[5,3,1],[4,0,2],[6,8,7]]',
      },
    ],
    starterCode: {
      python: `def swimInWater(grid: list[list[int]]) -> int:
    pass
`,
      javascript: `function swimInWater(grid) {

}
`,
    },
    solutions: [
      { complexity: 'O(n² log n)', name: 'Dijkstra / Min-Heap', isBest: true },
      { complexity: 'O(n² log n)', name: 'Binary Search + BFS', isBest: false, hint: 'A min-heap approach avoids repeated BFS traversals' },
    ],
    benchmarkConfig: {
      sizes: [5, 10, 20],
      generateInput: (n: number) => {
        const perm = Array.from({ length: n * n }, (_, i) => i);
        for (let i = perm.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [perm[i], perm[j]] = [perm[j], perm[i]];
        }
        const grid: number[][] = [];
        for (let i = 0; i < n; i++) {
          grid.push(perm.slice(i * n, (i + 1) * n));
        }
        return [grid];
      },
    },
  },
  {
    problemId: 97,
    functionName: 'alienOrder',
    description: `There is a foreign language which uses the Latin alphabet, but the order among letters is not \`"abc...xyz"\`.

You receive a list of non-empty strings \`words\` from the dictionary, where the words are sorted lexicographically based on the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return \`""\`. If there are multiple valid orderings, return any of them.

A string \`a\` is lexicographically smaller than \`b\` if at the first differing position, \`a\`'s character comes before \`b\`'s in the alien alphabet, or if \`a\` is a prefix of \`b\` (and shorter).

Examples:
  Input: \`words = ["wrt","wrf","er","ett","rftt"]\`
  Output: \`"wertf"\`

  Input: \`words = ["z","x"]\`
  Output: \`"zx"\`

Constraints:
  - \`1 <= words.length <= 100\`
  - \`1 <= words[i].length <= 100\`
  - \`words[i]\` consists of only lowercase English letters`,
    sampleTestCases: [
      {
        inputArgs: [['wrt', 'wrf', 'er', 'ett', 'rftt']],
        expectedOutput: 'wertf',
        inputDisplay: 'words = ["wrt","wrf","er","ett","rftt"]',
      },
      {
        inputArgs: [['z', 'x']],
        expectedOutput: 'zx',
        inputDisplay: 'words = ["z","x"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [['z', 'x', 'z']],
        expectedOutput: '',
        inputDisplay: 'words = ["z","x","z"]',
      },
      {
        inputArgs: [['abc', 'ab']],
        expectedOutput: '',
        inputDisplay: 'words = ["abc","ab"]',
      },
      {
        inputArgs: [['a']],
        expectedOutput: 'a',
        inputDisplay: 'words = ["a"]',
      },
      {
        inputArgs: [['x', 'y', 'z']],
        expectedOutput: 'xyz',
        inputDisplay: 'words = ["x","y","z"]',
      },
      {
        inputArgs: [['ab', 'ac', 'bc', 'bd']],
        expectedOutput: 'abcd',
        inputDisplay: 'words = ["ab","ac","bc","bd"]',
      },
      {
        inputArgs: [['ba', 'bc', 'ac', 'ah']],
        expectedOutput: 'bach',
        inputDisplay: 'words = ["ba","bc","ac","ah"]',
      },
    ],
    starterCode: {
      python: `def alienOrder(words: list[str]) -> str:
    pass
`,
      javascript: `function alienOrder(words) {

}
`,
    },
    solutions: [
      { complexity: 'O(C)', name: 'Topological Sort (BFS)', isBest: true },
      { complexity: 'O(C)', name: 'Topological Sort (DFS)', isBest: false, hint: 'BFS with in-degree tracking is often cleaner for detecting cycles' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const charCount = Math.min(n, 26);
        const alpha: string[] = [];
        for (let i = 0; i < charCount; i++) alpha.push(String.fromCharCode(97 + i));
        for (let i = alpha.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [alpha[i], alpha[j]] = [alpha[j], alpha[i]];
        }
        const order: Record<string, number> = {};
        alpha.forEach((c, idx) => { order[c] = idx; });
        const words: string[] = [];
        for (let i = 0; i < n; i++) {
          let w = '';
          const len = 1 + Math.floor(Math.random() * 4);
          for (let j = 0; j < len; j++) w += alpha[Math.floor(Math.random() * charCount)];
          words.push(w);
        }
        words.sort((a, b) => {
          const minLen = Math.min(a.length, b.length);
          for (let i = 0; i < minLen; i++) {
            if (order[a[i]] !== order[b[i]]) return order[a[i]] - order[b[i]];
          }
          return a.length - b.length;
        });
        return [words];
      },
    },
  },
  {
    problemId: 98,
    functionName: 'findCheapestPrice',
    description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [from, to, price]\` represents a flight from city \`from\` to city \`to\` with cost \`price\`.

Given \`src\`, \`dst\`, and \`k\`, return the cheapest price from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.

A stop is an intermediate city between \`src\` and \`dst\`.

Examples:
  Input: \`n = 4\`, \`flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]\`, \`src = 0\`, \`dst = 3\`, \`k = 1\`
  Output: \`700\`

  Input: \`n = 3\`, \`flights = [[0,1,100],[1,2,100],[0,2,500]]\`, \`src = 0\`, \`dst = 2\`, \`k = 1\`
  Output: \`200\`

Constraints:
  - \`1 <= n <= 100\`
  - \`0 <= flights.length <= n * (n - 1) / 2\`
  - \`flights[i].length == 3\`
  - \`0 <= from, to < n\`
  - \`from != to\`
  - \`1 <= price <= 10^4\`
  - \`0 <= k < n\`
  - There are no duplicate flights`,
    sampleTestCases: [
      {
        inputArgs: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1],
        expectedOutput: 700,
        inputDisplay: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1',
      },
      {
        inputArgs: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1],
        expectedOutput: 200,
        inputDisplay: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0],
        expectedOutput: 500,
        inputDisplay: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0',
      },
      {
        inputArgs: [3, [[0, 1, 100], [1, 2, 100]], 0, 2, 0],
        expectedOutput: -1,
        inputDisplay: 'n = 3, flights = [[0,1,100],[1,2,100]], src = 0, dst = 2, k = 0',
      },
      {
        inputArgs: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 100]], 0, 3, 2],
        expectedOutput: 3,
        inputDisplay: 'n = 4, flights = [[0,1,1],[1,2,1],[2,3,1],[0,3,100]], src = 0, dst = 3, k = 2',
      },
      {
        inputArgs: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 100]], 0, 3, 1],
        expectedOutput: 100,
        inputDisplay: 'n = 4, flights = [[0,1,1],[1,2,1],[2,3,1],[0,3,100]], src = 0, dst = 3, k = 1',
      },
      {
        inputArgs: [5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], 0, 2, 2],
        expectedOutput: 7,
        inputDisplay: 'n = 5, flights = [[0,1,5],[1,2,5],[0,3,2],[3,1,2],[1,4,1],[4,2,1]], src = 0, dst = 2, k = 2',
      },
      {
        inputArgs: [5, [[0, 1, 1], [0, 2, 5], [1, 2, 1], [2, 3, 1], [3, 4, 1]], 0, 4, 3],
        expectedOutput: 4,
        inputDisplay: 'n = 5, flights = [[0,1,1],[0,2,5],[1,2,1],[2,3,1],[3,4,1]], src = 0, dst = 4, k = 3',
      },
    ],
    starterCode: {
      python: `def findCheapestPrice(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    pass
`,
      javascript: `function findCheapestPrice(n, flights, src, dst, k) {

}
`,
    },
    solutions: [
      { complexity: 'O(E · K)', name: 'Bellman-Ford (K iterations)', isBest: true },
      { complexity: 'O(E · K)', name: 'BFS with pruning', isBest: false, hint: 'Bellman-Ford limited to K+1 iterations is clean and efficient' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const flights: number[][] = [];
        const seen = new Set<string>();
        for (let i = 0; i < n - 1; i++) {
          flights.push([i, i + 1, Math.floor(Math.random() * 100) + 1]);
          seen.add(i + ',' + (i + 1));
        }
        for (let i = 0; i < n; i++) {
          const from = Math.floor(Math.random() * n);
          let to = Math.floor(Math.random() * n);
          while (to === from) to = Math.floor(Math.random() * n);
          const key = from + ',' + to;
          if (!seen.has(key)) {
            seen.add(key);
            flights.push([from, to, Math.floor(Math.random() * 100) + 1]);
          }
        }
        return [n, flights, 0, n - 1, Math.floor(n / 2)];
      },
    },
  },
];
