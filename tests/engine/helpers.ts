import type { Card, Suit } from '../../src/engine';

let counter = 0;
const make =
  (suit: Suit, role: Card['role']) =>
  (value: number): Card => ({
    id: `${suit}-${value}-${counter++}`,
    suit,
    value,
    role,
  });

export const monster = make('clubs', 'monster');
export const spade = make('spades', 'monster');
export const weapon = make('diamonds', 'weapon');
export const potion = make('hearts', 'potion');
