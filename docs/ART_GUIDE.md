# Art Guide

The game ships with generated placeholder SVGs. Replacing any of them with your own art takes two steps and no code beyond one line.

Prompts for generating every image with an AI image tool are in [ART_PROMPTS.md](ART_PROMPTS.md).

## How to add art

1. Save the full-size image (for example ChatGPT's 1024 PNG) under `art-src/`, in the matching subfolder: `art-src/monsters/bone-rattler.png`. This folder is your masters folder. Git ignores it, so it never goes to GitHub; back it up yourself.
2. Run `npm run art:optimize`. It writes a small 512×512 WebP copy to the same place under `public/art/` (`public/art/monsters/bone-rattler.webp`) and skips images that haven't changed. Add `-- --force` to redo everything.
3. Add one line to [`src/art/manifest.ts`](../src/art/manifest.ts) pointing at the WebP:
   ```ts
   export const artManifest: Record<string, string> = {
     'monster.7': 'art/monsters/bone-rattler.webp',
   };
   ```
4. Commit the WebP and the manifest change. The masters stay on your PC.

Manifest paths are relative to `public/`, so leave off the `public/` prefix and any leading slash. Entries in the manifest always win over placeholders.

To check your art, run `npm run dev` and open `/weird-west-dungeon-crawl/art-gallery.html`. It shows every card with its resolved art and key.

## File recommendations

- **Masters:** PNG (or JPG/WebP) with a transparent background, any square size. 1024×1024 or larger is ideal.
- **In the game:** the optimizer fits card art into 512×512 WebP, usually 50–110 KB each. Backgrounds under `art-src/ui/` keep their shape and are capped at 1290×2800.
- **No numbers or names in the art.** The game draws the value badge (☠ 7, ⚔ 5, ✚ 8) and the name on top of the tile.
- **Keep the subject centered** with a little padding. Tiles are portrait, and the name sits under the art.

## Art keys

Keys are looked up from most to least specific. The first one that exists is used:

```
monster.clubs.7  →  monster.7  →  monster.default
monster.spades.7 →  monster.7  →  monster.default
```

Clubs and spades share `monster.N` art today. To give spades a different look later, add `monster.spades.N` entries. You can also give each suit its own name in `suitOverrides` in [`src/content/catalog.ts`](../src/content/catalog.ts).

### Monsters (damage 2–14)

Pulp-fantasy Weird West creatures: critters at low values, legends at 11–14. Weird and adventurous rather than horrific.

| Key               | Name               |
| ----------------- | ------------------ |
| `monster.2`       | Jackalope Biter    |
| `monster.3`       | Glowtail Scorpion  |
| `monster.4`       | Tumbleweed Imp     |
| `monster.5`       | Vulture Harpy      |
| `monster.6`       | Wash Wisp          |
| `monster.7`       | Bone Rattler       |
| `monster.8`       | Snake-Oil Salesman |
| `monster.9`       | Mine-Cart Mimic    |
| `monster.10`      | Copper Golem       |
| `monster.11`      | Storm Witch        |
| `monster.12`      | Phantom Stagecoach |
| `monster.13`      | Canyon Colossus    |
| `monster.14`      | The Sun-Eater      |
| `monster.default` | fallback           |

### Weapons (attack 2–10)

No firearms. Pulp-fantasy frontier weapons: crude and homemade at low values, cursed or elemental relics near the top. The element is only a look (color and effects); the rules use just the number.

| Key              | Name                    | Element   |
| ---------------- | ----------------------- | --------- |
| `weapon.2`       | Coyote Bone Shiv        | Physical  |
| `weapon.3`       | Railroad Spike Dirk     | Physical  |
| `weapon.4`       | Copper War Pick         | Lightning |
| `weapon.5`       | Cactus-Spiked Machete   | Physical  |
| `weapon.6`       | Stormlash Whip          | Lightning |
| `weapon.7`       | Brimstone Hatchet       | Fire      |
| `weapon.8`       | Gravedigger’s Spade-Axe | Cursed    |
| `weapon.9`       | Hellfire Saber          | Fire      |
| `weapon.10`      | Sundown Scythe          | Fire      |
| `weapon.default` | fallback                |           |

### Remedies (heal 2–10)

Frontier remedies: trail food and drinks at low values, bottled miracles at the top.

| Key              | Name                      |
| ---------------- | ------------------------- |
| `potion.2`       | Prickly Pear Juice        |
| `potion.3`       | Sarsaparilla              |
| `potion.4`       | Cowboy Coffee             |
| `potion.5`       | Sweet Tea Jug             |
| `potion.6`       | Hot Spring Flask          |
| `potion.7`       | Silver Spring Water       |
| `potion.8`       | Mother Lode Mineral Water |
| `potion.9`       | Starlight Whiskey         |
| `potion.10`      | Bottled Sunrise           |
| `potion.default` | fallback                  |

### UI

| Key             | Used for                               | Recommendation                                                                      |
| --------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `ui.background` | Full-screen background behind the game | Portrait, at least 1024×1536 (ChatGPT tall size), dark enough for light text on top |

## App icon

Save a square master (1024×1024 or larger, **solid background**, no transparency) as `art-src/icon.png` and run `npm run art:optimize`. It writes every size the game uses to `public/icons/`:

| File                           | Size                                  | Used for                              |
| ------------------------------ | ------------------------------------- | ------------------------------------- |
| `favicon-32.png`               | 32×32                                 | Browser tab and bookmarks             |
| `apple-touch-icon.png`         | 180×180                               | iPhone home screen                    |
| `icon-192.png`, `icon-512.png` | 192×192, 512×512                      | Android home screen and installed app |
| `maskable-512.png`             | 512×512, art shrunk to the middle 80% | Android’s cropped icon shapes         |

Until `art-src/icon.png` exists, the icons come from a temporary Sun-Eater emblem (`scripts/placeholder-icon.svg`). Prompts for the icon are at the end of [ART_PROMPTS.md](ART_PROMPTS.md#app-icon).

## Names and flavor text

Names and flavor lines are in [`src/content/catalog.ts`](../src/content/catalog.ts). Change them freely; they don't affect the rules.

## Placeholders

The placeholders are generated by [`scripts/generate-placeholders.ts`](../scripts/generate-placeholders.ts) into `src/art/placeholders/`. Run `npm run art:placeholders` to regenerate them. You don't need to delete placeholders when adding real art, because the manifest overrides them.
