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
    2: { name: 'Broken Bottle', flavor: 'Last call, sharp end.' },
    3: { name: 'Bowie Knife', flavor: 'Plain steel. Reliable.' },
    4: { name: 'Pickaxe', flavor: 'Made for rock. Works on bone.' },
    5: { name: 'Derringer', flavor: 'Fits in a boot. Hits like a mule.' },
    6: { name: 'Six-Shooter', flavor: 'The great equalizer.' },
    7: { name: 'Coach Gun', flavor: 'Two barrels, no arguments.' },
    8: { name: 'Lever-Action Rifle', flavor: 'Fast hands make for short fights.' },
    9: { name: 'Silver-Bullet Revolver', flavor: 'Loaded with the mine’s own curse.' },
    10: { name: 'Blessed Buffalo Rifle', flavor: 'Consecrated, oiled, and very loud.' },
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
