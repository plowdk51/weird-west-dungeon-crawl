import { MAX_HEALTH, type GameState } from './types';

/**
 * Standard Scoundrel scoring.
 * - Lost: health (0) minus every monster still unresolved in the dungeon and room.
 * - Won: remaining health; at full health with a potion as the last card, add its value.
 */
export function computeScore(state: GameState): number {
  if (state.health <= 0) {
    const remaining = [...state.dungeon, ...state.room].filter((c) => c?.role === 'monster');
    return state.health - remaining.reduce((sum, c) => sum + c!.value, 0);
  }
  const last = state.lastResolved;
  if (state.health === MAX_HEALTH && last?.role === 'potion') {
    return state.health + last.value;
  }
  return state.health;
}
