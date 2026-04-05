import { useState, useEffect, useRef, useCallback } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { GroupMember, SessionState } from '../types/group';
import {
  generateGroupCode,
  getOrCreateAnonId,
  getOrCreateDisplayName,
  saveDisplayName,
} from '../utils/groupHelpers';
import { useAuth } from '../context/AuthContext';

const DEFAULT_SESSION: SessionState = {
  status: 'lobby',
  durationSeconds: 900, // 15 minutes
};

const VOTE_DEADLINE_MS = 30_000; // 30-second voting window

interface PresencePayload {
  userId: string;
  displayName: string;
  isHost: boolean;
  isDone: boolean;
  joinedAt: number;
}

export interface UseGroupSessionReturn {
  groupCode: string | null;
  members: GroupMember[];
  session: SessionState;
  isHost: boolean;
  myUserId: string;
  myDisplayName: string;
  myIsDone: boolean;
  myVote: 'yes' | 'no' | null;
  allDone: boolean;
  remainingSeconds: number;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';

  createGroup: () => void;
  joinGroup: (code: string) => void;
  leaveGroup: () => void;
  startSession: (durationSeconds: number, problemId?: number) => void;
  markDone: () => void;
  requestMoreTime: (additionalSeconds: number) => void;
  castVote: (vote: 'yes' | 'no') => void;
  resetSession: () => void;
  setDisplayName: (name: string) => void;
}

export function useGroupSession(): UseGroupSessionReturn {
  const { user } = useAuth();

  // Stable identity across renders
  const myUserId = user?.id ?? getOrCreateAnonId();
  const [myDisplayName, setMyDisplayNameState] = useState(
    user?.email?.split('@')[0] ?? getOrCreateDisplayName()
  );

  const [groupCode, setGroupCode] = useState<string | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [session, setSession] = useState<SessionState>(DEFAULT_SESSION);
  const [isHost, setIsHost] = useState(false);
  const [myIsDone, setMyIsDone] = useState(false);
  const [myVote, setMyVote] = useState<'yes' | 'no' | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_SESSION.durationSeconds);
  const [connectionStatus, setConnectionStatus] = useState<
    'disconnected' | 'connecting' | 'connected'
  >('disconnected');

  // Refs for stable values in callbacks
  const channelRef = useRef<RealtimeChannel | null>(null);
  const sessionRef = useRef<SessionState>(DEFAULT_SESSION);
  sessionRef.current = session;
  const isHostRef = useRef(false);
  isHostRef.current = isHost;
  const myIsDoneRef = useRef(false);
  myIsDoneRef.current = myIsDone;
  const myVoteRef = useRef<'yes' | 'no' | null>(null);
  myVoteRef.current = myVote;
  const myUserIdRef = useRef(myUserId);
  myUserIdRef.current = myUserId;
  const myDisplayNameRef = useRef(myDisplayName);
  myDisplayNameRef.current = myDisplayName;
  const isHostStateRef = useRef(isHost);
  isHostStateRef.current = isHost;
  const membersRef = useRef<GroupMember[]>([]);
  membersRef.current = members;
  const voteCountRef = useRef({ yes: 0, no: 0 });

  const allDone = members.length > 0 && members.every((m) => m.isDone);

  // ── Countdown ticker ──
  useEffect(() => {
    if (session.status !== 'running' || !session.startedAt) {
      setRemainingSeconds(session.durationSeconds);
      return;
    }

    const tick = () => {
      const elapsed = (Date.now() - session.startedAt!) / 1000;
      const remaining = session.durationSeconds - elapsed;
      setRemainingSeconds(Math.max(0, remaining));
      return remaining;
    };

    tick();
    const interval = setInterval(() => {
      const r = tick();
      if (r <= 0) {
        clearInterval(interval);
        if (isHostRef.current) {
          const newState: SessionState = { ...sessionRef.current, status: 'finished' };
          setSession(newState);
          channelRef.current?.send({
            type: 'broadcast',
            event: 'session_update',
            payload: { state: newState },
          });
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [session.status, session.startedAt, session.durationSeconds]);

  // ── End session early when everyone is done ──
  const prevAllDoneRef = useRef(false);
  useEffect(() => {
    if (allDone && !prevAllDoneRef.current && isHost && session.status === 'running') {
      const newState: SessionState = { ...session, status: 'finished' };
      setSession(newState);
      channelRef.current?.send({
        type: 'broadcast',
        event: 'session_update',
        payload: { state: newState },
      });
    }
    prevAllDoneRef.current = allDone;
  }, [allDone, isHost, session]);

  // ── Resolve vote (host only) ──
  const resolveVote = useCallback(() => {
    const s = sessionRef.current;
    if (s.status !== 'vote' || !s.vote) return;

    const { yesCount, noCount, additionalSeconds } = s.vote;
    const newState: SessionState = {
      ...s,
      status: 'running',
      durationSeconds:
        yesCount > noCount ? s.durationSeconds + additionalSeconds : s.durationSeconds,
      vote: undefined,
    };

    voteCountRef.current = { yes: 0, no: 0 };
    setMyVote(null);
    setSession(newState);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'session_update',
      payload: { state: newState },
    });
  }, []);

  // ── Vote deadline watcher ──
  useEffect(() => {
    if (session.status !== 'vote' || !session.vote) return;

    const timeLeft = session.vote.deadline - Date.now();
    if (timeLeft <= 0) {
      if (isHostRef.current) resolveVote();
      return;
    }

    const timeout = setTimeout(() => {
      if (isHostRef.current) resolveVote();
    }, timeLeft);

    return () => clearTimeout(timeout);
  }, [session.status, session.vote, resolveVote]);

  // ── Track presence helper ──
  const trackPresence = useCallback((isDone: boolean, displayName: string) => {
    channelRef.current?.track({
      userId: myUserIdRef.current,
      displayName,
      isHost: isHostStateRef.current,
      isDone,
      joinedAt: Date.now(),
    } as PresencePayload);
  }, []);

  // ── Subscribe to Supabase Realtime channel ──
  const subscribeToChannel = useCallback(
    (code: string, asHost: boolean) => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      setConnectionStatus('connecting');

      const channel = supabase.channel(`group-${code}`, {
        config: {
          presence: { key: myUserIdRef.current },
        },
      });

      // Presence → member list
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PresencePayload>();
        const list: GroupMember[] = Object.values(state)
          .flat()
          .map((p) => ({
            userId: p.userId,
            displayName: p.displayName,
            isHost: p.isHost,
            isDone: p.isDone,
            joinedAt: p.joinedAt,
          }))
          .sort((a, b) => a.joinedAt - b.joinedAt);
        setMembers(list);
      });

      // Receive session state
      channel.on('broadcast', { event: 'session_update' }, ({ payload }) => {
        const newState = payload.state as SessionState;
        setSession(newState);
        if (newState.status === 'lobby') {
          setMyIsDone(false);
          setMyVote(null);
          voteCountRef.current = { yes: 0, no: 0 };
        }
      });

      // Host responds to state requests from new members
      channel.on('broadcast', { event: 'request_state' }, () => {
        if (isHostRef.current) {
          channel.send({
            type: 'broadcast',
            event: 'session_update',
            payload: { state: sessionRef.current },
          });
        }
      });

      // Vote tallying — only host tallies, others just track the count from session_update
      channel.on('broadcast', { event: 'vote_cast' }, ({ payload }) => {
        if (!isHostRef.current) return;
        const vote = payload.vote as 'yes' | 'no';
        voteCountRef.current[vote]++;

        const s = sessionRef.current;
        if (s.status !== 'vote' || !s.vote) return;

        const newState: SessionState = {
          ...s,
          vote: {
            ...s.vote,
            yesCount: voteCountRef.current.yes,
            noCount: voteCountRef.current.no,
          },
        };
        setSession(newState);
        channel.send({
          type: 'broadcast',
          event: 'session_update',
          payload: { state: newState },
        });

        const total = voteCountRef.current.yes + voteCountRef.current.no;
        // Use the member count captured at vote start to avoid stale counts
        if (total >= (s.vote.memberCount ?? membersRef.current.length)) {
          resolveVote();
        }
      });

      channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
          await channel.track({
            userId: myUserIdRef.current,
            displayName: myDisplayNameRef.current,
            isHost: asHost,
            isDone: false,
            joinedAt: Date.now(),
          } as PresencePayload);

          // New joiner requests current state from host
          if (!asHost) {
            channel.send({
              type: 'broadcast',
              event: 'request_state',
              payload: {},
            });
          }
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setConnectionStatus('disconnected');
        }
      });

      channelRef.current = channel;
    },
    [resolveVote]
  );

  // Re-track presence when isDone or displayName changes
  useEffect(() => {
    if (groupCode && channelRef.current) {
      trackPresence(myIsDone, myDisplayName);
    }
  }, [myIsDone, myDisplayName, groupCode, trackPresence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  // ── Actions ──
  const createGroup = useCallback(() => {
    const code = generateGroupCode();
    setGroupCode(code);
    setIsHost(true);
    setSession(DEFAULT_SESSION);
    setMyIsDone(false);
    setMyVote(null);
    setMembers([]);
    voteCountRef.current = { yes: 0, no: 0 };
    subscribeToChannel(code, true);
  }, [subscribeToChannel]);

  const joinGroup = useCallback(
    (code: string) => {
      const normalized = code
        .toUpperCase()
        .replace(/[^A-Z2-9]/g, '')
        .slice(0, 6);
      setGroupCode(normalized);
      setIsHost(false);
      setSession(DEFAULT_SESSION);
      setMyIsDone(false);
      setMyVote(null);
      setMembers([]);
      voteCountRef.current = { yes: 0, no: 0 };
      subscribeToChannel(normalized, false);
    },
    [subscribeToChannel]
  );

  const leaveGroup = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setGroupCode(null);
    setMembers([]);
    setSession(DEFAULT_SESSION);
    setIsHost(false);
    setMyIsDone(false);
    setMyVote(null);
    setConnectionStatus('disconnected');
    voteCountRef.current = { yes: 0, no: 0 };
  }, []);

  const startSession = useCallback((durationSeconds: number, problemId?: number) => {
    const newState: SessionState = {
      status: 'running',
      durationSeconds,
      startedAt: Date.now(),
      problemId,
    };
    setSession(newState);
    setMyIsDone(false);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'session_update',
      payload: { state: newState },
    });
    // Reset everyone's done status in presence
    channelRef.current?.track({
      userId: myUserIdRef.current,
      displayName: myDisplayNameRef.current,
      isHost: isHostStateRef.current,
      isDone: false,
      joinedAt: Date.now(),
    } as PresencePayload);
  }, []);

  const markDone = useCallback(() => {
    setMyIsDone(true);
  }, []);

  const requestMoreTime = useCallback(
    (additionalSeconds: number) => {
      const s = sessionRef.current;
      if (s.status !== 'running') return;

      voteCountRef.current = { yes: 0, no: 0 };
      const newState: SessionState = {
        ...s,
        status: 'vote',
        vote: {
          additionalSeconds,
          yesCount: 0,
          noCount: 0,
          deadline: Date.now() + VOTE_DEADLINE_MS,
          memberCount: membersRef.current.length, // snapshot to prevent stale count issues
        },
      };
      setSession(newState);
      channelRef.current?.send({
        type: 'broadcast',
        event: 'session_update',
        payload: { state: newState },
      });
    },
    []
  );

  const castVote = useCallback(
    (vote: 'yes' | 'no') => {
      if (myVoteRef.current !== null) return; // Already voted
      setMyVote(vote);
      myVoteRef.current = vote;

      if (isHostRef.current) {
        // Host tallies their own vote directly (broadcast doesn't loop back to self)
        voteCountRef.current[vote]++;
        const s = sessionRef.current;
        if (s.status === 'vote' && s.vote) {
          const newState: SessionState = {
            ...s,
            vote: {
              ...s.vote,
              yesCount: voteCountRef.current.yes,
              noCount: voteCountRef.current.no,
            },
          };
          setSession(newState);
          channelRef.current?.send({
            type: 'broadcast',
            event: 'session_update',
            payload: { state: newState },
          });
          if (voteCountRef.current.yes + voteCountRef.current.no >= (s.vote.memberCount ?? membersRef.current.length)) {
            resolveVote();
          }
        }
      } else {
        // Non-host broadcasts anonymous vote to host
        channelRef.current?.send({
          type: 'broadcast',
          event: 'vote_cast',
          payload: { vote },
        });
      }
    },
    [resolveVote]
  );

  const resetSession = useCallback(() => {
    const newState: SessionState = DEFAULT_SESSION;
    setSession(newState);
    setMyIsDone(false);
    setMyVote(null);
    voteCountRef.current = { yes: 0, no: 0 };
    channelRef.current?.send({
      type: 'broadcast',
      event: 'session_update',
      payload: { state: newState },
    });
    channelRef.current?.track({
      userId: myUserIdRef.current,
      displayName: myDisplayNameRef.current,
      isHost: isHostStateRef.current,
      isDone: false,
      joinedAt: Date.now(),
    } as PresencePayload);
  }, []);

  const setDisplayName = useCallback(
    (name: string) => {
      setMyDisplayNameState(name);
      saveDisplayName(name);
      trackPresence(myIsDoneRef.current, name);
    },
    [trackPresence]
  );

  return {
    groupCode,
    members,
    session,
    isHost,
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
  };
}
