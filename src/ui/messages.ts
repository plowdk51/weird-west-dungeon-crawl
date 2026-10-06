import type { GameEvent } from '../engine';
import { cardInfo } from '../content/catalog';

/** One line of narration per event, for the log under the room. */
export function describeEvent(e: GameEvent): string | null {
  switch (e.type) {
    case 'roomAvoided':
      return 'You slip past the chamber. Its dangers sink deeper into the mine.';
    case 'healed':
      return e.amount > 0
        ? `${cardInfo(e.card).name} restores ${e.amount} health.`
        : `${cardInfo(e.card).name} — you were already at full health.`;
    case 'potionWasted':
      return `${cardInfo(e.card).name} does nothing. Only one remedy works per chamber.`;
    case 'weaponDiscarded':
      return `You toss aside the ${cardInfo(e.weapon.card).name}.`;
    case 'weaponEquipped':
      return `You take up the ${cardInfo(e.card).name}.`;
    case 'monsterSlain': {
      const name = cardInfo(e.card).name;
      const how = e.combat === 'weapon' ? 'with your weapon' : 'bare-handed';
      return e.damage > 0
        ? `You put down the ${name} ${how}, taking ${e.damage} damage.`
        : `You put down the ${name} ${how} without a scratch.`;
    }
    case 'roomDealt':
    case 'won':
    case 'lost':
      return null;
  }
}
