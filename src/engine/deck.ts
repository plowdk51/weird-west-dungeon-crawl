import type { Card, Role, Suit } from './types';
import type { Rng } from './rng';

const SUIT_ROLES: Record<Suit, { role: Role; maxValue: number }> = {
  clubs: { role: 'monster', maxValue: 14 },
  spades: { role: 'monster', maxValue: 14 },
  diamonds: { role: 'weapon', maxValue: 10 },
  hearts: { role: 'potion', maxValue: 10 },
};

/** The standard 44-card Scoundrel dungeon, unshuffled. */
export function buildDungeon(): Card[] {
  const cards: Card[] = [];
  for (const suit of Object.keys(SUIT_ROLES) as Suit[]) {
    const { role, maxValue } = SUIT_ROLES[suit];
    for (let value = 2; value <= maxValue; value++) {
      cards.push({ id: `${suit}-${value}`, suit, value, role });
    }
  }
  return cards;
}

/** Fisher–Yates shuffle; returns a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
