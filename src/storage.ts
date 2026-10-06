import type { GameState } from './engine';

// localStorage can throw (private mode, blocked storage); the game must work without it.
const SAVE_KEY = 'wwdc.save.v1';
const BEST_KEY = 'wwdc.best.v1';

export function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    const state = raw ? (JSON.parse(raw) as GameState) : null;
    return state?.status === 'playing' ? state : null;
  } catch {
    return null;
  }
}

export function saveGame(state: GameState): void {
  try {
    if (state.status === 'playing') localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    else localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export function loadBest(): number | null {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw === null ? null : Number(raw);
  } catch {
    return null;
  }
}

/** Records the score if it beats the best; returns true when it is a new best. */
export function recordScore(score: number): boolean {
  const best = loadBest();
  if (best !== null && score <= best) return false;
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    /* ignore */
  }
  return true;
}
