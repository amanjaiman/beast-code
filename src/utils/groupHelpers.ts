const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ANON_ID_KEY = 'beast-anon-id';
const ANON_NAME_KEY = 'beast-anon-name';

const ADJECTIVES = [
  'Swift', 'Clever', 'Bold', 'Calm', 'Eager', 'Fierce', 'Gentle',
  'Happy', 'Jolly', 'Kind', 'Lively', 'Noble', 'Proud', 'Quick',
  'Brave', 'Sharp', 'Smart', 'Tough', 'Wise', 'Witty',
];

const ANIMALS = [
  'Fox', 'Bear', 'Wolf', 'Hawk', 'Lion', 'Tiger', 'Eagle', 'Shark',
  'Panda', 'Lynx', 'Raven', 'Cobra', 'Puma', 'Bison', 'Crane',
  'Viper', 'Rhino', 'Moose', 'Otter', 'Drake',
];

export function generateGroupCode(): string {
  return Array.from(
    { length: 6 },
    () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  ).join('');
}

export function generateDisplayName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
}

export function getOrCreateAnonId(): string {
  let id = localStorage.getItem(ANON_ID_KEY);
  if (!id) {
    // Use crypto.randomUUID() with fallback for older browsers
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID();
    } else {
      // Fallback: generate a UUID-like string using Math.random
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
    }
    localStorage.setItem(ANON_ID_KEY, id);
  }
  return id;
}

export function getOrCreateDisplayName(): string {
  let name = localStorage.getItem(ANON_NAME_KEY);
  if (!name) {
    name = generateDisplayName();
    localStorage.setItem(ANON_NAME_KEY, name);
  }
  return name;
}

export function saveDisplayName(name: string): void {
  localStorage.setItem(ANON_NAME_KEY, name);
}

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
