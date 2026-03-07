import type { ProblemDetail } from '../../types';

export const graphsDetails: ProblemDetail[] = [
  {
    problemId: 80,
    functionName: 'numIslands',
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

Examples:
  Input: \`grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]\`
  Output: \`1\`

  Input: \`grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]\`
  Output: \`3\`

Constraints:
  - \`m == grid.length\`
  - \`n == grid[i].length\`
  - \`1 <= m, n <= 300\`
  - \`grid[i][j]\` is \`'0'\` or \`'1'\``,
    sampleTestCases: [
      {
        inputArgs: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]],
        expectedOutput: 1,
        inputDisplay: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
      },
      {
        inputArgs: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]],
        expectedOutput: 3,
        inputDisplay: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[['1']]],
        expectedOutput: 1,
        inputDisplay: 'grid = [["1"]]',
      },
      {
        inputArgs: [[['0']]],
        expectedOutput: 0,
        inputDisplay: 'grid = [["0"]]',
      },
      {
        inputArgs: [[['1','0','1','0','1'],['0','1','0','1','0'],['1','0','1','0','1'],['0','1','0','1','0']]],
        expectedOutput: 10,
        inputDisplay: 'grid = [["1","0","1","0","1"],["0","1","0","1","0"],["1","0","1","0","1"],["0","1","0","1","0"]]',
      },
      {
        inputArgs: [[['1','1','1'],['0','1','0'],['1','1','1']]],
        expectedOutput: 1,
        inputDisplay: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]',
      },
      {
        inputArgs: [[['0','0','0'],['0','0','0']]],
        expectedOutput: 0,
        inputDisplay: 'grid = [["0","0","0"],["0","0","0"]]',
      },
      {
        inputArgs: [[['1','0','1','1','0'],['1','0','0','1','0'],['0','0','1','0','0'],['1','1','0','0','1']]],
        expectedOutput: 5,
        inputDisplay: 'grid = [["1","0","1","1","0"],["1","0","0","1","0"],["0","0","1","0","0"],["1","1","0","0","1"]]',
      },
    ],
    starterCode: {
      python: `def numIslands(grid: list[list[str]]) -> int:
    pass
`,
      javascript: `function numIslands(grid) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'DFS/BFS', isBest: true },
      { complexity: 'O(m·n·α(m·n))', name: 'Union-Find', isBest: false, hint: 'A simple DFS/BFS achieves optimal time without extra complexity' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => [
        Array.from({ length: n }, () =>
          Array.from({ length: n }, () => (Math.random() < 0.4 ? '1' : '0'))
        ),
      ],
    },
  },
  {
    problemId: 81,
    functionName: 'cloneGraph',
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

Each node in the graph contains a value (\`val\`) and a list of its neighbors.

For simplicity, the graph is represented as an adjacency list where \`adjList[i]\` describes the neighbors of node \`i+1\` (1-indexed).

Examples:
  Input: \`adjList = [[2,4],[1,3],[2,4],[1,3]]\`
  Output: \`[[2,4],[1,3],[2,4],[1,3]]\`

  Input: \`adjList = [[]]\`
  Output: \`[[]]\`

  Input: \`adjList = []\`
  Output: \`[]\`

Constraints:
  - The number of nodes is in the range \`[0, 100]\`
  - \`1 <= Node.val <= 100\`
  - There are no repeated edges and no self-loops
  - The graph is connected and all nodes can be visited starting from the given node`,
    sampleTestCases: [
      {
        inputArgs: [[[2,4],[1,3],[2,4],[1,3]]],
        expectedOutput: [[2,4],[1,3],[2,4],[1,3]],
        inputDisplay: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
      },
      {
        inputArgs: [[[]]],
        expectedOutput: [[]],
        inputDisplay: 'adjList = [[]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[]],
        expectedOutput: [],
        inputDisplay: 'adjList = []',
      },
      {
        inputArgs: [[[2],[1]]],
        expectedOutput: [[2],[1]],
        inputDisplay: 'adjList = [[2],[1]]',
      },
      {
        inputArgs: [[[2,3],[1,3],[1,2]]],
        expectedOutput: [[2,3],[1,3],[1,2]],
        inputDisplay: 'adjList = [[2,3],[1,3],[1,2]]',
      },
      {
        inputArgs: [[[2],[1,3],[2,4],[3,5],[4]]],
        expectedOutput: [[2],[1,3],[2,4],[3,5],[4]],
        inputDisplay: 'adjList = [[2],[1,3],[2,4],[3,5],[4]]',
      },
    ],
    starterCode: {
      python: `def cloneGraph(node: list[list[int]]) -> list[list[int]]:
    pass
`,
      javascript: `function cloneGraph(node) {

}
`,
    },
    solutions: [
      { complexity: 'O(V+E)', name: 'BFS with HashMap', isBest: true },
      { complexity: 'O(V+E)', name: 'DFS with HashMap', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const adj: number[][] = Array.from({ length: n }, () => []);
        for (let i = 1; i < n; i++) {
          const j = Math.floor(Math.random() * i);
          adj[i].push(j + 1);
          adj[j].push(i + 1);
        }
        return [adj];
      },
    },
  },
  {
    problemId: 82,
    functionName: 'maxAreaOfIsland',
    description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value \`1\` in the island.

Return the maximum area of an island in \`grid\`. If there is no island, return \`0\`.

Examples:
  Input: \`grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]\`
  Output: \`6\`

  Input: \`grid = [[0,0,0,0,0,0,0,0]]\`
  Output: \`0\`

Constraints:
  - \`m == grid.length\`
  - \`n == grid[i].length\`
  - \`1 <= m, n <= 50\`
  - \`grid[i][j]\` is either \`0\` or \`1\``,
    sampleTestCases: [
      {
        inputArgs: [[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]],
        expectedOutput: 6,
        inputDisplay: 'grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]',
      },
      {
        inputArgs: [[[0,0,0,0,0,0,0,0]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[0,0,0,0,0,0,0,0]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1]]],
        expectedOutput: 1,
        inputDisplay: 'grid = [[1]]',
      },
      {
        inputArgs: [[[1,1],[1,1]]],
        expectedOutput: 4,
        inputDisplay: 'grid = [[1,1],[1,1]]',
      },
      {
        inputArgs: [[[1,0,0],[0,1,0],[0,0,1]]],
        expectedOutput: 1,
        inputDisplay: 'grid = [[1,0,0],[0,1,0],[0,0,1]]',
      },
      {
        inputArgs: [[[1,1,0,0],[0,1,1,0],[0,0,0,0],[1,1,1,1]]],
        expectedOutput: 4,
        inputDisplay: 'grid = [[1,1,0,0],[0,1,1,0],[0,0,0,0],[1,1,1,1]]',
      },
      {
        inputArgs: [[[0,0,0],[0,0,0],[0,0,0]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[0,0,0],[0,0,0],[0,0,0]]',
      },
    ],
    starterCode: {
      python: `def maxAreaOfIsland(grid: list[list[int]]) -> int:
    pass
`,
      javascript: `function maxAreaOfIsland(grid) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'DFS', isBest: true },
      { complexity: 'O(m·n)', name: 'BFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => [
        Array.from({ length: n }, () =>
          Array.from({ length: n }, () => (Math.random() < 0.4 ? 1 : 0))
        ),
      ],
    },
  },
  {
    problemId: 83,
    functionName: 'pacificAtlantic',
    compareType: 'unorderedNestedArray',
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and the Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates \`result\` where \`result[i] = [ri, ci]\` denotes that rain water can flow from cell \`(ri, ci)\` to both the Pacific and Atlantic oceans.

Examples:
  Input: \`heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\`
  Output: \`[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\`

  Input: \`heights = [[1]]\`
  Output: \`[[0,0]]\`

Constraints:
  - \`m == heights.length\`
  - \`n == heights[r].length\`
  - \`1 <= m, n <= 200\`
  - \`0 <= heights[r][c] <= 10^5\``,
    sampleTestCases: [
      {
        inputArgs: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]],
        expectedOutput: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]],
        inputDisplay: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
      },
      {
        inputArgs: [[[1]]],
        expectedOutput: [[0,0]],
        inputDisplay: 'heights = [[1]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1,1],[1,1]]],
        expectedOutput: [[0,0],[0,1],[1,0],[1,1]],
        inputDisplay: 'heights = [[1,1],[1,1]]',
      },
      {
        inputArgs: [[[10,10,10],[10,1,10],[10,10,10]]],
        expectedOutput: [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]],
        inputDisplay: 'heights = [[10,10,10],[10,1,10],[10,10,10]]',
      },
      {
        inputArgs: [[[1,2,3],[8,9,4],[7,6,5]]],
        expectedOutput: [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
        inputDisplay: 'heights = [[1,2,3],[8,9,4],[7,6,5]]',
      },
      {
        inputArgs: [[[3,3,3,3],[3,1,1,3],[3,1,1,3],[3,3,3,3]]],
        expectedOutput: [[0,0],[0,1],[0,2],[0,3],[1,0],[1,3],[2,0],[2,3],[3,0],[3,1],[3,2],[3,3]],
        inputDisplay: 'heights = [[3,3,3,3],[3,1,1,3],[3,1,1,3],[3,3,3,3]]',
      },
    ],
    starterCode: {
      python: `def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    pass
`,
      javascript: `function pacificAtlantic(heights) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'Multi-source BFS/DFS from oceans', isBest: true },
      { complexity: 'O((m·n)²)', name: 'DFS from each cell', isBest: false, hint: 'Start from the ocean edges and work inward' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => [
        Array.from({ length: n }, () =>
          Array.from({ length: n }, () => Math.floor(Math.random() * 100))
        ),
      ],
    },
  },
  {
    problemId: 84,
    functionName: 'solve',
    outputType: 'inPlace',
    inPlaceArgIndex: 0,
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are 4-directionally surrounded by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. An \`'O'\` on the border of the board is not surrounded and should not be flipped. Any \`'O'\` connected to an \`'O'\` on the border is also not surrounded.

Examples:
  Input: \`board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]\`
  Output: \`[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]\`

  Input: \`board = [["X"]]\`
  Output: \`[["X"]]\`

Constraints:
  - \`m == board.length\`
  - \`n == board[i].length\`
  - \`1 <= m, n <= 200\`
  - \`board[i][j]\` is \`'X'\` or \`'O'\``,
    sampleTestCases: [
      {
        inputArgs: [[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]],
        expectedOutput: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']],
        inputDisplay: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
      },
      {
        inputArgs: [[['X']]],
        expectedOutput: [['X']],
        inputDisplay: 'board = [["X"]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[['O']]],
        expectedOutput: [['O']],
        inputDisplay: 'board = [["O"]]',
      },
      {
        inputArgs: [[['O','O'],['O','O']]],
        expectedOutput: [['O','O'],['O','O']],
        inputDisplay: 'board = [["O","O"],["O","O"]]',
      },
      {
        inputArgs: [[['X','X','X'],['X','O','X'],['X','X','X']]],
        expectedOutput: [['X','X','X'],['X','X','X'],['X','X','X']],
        inputDisplay: 'board = [["X","X","X"],["X","O","X"],["X","X","X"]]',
      },
      {
        inputArgs: [[['X','O','X','X'],['O','X','O','X'],['X','O','X','O'],['O','X','O','X']]],
        expectedOutput: [['X','O','X','X'],['O','X','X','X'],['X','X','X','O'],['O','X','O','X']],
        inputDisplay: 'board = [["X","O","X","X"],["O","X","O","X"],["X","O","X","O"],["O","X","O","X"]]',
      },
      {
        inputArgs: [[['X','X','X','X','X'],['X','O','O','O','X'],['X','O','X','O','X'],['X','O','O','O','X'],['X','X','X','X','X']]],
        expectedOutput: [['X','X','X','X','X'],['X','X','X','X','X'],['X','X','X','X','X'],['X','X','X','X','X'],['X','X','X','X','X']],
        inputDisplay: 'board = [["X","X","X","X","X"],["X","O","O","O","X"],["X","O","X","O","X"],["X","O","O","O","X"],["X","X","X","X","X"]]',
      },
    ],
    starterCode: {
      python: `def solve(board: list[list[str]]) -> None:
    pass
`,
      javascript: `function solve(board) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'DFS/BFS from borders', isBest: true },
      { complexity: 'O(m·n·α(m·n))', name: 'Union-Find', isBest: false, hint: 'A simple DFS from border cells is more straightforward' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => [
        Array.from({ length: n }, () =>
          Array.from({ length: n }, () => (Math.random() < 0.3 ? 'O' : 'X'))
        ),
      ],
    },
  },
  {
    problemId: 85,
    functionName: 'orangesRotting',
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell
- \`1\` representing a fresh orange
- \`2\` representing a rotten orange

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.

Examples:
  Input: \`grid = [[2,1,1],[1,1,0],[0,1,1]]\`
  Output: \`4\`

  Input: \`grid = [[2,1,1],[0,1,1],[1,0,1]]\`
  Output: \`-1\`

  Input: \`grid = [[0,2]]\`
  Output: \`0\`

Constraints:
  - \`m == grid.length\`
  - \`n == grid[i].length\`
  - \`1 <= m, n <= 10\`
  - \`grid[i][j]\` is \`0\`, \`1\`, or \`2\``,
    sampleTestCases: [
      {
        inputArgs: [[[2,1,1],[1,1,0],[0,1,1]]],
        expectedOutput: 4,
        inputDisplay: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
      },
      {
        inputArgs: [[[2,1,1],[0,1,1],[1,0,1]]],
        expectedOutput: -1,
        inputDisplay: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
      },
      {
        inputArgs: [[[0,2]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[0,2]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[0]]',
      },
      {
        inputArgs: [[[1]]],
        expectedOutput: -1,
        inputDisplay: 'grid = [[1]]',
      },
      {
        inputArgs: [[[2]]],
        expectedOutput: 0,
        inputDisplay: 'grid = [[2]]',
      },
      {
        inputArgs: [[[2,1,1],[1,1,1],[1,1,2]]],
        expectedOutput: 2,
        inputDisplay: 'grid = [[2,1,1],[1,1,1],[1,1,2]]',
      },
      {
        inputArgs: [[[2,0,1,1],[1,0,1,0],[1,0,1,2]]],
        expectedOutput: 4,
        inputDisplay: 'grid = [[2,0,1,1],[1,0,1,0],[1,0,1,2]]',
      },
      {
        inputArgs: [[[2,2],[1,1],[0,0],[1,1]]],
        expectedOutput: -1,
        inputDisplay: 'grid = [[2,2],[1,1],[0,0],[1,1]]',
      },
    ],
    starterCode: {
      python: `def orangesRotting(grid: list[list[int]]) -> int:
    pass
`,
      javascript: `function orangesRotting(grid) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'Multi-source BFS', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => [
        Array.from({ length: n }, () =>
          Array.from({ length: n }, () => Math.floor(Math.random() * 3))
        ),
      ],
    },
  },
  {
    problemId: 86,
    functionName: 'wallsAndGates',
    outputType: 'inPlace',
    inPlaceArgIndex: 0,
    description: `You are given an \`m x n\` grid \`rooms\` initialized with these three possible values:
- \`-1\` — A wall or an obstacle
- \`0\` — A gate
- \`2147483647\` — Infinity meaning an empty room

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with \`2147483647\`.

Examples:
  Input: \`rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]\`
  Output: \`[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]\`

Constraints:
  - \`m == rooms.length\`
  - \`n == rooms[i].length\`
  - \`1 <= m, n <= 250\`
  - \`rooms[i][j]\` is \`-1\`, \`0\`, or \`2147483647\``,
    sampleTestCases: [
      {
        inputArgs: [[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]],
        expectedOutput: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]],
        inputDisplay: 'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[0]]],
        expectedOutput: [[0]],
        inputDisplay: 'rooms = [[0]]',
      },
      {
        inputArgs: [[[-1]]],
        expectedOutput: [[-1]],
        inputDisplay: 'rooms = [[-1]]',
      },
      {
        inputArgs: [[[2147483647]]],
        expectedOutput: [[2147483647]],
        inputDisplay: 'rooms = [[2147483647]]',
      },
      {
        inputArgs: [[[0,2147483647,2147483647],[2147483647,-1,2147483647],[2147483647,2147483647,0]]],
        expectedOutput: [[0,1,2],[1,-1,1],[2,1,0]],
        inputDisplay: 'rooms = [[0,2147483647,2147483647],[2147483647,-1,2147483647],[2147483647,2147483647,0]]',
      },
      {
        inputArgs: [[[0,-1],[2147483647,2147483647]]],
        expectedOutput: [[0,-1],[1,2]],
        inputDisplay: 'rooms = [[0,-1],[2147483647,2147483647]]',
      },
      {
        inputArgs: [[[0,2147483647],[0,2147483647]]],
        expectedOutput: [[0,1],[0,1]],
        inputDisplay: 'rooms = [[0,2147483647],[0,2147483647]]',
      },
    ],
    starterCode: {
      python: `def wallsAndGates(rooms: list[list[int]]) -> None:
    pass
`,
      javascript: `function wallsAndGates(rooms) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n)', name: 'Multi-source BFS from gates', isBest: true },
      { complexity: 'O(m·n·(m+n))', name: 'BFS from each gate independently', isBest: false, hint: 'Start BFS from all gates simultaneously' },
    ],
    benchmarkConfig: {
      sizes: [10, 25, 50],
      generateInput: (n: number) => {
        const INF = 2147483647;
        const grid = Array.from({ length: n }, () =>
          Array.from({ length: n }, () => {
            const r = Math.random();
            if (r < 0.1) return 0;
            if (r < 0.2) return -1;
            return INF;
          })
        );
        return [grid];
      },
    },
  },
  {
    problemId: 87,
    functionName: 'canFinish',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you must take course \`b\` first if you want to take course \`a\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.

Examples:
  Input: \`numCourses = 2\`, \`prerequisites = [[1,0]]\`
  Output: \`true\`

  Input: \`numCourses = 2\`, \`prerequisites = [[1,0],[0,1]]\`
  Output: \`false\`

Constraints:
  - \`1 <= numCourses <= 2000\`
  - \`0 <= prerequisites.length <= 5000\`
  - \`prerequisites[i].length == 2\`
  - \`0 <= a, b < numCourses\`
  - All the pairs \`prerequisites[i]\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [2, [[1,0]]],
        expectedOutput: true,
        inputDisplay: 'numCourses = 2, prerequisites = [[1,0]]',
      },
      {
        inputArgs: [2, [[1,0],[0,1]]],
        expectedOutput: false,
        inputDisplay: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1, []],
        expectedOutput: true,
        inputDisplay: 'numCourses = 1, prerequisites = []',
      },
      {
        inputArgs: [3, [[1,0],[2,1]]],
        expectedOutput: true,
        inputDisplay: 'numCourses = 3, prerequisites = [[1,0],[2,1]]',
      },
      {
        inputArgs: [3, [[0,1],[1,2],[2,0]]],
        expectedOutput: false,
        inputDisplay: 'numCourses = 3, prerequisites = [[0,1],[1,2],[2,0]]',
      },
      {
        inputArgs: [4, [[1,0],[2,0],[3,1],[3,2]]],
        expectedOutput: true,
        inputDisplay: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
      },
      {
        inputArgs: [5, [[1,0],[2,1],[3,2],[4,3],[0,4]]],
        expectedOutput: false,
        inputDisplay: 'numCourses = 5, prerequisites = [[1,0],[2,1],[3,2],[4,3],[0,4]]',
      },
      {
        inputArgs: [7, [[1,0],[2,0],[3,1],[4,2],[5,3],[5,4],[6,5]]],
        expectedOutput: true,
        inputDisplay: 'numCourses = 7, prerequisites = [[1,0],[2,0],[3,1],[4,2],[5,3],[5,4],[6,5]]',
      },
    ],
    starterCode: {
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    pass
`,
      javascript: `function canFinish(numCourses, prerequisites) {

}
`,
    },
    solutions: [
      { complexity: 'O(V+E)', name: 'Topological Sort (BFS/Kahn\'s)', isBest: true },
      { complexity: 'O(V+E)', name: 'DFS Cycle Detection', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const edges: number[][] = [];
        for (let i = 1; i < n; i++) {
          edges.push([i, Math.floor(Math.random() * i)]);
        }
        return [n, edges];
      },
    },
  },
  {
    problemId: 88,
    functionName: 'findOrder',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you must take course \`b\` before course \`a\`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Examples:
  Input: \`numCourses = 2\`, \`prerequisites = [[1,0]]\`
  Output: \`[0,1]\`

  Input: \`numCourses = 4\`, \`prerequisites = [[1,0],[2,0],[3,1],[3,2]]\`
  Output: \`[0,1,2,3]\` or \`[0,2,1,3]\`

  Input: \`numCourses = 1\`, \`prerequisites = []\`
  Output: \`[0]\`

Constraints:
  - \`1 <= numCourses <= 2000\`
  - \`0 <= prerequisites.length <= numCourses * (numCourses - 1)\`
  - \`prerequisites[i].length == 2\`
  - \`0 <= a, b < numCourses\`
  - \`a != b\`
  - All the pairs \`[a, b]\` are distinct`,
    sampleTestCases: [
      {
        inputArgs: [2, [[1,0]]],
        expectedOutput: [0,1],
        inputDisplay: 'numCourses = 2, prerequisites = [[1,0]]',
      },
      {
        inputArgs: [1, []],
        expectedOutput: [0],
        inputDisplay: 'numCourses = 1, prerequisites = []',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [2, [[1,0],[0,1]]],
        expectedOutput: [],
        inputDisplay: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
      },
      {
        inputArgs: [3, [[1,0],[2,1]]],
        expectedOutput: [0,1,2],
        inputDisplay: 'numCourses = 3, prerequisites = [[1,0],[2,1]]',
      },
      {
        inputArgs: [4, [[1,0],[2,1],[3,2]]],
        expectedOutput: [0,1,2,3],
        inputDisplay: 'numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]',
      },
      {
        inputArgs: [3, [[0,1],[1,2],[2,0]]],
        expectedOutput: [],
        inputDisplay: 'numCourses = 3, prerequisites = [[0,1],[1,2],[2,0]]',
      },
      {
        inputArgs: [5, [[1,0],[2,1],[3,2],[4,3]]],
        expectedOutput: [0,1,2,3,4],
        inputDisplay: 'numCourses = 5, prerequisites = [[1,0],[2,1],[3,2],[4,3]]',
      },
      {
        inputArgs: [6, [[1,0],[2,1],[3,2],[4,3],[5,4]]],
        expectedOutput: [0,1,2,3,4,5],
        inputDisplay: 'numCourses = 6, prerequisites = [[1,0],[2,1],[3,2],[4,3],[5,4]]',
      },
    ],
    starterCode: {
      python: `def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    pass
`,
      javascript: `function findOrder(numCourses, prerequisites) {

}
`,
    },
    solutions: [
      { complexity: 'O(V+E)', name: 'Topological Sort (BFS/Kahn\'s)', isBest: true },
      { complexity: 'O(V+E)', name: 'DFS with reverse postorder', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const edges: number[][] = [];
        for (let i = 1; i < n; i++) {
          edges.push([i, Math.floor(Math.random() * i)]);
        }
        return [n, edges];
      },
    },
  },
  {
    problemId: 89,
    functionName: 'validTree',
    description: `Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected \`edges\`, write a function to check whether these edges make up a valid tree.

A valid tree has exactly \`n - 1\` edges, is connected, and contains no cycles.

Examples:
  Input: \`n = 5\`, \`edges = [[0,1],[0,2],[0,3],[1,4]]\`
  Output: \`true\`

  Input: \`n = 5\`, \`edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\`
  Output: \`false\`

Constraints:
  - \`1 <= n <= 2000\`
  - \`0 <= edges.length <= 5000\`
  - \`edges[i].length == 2\`
  - \`0 <= a, b < n\`
  - \`a != b\`
  - There are no self-loops or repeated edges`,
    sampleTestCases: [
      {
        inputArgs: [5, [[0,1],[0,2],[0,3],[1,4]]],
        expectedOutput: true,
        inputDisplay: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
      },
      {
        inputArgs: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]],
        expectedOutput: false,
        inputDisplay: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1, []],
        expectedOutput: true,
        inputDisplay: 'n = 1, edges = []',
      },
      {
        inputArgs: [2, [[0,1]]],
        expectedOutput: true,
        inputDisplay: 'n = 2, edges = [[0,1]]',
      },
      {
        inputArgs: [2, []],
        expectedOutput: false,
        inputDisplay: 'n = 2, edges = []',
      },
      {
        inputArgs: [4, [[0,1],[2,3]]],
        expectedOutput: false,
        inputDisplay: 'n = 4, edges = [[0,1],[2,3]]',
      },
      {
        inputArgs: [4, [[0,1],[0,2],[0,3]]],
        expectedOutput: true,
        inputDisplay: 'n = 4, edges = [[0,1],[0,2],[0,3]]',
      },
      {
        inputArgs: [3, [[0,1],[1,2],[0,2]]],
        expectedOutput: false,
        inputDisplay: 'n = 3, edges = [[0,1],[1,2],[0,2]]',
      },
    ],
    starterCode: {
      python: `def validTree(n: int, edges: list[list[int]]) -> bool:
    pass
`,
      javascript: `function validTree(n, edges) {

}
`,
    },
    solutions: [
      { complexity: 'O(V+E)', name: 'DFS/BFS cycle detection', isBest: true },
      { complexity: 'O(V·α(V))', name: 'Union-Find', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const edges: number[][] = [];
        for (let i = 1; i < n; i++) {
          edges.push([i, Math.floor(Math.random() * i)]);
        }
        return [n, edges];
      },
    },
  },
  {
    problemId: 90,
    functionName: 'countComponents',
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [a, b]\` indicates that there is an undirected edge between nodes \`a\` and \`b\` in the graph.

Return the number of connected components in the graph.

Examples:
  Input: \`n = 5\`, \`edges = [[0,1],[1,2],[3,4]]\`
  Output: \`2\`

  Input: \`n = 5\`, \`edges = [[0,1],[1,2],[2,3],[3,4]]\`
  Output: \`1\`

Constraints:
  - \`1 <= n <= 2000\`
  - \`1 <= edges.length <= 5000\`
  - \`edges[i].length == 2\`
  - \`0 <= a, b < n\`
  - \`a != b\`
  - There are no repeated edges`,
    sampleTestCases: [
      {
        inputArgs: [5, [[0,1],[1,2],[3,4]]],
        expectedOutput: 2,
        inputDisplay: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
      },
      {
        inputArgs: [5, [[0,1],[1,2],[2,3],[3,4]]],
        expectedOutput: 1,
        inputDisplay: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [1, []],
        expectedOutput: 1,
        inputDisplay: 'n = 1, edges = []',
      },
      {
        inputArgs: [4, []],
        expectedOutput: 4,
        inputDisplay: 'n = 4, edges = []',
      },
      {
        inputArgs: [4, [[0,1],[2,3]]],
        expectedOutput: 2,
        inputDisplay: 'n = 4, edges = [[0,1],[2,3]]',
      },
      {
        inputArgs: [6, [[0,1],[0,2],[3,4]]],
        expectedOutput: 3,
        inputDisplay: 'n = 6, edges = [[0,1],[0,2],[3,4]]',
      },
      {
        inputArgs: [3, [[0,1],[1,2],[0,2]]],
        expectedOutput: 1,
        inputDisplay: 'n = 3, edges = [[0,1],[1,2],[0,2]]',
      },
    ],
    starterCode: {
      python: `def countComponents(n: int, edges: list[list[int]]) -> int:
    pass
`,
      javascript: `function countComponents(n, edges) {

}
`,
    },
    solutions: [
      { complexity: 'O(V+E)', name: 'DFS/BFS', isBest: true },
      { complexity: 'O(V·α(V))', name: 'Union-Find', isBest: true },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const edges: number[][] = [];
        const numEdges = Math.floor(n * 0.8);
        for (let i = 0; i < numEdges; i++) {
          const a = Math.floor(Math.random() * n);
          let b = Math.floor(Math.random() * n);
          if (b === a) b = (a + 1) % n;
          edges.push([a, b]);
        }
        return [n, edges];
      },
    },
  },
  {
    problemId: 91,
    functionName: 'findRedundantConnection',
    description: `In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [a, b]\` indicates that there is an edge between nodes \`a\` and \`b\` in the graph.

Return an edge that can be removed so that the resulting graph is a tree. If there are multiple answers, return the answer that occurs last in the input.

Examples:
  Input: \`edges = [[1,2],[1,3],[2,3]]\`
  Output: \`[2,3]\`

  Input: \`edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\`
  Output: \`[1,4]\`

Constraints:
  - \`n == edges.length\`
  - \`3 <= n <= 1000\`
  - \`edges[i].length == 2\`
  - \`1 <= a < b <= edges.length\`
  - \`a != b\`
  - There are no repeated edges
  - The given graph is connected`,
    sampleTestCases: [
      {
        inputArgs: [[[1,2],[1,3],[2,3]]],
        expectedOutput: [2,3],
        inputDisplay: 'edges = [[1,2],[1,3],[2,3]]',
      },
      {
        inputArgs: [[[1,2],[2,3],[3,4],[1,4],[1,5]]],
        expectedOutput: [1,4],
        inputDisplay: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[[1,2],[1,3],[1,4],[3,4]]],
        expectedOutput: [3,4],
        inputDisplay: 'edges = [[1,2],[1,3],[1,4],[3,4]]',
      },
      {
        inputArgs: [[[1,2],[2,3],[3,1]]],
        expectedOutput: [3,1],
        inputDisplay: 'edges = [[1,2],[2,3],[3,1]]',
      },
      {
        inputArgs: [[[1,2],[2,3],[3,4],[4,5],[5,2]]],
        expectedOutput: [5,2],
        inputDisplay: 'edges = [[1,2],[2,3],[3,4],[4,5],[5,2]]',
      },
      {
        inputArgs: [[[1,2],[3,4],[1,4],[2,3],[1,3]]],
        expectedOutput: [1,3],
        inputDisplay: 'edges = [[1,2],[3,4],[1,4],[2,3],[1,3]]',
      },
    ],
    starterCode: {
      python: `def findRedundantConnection(edges: list[list[int]]) -> list[int]:
    pass
`,
      javascript: `function findRedundantConnection(edges) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·α(n))', name: 'Union-Find', isBest: true },
      { complexity: 'O(n²)', name: 'DFS cycle detection', isBest: false, hint: 'Union-Find processes edges incrementally in O(α(n)) per operation' },
    ],
    benchmarkConfig: {
      sizes: [50, 200, 500],
      generateInput: (n: number) => {
        const edges: number[][] = [];
        const perm = Array.from({ length: n }, (_, i) => i + 1);
        for (let i = perm.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [perm[i], perm[j]] = [perm[j], perm[i]];
        }
        for (let i = 1; i < n; i++) {
          const j = Math.floor(Math.random() * i);
          edges.push([perm[j], perm[i]]);
        }
        const a = Math.floor(Math.random() * n) + 1;
        let b = Math.floor(Math.random() * n) + 1;
        while (b === a) b = Math.floor(Math.random() * n) + 1;
        edges.push([a, b]);
        return [edges];
      },
    },
  },
  {
    problemId: 92,
    functionName: 'ladderLength',
    description: `A transformation sequence from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
- Every adjacent pair of words differs by a single letter
- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`. Note that \`beginWord\` does not need to be in \`wordList\`

Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return the number of words in the shortest transformation sequence from \`beginWord\` to \`endWord\`, or \`0\` if no such sequence exists.

Examples:
  Input: \`beginWord = "hit"\`, \`endWord = "cog"\`, \`wordList = ["hot","dot","dog","lot","log","cog"]\`
  Output: \`5\` (hit -> hot -> dot -> dog -> cog)

  Input: \`beginWord = "hit"\`, \`endWord = "cog"\`, \`wordList = ["hot","dot","dog","lot","log"]\`
  Output: \`0\`

Constraints:
  - \`1 <= beginWord.length <= 10\`
  - \`endWord.length == beginWord.length\`
  - \`1 <= wordList.length <= 5000\`
  - \`wordList[i].length == beginWord.length\`
  - \`beginWord\`, \`endWord\`, and \`wordList[i]\` consist of lowercase English letters
  - \`beginWord != endWord\`
  - All the words in \`wordList\` are unique`,
    sampleTestCases: [
      {
        inputArgs: ['hit', 'cog', ['hot','dot','dog','lot','log','cog']],
        expectedOutput: 5,
        inputDisplay: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
      },
      {
        inputArgs: ['hit', 'cog', ['hot','dot','dog','lot','log']],
        expectedOutput: 0,
        inputDisplay: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: ['a', 'c', ['a','b','c']],
        expectedOutput: 2,
        inputDisplay: 'beginWord = "a", endWord = "c", wordList = ["a","b","c"]',
      },
      {
        inputArgs: ['hot', 'dog', ['hot','dog']],
        expectedOutput: 0,
        inputDisplay: 'beginWord = "hot", endWord = "dog", wordList = ["hot","dog"]',
      },
      {
        inputArgs: ['hot', 'dot', ['hot','dot','lot']],
        expectedOutput: 2,
        inputDisplay: 'beginWord = "hot", endWord = "dot", wordList = ["hot","dot","lot"]',
      },
      {
        inputArgs: ['leet', 'code', ['lest','lose','robe','code']],
        expectedOutput: 0,
        inputDisplay: 'beginWord = "leet", endWord = "code", wordList = ["lest","lose","robe","code"]',
      },
      {
        inputArgs: ['cat', 'sag', ['bat','bag','sag','dag','dot']],
        expectedOutput: 4,
        inputDisplay: 'beginWord = "cat", endWord = "sag", wordList = ["bat","bag","sag","dag","dot"]',
      },
      {
        inputArgs: ['sand', 'plum', ['said','slid','slim','slum','plum']],
        expectedOutput: 6,
        inputDisplay: 'beginWord = "sand", endWord = "plum", wordList = ["said","slid","slim","slum","plum"]',
      },
    ],
    starterCode: {
      python: `def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:
    pass
`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {

}
`,
    },
    solutions: [
      { complexity: 'O(n·m²)', name: 'BFS with wildcard patterns', isBest: true, hint: 'Group words by patterns like h*t, *ot, ho*' },
      { complexity: 'O(n²·m)', name: 'BFS checking all pairs', isBest: false, hint: 'Use wildcard patterns for O(m) neighbor lookup instead of O(n·m) pairwise comparison' },
    ],
    benchmarkConfig: {
      sizes: [100, 500, 2000],
      generateInput: (n: number) => {
        const len = 4;
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const makeWord = () => Array.from({ length: len }, () => chars[Math.floor(Math.random() * 26)]).join('');
        const wordSet = new Set<string>();
        while (wordSet.size < n) wordSet.add(makeWord());
        const wordList = [...wordSet];
        const begin = makeWord();
        const end = wordList[Math.floor(Math.random() * wordList.length)];
        return [begin, end, wordList];
      },
    },
  },
];
