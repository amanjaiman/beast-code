import type { ProblemDetail } from '../../types';

export const triesDetails: ProblemDetail[] = [
  {
    problemId: 61,
    functionName: 'Trie',
    mode: 'class',
    className: 'Trie',
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the \`Trie\` class:
- \`Trie()\` — Initializes the trie object.
- \`void insert(String word)\` — Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` — Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` — Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.

Examples:
  Input: ["Trie","insert","search","search","startsWith","insert","search"]
         [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]
  Output: [null,null,true,false,true,null,true]

Constraints:
  - \`1 <= word.length, prefix.length <= 2000\`
  - \`word\` and \`prefix\` consist only of lowercase English letters
  - At most \`3 * 10^4\` calls in total will be made to \`insert\`, \`search\`, and \`startsWith\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
        operationArgs: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
        expected: [null, null, true, false, true, null, true],
        inputDisplay: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['Trie', 'search', 'startsWith'],
        operationArgs: [[], ['hello'], ['hello']],
        expected: [null, false, false],
        inputDisplay: '["Trie","search","startsWith"]\n[[],["hello"],["hello"]]',
      },
      {
        operations: ['Trie', 'insert', 'insert', 'search', 'search', 'startsWith', 'startsWith'],
        operationArgs: [[], ['app'], ['apple'], ['app'], ['apple'], ['ap'], ['appl']],
        expected: [null, null, null, true, true, true, true],
        inputDisplay: '["Trie","insert","insert","search","search","startsWith","startsWith"]\n[[],["app"],["apple"],["app"],["apple"],["ap"],["appl"]]',
      },
      {
        operations: ['Trie', 'insert', 'search', 'startsWith', 'search', 'startsWith'],
        operationArgs: [[], ['hello'], ['hell'], ['hell'], ['hello'], ['hello']],
        expected: [null, null, false, true, true, true],
        inputDisplay: '["Trie","insert","search","startsWith","search","startsWith"]\n[[],["hello"],["hell"],["hell"],["hello"],["hello"]]',
      },
      {
        operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'startsWith'],
        operationArgs: [[], ['a'], ['a'], ['ab'], ['a'], ['ab']],
        expected: [null, null, true, false, true, false],
        inputDisplay: '["Trie","insert","search","search","startsWith","startsWith"]\n[[],["a"],["a"],["ab"],["a"],["ab"]]',
      },
      {
        operations: ['Trie', 'insert', 'insert', 'insert', 'search', 'search', 'search', 'startsWith', 'startsWith'],
        operationArgs: [[], ['app'], ['apple'], ['ape'], ['app'], ['apple'], ['api'], ['ap'], ['b']],
        expected: [null, null, null, null, true, true, false, true, false],
        inputDisplay: '["Trie","insert","insert","insert","search","search","search","startsWith","startsWith"]\n[[],["app"],["apple"],["ape"],["app"],["apple"],["api"],["ap"],["b"]]',
      },
    ],
    starterCode: {
      python: `class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass
`,
      javascript: `class Trie {
    constructor() {
    }

    insert(word) {
    }

    search(word) {
    }

    startsWith(prefix) {
    }
}
`,
    },
    solutions: [
      { complexity: 'O(n) per op', name: 'Hash Map Trie', isBest: true },
      { complexity: 'O(n) per op', name: 'Array Trie (26 children)', isBest: false, hint: 'Hash maps are more flexible and use less memory for sparse tries' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const words: string[] = [];
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < n; i++) {
          let w = '';
          const len = 3 + Math.floor(Math.random() * 8);
          for (let j = 0; j < len; j++) w += chars[Math.floor(Math.random() * 26)];
          words.push(w);
        }
        return [words];
      },
    },
  },
  {
    problemId: 62,
    functionName: 'WordDictionary',
    mode: 'class',
    className: 'WordDictionary',
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` — Initializes the object.
- \`void addWord(word)\` — Adds \`word\` to the data structure, it can be matched later.
- \`bool search(word)\` — Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.

Examples:
  Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
         [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
  Output: [null,null,null,null,false,true,true,true]

Constraints:
  - \`1 <= word.length <= 25\`
  - \`word\` in \`addWord\` consists of lowercase English letters
  - \`word\` in \`search\` consists of \`'.'\` or lowercase English letters
  - At most \`10^4\` calls will be made to \`addWord\` and \`search\``,
    sampleTestCases: [],
    hiddenTestCases: [],
    classSampleTestCases: [
      {
        operations: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
        operationArgs: [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
        expected: [null, null, null, null, false, true, true, true],
        inputDisplay: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
      },
    ],
    classHiddenTestCases: [
      {
        operations: ['WordDictionary', 'addWord', 'search', 'search', 'search'],
        operationArgs: [[], ['a'], ['a'], ['.'], ['aa']],
        expected: [null, null, true, true, false],
        inputDisplay: '["WordDictionary","addWord","search","search","search"]\n[[],["a"],["a"],["."],["aa"]]',
      },
      {
        operations: ['WordDictionary', 'addWord', 'search', 'search', 'search'],
        operationArgs: [[], ['abc'], ['a..'], ['..c'], ['.b.']],
        expected: [null, null, true, true, true],
        inputDisplay: '["WordDictionary","addWord","search","search","search"]\n[[],["abc"],["a.."],["..c"],[".b."]]',
      },
      {
        operations: ['WordDictionary', 'addWord', 'addWord', 'search', 'search'],
        operationArgs: [[], ['at'], ['and'], ['a'], ['.t.']],
        expected: [null, null, null, false, false],
        inputDisplay: '["WordDictionary","addWord","addWord","search","search"]\n[[],["at"],["and"],["a"],[".t."]]',
      },
      {
        operations: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
        operationArgs: [[], ['cat'], ['car'], ['card'], ['c..'], ['ca.'], ['...d'], ['.ar']],
        expected: [null, null, null, null, true, true, true, true],
        inputDisplay: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["cat"],["car"],["card"],["c.."],["ca."],["...d"],[".ar"]]',
      },
      {
        operations: ['WordDictionary', 'search', 'addWord', 'search'],
        operationArgs: [[], ['hello'], ['hello'], ['hello']],
        expected: [null, false, null, true],
        inputDisplay: '["WordDictionary","search","addWord","search"]\n[[],["hello"],["hello"],["hello"]]',
      },
    ],
    starterCode: {
      python: `class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass
`,
      javascript: `class WordDictionary {
    constructor() {
    }

    addWord(word) {
    }

    search(word) {
    }
}
`,
    },
    solutions: [
      { complexity: 'O(n) add / O(26^d·n) search', name: 'Trie with DFS', isBest: true },
      { complexity: 'O(n·m) search', name: 'Brute Force List', isBest: false, hint: 'A trie allows efficient prefix matching and wildcard branching' },
    ],
    benchmarkConfig: {
      sizes: [500, 5000, 50000],
      generateInput: (n: number) => {
        const words: string[] = [];
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < n; i++) {
          let w = '';
          const len = 3 + Math.floor(Math.random() * 8);
          for (let j = 0; j < len; j++) w += chars[Math.floor(Math.random() * 26)];
          words.push(w);
        }
        return [words];
      },
    },
  },
  {
    problemId: 63,
    functionName: 'findWords',
    compareType: 'unorderedArray',
    description: `Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Examples:
  Input: \`board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\`, \`words = ["oath","pea","eat","rain"]\`
  Output: \`["eat","oath"]\`

  Input: \`board = [["a","b"],["c","d"]]\`, \`words = ["abcb"]\`
  Output: \`[]\`

Constraints:
  - \`m == board.length\`
  - \`n == board[i].length\`
  - \`1 <= m, n <= 12\`
  - \`board[i][j]\` is a lowercase English letter
  - \`1 <= words.length <= 3 * 10^4\`
  - \`1 <= words[k].length <= 10\`
  - \`words[k]\` consists of lowercase English letters
  - All the strings of \`words\` are unique`,
    sampleTestCases: [
      {
        inputArgs: [
          [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],
          ['oath', 'pea', 'eat', 'rain'],
        ],
        expectedOutput: ['eat', 'oath'],
        inputDisplay: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
      },
      {
        inputArgs: [[['a','b'],['c','d']], ['abcb']],
        expectedOutput: [],
        inputDisplay: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
      },
    ],
    hiddenTestCases: [
      {
        inputArgs: [[['a']], ['a']],
        expectedOutput: ['a'],
        inputDisplay: 'board = [["a"]], words = ["a"]',
      },
      {
        inputArgs: [[['a']], ['b']],
        expectedOutput: [],
        inputDisplay: 'board = [["a"]], words = ["b"]',
      },
      {
        inputArgs: [
          [['a','b'],['c','d']],
          ['ab', 'cd', 'ac', 'bd', 'abdc'],
        ],
        expectedOutput: ['ab', 'abdc', 'ac', 'bd', 'cd'],
        inputDisplay: 'board = [["a","b"],["c","d"]], words = ["ab","cd","ac","bd","abdc"]',
      },
      {
        inputArgs: [[['a', 'a']], ['a', 'aa', 'aaa']],
        expectedOutput: ['a', 'aa'],
        inputDisplay: 'board = [["a","a"]], words = ["a","aa","aaa"]',
      },
      {
        inputArgs: [
          [['o','a','b','n'],['o','t','a','e'],['a','h','k','r'],['a','f','l','v']],
          ['oa', 'oat', 'oath', 'oaths'],
        ],
        expectedOutput: ['oa', 'oat', 'oath'],
        inputDisplay: 'board = [["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], words = ["oa","oat","oath","oaths"]',
      },
    ],
    starterCode: {
      python: `def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    pass
`,
      javascript: `function findWords(board, words) {

}
`,
    },
    solutions: [
      { complexity: 'O(m·n·4^L)', name: 'Trie + Backtracking', isBest: true },
      { complexity: 'O(w·m·n·4^L)', name: 'DFS per Word', isBest: false, hint: 'Build a trie from the word list to search all words simultaneously' },
    ],
    benchmarkConfig: {
      sizes: [4, 6, 8],
      generateInput: (n: number) => {
        const chars = 'abcdefghij';
        const board = Array.from({ length: n }, () =>
          Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)])
        );
        const words: string[] = [];
        for (let i = 0; i < n * 5; i++) {
          let w = '';
          const len = 2 + Math.floor(Math.random() * 4);
          for (let j = 0; j < len; j++) w += chars[Math.floor(Math.random() * chars.length)];
          words.push(w);
        }
        return [board, [...new Set(words)]];
      },
    },
  },
];
