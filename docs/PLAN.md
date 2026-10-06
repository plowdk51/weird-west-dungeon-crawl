# Weird West Dungeon Crawl — Build Plan

> Repo: https://github.com/plowdk51/weird-west-dungeon-crawl (local: `source/weird-west-dungeon-crawl`)

A mobile-first browser game that uses **standard Scoundrel rules** (Zach Gage & Kurt Bieg) as its hidden rules engine. The player never sees playing cards. Every card is shown as a Weird West game piece instead: a monster, a weapon or a potion, each with art that scales with its value.

---

## 1. Goals and non-goals

**Goals (prototype)**

- A faithful implementation of the standard Scoundrel rules, fully unit-tested.
- A portrait phone layout played entirely by tapping, which also works on desktop.
- Every card value maps to its own art slot. The prototype ships simple SVG placeholders that can be swapped for real image files without code changes beyond one manifest line.
- Clubs and spades share art for now, but the data model and asset lookup support giving each suit its own art later.
- Deployed to GitHub Pages so it can be played on a phone.

**Non-goals (for now)**

- Final art, sound and music.
- Accounts, online leaderboards, multiplayer.
- A game framework (Phaser and similar) or a UI framework (React and similar).

---

## 2. Standard rules the engine will implement

| Topic               | Standard rule                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deck ("dungeon")    | 52-card deck minus jokers, red face cards and red aces: 44 cards. ♣/♠ 2–14 are monsters (26), ♦ 2–10 are weapons (9), ♥ 2–10 are potions (9). J=11, Q=12, K=13, A=14.                                          |
| Room                | Draw until the room has 4 cards.                                                                                                                                                                               |
| Avoid (flee)        | Before touching any card in a room, the player may avoid it. All 4 cards go to the bottom of the dungeon and a new room is drawn. **You can't avoid two rooms in a row.**                                      |
| Facing a room       | The player resolves cards one at a time, in any order. After **3 of the 4** are resolved, the remaining card stays and 3 new cards are drawn to form the next room.                                            |
| Weapon              | Picking up a weapon equips it. The previous weapon is discarded **along with the monsters stacked on it**.                                                                                                     |
| Barehanded combat   | The player takes the monster's full value as damage.                                                                                                                                                           |
| Weapon combat       | The monster goes onto the weapon's stack and the player takes `max(0, monster − weapon)` damage.                                                                                                               |
| Weapon degradation  | Once a weapon has slain a monster, it can only be used on monsters **less than or equal to** the last monster it slew. (The old console version required strictly less; that house rule is dropped.)           |
| Choosing the method | Even when the weapon is allowed, the player can choose barehanded combat to keep the weapon's limit. When the weapon isn't allowed, the only option is barehanded.                                             |
| Potions             | Heal by the potion's value, up to a maximum of 20. **Only one potion heals per room.** A second potion in the same room is discarded with no effect.                                                           |
| Health              | Starts at 20, maximum 20. At 0 the game is lost.                                                                                                                                                               |
| End of dungeon      | When the dungeon can no longer fill a room to 4, the room holds whatever remains and the player must resolve every card in it. Avoiding is not allowed once the dungeon is empty. Clearing the last card wins. |
| Scoring: loss       | Health (0) minus the sum of every monster still unresolved, in the dungeon and in the room. The result is negative.                                                                                            |
| Scoring: win        | The remaining health. **Bonus:** if health is 20 and the last card resolved was a potion, add that potion's value.                                                                                             |

Edge cases I'll settle in code and cover with tests:

- "One potion per room" resets when a new room is formed: after an avoid, or when the room is refilled after 3 cards are resolved.
- The win bonus uses the last potion's value as printed, even if that potion was the "wasted" second potion of the room. This is a literal reading of the rule; we can change it.
- Avoided cards go to the bottom in their room-slot order, without a shuffle.

---

## 3. Theme mapping (placeholder names, all editable in one data file)

Setting: a cursed silver mine under a ghost town. Each room is a chamber further down.

### Monsters (♣ and ♠, damage 2–14)

| Value | Name             |     |  Value | Name              |
| ----: | ---------------- | --- | -----: | ----------------- |
|     2 | Rattlesnake      |     |      9 | Mine Wraith       |
|     3 | Dust Devil       |     |     10 | Sawbones Revenant |
|     4 | Carrion Buzzard  |     | 11 (J) | Deadeye Marshal   |
|     5 | Ghoul Prospector |     | 12 (Q) | Widow Banshee     |
|     6 | Bandit Shade     |     | 13 (K) | Iron Horse Horror |
|     7 | Hex-Wolf         |     | 14 (A) | The Pale Rider    |
|     8 | Hanged Man       |     |        |                   |

### Weapons (♦, 2–10)

No firearms. Pulp-fantasy frontier weapons, crude at low values and cursed or elemental relics near the top:
2 Coyote Bone Shiv · 3 Railroad Spike Dirk · 4 Copper War Pick · 5 Coyote-Fang Machete · 6 Stormlash Whip · 7 Brimstone Hatchet · 8 Gravedigger’s Spade-Axe · 9 Hellfire Saber · 10 Sundown Scythe

### Potions (♥, heal 2–10)

2 Canteen · 3 Sarsaparilla · 4 Camp Coffee · 5 Field Bandages · 6 Rotgut Whiskey · 7 Snake Oil · 8 Doc's Tonic · 9 Spirit Elixir · 10 Holy Water

---

## 4. Tech stack

| Concern     | Choice                                               | Why                                                                            |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Language    | TypeScript (strict)                                  | Types for the rules engine.                                                    |
| Build/dev   | Vite                                                 | Fast dev server; `npm run dev -- --host` lets you test on your phone over LAN. |
| UI          | Plain HTML/CSS + a small render layer (no framework) | A turn-based game with a few screens doesn't need React.                       |
| Tests       | Vitest                                               | Same toolchain as Vite.                                                        |
| Lint/format | ESLint + Prettier                                    |                                                                                |
| Deploy      | GitHub Actions → GitHub Pages                        | Auto-deploys on every push to `main`.                                          |
| Installable | Web app manifest (icon, name, standalone display)    | "Add to Home Screen" on phones. Offline service worker comes later.            |

**GitHub Pages:** on a free account, the repo must be **public** for Pages to serve it.

---

## 5. Architecture

```
src/
  engine/             ← pure TS, no DOM; the "Scoundrel" rules
    types.ts          Suit, Rank, CardRole, Card, GameState, Action, GameEvent
    deck.ts           buildDungeon(), shuffle(rng)
    rng.ts            seedable PRNG (mulberry32) – default seed = random
    rules.ts          getLegalActions(state), applyAction(state, action)
    scoring.ts        computeScore(state)
  content/
    catalog.ts        card → { name, flavor text, role }, keyed by role/suit/value
  art/
    manifest.ts       art key → image URL (the ONLY file to edit when adding art)
    resolveArt.ts     lookup with fallback chain (see §6)
    placeholders/     generated placeholder SVGs
  ui/
    app.ts            screen router (title / game / end / how-to-play)
    render/           hud.ts, room.ts, weaponPanel.ts, combatSheet.ts, endScreen.ts
    input.ts          tap → Action
    animations.ts     CSS-class based feedback for GameEvents
  storage.ts          save/resume the current run + best score (localStorage)
  main.ts
public/
  art/                drop-in folder for your real art files
tests/
  engine/*.test.ts
docs/
  PLAN.md             (this file)
  ART_GUIDE.md        art slot list, sizes, naming, how to swap art in
```

### Engine contract

- `GameState` is plain, serializable data, so the same object is used for save/resume and for tests:
  - `dungeon: Card[]`
  - `room: (Card | null)[4]`
  - `health`
  - `weapon: { card, slain: Card[] } | null`
  - `discard: Card[]`
  - `potionUsedThisRoom`, `avoidedLastRoom`, `cardsResolvedThisRoom`
  - `lastResolved`
  - `status: 'playing' | 'won' | 'lost'`
  - `seed`
- `Card` stores **suit and value as explicit data**: `{ id, suit: 'clubs'|'spades'|'diamonds'|'hearts', value, role: 'monster'|'weapon'|'potion' }`. The game never works out a card's role from its display text or color.
- Actions:
  - `{ type: 'avoidRoom' }`
  - `{ type: 'playCard', slot, combat?: 'weapon' | 'barehanded' }`

  The UI collects the combat choice before dispatching. The engine rejects illegal actions, such as an empty slot, avoiding twice in a row, or a weapon past its limit.

- `applyAction(state, action) → { state, events }`. Events (`damageTaken`, `healed`, `potionWasted`, `weaponEquipped`, `weaponDiscarded`, `monsterSlain`, `roomAvoided`, `roomFilled`, `won`, `lost`) drive animations and the action log, so the UI never has to compare two states to work out what happened.
- `getLegalActions(state)` drives which buttons and tiles are enabled.
- The random-number generator can be seeded, which makes tests reproducible and allows a "daily dungeon" mode later.

---

## 6. Art system (placeholders now, real files later)

**Art keys** are built from role, suit and value. Lookup goes from most specific to most general, so differentiating clubs and spades later only means adding entries:

```
monster.clubs.7   →  monster.7   →  monster.default
weapon.diamonds.5 →  weapon.5    →  weapon.default
```

`manifest.ts` maps keys to URLs. The prototype fills in only the general keys (`monster.2` … `monster.14`, `weapon.2` … `weapon.10`, `potion.2` … `potion.10`) with placeholder SVGs.

To add real art:

1. Drop `public/art/monsters/hex-wolf.png` (any web format: png, webp, svg).
2. Change one line: `'monster.7': 'art/monsters/hex-wolf.png'`.
3. To give spades its own wolf later, add `'monster.spades.7': '…'`. No other code changes.

**Placeholders:** one parametric SVG template per role, drawn in code and written out as 31 files:

- **Monster:** skull/horned silhouette. It grows larger, darker and spikier as the value goes up, with a red damage badge.
- **Weapon:** a distinct weapon silhouette per value (bone shiv, spike dirk, war pick, fanged machete, lightning whip, burning hatchet, haunted spade-axe, flaming saber, sunset scythe) with fire or lightning effects on the stronger ones, and a steel-blue attack badge.
- **Potion:** bottle silhouette whose liquid level and glow scale with the value, with a green heal badge.

Each placeholder also shows the item's name. The UI always draws the value badge **on top of** the art, so your real art doesn't need numbers painted in.

`ART_GUIDE.md` will list all 31 art slots (plus UI pieces such as the background, card frame and health icon), the recommended size (512×512, transparent background), and the naming convention.

---

## 7. Mobile UI / UX

Portrait layout, one screen with no scrolling during play:

```
┌───────────────────────────┐
│ ♥ 17/20  ▓▓▓▓▓▓▓░░   ⛏ 31 │  HUD: health bar, cards left in mine, chamber #
├───────────────────────────┤
│   ┌───────┐  ┌───────┐    │
│   │ Wolf  │  │ Tonic │    │  Room: 2×2 grid of tiles
│   │  ⚔7   │  │  ✚8   │    │  (art + name + value badge)
│   └───────┘  └───────┘    │
│   ┌───────┐  ┌───────┐    │
│   │Derrin.│  │ Wraith│    │
│   │  🗡5   │  │  ⚔9   │    │
│   └───────┘  └───────┘    │
├───────────────────────────┤
│ Equipped: Stormlash (6)   │  Weapon panel: weapon + stack of slain monsters,
│ Slain: 9 → 7   limit ≤ 7  │  current limit shown
├───────────────────────────┤
│  [  Sneak Past (avoid)  ] │  Action bar (disabled with reason when not allowed)
└───────────────────────────┘
```

- **Tap a potion or weapon:** it resolves at once with a short animation. A potion that won't heal shows a "Already drank this room — will be wasted" warning on the tile before you tap.
- **Tap a monster with a weapon equipped:** a bottom sheet opens with two large buttons that show the damage up front, e.g. **"Stormlash Whip — take 1"** and **"Bare-handed — take 7"**. If the weapon isn't allowed, its button is disabled and explains why ("Too worn: limit ≤ 7"). With no weapon, the fight resolves at once. Tapping a card that would kill you asks for confirmation.
- **Feedback:** health bar shake and red flash on damage, green pulse on heal, the slain monster sliding onto the weapon stack, and the remaining tile staying put while 3 new tiles deal in.
- **End screen:** win or loss, the score from §2, a short run summary, best score, and "Ride again".
- **Also:** a "How to play" screen in the game's own terms (no card jargon), resume of an interrupted run on reload, and a dusty frontier palette and fonts.
- **Accessibility and mobile:** tap targets at least 48px, safe-area insets, no double-tap zoom, and readable contrast. Each tile has a text label (name, role, value), so screen readers work without the art.

---

## 8. Milestones

1. **Scaffold:** create the repo (Vite + TS + Vitest + ESLint/Prettier), README, this plan as `docs/PLAN.md`, `.gitignore`. Initial commit and push to GitHub.
2. **Rules engine + tests:** types, deck, seeded RNG, rules, scoring. Tests cover:
   - the 44-card composition;
   - room fill and the retained 4th card;
   - avoid, and the no-double-avoid rule;
   - potion cap and one potion per room;
   - barehanded and weapon damage;
   - the ≤ weapon limit, including an equal value being allowed;
   - weapon replacement discarding its stack;
   - the end-of-dungeon partial room;
   - win and loss scoring, including the potion bonus.
3. **Content + art pipeline:** the catalog, the manifest with its fallback chain, the placeholder SVG generator, and `ART_GUIDE.md`.
4. **Playable UI:** HUD, room grid, weapon panel, combat sheet, avoid button, end screen. Fully playable on a phone.
5. **Polish:** animations, how-to-play screen, save/resume, best score, theme styling, web app manifest and icons.
6. **Deploy:** GitHub Actions workflow to Pages, plus a checklist for testing on a real phone.

Each milestone is its own commit (or small set of commits) pushed to GitHub. I'll check in with you after milestone 4 so you can play it before polish.

---

## 9. Decisions log

- **Name:** Weird West Dungeon Crawl (working title).
- **GitHub:** plain `git` (no GitHub CLI); remote https://github.com/plowdk51/weird-west-dungeon-crawl.
- **Rules:** standard Scoundrel, no house rules.
- **Weapons:** no guns, and they should feel like weapons rather than everyday objects. Same pulp-fantasy Weird West vibe as the Bounty Hunter game, with names unique to this game.
- **Art:** placeholder SVGs now; clubs and spades share art for now, with per-suit overrides supported.
