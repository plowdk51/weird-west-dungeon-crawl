# AI Image Prompts

ChatGPT prompts for every image the game uses: 13 monsters, 9 weapons, 9 remedies, and an optional background. See [ART_GUIDE.md](ART_GUIDE.md) for how to add finished art to the game.

## How to use these (ChatGPT)

- **One prompt per message.** Paste a prompt into ChatGPT as is. Each one already asks for a square 1:1 image with a transparent background and includes the shared style text.
- **Keep the set consistent.** Generate a whole set (monsters, weapons or remedies) in the same chat. If one drifts in style, reply "Redo this in the same style as the earlier images."
- **Check the transparency.** ChatGPT can make transparent PNGs. If one comes back with a background anyway, reply "Make the background transparent", or remove it with any background-removal tool.
- **Save the full-size PNG in `art-src/`, then run `npm run art:optimize`.** ChatGPT's PNGs are 1–2 MB each, too heavy for phones. The optimizer makes a 512 × 512 WebP copy (about 50–110 KB) in `public/art/`, which is what the game and GitHub use. `art-src/` is never committed, so back it up yourself.
- **No text or numbers.** The game draws the name and the value badge itself. If ChatGPT adds lettering, reply "Remove all text from the image."
- **Strength should show.** Within each set, the higher values should look bigger, stranger and more powerful. Compare the set side by side before finalizing.
- **Filenames.** Each entry gives where to save the master and the manifest line to add to `src/art/manifest.ts` (which points at the optimized WebP).

### Shared style (already included in every prompt)

> Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Monsters

Low values are pests and critters; 11–14 are boss-tier legends. Eyes should glow brighter and auras grow stronger as the value rises.

### 2 · Jackalope Biter

Save as: `art-src/monsters/jackalope-biter.png` · Manifest: `'monster.2': 'art/monsters/jackalope-biter.webp',`

> Create a square 1:1 image with a transparent background. A small scrappy jackalope: a brown desert jackrabbit with a pair of branching deer antlers, a comically nasty underbite with jagged fangs, beady glowing yellow eyes, fur bristling, crouched ready to pounce. Mischievous pest more than threat. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Glowtail Scorpion

Save as: `art-src/monsters/glowtail-scorpion.png` · Manifest: `'monster.3': 'art/monsters/glowtail-scorpion.webp',`

> Create a square 1:1 image with a transparent background. A rust-orange desert scorpion with its tail raised, stinger glowing toxic green, tiny glowing eyes, little puffs of sand kicked up. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Tumbleweed Imp

Save as: `art-src/monsters/tumbleweed-imp.png` · Manifest: `'monster.4': 'art/monsters/tumbleweed-imp.webp',`

> Create a square 1:1 image with a transparent background. A living tumbleweed imp: a round snarl of dry tangled branches with two angry glowing orange eyes peering out, a wide grin full of jagged wooden teeth, twiggy little arms jabbing outward, a trail of dust behind it as it rolls. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Vulture Harpy

Save as: `art-src/monsters/vulture-harpy.png` · Manifest: `'monster.5': 'art/monsters/vulture-harpy.webp',`

> Create a square 1:1 image with a transparent background. A vulture harpy: a hunched creature with ragged black buzzard wings spread wide, a bald wrinkled pink head with a wild shock of white hair, a hooked yellow beak, glowing orange eyes, a scrawny feathered body and yellow talons. Half buzzard, half hag, all appetite. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Wash Wisp

Save as: `art-src/monsters/wash-wisp.png` · Manifest: `'monster.6': 'art/monsters/wash-wisp.webp',`

> Create a square 1:1 image with a transparent background. A wash wisp: a floating teardrop-shaped ghost light glowing pale mint-green, a soft friendly-looking face with dark hollow eyes and a small smile that feels a little too inviting, wispy trailing tendrils of light below it, faint sparkles around. A lure that leads travelers astray. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 7 · Bone Rattler

Save as: `art-src/monsters/bone-rattler.png` · Manifest: `'monster.7': 'art/monsters/bone-rattler.webp',`

> Create a square 1:1 image with a transparent background. A giant skeletal rattlesnake coiled to strike, made of bleached vertebrae and ribs, a fanged snake skull with glowing red-orange eye sockets, and instead of a rattle its tail ends in a small tarnished brass church bell. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Snake-Oil Salesman

Save as: `art-src/monsters/snake-oil-salesman.png` · Manifest: `'monster.8': 'art/monsters/snake-oil-salesman.webp',`

> Create a square 1:1 image with a transparent background. A sinister traveling huckster, waist-up: a tall black top hat with a purple band, a sickly green-tinged face, a huge grin with far too many sharp teeth, a forked tongue flicking out, glowing red eyes, a plum-colored frock coat, holding up a glowing purple tonic bottle like he's making a pitch. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Mine-Cart Mimic

Save as: `art-src/monsters/mine-cart-mimic.png` · Manifest: `'monster.9': 'art/monsters/mine-cart-mimic.webp',`

> Create a square 1:1 image with a transparent background. A mine-cart mimic: a battered wooden and iron ore cart on a short section of rail track, its top split open like a huge mouth lined with jagged teeth, a long red tongue lolling out, two glowing red eyes inside the dark maw, chunks of ore spilling out. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Copper Golem

Save as: `art-src/monsters/copper-golem.png` · Manifest: `'monster.10': 'art/monsters/copper-golem.webp',`

> Create a square 1:1 image with a transparent background. A hulking copper golem built from riveted copper plates, steel railroad rails for arms, chunky boulder fists, a blocky head with a narrow visor slit glowing red, a glowing teal ore crystal set in its chest, patches of green verdigris. Full body, heavy and imposing. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 11 · Storm Witch

Save as: `art-src/monsters/storm-witch.png` · Manifest: `'monster.11': 'art/monsters/storm-witch.webp',`

> Create a square 1:1 image with a transparent background. A storm witch riding an iron lightning rod like a broomstick, crackling blue-white electricity trailing from it, a tall crooked dark witch hat, long wild silver hair whipping in the wind, a pale greenish face with glowing eyes and a sly grin, tattered dark robes, a small roiling thundercloud behind her. Boss-tier, powerful and dramatic. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 12 · Phantom Stagecoach

Save as: `art-src/monsters/phantom-stagecoach.png` · Manifest: `'monster.12': 'art/monsters/phantom-stagecoach.webp',`

> Create a square 1:1 image with a transparent background. A runaway phantom stagecoach charging forward, its dark weathered body semi-transparent and outlined in ghostly mint-green light, glowing magenta windows, spectral wheels, pulled by two skeleton horses with glowing eyes, an empty driver's seat, a swinging lantern, ghostly mist streaming behind. Boss-tier, powerful and dramatic. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 13 · Canyon Colossus

Save as: `art-src/monsters/canyon-colossus.png` · Manifest: `'monster.13': 'art/monsters/canyon-colossus.webp',`

> Create a square 1:1 image with a transparent background. A canyon colossus: a towering stone giant made of layered red and orange sandstone strata, massive boulder arms, a craggy head with two glowing ember eyes set deep in the rock, small saguaro cacti and scrub growing on its shoulders, dust and pebbles falling as it moves. Boss-tier, enormous and ancient. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 14 · The Sun-Eater

Save as: `art-src/monsters/the-sun-eater.png` · Manifest: `'monster.14': 'art/monsters/the-sun-eater.webp',`

> Create a square 1:1 image with a transparent background. The Sun-Eater, the final boss: a colossal serpent with deep purple and violet scales coiled in a ring around a blazing golden sun, its jaws open wide about to swallow it, glowing violet eyes, jagged spines along its back, the sun's light casting fiery orange rim light across its scales. Epic, mythic, the most powerful creature in the set. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Weapons

No guns. Crude and homemade at low values, cursed or elemental relics near the top. Show each weapon on its own, angled diagonally, not held by anyone.

### 2 · Coyote Bone Shiv

Save as: `art-src/weapons/coyote-bone-shiv.png` · Manifest: `'weapon.2': 'art/weapons/coyote-bone-shiv.webp',`

> Create a square 1:1 image with a transparent background. A crude shiv carved from a coyote leg bone, sharpened to a jagged point, the knobby joint end used as a pommel, the grip wrapped in rawhide strips with a dangling tie. Simple, primitive, homemade. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Railroad Spike Dirk

Save as: `art-src/weapons/railroad-spike-dirk.png` · Manifest: `'weapon.3': 'art/weapons/railroad-spike-dirk.webp',`

> Create a square 1:1 image with a transparent background. A dirk forged from a hammered-flat iron railroad spike, the blade dark gray with hammer marks and a bright honed edge, the spike's square head forming the crossguard, the grip tightly wrapped in copper wire. Rugged and practical. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Copper War Pick

Save as: `art-src/weapons/copper-war-pick.png` · Manifest: `'weapon.4': 'art/weapons/copper-war-pick.webp',`

> Create a square 1:1 image with a transparent background. A copper war pick: a miner's pickaxe reforged for battle, a gleaming copper head with a long curved spike on one side and a flat hammer face on the other, a sturdy wooden haft, small blue-white electric sparks crackling off the spike's tip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Cactus-Spiked Machete

Save as: `art-src/weapons/cactus-spiked-machete.png` · Manifest: `'weapon.5': 'art/weapons/cactus-spiked-machete.webp',`

> Create a square 1:1 image with a transparent background. A broad steel machete with a living green saguaro ridge growing along the spine of the blade, sharp pale cactus spines bristling outward, a tiny pink cactus flower blooming near the tip, a leather-wrapped wooden grip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Stormlash Whip

Save as: `art-src/weapons/stormlash-whip.png` · Manifest: `'weapon.6': 'art/weapons/stormlash-whip.webp',`

> Create a square 1:1 image with a transparent background. A single bullwhip lying neatly coiled, like a lasso hung on a hook: a short, straight, worn leather handle at the bottom, and from its end one continuous braided thong of dark storm-blue leather that wraps around in three neat, evenly spaced, non-overlapping oval loops, then trails out with a gentle curve to one thin tip. The whip is one unbroken piece from handle to tip: it never splits, forks, frays apart, knots, or has gaps. The leather braid stays solid and fully visible. Blue-white lightning crackles around the outside of the loops as a glow with small sparks, without replacing or breaking any part of the leather. Weapon shown on its own, not held. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

If ChatGPT still tangles or breaks the whip, reply in the same chat with one of these:

- "Make it simpler: fewer loops, and the whip is one continuous unbroken line from the handle to the tip."
- "Keep the same style, but draw the whip without lightning first." Then: "Now add blue-white lightning glowing around it without changing the whip's shape."
- "Lay the whip out in one smooth S-curve instead of coils, handle at the bottom left, tip at the top right."

### 7 · Brimstone Hatchet

Save as: `art-src/weapons/brimstone-hatchet.png` · Manifest: `'weapon.7': 'art/weapons/brimstone-hatchet.webp',`

> Create a square 1:1 image with a transparent background. A brimstone throwing hatchet with a blackened iron head veined with glowing orange cracks like cooling lava, its edge glowing ember-hot, small flames and yellow sulfur smoke curling off the head, a scorched wooden handle with a leather-wrapped grip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Gravedigger's Spade-Axe

Save as: `art-src/weapons/gravediggers-spade-axe.png` · Manifest: `'weapon.8': 'art/weapons/gravediggers-spade-axe.webp',`

> Create a square 1:1 image with a transparent background. A gravedigger's spade-axe: a long-handled war shovel whose iron blade is sharpened into an axe edge, a faint ghostly face etched into the metal, wisps of pale green spirit-light curling up off the blade like whispering souls, a weathered wooden haft. Cursed and eerie. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Hellfire Saber

Save as: `art-src/weapons/hellfire-saber.png` · Manifest: `'weapon.9': 'art/weapons/hellfire-saber.webp',`

> Create a square 1:1 image with a transparent background. A curved cavalry saber whose blade glows red-hot orange from within, flames licking along the edge, a tarnished brass basket hilt and guard, a dark grip, embers drifting off the blade. Forged in a burning saloon and never cooled. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Sundown Scythe

Save as: `art-src/weapons/sundown-scythe.png` · Manifest: `'weapon.10': 'art/weapons/sundown-scythe.webp',`

> Create a square 1:1 image with a transparent background. A legendary reaper's scythe with a huge crescent blade glowing in sunset colors, from deep violet at the back of the blade through fiery orange to a brilliant golden edge, a halo of warm sunset light behind it, a long dark wooden snath with leather-wrapped grips. The most powerful weapon in the set. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Remedies

Trail food and drink at low values, bottled miracles at the top. Higher values should glow, sparkle or shimmer more.

### 2 · Prickly Pear Juice

Save as: `art-src/remedies/prickly-pear-juice.png` · Manifest: `'potion.2': 'art/remedies/prickly-pear-juice.webp',`

> Create a square 1:1 image with a transparent background. Two ripe magenta prickly pear cactus fruits with tiny pale spines, beside a simple glass tumbler of bright pink prickly pear juice with a fruit slice on the rim. Humble trail refreshment. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Sarsaparilla

Save as: `art-src/remedies/sarsaparilla.png` · Manifest: `'potion.3': 'art/remedies/sarsaparilla.webp',`

> Create a square 1:1 image with a transparent background. An old-fashioned long-neck brown glass sarsaparilla bottle with a brass cap, a cream paper label with a simple red ornamental design and no lettering, bubbles fizzing up out of the neck, condensation on the glass. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Cowboy Coffee

Save as: `art-src/remedies/cowboy-coffee.png` · Manifest: `'potion.4': 'art/remedies/cowboy-coffee.webp',`

> Create a square 1:1 image with a transparent background. A blue speckled enamel campfire coffee pot with a curved spout, steam curling up from it, next to a dented tin cup full of thick black coffee. Rugged trail cookware. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Sweet Tea Jug

Save as: `art-src/remedies/sweet-tea-jug.png` · Manifest: `'potion.5': 'art/remedies/sweet-tea-jug.webp',`

> Create a square 1:1 image with a transparent background. A cream stoneware jug with a brown glazed band and a small loop handle, corked, beside a tall glass of amber iced sweet tea with ice cubes and a lemon wedge, beads of condensation on the glass. A faint magical shimmer at the jug's mouth hints that it never runs dry. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Hot Spring Flask

Save as: `art-src/remedies/hot-spring-flask.png` · Manifest: `'potion.6': 'art/remedies/hot-spring-flask.webp',`

> Create a square 1:1 image with a transparent background. A dented pewter hip flask with its cap unscrewed, thick steam rising from the opening, a warm orange glow seeping around the seams as if filled with hot spring water, small mineral crust around the rim. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 7 · Silver Spring Water

Save as: `art-src/remedies/silver-spring-water.png` · Manifest: `'potion.7': 'art/remedies/silver-spring-water.webp',`

> Create a square 1:1 image with a transparent background. A round-bottomed glass vial with a pewter stopper, filled with shimmering liquid silver water that swirls and glows softly in the dark, tiny sparkles floating inside and around it. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Mother Lode Mineral Water

Save as: `art-src/remedies/mother-lode-mineral-water.png` · Manifest: `'potion.8': 'art/remedies/mother-lode-mineral-water.webp',`

> Create a square 1:1 image with a transparent background. A tall old glass bottle with a copper cap, filled with fizzing glowing teal mineral water, a cluster of pale blue crystals growing up from the bottom inside the bottle, bubbles streaming upward, a soft teal glow around it. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Starlight Whiskey

Save as: `art-src/remedies/starlight-whiskey.png` · Manifest: `'potion.9': 'art/remedies/starlight-whiskey.webp',`

> Create a square 1:1 image with a transparent background. A squat square whiskey bottle with a cork, the liquid inside a deep indigo night sky full of tiny twinkling stars and a streak of a falling meteor, a cream label showing only a small star emblem, a soft violet glow and sparkles around the bottle. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Bottled Sunrise

Save as: `art-src/remedies/bottled-sunrise.png` · Manifest: `'potion.10': 'art/remedies/bottled-sunrise.webp',`

> Create a square 1:1 image with a transparent background. A round corked glass bottle containing a sunrise: a glowing sun just above a horizon line inside the glass, liquid light shading from fiery orange at the bottom to pale gold at the top, brilliant golden rays bursting out from around the bottle. The most powerful remedy in the set, radiant and hopeful. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Background (optional)

### Mine background

Save as: `art-src/ui/mine-background.png` · Manifest: `'ui.background': 'art/ui/mine-background.webp',`

Size: ChatGPT makes tall images at 1024 × 1536 (2:3), which is enough; the game crops it to fill the screen. No transparency; this one fills the whole screen behind the game.

> Create a tall 2:3 portrait image. Background illustration of the inside of an old haunted silver mine beneath a Weird West ghost town: rough rock walls with veins of faintly glowing silver ore, timber support beams, a rail track curving away into darkness, a few hanging lanterns giving warm pools of light. Dark, low-contrast and moody so light text and cards stay readable on top, with the most detail near the center and quiet darker edges. Pulp-fantasy Weird West style, comic-book illustration with bold ink outlines, rich painterly color, gritty texture, weird and adventurous rather than horrific. No characters, no text, no letters, no numbers, no border, no watermark.

---

## App icon

The icon for the phone home screen (installed app or bookmark), the browser tab and bookmarks. It's shown as small as about 48 px, so it must be one bold, simple emblem rather than a scene.

Save as: `art-src/icon.png`, then run `npm run art:optimize`. No manifest line is needed: the optimizer makes every icon size (favicon, iPhone, Android and the Android "maskable" version) in `public/icons/`.

Unlike the card art, the icon needs a **solid background** that fills the whole square. iPhones show transparent areas as black, and Android crops the icon into circles and other shapes. Keep the emblem inside the middle 70% so nothing important is cut off.

### Chosen · Mine lantern

Matches the hanging lanterns in the mine background: warm amber light rather than ghost-green.

> Create a square 1:1 app icon. A bold emblem of a single old kerosene hurricane lantern, the kind that hangs in an old silver mine: a dark iron frame and wire carrying handle, a brass base and cap, a clear glass globe with a bright warm golden-amber flame inside. The lantern hangs from a short iron hook and chain at the top and casts a strong warm golden glow around itself, with a few tiny silver ore sparkles drifting in the light. Simple shapes, thick black ink outlines, high contrast, readable at very small sizes. The lantern sits centered inside the middle 70% of the square, standing upright and facing forward. Solid dark warm-brown background (#1c120c) filling the entire square edge to edge, with a soft amber radial glow behind the lantern that fades to the dark brown at the edges. Pulp-fantasy Weird West style, comic-book illustration, rich painterly color. No text, no letters, no numbers, no border, no frame, no rounded corners, no transparency.

If the lantern comes out too detailed to read at icon size, reply: "Make it bolder and simpler: fewer small details, thicker outlines, and a bigger, brighter flame."

### Other concepts

Earlier options, kept for reference:

### Concept A · The Sun-Eater

> Create a square 1:1 app icon. A bold emblem of a purple-scaled serpent coiled in a ring around a blazing golden sun, its fanged jaws open at the sun's edge, glowing violet eye. Simple shapes, thick black ink outlines, high contrast, readable at very small sizes. The emblem sits centered inside the middle 70% of the square. Solid dark warm-brown background (#1c120c) with a subtle radial glow behind the sun, filling the entire square edge to edge. Pulp-fantasy Weird West style, comic-book illustration, rich painterly color. No text, no letters, no numbers, no border, no frame, no rounded corners, no transparency.

### Concept B · Outlaw skull

> Create a square 1:1 app icon. A bold emblem of a grinning skull wearing a battered cowboy hat, eye sockets glowing ember-orange, over two crossed miner's pickaxes. Simple shapes, thick black ink outlines, high contrast, readable at very small sizes. The emblem sits centered inside the middle 70% of the square. Solid dark warm-brown background (#1c120c) with a subtle orange glow behind the skull, filling the entire square edge to edge. Pulp-fantasy Weird West style, comic-book illustration, rich painterly color, weird and adventurous rather than horrific. No text, no letters, no numbers, no border, no frame, no rounded corners, no transparency.

### Concept C · Haunted lantern

> Create a square 1:1 app icon. A bold emblem of an old brass miner's lantern glowing with eerie mint-green ghost-light, with a faint spooky face in the flame, framed by the wooden timbers of a mine-shaft entrance. Simple shapes, thick black ink outlines, high contrast, readable at very small sizes. The emblem sits centered inside the middle 70% of the square. Solid dark warm-brown background (#1c120c) with a soft green glow around the lantern, filling the entire square edge to edge. Pulp-fantasy Weird West style, comic-book illustration, rich painterly color. No text, no letters, no numbers, no border, no frame, no rounded corners, no transparency.

### Concept D · Jackalope mascot

> Create a square 1:1 app icon. A bold head-and-shoulders emblem of a scrappy jackalope, a desert jackrabbit with branching deer antlers, glowing yellow eyes and a fanged underbite grin, facing forward like a mascot. Simple shapes, thick black ink outlines, high contrast, readable at very small sizes. The emblem sits centered inside the middle 70% of the square. Solid dark warm-brown background (#1c120c) with a subtle golden glow behind the head, filling the entire square edge to edge. Pulp-fantasy Weird West style, comic-book illustration, rich painterly color. No text, no letters, no numbers, no border, no frame, no rounded corners, no transparency.

**Check it small:** after generating, zoom the image out to about the size of an app icon on your phone. If the main shape blurs into the background, ask ChatGPT for "bolder, simpler shapes and stronger contrast."
