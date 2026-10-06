import { describe, expect, it } from 'vitest';
import { buildDungeon, mulberry32, newGame, shuffle } from '../../src/engine';

describe('dungeon', () => {
  it('has the standard 44 cards: 26 monsters, 9 weapons, 9 potions', () => {
    const cards = buildDungeon();
    expect(cards).toHaveLength(44);
    expect(new Set(cards.map((c) => c.id)).size).toBe(44);
    expect(cards.filter((c) => c.role === 'monster')).toHaveLength(26);
    expect(cards.filter((c) => c.role === 'weapon')).toHaveLength(9);
    expect(cards.filter((c) => c.role === 'potion')).toHaveLength(9);
  });

  it('maps suits to roles and value ranges', () => {
    for (const c of buildDungeon()) {
      if (c.suit === 'clubs' || c.suit === 'spades') {
        expect(c.role).toBe('monster');
        expect(c.value).toBeGreaterThanOrEqual(2);
        expect(c.value).toBeLessThanOrEqual(14);
      } else {
        expect(c.role).toBe(c.suit === 'diamonds' ? 'weapon' : 'potion');
        expect(c.value).toBeGreaterThanOrEqual(2);
        expect(c.value).toBeLessThanOrEqual(10);
      }
    }
  });

  it('shuffles deterministically for a seed without losing cards', () => {
    const a = shuffle(buildDungeon(), mulberry32(42));
    const b = shuffle(buildDungeon(), mulberry32(42));
    const c = shuffle(buildDungeon(), mulberry32(7));
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
    expect(a.map((x) => x.id).sort()).toEqual(
      buildDungeon()
        .map((x) => x.id)
        .sort(),
    );
  });

  it('starts a game with a full room and 40 cards in the dungeon', () => {
    const { state, events } = newGame(1);
    expect(state.room.every(Boolean)).toBe(true);
    expect(state.dungeon).toHaveLength(40);
    expect(state.health).toBe(20);
    expect(state.roomNumber).toBe(1);
    expect(events).toEqual([{ type: 'roomDealt', roomNumber: 1, slots: [0, 1, 2, 3] }]);
  });
});
