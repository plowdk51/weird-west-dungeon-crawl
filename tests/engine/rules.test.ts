import { describe, expect, it } from 'vitest';
import {
  applyAction,
  getLegalActions,
  IllegalActionError,
  newGame,
  newGameFromDungeon,
  type Action,
  type GameState,
} from '../../src/engine';
import { monster, potion, spade, weapon } from './helpers';

const play = (state: GameState, action: Action) => applyAction(state, action).state;
const pad = (n: number) => Array.from({ length: n }, () => monster(2));

describe('rooms', () => {
  it('refills after three cards, keeping the fourth in its slot', () => {
    const keep = potion(5);
    let s = newGameFromDungeon([
      monster(2),
      keep,
      monster(3),
      monster(4),
      weapon(9),
      weapon(8),
      weapon(7),
      ...pad(4),
    ]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 2 });
    expect(s.roomNumber).toBe(1);
    const { state, events } = applyAction(s, { type: 'playCard', slot: 3 });
    expect(state.roomNumber).toBe(2);
    expect(state.room[1]).toEqual(keep);
    expect(state.room.map((c) => c?.value)).toEqual([9, 5, 8, 7]);
    expect(events.at(-1)).toEqual({ type: 'roomDealt', roomNumber: 2, slots: [0, 2, 3] });
  });

  it('avoiding puts the room on the bottom in slot order and deals a new room', () => {
    const room = [monster(10), weapon(3), potion(4), monster(5)];
    const next = [monster(6), monster(7), monster(8), monster(9)];
    const s = play(newGameFromDungeon([...room, ...next]).state, { type: 'avoidRoom' });
    expect(s.room).toEqual(next);
    expect(s.dungeon).toEqual(room);
    expect(s.roomNumber).toBe(2);
    expect(s.avoidedLastRoom).toBe(true);
  });

  it('forbids avoiding two rooms in a row, and allows it again after facing a room', () => {
    let s = play(newGame(3).state, { type: 'avoidRoom' });
    expect(() => play(s, { type: 'avoidRoom' })).toThrow(IllegalActionError);
    expect(getLegalActions(s).some((a) => a.type === 'avoidRoom')).toBe(false);
    s = play(s, { type: 'playCard', slot: 0, combat: 'barehanded' });
    s = play(s, { type: 'playCard', slot: 1, combat: 'barehanded' });
    s = play(s, { type: 'playCard', slot: 2, combat: 'barehanded' });
    if (s.status === 'playing') {
      expect(s.avoidedLastRoom).toBe(false);
      expect(getLegalActions(s).some((a) => a.type === 'avoidRoom')).toBe(true);
    }
  });

  it('forbids avoiding once a card in the room has been played', () => {
    const s = play(newGame(5).state, { type: 'playCard', slot: 0, combat: 'barehanded' });
    expect(() => play(s, { type: 'avoidRoom' })).toThrow(/engaged/);
  });

  it('rejects playing an empty slot', () => {
    const s = newGameFromDungeon([monster(2), monster(3)]).state;
    expect(() => play(s, { type: 'playCard', slot: 3 })).toThrow(IllegalActionError);
  });
});

describe('potions', () => {
  it('heals up to a maximum of 20', () => {
    let s = newGameFromDungeon([monster(5), potion(10), monster(2), monster(2), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    expect(s.health).toBe(15);
    const { state, events } = applyAction(s, { type: 'playCard', slot: 1 });
    expect(state.health).toBe(20);
    expect(events[0]).toMatchObject({ type: 'healed', amount: 5 });
  });

  it('only the first potion in a room heals; the second is wasted', () => {
    let s = newGameFromDungeon([monster(10), potion(3), potion(4), monster(2), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1 });
    expect(s.health).toBe(13);
    const { state, events } = applyAction(s, { type: 'playCard', slot: 2 });
    expect(state.health).toBe(13);
    expect(events[0]).toMatchObject({ type: 'potionWasted' });
  });

  it('the potion limit resets when a new room is dealt', () => {
    let s = newGameFromDungeon([
      monster(10),
      potion(3),
      monster(2),
      potion(4), // room 1: slot 3 carries over
      monster(2),
      monster(2),
      monster(2),
      ...pad(4),
    ]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1 });
    s = play(s, { type: 'playCard', slot: 2 });
    expect(s.roomNumber).toBe(2);
    expect(s.health).toBe(11);
    s = play(s, { type: 'playCard', slot: 3 });
    expect(s.health).toBe(15);
  });
});

describe('combat', () => {
  it('barehanded takes the full value', () => {
    const s = play(newGameFromDungeon([monster(13), ...pad(7)]).state, {
      type: 'playCard',
      slot: 0,
    });
    expect(s.health).toBe(7);
    expect(s.discard.at(-1)?.value).toBe(13);
  });

  it('a weapon reduces damage by its value and stacks the monster', () => {
    let s = newGameFromDungeon([weapon(5), monster(8), monster(3), monster(2), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1, combat: 'weapon' });
    expect(s.health).toBe(17);
    s = play(s, { type: 'playCard', slot: 2, combat: 'weapon' });
    expect(s.health).toBe(17);
    expect(s.weapon?.slain.map((c) => c.value)).toEqual([8, 3]);
  });

  it('a used weapon works on monsters equal to or below its last kill only', () => {
    let s = newGameFromDungeon([weapon(4), monster(7), spade(7), monster(8), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1, combat: 'weapon' });
    // Equal value is allowed.
    const legal = getLegalActions(s);
    expect(legal).toContainEqual({ type: 'playCard', slot: 2, combat: 'weapon' });
    expect(legal).not.toContainEqual({ type: 'playCard', slot: 3, combat: 'weapon' });
    expect(() => play(s, { type: 'playCard', slot: 3, combat: 'weapon' })).toThrow(
      IllegalActionError,
    );
    s = play(s, { type: 'playCard', slot: 2, combat: 'weapon' });
    expect(s.health).toBe(14);
  });

  it('fighting barehanded does not change the weapon limit', () => {
    let s = newGameFromDungeon([weapon(4), monster(5), monster(9), monster(3), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1, combat: 'weapon' });
    s = play(s, { type: 'playCard', slot: 2, combat: 'barehanded' });
    expect(s.weapon?.slain.map((c) => c.value)).toEqual([5]);
  });

  it('weapon combat is not offered without a weapon', () => {
    const s = newGameFromDungeon([monster(5), ...pad(7)]).state;
    expect(getLegalActions(s)).not.toContainEqual({ type: 'playCard', slot: 0, combat: 'weapon' });
    expect(() => play(s, { type: 'playCard', slot: 0, combat: 'weapon' })).toThrow(
      IllegalActionError,
    );
  });

  it('a new weapon discards the old one along with its slain monsters', () => {
    let s = newGameFromDungeon([weapon(4), monster(3), weapon(9), monster(2), ...pad(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1, combat: 'weapon' });
    const { state, events } = applyAction(s, { type: 'playCard', slot: 2 });
    expect(state.weapon).toEqual({ card: expect.objectContaining({ value: 9 }), slain: [] });
    expect(state.discard.map((c) => c.value)).toEqual([4, 3]);
    expect(events.map((e) => e.type)).toEqual(['weaponDiscarded', 'weaponEquipped', 'roomDealt']);
  });
});

describe('end of game', () => {
  it('dies at 0 health, scoring minus every unresolved monster', () => {
    let s = newGameFromDungeon([
      monster(14),
      monster(6),
      potion(2),
      weapon(3),
      monster(5),
      monster(9),
    ]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    const { state, events } = applyAction(s, { type: 'playCard', slot: 1 });
    expect(state.status).toBe('lost');
    expect(state.health).toBe(0);
    // Remaining monsters: 5 and 9 in the dungeon.
    expect(state.score).toBe(-14);
    expect(events.at(-1)).toEqual({ type: 'lost', score: -14 });
    expect(() => play(state, { type: 'avoidRoom' })).toThrow(IllegalActionError);
  });

  it('a final partial room must be fully cleared, and cannot be avoided', () => {
    // 4 + 1 cards: after room 1 is faced, the last room holds 2 cards.
    let s = newGameFromDungeon([monster(2), monster(2), monster(2), monster(3), monster(4)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1 });
    s = play(s, { type: 'playCard', slot: 2 });
    expect(s.dungeon).toHaveLength(0);
    expect(s.room.filter(Boolean)).toHaveLength(2);
    expect(() => play(s, { type: 'avoidRoom' })).toThrow(/Nowhere/);
    s = play(s, { type: 'playCard', slot: 0 });
    expect(s.status).toBe('playing');
    const { state, events } = applyAction(s, { type: 'playCard', slot: 3 });
    expect(state.status).toBe('won');
    expect(state.score).toBe(7);
    expect(events.at(-1)).toEqual({ type: 'won', score: 7 });
  });

  it('wins at full health with a final potion and adds its value', () => {
    let s = newGameFromDungeon([monster(2), potion(5), weapon(2), potion(8)]).state;
    s = play(s, { type: 'playCard', slot: 0 });
    s = play(s, { type: 'playCard', slot: 1 });
    s = play(s, { type: 'playCard', slot: 2 });
    const { state } = applyAction(s, { type: 'playCard', slot: 3 });
    expect(state.status).toBe('won');
    expect(state.health).toBe(20);
    expect(state.score).toBe(28);
  });

  it('a full random game always ends exactly once', () => {
    for (let seed = 0; seed < 50; seed++) {
      let s = newGame(seed).state;
      let steps = 0;
      while (s.status === 'playing') {
        const actions = getLegalActions(s).filter((a) => a.type === 'playCard');
        s = play(s, actions[(seed + steps) % actions.length]!);
        steps++;
        expect(s.health).toBeGreaterThanOrEqual(0);
        expect(s.health).toBeLessThanOrEqual(20);
      }
      expect(s.score).not.toBeNull();
      expect(getLegalActions(s)).toEqual([]);
    }
  });
});
