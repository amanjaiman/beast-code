import { createContext, useContext, type ReactNode } from 'react';
import { useGroupSession, type UseGroupSessionReturn } from '../hooks/useGroupSession';

const GroupContext = createContext<UseGroupSessionReturn | null>(null);

export function GroupProvider({ children }: { children: ReactNode }) {
  const groupSession = useGroupSession();
  return <GroupContext.Provider value={groupSession}>{children}</GroupContext.Provider>;
}

export function useGroup() {
  const ctx = useContext(GroupContext);
  if (!ctx) throw new Error('useGroup must be used within GroupProvider');
  return ctx;
}
