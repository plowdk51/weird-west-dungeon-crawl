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
    2: { name: 'Rattlesnake', flavor: 'Coiled in the ore cart. Mostly bluster.' },
    3: { name: 'Dust Devil', flavor: 'A cackling whirl of grit and spite.' },
    4: { name: 'Carrion Buzzard', flavor: 'It has been following you since the surface.' },
    5: { name: 'Ghoul Prospector', flavor: 'Still digging. Never stopped.' },
    6: { name: 'Bandit Shade', flavor: 'Shot in a robbery gone wrong. Still robbing.' },
    7: { name: 'Hex-Wolf', flavor: 'Too many eyes for an honest animal.' },
    8: { name: 'Hanged Man', flavor: 'The rope snapped. He did not.' },
    9: { name: 'Mine Wraith', flavor: 'The cold arrives a moment before it does.' },
    10: { name: 'Sawbones Revenant', flavor: 'Offers surgery. Insists on it.' },
    11: { name: 'Deadeye Marshal', flavor: 'Never missed in life. Death improved his aim.' },
    12: { name: 'Widow Banshee', flavor: 'Her wail rattles the timbers loose.' },
    13: { name: 'Iron Horse Horror', flavor: 'A derailed locomotive, hungry and steaming.' },
    14: { name: 'The Pale Rider', flavor: 'What waits at the bottom of the mine.' },
  },
  weapon: {
    2: { name: 'Thorned Spur', flavor: 'Grew its own thorns overnight. Kicks like a bramble.' },
    3: { name: 'Silver Pocket Knife', flavor: 'Small, shiny, and spooks the restless dead.' },
    4: { name: 'Hot Coal', flavor: 'Plucked from a stove that never went out.' },
    5: { name: 'Static Horseshoe', flavor: 'Lucky side up. Crackles when you swing it.' },
    6: { name: 'Rusty Hatchet', flavor: 'Rust and grit, but it still bites.' },
    7: {
      name: 'Lightning Rod Fragment',
      flavor: 'Snapped off a church steeple mid-storm. Still humming.',
    },
    8: { name: 'Storm Jar', flavor: 'A whole thunderstorm, screwed down tight.' },
    9: {
      name: 'Hellfire Branding Iron',
      flavor: 'Glows red-hot and never cools. Brands what it strikes.',
    },
    10: { name: 'Thunderhead in a Bottle', flavor: 'Uncork it and stand well back.' },
  },
  potion: {
    2: { name: 'Canteen', flavor: 'Warm, metallic, wet enough.' },
    3: { name: 'Sarsaparilla', flavor: 'Sweet, fizzy, and almost medicinal.' },
    4: { name: 'Camp Coffee', flavor: 'Thick enough to stand a spoon in.' },
    5: { name: 'Field Bandages', flavor: 'Mostly clean.' },
    6: { name: 'Rotgut Whiskey', flavor: 'Burns going down. Burns the pain out.' },
    7: { name: 'Snake Oil', flavor: 'Cures what ails you. Allegedly.' },
    8: { name: "Doc's Tonic", flavor: 'The doc swore by it. The doc is missing.' },
    9: { name: 'Spirit Elixir', flavor: 'Glows faintly. Tastes like lightning.' },
    10: { name: 'Holy Water', flavor: 'From the last church before the desert.' },
  },
};

const suitOverrides: Partial<Record<`${Role}.${Suit}.${number}`, CardInfo>> = {
  // 'monster.spades.7': { name: 'Black Hex-Wolf', flavor: '...' },
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
