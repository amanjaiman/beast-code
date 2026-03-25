import { useState, useRef, useEffect } from 'react';
import { useGroup } from '../context/GroupContext';
import { formatTime } from '../utils/groupHelpers';

interface GroupPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function MemberBadge({
  displayName,
  isHost,
  isDone,
  isMe,
  showDone,
}: {
  displayName: string;
  isHost: boolean;
  isDone: boolean;
  isMe: boolean;
  showDone: boolean;
}) {
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
        isMe
          ? 'bg-sky-500/10 border border-sky-500/20'
          : 'bg-[var(--bg-secondary)] border border-[var(--border-color)]'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
          isDone && showDone
            ? 'bg-emerald-500'
            : isMe
            ? 'bg-gradient-to-br from-sky-500 to-cyan-500'
            : 'bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700'
        }`}
      >
        {isDone && showDone ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {displayName}
          {isMe && <span className="text-[var(--text-muted)] font-normal"> (you)</span>}
        </p>
        {isHost && (
          <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">Host</p>
        )}
      </div>
      {showDone && (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
            isDone
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
          }`}
        >
          {isDone ? 'Done' : 'Working…'}
        </span>
      )}
    </div>
  );
}

function CountdownRing({ remainingSeconds, totalSeconds }: { remainingSeconds: number; totalSeconds: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, remainingSeconds / totalSeconds));
  const dashOffset = circumference * (1 - progress);

  const isLow = remainingSeconds < 60;
  const isVeryLow = remainingSeconds < 30;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
        {/* Track */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-[var(--border-color)]"
        />
        {/* Progress */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={`transition-all duration-500 ${
            isVeryLow
              ? 'stroke-rose-500'
              : isLow
              ? 'stroke-amber-500'
              : 'stroke-sky-500'
          }`}
        />
      </svg>
      <span
        className={`text-3xl font-mono font-bold tabular-nums ${
          isVeryLow
            ? 'text-rose-500'
            : isLow
            ? 'text-amber-500'
            : 'text-[var(--text-primary)]'
        }`}
      >
        {formatTime(remainingSeconds)}
      </span>
    </div>
  );
}

// ── Main GroupPanel ─────────────────────────────────────────────────────────

export function GroupPanel({ isOpen, onClose }: GroupPanelProps) {
  const {
    groupCode,
    members,
    session,
    myUserId,
    myDisplayName,
    myIsDone,
    myVote,
    allDone,
    remainingSeconds,
    connectionStatus,
    createGroup,
    joinGroup,
    leaveGroup,
    startSession,
    markDone,
    requestMoreTime,
    castVote,
    resetSession,
    setDisplayName,
  } = useGroup();

  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [customDuration, setCustomDuration] = useState<number | null>(null);
  const [customDurationError, setCustomDurationError] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(900); // 15 min default
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(myDisplayName);
  const [copied, setCopied] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const joinInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus join input when panel opens
  useEffect(() => {
    if (isOpen && !groupCode) {
      setTimeout(() => joinInputRef.current?.focus(), 50);
    }
  }, [isOpen, groupCode]);

  // Keep nameInput in sync with myDisplayName
  useEffect(() => {
    setNameInput(myDisplayName);
  }, [myDisplayName]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJoin = () => {
    const code = joinCode.toUpperCase().replace(/[^A-Z2-9]/g, '');
    if (code.length !== 6) {
      setJoinError('Enter a valid 6-character code');
      return;
    }
    setJoinError('');
    joinGroup(code);
    setJoinCode('');
  };

  const handleCopyCode = () => {
    if (!groupCode) return;
    navigator.clipboard.writeText(groupCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length > 0) {
      setDisplayName(trimmed);
    }
    setEditingName(false);
  };

  const handleStartSession = () => {
    if (customDurationError) return;
    const duration = customDuration ?? selectedDuration;
    startSession(duration);
  };

  // Whether to show done status (you're done, or all are done)
  const showDoneStatus = myIsDone || allDone;

  const durationOptions = [
    { label: '5 min', value: 300 },
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
  ];

  const voteTimeOptions = [
    { label: '+5 min', value: 300 },
    { label: '+10 min', value: 600 },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-end animate-fade-in sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full sm:w-96 h-full sm:h-auto sm:max-h-[90vh] bg-[var(--bg-elevated)] sm:rounded-2xl border-l sm:border border-[var(--border-color)] shadow-2xl overflow-y-auto flex flex-col animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Group Session</h2>
              {groupCode && (
                <p className="text-xs text-[var(--text-muted)]">
                  {connectionStatus === 'connected'
                    ? `${members.length} member${members.length !== 1 ? 's' : ''}`
                    : connectionStatus === 'connecting'
                    ? 'Connecting…'
                    : 'Disconnected'}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-5">

          {/* ── No group: Create / Join ── */}
          {!groupCode && (
            <>
              {/* Display name */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Your Display Name
                </label>
                <div className="flex gap-2">
                  {editingName ? (
                    <>
                      <input
                        ref={nameInputRef}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') setEditingName(false);
                        }}
                        maxLength={24}
                        className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-3 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingName(true);
                        setTimeout(() => nameInputRef.current?.focus(), 0);
                      }}
                      className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-sky-500/50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-[var(--text-primary)]">{myDisplayName}</span>
                      <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Create group */}
              <div>
                <button
                  onClick={createGroup}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Group
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[var(--border-color)]" />
                <span className="text-xs text-[var(--text-muted)] font-medium">or</span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
              </div>

              {/* Join group */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Join with Code
                </label>
                <div className="flex gap-2">
                  <input
                    ref={joinInputRef}
                    value={joinCode}
                    onChange={(e) => {
                      setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, '').slice(0, 6));
                      setJoinError('');
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleJoin(); }}
                    placeholder="ABC123"
                    maxLength={6}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] font-mono tracking-widest uppercase focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    onClick={handleJoin}
                    disabled={joinCode.length !== 6}
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Join
                  </button>
                </div>
                {joinError && (
                  <p className="mt-1.5 text-xs text-rose-500">{joinError}</p>
                )}
              </div>
            </>
          )}

          {/* ── In a group ── */}
          {groupCode && (
            <>
              {/* Group code */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Group Code — Share with friends
                </label>
                <button
                  onClick={handleCopyCode}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-violet-500/50 transition-colors group"
                >
                  <span className="text-2xl font-mono font-bold tracking-[0.3em] text-[var(--text-primary)]">
                    {groupCode}
                  </span>
                  <span className={`text-xs font-semibold transition-colors ${copied ? 'text-emerald-500' : 'text-[var(--text-muted)] group-hover:text-violet-500'}`}>
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Members */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Members ({members.length})
                </label>
                <div className="space-y-1.5">
                  {members.map((m) => (
                    <MemberBadge
                      key={m.userId}
                      displayName={m.displayName}
                      isHost={m.isHost}
                      isDone={m.isDone}
                      isMe={m.userId === myUserId}
                      showDone={showDoneStatus}
                    />
                  ))}
                  {members.length === 0 && (
                    <p className="text-sm text-[var(--text-muted)] text-center py-2">
                      Waiting for members…
                    </p>
                  )}
                </div>
              </div>

              {/* ── LOBBY ── */}
              {session.status === 'lobby' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Timer Duration
                    </label>
                    <div className="flex gap-2">
                      {durationOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSelectedDuration(opt.value);
                            setCustomDuration(null);
                          }}
                          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                            selectedDuration === opt.value && customDuration === null
                              ? 'bg-violet-500 text-white shadow-md'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={120}
                        placeholder="Custom (min)"
                        value={customDuration !== null ? customDuration / 60 : ''}
                        onChange={(e) => {
                          const raw = e.target.value;
                          if (raw === '') {
                            setCustomDuration(null);
                            setCustomDurationError('');
                            return;
                          }
                          const val = parseInt(raw, 10);
                          if (isNaN(val) || val <= 0) {
                            setCustomDurationError('Enter a number greater than 0');
                            setCustomDuration(null);
                          } else if (val > 120) {
                            setCustomDurationError('Maximum is 120 minutes');
                            setCustomDuration(null);
                          } else {
                            setCustomDurationError('');
                            setCustomDuration(val * 60);
                          }
                        }}
                        className={`flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                          customDurationError
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                            : 'border-[var(--border-color)] focus:border-violet-500 focus:ring-violet-500'
                        }`}
                      />
                      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">minutes</span>
                    </div>
                    {customDurationError && (
                      <p className="mt-1 text-xs text-rose-500">{customDurationError}</p>
                    )}
                  </div>

                  <button
                    onClick={handleStartSession}
                    disabled={members.length < 1}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Problem Timer
                  </button>
                </div>
              )}

              {/* ── RUNNING ── */}
              {(session.status === 'running' || session.status === 'vote') && (
                <div className="space-y-4">
                  {/* Timer */}
                  <div className="flex flex-col items-center py-2">
                    <CountdownRing
                      remainingSeconds={remainingSeconds}
                      totalSeconds={session.durationSeconds}
                    />
                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      {session.status === 'vote' ? 'Vote in progress…' : 'Time remaining'}
                    </p>
                  </div>

                  {/* Vote overlay */}
                  {session.status === 'vote' && session.vote && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                          Add {formatTime(session.vote.additionalSeconds)} more?
                        </p>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Votes are anonymous. Expires in {formatTime(Math.max(0, (session.vote.deadline - Date.now()) / 1000))}.
                      </p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>Yes: {session.vote.yesCount}</span>
                        <span>No: {session.vote.noCount}</span>
                        <span>{session.vote.yesCount + session.vote.noCount}/{members.length} voted</span>
                      </div>
                      {myVote === null ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => castVote('yes')}
                            className="flex-1 py-2 rounded-xl font-semibold text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                          >
                            👍 Yes
                          </button>
                          <button
                            onClick={() => castVote('no')}
                            className="flex-1 py-2 rounded-xl font-semibold text-sm text-white bg-rose-500 hover:bg-rose-600 transition-colors"
                          >
                            👎 No
                          </button>
                        </div>
                      ) : (
                        <p className="text-center text-sm font-medium text-[var(--text-muted)]">
                          You voted <span className={myVote === 'yes' ? 'text-emerald-500' : 'text-rose-500'}>{myVote === 'yes' ? 'Yes 👍' : 'No 👎'}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Done status */}
                  {myIsDone ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        ✓ You're done!
                      </p>
                      {allDone ? (
                        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">
                          Everyone finished! Ending session…
                        </p>
                      ) : (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          Waiting for {members.filter((m) => !m.isDone).length} more…
                        </p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={markDone}
                      className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      I'm Done!
                    </button>
                  )}

                  {/* Request more time */}
                  {session.status === 'running' && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-center">
                        Need more time?
                      </p>
                      <div className="flex gap-2">
                        {voteTimeOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => requestMoreTime(opt.value)}
                            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 border border-[var(--border-color)] transition-all"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] text-center">
                        Starts a group vote — all votes are anonymous
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── FINISHED ── */}
              {session.status === 'finished' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-center">
                    <div className="text-3xl mb-1">🎉</div>
                    <p className="text-base font-bold text-[var(--text-primary)]">
                      {allDone ? 'Everyone finished!' : "Time's up!"}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      {formatTime(session.durationSeconds)} session complete
                    </p>
                  </div>

                  {/* Member results */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Results
                    </label>
                    <div className="space-y-1.5">
                      {members.map((m) => (
                        <MemberBadge
                          key={m.userId}
                          displayName={m.displayName}
                          isHost={m.isHost}
                          isDone={m.isDone}
                          isMe={m.userId === myUserId}
                          showDone={true}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={resetSession}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Next Problem
                  </button>
                </div>
              )}

              {/* Leave group */}
              <div className="pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => {
                    leaveGroup();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                >
                  Leave Group
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
