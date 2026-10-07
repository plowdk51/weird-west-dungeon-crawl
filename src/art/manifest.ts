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
};
