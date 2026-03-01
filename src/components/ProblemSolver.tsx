import { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { ProblemDetail, Language, RunResult } from '../types';
import type { Problem } from '../types';
import { runCode } from '../utils/codeRunner';
import { useApp } from '../context/AppContext';

interface ProblemSolverProps {
  detail: ProblemDetail;
  problem: Problem;
  rowElement: HTMLElement;
  onClose: () => void;
}

type Phase = 'pre-expand' | 'sliding-up' | 'expanding' | 'expanded' | 'closing-shrink' | 'closing-slide';

const DIFFICULTY_GRADIENT: Record<string, string> = {
  Easy: 'var(--easy-gradient)',
  Medium: 'var(--medium-gradient)',
  Hard: 'var(--hard-gradient)',
};

const EASE = 'cubic-bezier(0.4,0,0.2,1)';

export function ProblemSolver({ detail, problem, rowElement, onClose }: ProblemSolverProps) {
  const { settings, getProblemProgress } = useApp();
  const [phase, setPhase] = useState<Phase>('pre-expand');
  const [closeRect, setCloseRect] = useState<DOMRect | null>(null);

  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(detail.starterCode.python);
  const [isDirty, setIsDirty] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);

  // Capture origin rect once on mount
  const originRect = useRef<DOMRect>(rowElement.getBoundingClientRect());

  // Lock scroll on mount, release on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Kick off expand animation after initial paint
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('sliding-up'));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Phase progression state machine
  useEffect(() => {
    if (phase === 'sliding-up') {
      const id = setTimeout(() => setPhase('expanding'), 260);
      return () => clearTimeout(id);
    }
    if (phase === 'expanding') {
      const id = setTimeout(() => setPhase('expanded'), 320);
      return () => clearTimeout(id);
    }
    if (phase === 'closing-shrink') {
      const id = setTimeout(() => setPhase('closing-slide'), 290);
      return () => clearTimeout(id);
    }
    if (phase === 'closing-slide') {
      const id = setTimeout(() => onClose(), 230);
      return () => clearTimeout(id);
    }
  }, [phase, onClose]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') triggerClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const triggerClose = useCallback(() => {
    if (phase === 'closing-shrink' || phase === 'closing-slide') return;
    setCloseRect(rowElement.getBoundingClientRect());
    setPhase('closing-shrink');
  }, [phase, rowElement]);

  const handleLanguageSwitch = (lang: Language) => {
    if (lang === language) return;
    setLanguage(lang);
    setRunResult(null);
    if (!isDirty) setCode(detail.starterCode[lang]);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (!isDirty) setIsDirty(true);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setRunResult(null);
    const allCases = [...detail.sampleTestCases, ...detail.hiddenTestCases];
    const result = await runCode(code, language, detail.functionName, allCases);
    setRunResult(result);
    setIsRunning(false);
  };

  // Compute container style per phase.
  // Phase 1 open:  row rect → slide top to 0 (keeping column width/position)
  // Phase 2 open:  bloom left/width/height to full screen
  // Phase 1 close: shrink width/left/height back to column
  // Phase 2 close: slide top back to row
  const containerStyle = (): React.CSSProperties => {
    const r = originRect.current;
    const base: React.CSSProperties = { position: 'fixed', zIndex: 50, overflow: 'hidden' };

    if (phase === 'pre-expand') {
      return { ...base, top: r.top, left: r.left, width: r.width, height: r.height };
    }
    if (phase === 'sliding-up') {
      return { ...base, top: 0, left: r.left, width: r.width, height: r.height, transition: `top 250ms ${EASE}` };
    }
    if (phase === 'expanding' || phase === 'expanded') {
      return { ...base, top: 0, left: 0, width: '100vw', height: '100vh', transition: `left 300ms ${EASE}, width 300ms ${EASE}, height 300ms ${EASE}` };
    }
    // closing phases
    const cr = closeRect ?? r;
    if (phase === 'closing-shrink') {
      return { ...base, top: 0, left: cr.left, width: cr.width, height: cr.height, transition: `left 280ms ${EASE}, width 280ms ${EASE}, height 280ms ${EASE}` };
    }
    // closing-slide
    return { ...base, top: cr.top, left: cr.left, width: cr.width, height: cr.height, transition: `top 220ms ${EASE}` };
  };

  const bodyVisible = phase === 'expanded';
  const isClosing = phase === 'closing-shrink' || phase === 'closing-slide';
  const allPassed = runResult && runResult.passed === runResult.total && !runResult.runtimeError;
  const failedResults = runResult?.testResults.filter((r) => !r.passed) ?? [];

  const progress = getProblemProgress(problem.id);
  const isCompleted = progress.completed;

  const backdropVisible = phase !== 'pre-expand' && phase !== 'closing-slide';

  return (
    <>
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 49,
        background: 'rgba(0,0,0,0.6)',
        opacity: backdropVisible ? 1 : 0,
        transition: 'opacity 250ms ease',
        pointerEvents: 'none',
      }}
    />
    <div
      style={containerStyle()}
      className="flex flex-col bg-[var(--bg-secondary)]"
    >
      {/* ── Header ── */}
      {isClosing ? (
        /* Row-style header during close — looks like it's falling back into the list */
        <div className="flex items-center gap-3 px-4 py-3 shrink-0">
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-none ${
              isCompleted ? 'border-emerald-500 bg-emerald-500' : 'border-[var(--border-color)]'
            }`}
          >
            {isCompleted && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={`flex-1 text-sm font-medium truncate ${isCompleted ? 'text-[var(--text-muted)] line-through decoration-[var(--border-color)]' : 'text-[var(--text-primary)]'}`}>
            {problem.name}
          </span>
        </div>
      ) : (
        /* Solver header */
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)] shrink-0 bg-[var(--bg-elevated)]">
          {/* Back button */}
          <button
            onClick={triggerClose}
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          <div className="w-px h-5 bg-[var(--border-color)] shrink-0" />

          {/* Difficulty badge */}
          <span
            className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold text-white shadow-sm"
            style={{ background: DIFFICULTY_GRADIENT[problem.difficulty] }}
          >
            {problem.difficulty}
          </span>

          {/* Problem name */}
          <h1 className="text-sm font-semibold text-[var(--text-primary)] truncate">{problem.name}</h1>

          {/* Category badge */}
          <span className="hidden sm:block shrink-0 text-xs text-[var(--text-muted)] bg-[var(--bg-primary)] border border-[var(--border-color)] px-2 py-0.5 rounded-md whitespace-nowrap">
            {problem.category}
          </span>

          <div className="flex-1" />

          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-0.5 shrink-0">
            {(['python', 'javascript'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSwitch(lang)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                  language === lang
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-xs)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {lang === 'python' ? 'Python' : 'JavaScript'}
              </button>
            ))}
          </div>

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={isRunning || !bodyVisible}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-all duration-150 shrink-0"
          >
            {isRunning ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Body (fades in after expansion completes) ── */}
      <div
        className="flex flex-1 min-h-0 transition-opacity duration-200"
        style={{ opacity: bodyVisible ? 1 : 0 }}
      >
        {/* Left panel — description */}
        <div className="w-[45%] shrink-0 overflow-y-auto p-5 border-r border-[var(--border-subtle)] scrollbar-thin">
          <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">
            {detail.description}
          </p>

          {detail.sampleTestCases.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Examples
              </h3>
              <div className="space-y-2">
                {detail.sampleTestCases.map((tc, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-3 py-2.5"
                  >
                    <div className="text-xs text-[var(--text-muted)] font-medium mb-1">Example {i + 1}</div>
                    <code className="text-xs text-[var(--text-secondary)] font-mono break-all">
                      {tc.inputDisplay}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel — editor + results */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* CodeMirror editor */}
          <div className="flex-1 min-h-0 overflow-auto">
            <CodeMirror
              value={code}
              height="100%"
              theme={settings.theme === 'dark' ? oneDark : 'light'}
              extensions={[language === 'python' ? python() : javascript()]}
              onChange={handleCodeChange}
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                autocompletion: true,
                highlightActiveLine: true,
                tabSize: 4,
              }}
              style={{ height: '100%', fontSize: '13px' }}
            />
          </div>

          {/* Results panel */}
          {(runResult || isRunning) && (
            <div className="h-48 shrink-0 border-t border-[var(--border-subtle)] overflow-y-auto scrollbar-thin p-4">
              {isRunning && !runResult ? (
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Running test cases...
                </div>
              ) : runResult ? (
                <>
                  <div className={`text-sm font-semibold mb-3 ${allPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {runResult.passed}/{runResult.total} test cases passed
                  </div>

                  {runResult.runtimeError && (
                    <pre className="text-xs font-mono text-rose-500 bg-rose-500/10 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap mb-2">
                      {runResult.runtimeError}
                    </pre>
                  )}

                  {allPassed && (
                    <div className="space-y-1">
                      {runResult.testResults.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-emerald-500">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[var(--text-muted)] font-mono">{r.input}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {!allPassed && failedResults.length > 0 && (
                    <div className="space-y-2">
                      {failedResults.map((r, i) => (
                        <div key={i} className="rounded-lg bg-rose-500/5 border border-rose-500/20 px-3 py-2">
                          <div className="text-xs font-mono text-[var(--text-muted)] mb-1">{r.input}</div>
                          {r.error
                            ? <div className="text-xs text-rose-400 font-mono">{r.error}</div>
                            : <div className="text-xs text-rose-400">Wrong answer</div>
                          }
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
