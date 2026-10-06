export const MAX_HEALTH = 20;
export const ROOM_SIZE = 4;
/** Cards a player must resolve before the room refills (the last one carries over). */
export const CARDS_TO_CLEAR_ROOM = ROOM_SIZE - 1;

export type Suit = 'clubs' | 'spades' | 'diamonds' | 'hearts';
export type Role = 'monster' | 'weapon' | 'potion';

/**
 * A card in the hidden deck. Suit and value are explicit data so that gameplay
 * never depends on display text, and so suits can have distinct art later.
 */
export interface Card {
  id: string;
  suit: Suit;
  /** 2–10, J=11, Q=12, K=13, A=14 */
  value: number;
  role: Role;
}

export interface EquippedWeapon {
  card: Card;
  /** Monsters killed with this weapon, oldest first. The last one sets the limit. */
  slain: Card[];
}

export type Slot = 0 | 1 | 2 | 3;
export type CombatMode = 'weapon' | 'barehanded';
export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  seed: number;
  /** Remaining cards; index 0 is the top. */
  dungeon: Card[];
  /** Fixed slots so a carried-over card stays where it was. */
  room: (Card | null)[];
  health: number;
  weapon: EquippedWeapon | null;
  discard: Card[];
  /** 1-based count of rooms entered (including avoided ones). */
  roomNumber: number;
  /** Cards resolved since this room was dealt. */
  resolvedThisRoom: number;
  potionUsedThisRoom: boolean;
  /** True when the previous room was avoided, so this one cannot be. */
  avoidedLastRoom: boolean;
  lastResolved: Card | null;
  status: GameStatus;
  /** Set once the game ends. */
  score: number | null;
}

export type Action = { type: 'avoidRoom' } | { type: 'playCard'; slot: Slot; combat?: CombatMode };

export type GameEvent =
  | { type: 'roomDealt'; roomNumber: number; slots: Slot[] }
  | { type: 'roomAvoided'; cards: Card[] }
  | { type: 'healed'; card: Card; amount: number }
  | { type: 'potionWasted'; card: Card }
  | { type: 'weaponDiscarded'; weapon: EquippedWeapon }
  | { type: 'weaponEquipped'; card: Card }
  | { type: 'monsterSlain'; card: Card; combat: CombatMode; damage: number }
  | { type: 'won'; score: number }
  | { type: 'lost'; score: number };

export interface ActionResult {
  state: GameState;
  events: GameEvent[];
}

export class IllegalActionError extends Error {}
