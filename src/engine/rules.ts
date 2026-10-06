import { buildDungeon, shuffle } from './deck';
import { mulberry32, randomSeed } from './rng';
import { computeScore } from './scoring';
import {
  IllegalActionError,
  MAX_HEALTH,
  ROOM_SIZE,
  type Action,
  type ActionResult,
  type Card,
  type CombatMode,
  type EquippedWeapon,
  type GameEvent,
  type GameState,
  type Slot,
} from './types';

const SLOTS: Slot[] = [0, 1, 2, 3];

/** Start a new run with a shuffled dungeon. */
export function newGame(seed: number = randomSeed()): ActionResult {
  return newGameFromDungeon(shuffle(buildDungeon(), mulberry32(seed)), seed);
}

/** Start a run from an exact dungeon order (index 0 is drawn first). Useful for tests. */
export function newGameFromDungeon(dungeon: Card[], seed = 0): ActionResult {
  const state: GameState = {
    seed,
    dungeon: dungeon.slice(),
    room: Array<Card | null>(ROOM_SIZE).fill(null),
    health: MAX_HEALTH,
    weapon: null,
    discard: [],
    roomNumber: 0,
    resolvedThisRoom: 0,
    potionUsedThisRoom: false,
    avoidedLastRoom: false,
    lastResolved: null,
    status: 'playing',
    score: null,
  };
  const events: GameEvent[] = [];
  dealRoom(state, events);
  return { state, events };
}

// ---------------------------------------------------------------- queries

export function canAvoidRoom(state: GameState): boolean {
  return (
    state.status === 'playing' &&
    state.resolvedThisRoom === 0 &&
    !state.avoidedLastRoom &&
    state.dungeon.length > 0
  );
}

/** Why the room can't be avoided, or null if it can. */
export function avoidBlockedReason(state: GameState): string | null {
  if (state.status !== 'playing') return 'The run is over.';
  if (state.avoidedLastRoom) return "You can't sneak past two rooms in a row.";
  if (state.resolvedThisRoom > 0) return "You've already engaged this room.";
  if (state.dungeon.length === 0) return 'Nowhere left to run.';
  return null;
}

/** Standard rule: a used weapon only works on monsters ≤ the last monster it slew. */
export function canUseWeapon(weapon: EquippedWeapon | null, monster: Card): boolean {
  if (!weapon || monster.role !== 'monster') return false;
  const last = weapon.slain[weapon.slain.length - 1];
  return !last || monster.value <= last.value;
}

/** The highest monster value the equipped weapon can still be used on, or null if unlimited. */
export function weaponLimit(weapon: EquippedWeapon | null): number | null {
  const last = weapon?.slain[weapon.slain.length - 1];
  return last ? last.value : null;
}

export function damageFor(
  monster: Card,
  combat: CombatMode,
  weapon: EquippedWeapon | null,
): number {
  if (combat === 'weapon' && weapon) return Math.max(0, monster.value - weapon.card.value);
  return monster.value;
}

export function getLegalActions(state: GameState): Action[] {
  if (state.status !== 'playing') return [];
  const actions: Action[] = [];
  if (canAvoidRoom(state)) actions.push({ type: 'avoidRoom' });
  for (const slot of SLOTS) {
    const card = state.room[slot];
    if (!card) continue;
    if (card.role === 'monster') {
      actions.push({ type: 'playCard', slot, combat: 'barehanded' });
      if (canUseWeapon(state.weapon, card))
        actions.push({ type: 'playCard', slot, combat: 'weapon' });
    } else {
      actions.push({ type: 'playCard', slot });
    }
  }
  return actions;
}

// ---------------------------------------------------------------- transitions

export function applyAction(prev: GameState, action: Action): ActionResult {
  if (prev.status !== 'playing') throw new IllegalActionError('The game is over.');
  const state = structuredClone(prev);
  const events: GameEvent[] = [];

  switch (action.type) {
    case 'avoidRoom':
      avoidRoom(state, events);
      break;
    case 'playCard':
      playCard(state, action.slot, action.combat, events);
      break;
  }
  return { state, events };
}

function avoidRoom(state: GameState, events: GameEvent[]): void {
  const reason = avoidBlockedReason(state);
  if (reason) throw new IllegalActionError(reason);

  const cards = state.room.filter((c): c is Card => c !== null);
  state.dungeon.push(...cards);
  state.room.fill(null);
  events.push({ type: 'roomAvoided', cards });

  dealRoom(state, events);
  state.avoidedLastRoom = true;
}

function playCard(
  state: GameState,
  slot: Slot,
  combat: CombatMode | undefined,
  events: GameEvent[],
): void {
  const card = state.room[slot];
  if (!card) throw new IllegalActionError(`Slot ${slot} is empty.`);

  if (card.role === 'monster') {
    const mode = combat ?? 'barehanded';
    if (mode === 'weapon' && !canUseWeapon(state.weapon, card)) {
      throw new IllegalActionError('That weapon cannot be used on this monster.');
    }
    fight(state, card, mode, events);
  } else if (card.role === 'weapon') {
    equip(state, card, events);
  } else {
    drink(state, card, events);
  }

  state.room[slot] = null;
  state.resolvedThisRoom++;
  state.lastResolved = card;

  if (state.health <= 0) {
    endGame(state, 'lost', events);
    return;
  }

  const remaining = state.room.filter(Boolean).length;
  if (remaining === 0 && state.dungeon.length === 0) {
    endGame(state, 'won', events);
  } else if (remaining <= 1 && state.dungeon.length > 0) {
    // Room faced: the leftover card carries into the next room.
    dealRoom(state, events);
    state.avoidedLastRoom = false;
  }
}

function fight(state: GameState, monster: Card, mode: CombatMode, events: GameEvent[]): void {
  const damage = damageFor(monster, mode, state.weapon);
  if (mode === 'weapon') state.weapon!.slain.push(monster);
  else state.discard.push(monster);
  state.health = Math.max(0, state.health - damage);
  events.push({ type: 'monsterSlain', card: monster, combat: mode, damage });
}

function equip(state: GameState, card: Card, events: GameEvent[]): void {
  if (state.weapon) {
    events.push({ type: 'weaponDiscarded', weapon: state.weapon });
    state.discard.push(state.weapon.card, ...state.weapon.slain);
  }
  state.weapon = { card, slain: [] };
  events.push({ type: 'weaponEquipped', card });
}

function drink(state: GameState, card: Card, events: GameEvent[]): void {
  state.discard.push(card);
  if (state.potionUsedThisRoom) {
    events.push({ type: 'potionWasted', card });
    return;
  }
  const before = state.health;
  state.health = Math.min(MAX_HEALTH, state.health + card.value);
  state.potionUsedThisRoom = true;
  events.push({ type: 'healed', card, amount: state.health - before });
}

/** Fill empty slots from the top of the dungeon and start a new room. */
function dealRoom(state: GameState, events: GameEvent[]): void {
  const dealt: Slot[] = [];
  for (const slot of SLOTS) {
    if (state.room[slot] || state.dungeon.length === 0) continue;
    state.room[slot] = state.dungeon.shift()!;
    dealt.push(slot);
  }
  state.roomNumber++;
  state.resolvedThisRoom = 0;
  state.potionUsedThisRoom = false;
  events.push({ type: 'roomDealt', roomNumber: state.roomNumber, slots: dealt });
}

function endGame(state: GameState, status: 'won' | 'lost', events: GameEvent[]): void {
  state.status = status;
  state.score = computeScore(state);
  events.push({ type: status, score: state.score });
}
