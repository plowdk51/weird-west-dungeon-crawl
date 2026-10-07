import type { Card, Role, Suit } from '../engine';

export interface CardInfo {
  name: string;
  flavor: string;
}

/**
 * Display names for every card value. Clubs and spades share monster entries for now;
 * add a per-suit entry to `suitOverrides` (e.g. 'monster.spades.7') to tell them apart.
 */
const byRole: Record<Role, Record<number, CardInfo>> = {
  monster: {
    2: { name: 'Jackalope Biter', flavor: 'Antlers like a buck, teeth like a bear trap.' },
    3: {
      name: 'Glowtail Scorpion',
      flavor: 'Its stinger lights the way, right up until it doesn’t.',
    },
    4: {
      name: 'Tumbleweed Imp',
      flavor: 'Rolls in on the wind, picking fights with anything that stands still.',
    },
    5: { name: 'Vulture Harpy', flavor: 'Half buzzard, half hag, all appetite.' },
    6: { name: 'Wash Wisp', flavor: 'Follow the pretty light. Everybody does, once.' },
    7: { name: 'Bone Rattler', flavor: 'Its rattle tolls like a church bell.' },
    8: {
      name: 'Snake-Oil Salesman',
      flavor: 'Drank his own tonic. Now he sells it with too many teeth.',
    },
    9: { name: 'Mine-Cart Mimic', flavor: 'It hears you coming down the rails.' },
    10: {
      name: 'Copper Golem',
      flavor: 'Built from ore, rails and rivets by miners who never came back for it.',
    },
    11: { name: 'Storm Witch', flavor: 'Rides a lightning rod and drags the weather behind her.' },
    12: {
      name: 'Phantom Stagecoach',
      flavor: 'Still running its route. The driver got off years ago.',
    },
    13: {
      name: 'Canyon Colossus',
      flavor: 'One day the canyon wall stood up and started walking.',
    },
    14: {
      name: 'The Sun-Eater',
      flavor: 'Every evening it swallows the sun. Down here, it is always evening.',
    },
  },
  weapon: {
    2: { name: 'Coyote Bone Shiv', flavor: 'Whittled from something that used to howl.' },
    3: {
      name: 'Railroad Spike Dirk',
      flavor: 'Hammered flat on the anvil at the end of the line.',
    },
    4: {
      name: 'Copper War Pick',
      flavor: 'A miner’s pick reforged for war. Sparks fly when it lands.',
    },
    5: {
      name: 'Cactus-Spiked Machete',
      flavor: 'Saguaro spines grow right out of the blade. Cut them off and they grow back.',
    },
    6: { name: 'Stormlash Whip', flavor: 'Cracks like thunder because it is thunder.' },
    7: { name: 'Brimstone Hatchet', flavor: 'Smolders in its sheath and stinks of sulfur.' },
    8: {
      name: 'Gravedigger’s Spade-Axe',
      flavor: 'Hums with the voices of everyone it ever buried.',
    },
    9: { name: 'Hellfire Saber', flavor: 'Forged in a burning saloon. It has never cooled.' },
    10: { name: 'Sundown Scythe', flavor: 'Its edge glows like the last light of day.' },
  },
  potion: {
    2: { name: 'Prickly Pear Juice', flavor: 'Tart cactus-fruit juice, squeezed on the trail.' },
    3: { name: 'Sarsaparilla', flavor: 'Sweet, fizzy, and almost medicinal.' },
    4: {
      name: 'Cowboy Coffee',
      flavor: 'Boiled in a sock. Strong enough to wake the nearly dead.',
    },
    5: { name: 'Sweet Tea Jug', flavor: 'Cold, sweet, and somehow never runs dry.' },
    6: {
      name: 'Hot Spring Flask',
      flavor: 'Water from an underground hot spring, still steaming.',
    },
    7: {
      name: 'Silver Spring Water',
      flavor: 'Drawn from a spring beneath the silver vein. It shines in the dark.',
    },
    8: {
      name: 'Mother Lode Mineral Water',
      flavor: 'Fizzy water from the deepest seam, tingling with ore.',
    },
    9: {
      name: 'Starlight Whiskey',
      flavor: 'Distilled under a meteor shower. Every sip twinkles.',
    },
    10: {
      name: 'Bottled Sunrise',
      flavor: 'The first light of dawn, corked. The Sun-Eater can’t have this one.',
    },
  },
};

const suitOverrides: Partial<Record<`${Role}.${Suit}.${number}`, CardInfo>> = {
  // 'monster.spades.7': { name: 'Black Bone Rattler', flavor: '...' },
};

export function cardInfo(card: Card): CardInfo {
  return (
    suitOverrides[`${card.role}.${card.suit}.${card.value}`] ??
    byRole[card.role][card.value] ?? { name: `Unknown ${card.role}`, flavor: '' }
  );
}

export const ROLE_LABEL: Record<Role, string> = {
  monster: 'Monster',
  weapon: 'Weapon',
  potion: 'Remedy',
};
