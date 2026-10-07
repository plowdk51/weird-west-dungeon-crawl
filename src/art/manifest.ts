/**
 * Your art goes here. Map an art key to an optimized file in `public/art/`
 * (made from art-src/ masters by `npm run art:optimize`).
 * Entries here override the generated placeholders.
 *
 * Keys are looked up from most to least specific:
 *   monster.clubs.7  →  monster.7  →  monster.default
 *
 * Examples:
 *   'monster.7': 'art/monsters/bone-rattler.webp',     // both suits
 *   'monster.spades.7': 'art/monsters/black-rattler.webp', // spades only
 *   'ui.background': 'art/ui/mine-shaft.webp',
 *
 * See docs/ART_GUIDE.md for the full list of keys.
 */
export const artManifest: Record<string, string> = {
  'monster.2': 'art/monsters/jackalope-biter.webp',
  'monster.3': 'art/monsters/glowtail-scorpion.webp',
  'monster.4': 'art/monsters/tumbleweed-imp.webp',
  'monster.5': 'art/monsters/vulture-harpy.webp',
  'monster.6': 'art/monsters/wash-wisp.webp',
  'monster.7': 'art/monsters/bone-rattler.webp',
  'monster.8': 'art/monsters/snake-oil-salesman.webp',
  'monster.9': 'art/monsters/mine-cart-mimic.webp',
  'monster.10': 'art/monsters/copper-golem.webp',
  'monster.11': 'art/monsters/storm-witch.webp',
  'monster.12': 'art/monsters/phantom-stagecoach.webp',
  'monster.13': 'art/monsters/canyon-colossus.webp',
  'monster.14': 'art/monsters/the-sun-eater.webp',
  'weapon.2': 'art/weapons/coyote-bone-shiv.webp',
  'weapon.3': 'art/weapons/railroad-spike-dirk.webp',
  'weapon.4': 'art/weapons/copper-war-pick.webp',
  'weapon.5': 'art/weapons/cactus-spiked-machete.webp',
  'weapon.6': 'art/weapons/stormlash-whip.webp',
  'weapon.7': 'art/weapons/brimstone-hatchet.webp',
  'weapon.8': 'art/weapons/gravediggers-spade-axe.webp',
  'weapon.9': 'art/weapons/hellfire-saber.webp',
  'weapon.10': 'art/weapons/sundown-scythe.webp',
  'potion.2': 'art/remedies/prickly-pear-juice.webp',
  'potion.3': 'art/remedies/sarsaparilla.webp',
  'potion.4': 'art/remedies/cowboy-coffee.webp',
  'potion.5': 'art/remedies/sweet-tea-jug.webp',
  'potion.6': 'art/remedies/hot-spring-flask.webp',
  'potion.7': 'art/remedies/silver-spring-water.webp',
  'potion.8': 'art/remedies/mother-lode-mineral-water.webp',
  'potion.9': 'art/remedies/starlight-whiskey.webp',
  'potion.10': 'art/remedies/bottled-sunrise.webp',
  'ui.background': 'art/ui/mine-background.webp',
};
