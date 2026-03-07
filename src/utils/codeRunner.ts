import type { Language, TestCase, ClassTestCase, RunResult, BenchmarkConfig } from '../types';

export interface RunOptions {
  inputTypes?: ('value' | 'tree' | 'list' | 'cyclicList')[];
  outputType?: 'value' | 'tree' | 'list' | 'inPlace';
  inPlaceArgIndex?: number;
  compareType?: 'exact' | 'unorderedArray' | 'unorderedNestedArray' | 'float';
  mode?: 'function' | 'class';
  className?: string;
}

function needsConversion(opts?: RunOptions): boolean {
  if (!opts) return false;
  return !!(
    opts.inputTypes?.some(t => t !== 'value') ||
    (opts.outputType && opts.outputType !== 'value') ||
    (opts.compareType && opts.compareType !== 'exact')
  );
}

// ── Injected JS helper code ──────────────────────────────────────────────

const JS_LIST_NODE_DEF = `class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
`;

const JS_CONVERSION_HELPERS = `
function _arrayToTree(arr) {
  if (!arr || arr.length === 0) return null;
  var root = new TreeNode(arr[0]);
  var q = [root], i = 1;
  while (i < arr.length) {
    var node = q.shift();
    if (i < arr.length && arr[i] != null) { node.left = new TreeNode(arr[i]); q.push(node.left); }
    i++;
    if (i < arr.length && arr[i] != null) { node.right = new TreeNode(arr[i]); q.push(node.right); }
    i++;
  }
  return root;
}
function _treeToArray(root) {
  if (!root) return [];
  var res = [], q = [root];
  while (q.length) {
    var n = q.shift();
    if (n) { res.push(n.val); q.push(n.left); q.push(n.right); } else { res.push(null); }
  }
  while (res.length && res[res.length - 1] === null) res.pop();
  return res;
}
function _arrayToList(arr) {
  if (!arr || arr.length === 0) return null;
  var head = new ListNode(arr[0]), cur = head;
  for (var i = 1; i < arr.length; i++) { cur.next = new ListNode(arr[i]); cur = cur.next; }
  return head;
}
function _listToArray(head) {
  var res = [], cur = head, seen = new Set();
  while (cur && !seen.has(cur)) { seen.add(cur); res.push(cur.val); cur = cur.next; }
  return res;
}
function _arrayToCyclicList(values, pos) {
  if (!values || values.length === 0) return null;
  var nodes = values.map(function(v) { return new ListNode(v); });
  for (var i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && pos < nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0];
}
function _convertArgs(rawArgs, inputTypes) {
  if (!inputTypes || inputTypes.length === 0) return rawArgs;
  var args = [], ri = 0;
  for (var i = 0; i < inputTypes.length; i++) {
    switch (inputTypes[i]) {
      case 'tree': args.push(_arrayToTree(rawArgs[ri++])); break;
      case 'list': args.push(_arrayToList(rawArgs[ri++])); break;
      case 'cyclicList': args.push(_arrayToCyclicList(rawArgs[ri++], rawArgs[ri++])); break;
      default: args.push(rawArgs[ri++]); break;
    }
  }
  while (ri < rawArgs.length) args.push(rawArgs[ri++]);
  return args;
}
function _convertOutput(result, outputType) {
  if (outputType === 'tree') return _treeToArray(result);
  if (outputType === 'list') return _listToArray(result);
  return result;
}
function _compare(got, expected, compareType) {
  if (compareType === 'float') {
    return typeof got === 'number' && typeof expected === 'number' && Math.abs(got - expected) < 1e-5;
  }
  if (compareType === 'unorderedArray') {
    if (!Array.isArray(got) || !Array.isArray(expected) || got.length !== expected.length) return false;
    var sg = JSON.stringify([].concat(got).sort(function(a,b){return JSON.stringify(a)<JSON.stringify(b)?-1:1}));
    var se = JSON.stringify([].concat(expected).sort(function(a,b){return JSON.stringify(a)<JSON.stringify(b)?-1:1}));
    return sg === se;
  }
  if (compareType === 'unorderedNestedArray') {
    if (!Array.isArray(got) || !Array.isArray(expected) || got.length !== expected.length) return false;
    function _norm(arr) {
      return arr.map(function(inner) { return Array.isArray(inner) ? [].concat(inner).sort(function(a,b){return JSON.stringify(a)<JSON.stringify(b)?-1:1}) : inner; })
        .sort(function(a,b){return JSON.stringify(a)<JSON.stringify(b)?-1:1});
    }
    return JSON.stringify(_norm(got)) === JSON.stringify(_norm(expected));
  }
  return JSON.stringify(got) === JSON.stringify(expected);
}
`;

// ── Injected Python helper code ──────────────────────────────────────────

const PY_LIST_NODE_DEF = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
`;

const PY_CONVERSION_HELPERS = `
def _array_to_tree(arr):
    if not arr:
        return None
    root = TreeNode(arr[0])
    q = [root]
    i = 1
    while i < len(arr):
        node = q.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

def _tree_to_array(root):
    if not root:
        return []
    res = []
    q = [root]
    while q:
        n = q.pop(0)
        if n:
            res.append(n.val)
            q.append(n.left)
            q.append(n.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def _array_to_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    cur = head
    for i in range(1, len(arr)):
        cur.next = ListNode(arr[i])
        cur = cur.next
    return head

def _list_to_array(head):
    res = []
    cur = head
    seen = set()
    while cur and id(cur) not in seen:
        seen.add(id(cur))
        res.append(cur.val)
        cur = cur.next
    return res

def _array_to_cyclic_list(values, pos):
    if not values:
        return None
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if 0 <= pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]

def _convert_args(raw_args, input_types):
    if not input_types:
        return raw_args
    args = []
    ri = 0
    for t in input_types:
        if t == 'tree':
            args.append(_array_to_tree(raw_args[ri])); ri += 1
        elif t == 'list':
            args.append(_array_to_list(raw_args[ri])); ri += 1
        elif t == 'cyclicList':
            args.append(_array_to_cyclic_list(raw_args[ri], raw_args[ri+1])); ri += 2
        else:
            args.append(raw_args[ri]); ri += 1
    while ri < len(raw_args):
        args.append(raw_args[ri]); ri += 1
    return args

def _convert_output(result, output_type):
    if output_type == 'tree':
        return _tree_to_array(result)
    if output_type == 'list':
        return _list_to_array(result)
    return result

def _compare(got, expected, compare_type):
    if compare_type == 'float':
        return isinstance(got, (int, float)) and isinstance(expected, (int, float)) and abs(got - expected) < 1e-5
    if compare_type == 'unorderedArray':
        if not isinstance(got, list) or not isinstance(expected, list) or len(got) != len(expected):
            return False
        import json as _cjson
        return sorted(got, key=lambda x: _cjson.dumps(x, sort_keys=True)) == sorted(expected, key=lambda x: _cjson.dumps(x, sort_keys=True))
    if compare_type == 'unorderedNestedArray':
        if not isinstance(got, list) or not isinstance(expected, list) or len(got) != len(expected):
            return False
        import json as _cjson
        def _norm(arr):
            return sorted([sorted(inner, key=lambda x: _cjson.dumps(x, sort_keys=True)) if isinstance(inner, list) else inner for inner in arr], key=lambda x: _cjson.dumps(x, sort_keys=True))
        return _norm(got) == _norm(expected)
    return got == expected
`;

// ── JavaScript: execute directly in the browser ───────────────────────────

function buildJavaScriptHarness(
  userCode: string, functionName: string, testCases: TestCase[], opts?: RunOptions
): string {
  if (!needsConversion(opts)) {
    const serialized = JSON.stringify(
      testCases.map((tc) => ({ args: tc.inputArgs, expected: tc.expectedOutput, display: tc.inputDisplay }))
    );
    return `${userCode}
var _testCases = ${serialized};
var _results = [];
for (var _i = 0; _i < _testCases.length; _i++) {
  var _tc = _testCases[_i];
  try {
    var _result = ${functionName}(...JSON.parse(JSON.stringify(_tc.args)));
    _results.push({ passed: JSON.stringify(_result) === JSON.stringify(_tc.expected), input: _tc.display, got: _result });
  } catch (_e) {
    _results.push({ passed: false, input: _tc.display, error: _e.message });
  }
}
return _results;`;
  }

  const needsList = opts?.inputTypes?.some(t => t === 'list' || t === 'cyclicList') || opts?.outputType === 'list';
  const outputType = opts?.outputType || 'value';
  const compareType = opts?.compareType || 'exact';
  const inputTypesJson = JSON.stringify(opts?.inputTypes || []);
  const inPlaceIdx = opts?.inPlaceArgIndex ?? -1;

  const serialized = JSON.stringify(
    testCases.map((tc) => ({ args: tc.inputArgs, expected: tc.expectedOutput, display: tc.inputDisplay }))
  );

  return `${needsList ? JS_LIST_NODE_DEF : ''}
${userCode}
${JS_CONVERSION_HELPERS}
var _testCases = ${serialized};
var _inputTypes = ${inputTypesJson};
var _results = [];
for (var _i = 0; _i < _testCases.length; _i++) {
  var _tc = _testCases[_i];
  try {
    var _rawArgs = JSON.parse(JSON.stringify(_tc.args));
    var _args = _convertArgs(_rawArgs, _inputTypes);
    var _ret = ${functionName}(..._args);
    var _got;
    if ('${outputType}' === 'inPlace') {
      _got = _args[${inPlaceIdx}];
    } else {
      _got = _convertOutput(_ret, '${outputType}');
    }
    var _passed = _compare(_got, _tc.expected, '${compareType}');
    _results.push({ passed: _passed, input: _tc.display, got: _got });
  } catch (_e) {
    _results.push({ passed: false, input: _tc.display, error: _e.message });
  }
}
return _results;`;
}

function buildJavaScriptClassHarness(userCode: string, className: string, testCases: ClassTestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({ ops: tc.operations, args: tc.operationArgs, expected: tc.expected, display: tc.inputDisplay }))
  );

  return `${userCode}
var _classTests = ${serialized};
var _results = [];
for (var _i = 0; _i < _classTests.length; _i++) {
  var _ct = _classTests[_i];
  try {
    var _obj = null;
    var _opResults = [];
    for (var _j = 0; _j < _ct.ops.length; _j++) {
      if (_j === 0) {
        _obj = new ${className}(..._ct.args[_j]);
        _opResults.push(null);
      } else {
        var _ret = _obj[_ct.ops[_j]](..._ct.args[_j]);
        _opResults.push(_ret === undefined ? null : _ret);
      }
    }
    _results.push({ passed: JSON.stringify(_opResults) === JSON.stringify(_ct.expected), input: _ct.display, got: _opResults });
  } catch (_e) {
    _results.push({ passed: false, input: _ct.display, error: _e.message });
  }
}
return _results;`;
}

function runJavaScript(
  userCode: string, functionName: string, testCases: TestCase[], opts?: RunOptions
): RunResult {
  const harness = buildJavaScriptHarness(userCode, functionName, testCases, opts);
  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = new Function(harness)() as typeof parsed;
  } catch (e) {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: e instanceof Error ? e.message : String(e) };
  }
  const testResults = parsed.map((r) => ({ passed: r.passed, input: r.input, got: r.got, error: r.error }));
  return { testResults, passed: testResults.filter((r) => r.passed).length, total: testCases.length };
}

function runJavaScriptClass(
  userCode: string, className: string, testCases: ClassTestCase[]
): RunResult {
  const harness = buildJavaScriptClassHarness(userCode, className, testCases);
  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = new Function(harness)() as typeof parsed;
  } catch (e) {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: e instanceof Error ? e.message : String(e) };
  }
  const testResults = parsed.map((r) => ({ passed: r.passed, input: r.input, got: r.got, error: r.error }));
  return { testResults, passed: testResults.filter((r) => r.passed).length, total: testCases.length };
}

// ── Python: execute via Pyodide (WebAssembly, loaded from CDN) ────────────

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
}

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let _pyodideInstance: PyodideInterface | null = null;
let _pyodideLoading: Promise<PyodideInterface> | null = null;

function getPyodide(): Promise<PyodideInterface> {
  if (_pyodideInstance) return Promise.resolve(_pyodideInstance);
  if (_pyodideLoading) return _pyodideLoading;

  _pyodideLoading = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script'));
        document.head.appendChild(script);
      });
    }
    _pyodideInstance = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    return _pyodideInstance;
  })();

  return _pyodideLoading;
}

function buildPythonHarness(
  userCode: string, functionName: string, testCases: TestCase[], opts?: RunOptions
): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({ args: tc.inputArgs, expected: tc.expectedOutput, display: tc.inputDisplay }))
  );

  if (!needsConversion(opts)) {
    return `${userCode}
import json as _json
import copy as _copy
_test_cases = _json.loads('''${serialized}''')
_results = []
for _tc in _test_cases:
    try:
        _result = ${functionName}(*_copy.deepcopy(_tc['args']))
        _results.append({'passed': _result == _tc['expected'], 'input': _tc['display'], 'got': _result})
    except Exception as _e:
        _results.append({'passed': False, 'input': _tc['display'], 'error': str(_e)})
_json.dumps(_results)
`;
  }

  const needsList = opts?.inputTypes?.some(t => t === 'list' || t === 'cyclicList') || opts?.outputType === 'list';
  const outputType = opts?.outputType || 'value';
  const compareType = opts?.compareType || 'exact';
  const inputTypesJson = JSON.stringify(opts?.inputTypes || []);
  const inPlaceIdx = opts?.inPlaceArgIndex ?? -1;

  return `${needsList ? PY_LIST_NODE_DEF : ''}
${userCode}
${PY_CONVERSION_HELPERS}
import json as _json
import copy as _copy

_test_cases = _json.loads('''${serialized}''')
_input_types = _json.loads('${inputTypesJson}')
_results = []
for _tc in _test_cases:
    try:
        _raw_args = _copy.deepcopy(_tc['args'])
        _args = _convert_args(_raw_args, _input_types)
        _ret = ${functionName}(*_args)
        if '${outputType}' == 'inPlace':
            _got = _args[${inPlaceIdx}]
        else:
            _got = _convert_output(_ret, '${outputType}')
        _passed = _compare(_got, _tc['expected'], '${compareType}')
        _results.append({'passed': _passed, 'input': _tc['display'], 'got': _got})
    except Exception as _e:
        _results.append({'passed': False, 'input': _tc['display'], 'error': str(_e)})
_json.dumps(_results)
`;
}

function buildPythonClassHarness(userCode: string, className: string, testCases: ClassTestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({ ops: tc.operations, args: tc.operationArgs, expected: tc.expected, display: tc.inputDisplay }))
  );

  return `${userCode}
import json as _json

_class_tests = _json.loads('''${serialized}''')
_results = []
for _ct in _class_tests:
    try:
        _obj = None
        _op_results = []
        for _i in range(len(_ct['ops'])):
            if _i == 0:
                _obj = ${className}(*_ct['args'][_i])
                _op_results.append(None)
            else:
                _ret = getattr(_obj, _ct['ops'][_i])(*_ct['args'][_i])
                _op_results.append(None if _ret is None else _ret)
        _passed = _op_results == _ct['expected']
        _results.append({'passed': _passed, 'input': _ct['display'], 'got': _op_results})
    except Exception as _e:
        _results.append({'passed': False, 'input': _ct['display'], 'error': str(_e)})
_json.dumps(_results)
`;
}

async function runPython(
  userCode: string, functionName: string, testCases: TestCase[], opts?: RunOptions
): Promise<RunResult> {
  let pyodide: PyodideInterface;
  try {
    pyodide = await getPyodide();
  } catch {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: 'Failed to load Python runtime. Check your internet connection.' };
  }

  let rawOutput: unknown;
  try {
    rawOutput = await pyodide.runPythonAsync(buildPythonHarness(userCode, functionName, testCases, opts));
  } catch (e) {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: e instanceof Error ? e.message : String(e) };
  }

  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = JSON.parse(rawOutput as string);
  } catch {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: `Unexpected output: ${rawOutput}` };
  }

  const testResults = parsed.map((r) => ({ passed: r.passed, input: r.input, got: r.got, error: r.error }));
  return { testResults, passed: testResults.filter((r) => r.passed).length, total: testCases.length };
}

async function runPythonClass(
  userCode: string, className: string, testCases: ClassTestCase[]
): Promise<RunResult> {
  let pyodide: PyodideInterface;
  try {
    pyodide = await getPyodide();
  } catch {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: 'Failed to load Python runtime. Check your internet connection.' };
  }

  let rawOutput: unknown;
  try {
    rawOutput = await pyodide.runPythonAsync(buildPythonClassHarness(userCode, className, testCases));
  } catch (e) {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: e instanceof Error ? e.message : String(e) };
  }

  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = JSON.parse(rawOutput as string);
  } catch {
    return { testResults: [], passed: 0, total: testCases.length, runtimeError: `Unexpected output: ${rawOutput}` };
  }

  const testResults = parsed.map((r) => ({ passed: r.passed, input: r.input, got: r.got, error: r.error }));
  return { testResults, passed: testResults.filter((r) => r.passed).length, total: testCases.length };
}

// ── Benchmarking ─────────────────────────────────────────────────────────

const BENCH_RUNS = 3;
const BENCH_TIMEOUT_MS = 3000;

type Timing = { size: number; ms: number };

function shouldSkipNextSize(results: Timing[], sizes: number[]): boolean {
  if (results.length < 2) return false;
  const prev2 = results[results.length - 2];
  const prev1 = results[results.length - 1];
  if (prev2.ms <= 0 || prev1.ms <= 0) return false;

  if (prev1.ms > 500) return true;

  const sizeRatio = sizes[results.length - 1] / sizes[results.length - 2];
  const timeRatio = prev1.ms / prev2.ms;
  return timeRatio > sizeRatio * 3 && prev1.ms > 50;
}

function benchmarkJavaScript(
  userCode: string,
  functionName: string,
  inputs: { size: number; args: unknown[] }[],
  opts?: RunOptions
): Timing[] {
  const needsConv = needsConversion(opts);
  const needsList = opts?.inputTypes?.some(t => t === 'list' || t === 'cyclicList') || opts?.outputType === 'list';
  const inputTypesJson = JSON.stringify(opts?.inputTypes || []);

  const setupCode = `${needsList ? JS_LIST_NODE_DEF : ''}
${userCode}
${needsConv ? JS_CONVERSION_HELPERS : ''}
return { fn: ${functionName}, convert: ${needsConv ? `function(args) { return _convertArgs(args, ${inputTypesJson}); }` : 'null'} };`;

  let setup: { fn: (...args: unknown[]) => unknown; convert: ((args: unknown[]) => unknown[]) | null };
  try {
    setup = new Function(setupCode)() as typeof setup;
  } catch {
    return inputs.map(i => ({ size: i.size, ms: 0 }));
  }

  const results: Timing[] = [];
  const sizes = inputs.map(i => i.size);

  for (let idx = 0; idx < inputs.length; idx++) {
    if (shouldSkipNextSize(results, sizes)) break;

    const { size, args } = inputs[idx];
    const times: number[] = [];

    for (let run = 0; run < BENCH_RUNS; run++) {
      const fresh = JSON.parse(JSON.stringify(args)) as unknown[];
      const converted = setup.convert ? setup.convert(fresh) : fresh;
      const start = performance.now();
      try {
        setup.fn(...converted);
      } catch {
        break;
      }
      const elapsed = performance.now() - start;
      times.push(elapsed);

      if (elapsed > BENCH_TIMEOUT_MS) {
        results.push({ size, ms: -1 });
        return results;
      }
    }

    if (times.length < 2) {
      results.push({ size, ms: 0 });
      continue;
    }

    results.push({ size, ms: Math.min(...times.slice(1)) });
  }

  return results;
}

async function benchmarkPython(
  userCode: string,
  functionName: string,
  inputs: { size: number; args: unknown[] }[],
  opts?: RunOptions
): Promise<Timing[]> {
  let pyodide: PyodideInterface;
  try {
    pyodide = await getPyodide();
  } catch {
    return inputs.map(i => ({ size: i.size, ms: 0 }));
  }

  const needsConv = needsConversion(opts);
  const needsList = opts?.inputTypes?.some(t => t === 'list' || t === 'cyclicList') || opts?.outputType === 'list';
  const inputTypesJson = JSON.stringify(opts?.inputTypes || []);
  const serialized = JSON.stringify(inputs);

  const harness = `${needsList ? PY_LIST_NODE_DEF : ''}
${userCode}
${needsConv ? PY_CONVERSION_HELPERS : ''}
import time as _time
import json as _json
import copy as _copy

_inputs = _json.loads('''${serialized}''')
_input_types = _json.loads('${inputTypesJson}')
_sizes = [_item['size'] for _item in _inputs]
_results = []

for _idx, _item in enumerate(_inputs):
    if len(_results) >= 2:
        _r2 = _results[-2]
        _r1 = _results[-1]
        if _r2['ms'] > 0 and _r1['ms'] > 0:
            if _r1['ms'] > 500:
                break
            _sr = _sizes[len(_results)-1] / _sizes[len(_results)-2]
            _tr = _r1['ms'] / _r2['ms']
            if _tr > _sr * 3 and _r1['ms'] > 50:
                break

    _times = []
    _timed_out = False
    for _run in range(${BENCH_RUNS}):
        _fresh = _copy.deepcopy(_item['args'])
        ${needsConv ? '_converted = _convert_args(_fresh, _input_types)' : '_converted = _fresh'}
        _start = _time.perf_counter()
        try:
            ${functionName}(*_converted)
        except:
            break
        _elapsed = (_time.perf_counter() - _start) * 1000
        _times.append(_elapsed)
        if _elapsed > ${BENCH_TIMEOUT_MS}:
            _results.append({'size': _item['size'], 'ms': -1})
            _timed_out = True
            break
    if _timed_out:
        break
    if len(_times) < 2:
        _results.append({'size': _item['size'], 'ms': 0})
        continue
    _results.append({'size': _item['size'], 'ms': min(_times[1:])})

_json.dumps(_results)
`;

  try {
    const raw = await pyodide.runPythonAsync(harness);
    return JSON.parse(raw as string);
  } catch {
    return inputs.map(i => ({ size: i.size, ms: 0 }));
  }
}

export async function benchmarkCode(
  userCode: string,
  language: Language,
  functionName: string,
  config: BenchmarkConfig,
  opts?: RunOptions
): Promise<Timing[]> {
  const inputs = config.sizes.map(size => ({
    size,
    args: config.generateInput(size),
  }));

  if (language === 'javascript') return benchmarkJavaScript(userCode, functionName, inputs, opts);
  return benchmarkPython(userCode, functionName, inputs, opts);
}

// ── Public API ────────────────────────────────────────────────────────────

export async function runCode(
  userCode: string,
  language: Language,
  functionName: string,
  testCases: TestCase[],
  opts?: RunOptions
): Promise<RunResult> {
  if (language === 'javascript') return runJavaScript(userCode, functionName, testCases, opts);
  return runPython(userCode, functionName, testCases, opts);
}

export async function runClassCode(
  userCode: string,
  language: Language,
  className: string,
  testCases: ClassTestCase[]
): Promise<RunResult> {
  if (language === 'javascript') return runJavaScriptClass(userCode, className, testCases);
  return runPythonClass(userCode, className, testCases);
}
