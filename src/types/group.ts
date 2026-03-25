export type SessionStatus = 'lobby' | 'running' | 'vote' | 'finished';

export interface GroupMember {
  userId: string;
  displayName: string;
  isHost: boolean;
  isDone: boolean;
  joinedAt: number;
}

export interface VoteState {
  additionalSeconds: number;
  yesCount: number;
  noCount: number;
  deadline: number; // ms timestamp
  memberCount: number; // snapshot of member count when vote started
}

export interface SessionState {
  status: SessionStatus;
  durationSeconds: number;
  startedAt?: number; // ms timestamp
  problemId?: number;
  vote?: VoteState;
}
