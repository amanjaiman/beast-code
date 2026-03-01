import type { Language, TestCase, RunResult } from '../types';

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_CONFIG: Record<Language, { language: string; version: string }> = {
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
};

function buildPythonHarness(userCode: string, functionName: string, testCases: TestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({
      args: tc.inputArgs,
      expected: tc.expectedOutput,
      display: tc.inputDisplay,
    }))
  );
  return `${userCode}
import json
_test_cases = ${serialized}
_results = []
for _tc in _test_cases:
    try:
        _result = ${functionName}(*_tc['args'])
        _results.append({'passed': _result == _tc['expected'], 'input': _tc['display'], 'got': _result})
    except Exception as _e:
        _results.append({'passed': False, 'input': _tc['display'], 'error': str(_e)})
print(json.dumps(_results))
`;
}

function buildJavaScriptHarness(userCode: string, functionName: string, testCases: TestCase[]): string {
  const serialized = JSON.stringify(
    testCases.map((tc) => ({
      args: tc.inputArgs,
      expected: tc.expectedOutput,
      display: tc.inputDisplay,
    }))
  );
  return `${userCode}
const _testCases = ${serialized};
const _results = [];
for (const _tc of _testCases) {
    try {
        const _result = ${functionName}(..._tc.args);
        _results.push({ passed: JSON.stringify(_result) === JSON.stringify(_tc.expected), input: _tc.display, got: _result });
    } catch(_e) {
        _results.push({ passed: false, input: _tc.display, error: _e.message });
    }
}
console.log(JSON.stringify(_results));
`;
}

export async function runCode(
  userCode: string,
  language: Language,
  functionName: string,
  testCases: TestCase[]
): Promise<RunResult> {
  const harness =
    language === 'python'
      ? buildPythonHarness(userCode, functionName, testCases)
      : buildJavaScriptHarness(userCode, functionName, testCases);

  const config = LANGUAGE_CONFIG[language];

  let response: Response;
  try {
    response = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ content: harness }],
      }),
    });
  } catch {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: 'Network error: could not reach Piston API',
    };
  }

  if (!response.ok) {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: `API request failed (HTTP ${response.status})`,
    };
  }

  const data = await response.json() as {
    run: { stdout: string; stderr: string };
  };

  const stdout = data.run.stdout.trim();
  const stderr = data.run.stderr.trim();

  if (!stdout && stderr) {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: stderr,
    };
  }

  let parsed: Array<{ passed: boolean; input: string; got?: unknown; error?: string }>;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return {
      testResults: [],
      passed: 0,
      total: testCases.length,
      runtimeError: `Could not parse output: ${stdout}`,
    };
  }

  const testResults = parsed.map((r) => ({
    passed: r.passed,
    input: r.input,
    got: r.got,
    error: r.error,
  }));

  const passedCount = testResults.filter((r) => r.passed).length;

  return {
    testResults,
    passed: passedCount,
    total: testCases.length,
  };
}
