import type { Language, TestCase, RunResult } from '../types';

// ── JavaScript: execute directly in the browser ───────────────────────────

function buildJavaScriptHarness(userCode: string, functionName: string, testCases: TestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({ args: tc.inputArgs, expected: tc.expectedOutput, display: tc.inputDisplay }))
  );
  return `${userCode}
const _testCases = ${serialized};
const _results = [];
for (const _tc of _testCases) {
  try {
    const _result = ${functionName}(..._tc.args);
    _results.push({ passed: JSON.stringify(_result) === JSON.stringify(_tc.expected), input: _tc.display, got: _result });
  } catch (_e) {
    _results.push({ passed: false, input: _tc.display, error: _e.message });
  }
}
return _results;`;
}

function runJavaScript(userCode: string, functionName: string, testCases: TestCase[]): RunResult {
  const harness = buildJavaScriptHarness(userCode, functionName, testCases);
  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    // eslint-disable-next-line no-new-func
    parsed = new Function(harness)() as typeof parsed;
  } catch (e) {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: e instanceof Error ? e.message : String(e),
    };
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

function buildPythonHarness(userCode: string, functionName: string, testCases: TestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({ args: tc.inputArgs, expected: tc.expectedOutput, display: tc.inputDisplay }))
  );
  return `${userCode}
import json as _json
_test_cases = ${serialized}
_results = []
for _tc in _test_cases:
    try:
        _result = ${functionName}(*_tc['args'])
        _results.append({'passed': _result == _tc['expected'], 'input': _tc['display'], 'got': _result})
    except Exception as _e:
        _results.append({'passed': False, 'input': _tc['display'], 'error': str(_e)})
_json.dumps(_results)
`;
}

async function runPython(userCode: string, functionName: string, testCases: TestCase[]): Promise<RunResult> {
  let pyodide: PyodideInterface;
  try {
    pyodide = await getPyodide();
  } catch {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: 'Failed to load Python runtime. Check your internet connection.',
    };
  }

  let rawOutput: unknown;
  try {
    rawOutput = await pyodide.runPythonAsync(buildPythonHarness(userCode, functionName, testCases));
  } catch (e) {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: e instanceof Error ? e.message : String(e),
    };
  }

  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = JSON.parse(rawOutput as string);
  } catch {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: `Unexpected output: ${rawOutput}`,
    };
  }

  const testResults = parsed.map((r) => ({ passed: r.passed, input: r.input, got: r.got, error: r.error }));
  return { testResults, passed: testResults.filter((r) => r.passed).length, total: testCases.length };
}

// ── Public API ────────────────────────────────────────────────────────────

export async function runCode(
  userCode: string,
  language: Language,
  functionName: string,
  testCases: TestCase[]
): Promise<RunResult> {
  if (language === 'javascript') return runJavaScript(userCode, functionName, testCases);
  return runPython(userCode, functionName, testCases);
}
