# AI Image Prompts

ChatGPT prompts for every image the game uses: 13 monsters, 9 weapons, 9 remedies, and an optional background. See [ART_GUIDE.md](ART_GUIDE.md) for how to add finished art to the game.

## How to use these (ChatGPT)

- **One prompt per message.** Paste a prompt into ChatGPT as is. Each one already asks for a square 1:1 image with a transparent background and includes the shared style text.
- **Keep the set consistent.** Generate a whole set (monsters, weapons or remedies) in the same chat. If one drifts in style, reply "Redo this in the same style as the earlier images."
- **Check the transparency.** ChatGPT can make transparent PNGs. If one comes back with a background anyway, reply "Make the background transparent", or remove it with any background-removal tool.
- **Shrink before adding to the game.** ChatGPT saves 1024 × 1024 PNGs that can be 1–2 MB each, which is heavy for phones. Resize to 512 × 512 and save as WebP (for example with [squoosh.app](https://squoosh.app)); each file should come out around 30–80 KB. Keep the 1024 originals as masters.
- **No text or numbers.** The game draws the name and the value badge itself. If ChatGPT adds lettering, reply "Remove all text from the image."
- **Strength should show.** Within each set, the higher values should look bigger, stranger and more powerful. Compare the set side by side before finalizing.
- **Filenames.** Each entry gives a suggested filename and its manifest line for `src/art/manifest.ts`.

### Shared style (already included in every prompt)

> Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Monsters

Low values are pests and critters; 11–14 are boss-tier legends. Eyes should glow brighter and auras grow stronger as the value rises.

### 2 · Jackalope Biter

File: `public/art/monsters/jackalope-biter.webp` · Manifest: `'monster.2': 'art/monsters/jackalope-biter.webp',`

> Create a square 1:1 image with a transparent background. A small scrappy jackalope: a brown desert jackrabbit with a pair of branching deer antlers, a comically nasty underbite with jagged fangs, beady glowing yellow eyes, fur bristling, crouched ready to pounce. Mischievous pest more than threat. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Scorpion Swarm

File: `public/art/monsters/scorpion-swarm.webp` · Manifest: `'monster.3': 'art/monsters/scorpion-swarm.webp',`

> Create a square 1:1 image with a transparent background. A tight cluster of five rust-orange desert scorpions skittering over each other, one large scorpion in front with its tail raised, stingers glowing toxic green, tiny glowing eyes, little puffs of sand kicked up. Reads as one compact group. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Tumbleweed Imp

File: `public/art/monsters/tumbleweed-imp.webp` · Manifest: `'monster.4': 'art/monsters/tumbleweed-imp.webp',`

> Create a square 1:1 image with a transparent background. A living tumbleweed imp: a round snarl of dry tangled branches with two angry glowing orange eyes peering out, a wide grin full of jagged wooden teeth, twiggy little arms jabbing outward, a trail of dust behind it as it rolls. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Vulture Harpy

File: `public/art/monsters/vulture-harpy.webp` · Manifest: `'monster.5': 'art/monsters/vulture-harpy.webp',`

> Create a square 1:1 image with a transparent background. A vulture harpy: a hunched creature with ragged black buzzard wings spread wide, a bald wrinkled pink head with a wild shock of white hair, a hooked yellow beak, glowing orange eyes, a scrawny feathered body and yellow talons. Half buzzard, half hag, all appetite. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Wash Wisp

File: `public/art/monsters/wash-wisp.webp` · Manifest: `'monster.6': 'art/monsters/wash-wisp.webp',`

> Create a square 1:1 image with a transparent background. A wash wisp: a floating teardrop-shaped ghost light glowing pale mint-green, a soft friendly-looking face with dark hollow eyes and a small smile that feels a little too inviting, wispy trailing tendrils of light below it, faint sparkles around. A lure that leads travelers astray. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 7 · Bone Rattler

File: `public/art/monsters/bone-rattler.webp` · Manifest: `'monster.7': 'art/monsters/bone-rattler.webp',`

> Create a square 1:1 image with a transparent background. A giant skeletal rattlesnake coiled to strike, made of bleached vertebrae and ribs, a fanged snake skull with glowing red-orange eye sockets, and instead of a rattle its tail ends in a small tarnished brass church bell. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Snake-Oil Salesman

File: `public/art/monsters/snake-oil-salesman.webp` · Manifest: `'monster.8': 'art/monsters/snake-oil-salesman.webp',`

> Create a square 1:1 image with a transparent background. A sinister traveling huckster, waist-up: a tall black top hat with a purple band, a sickly green-tinged face, a huge grin with far too many sharp teeth, a forked tongue flicking out, glowing red eyes, a plum-colored frock coat, holding up a glowing purple tonic bottle like he's making a pitch. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Mine-Cart Mimic

File: `public/art/monsters/mine-cart-mimic.webp` · Manifest: `'monster.9': 'art/monsters/mine-cart-mimic.webp',`

> Create a square 1:1 image with a transparent background. A mine-cart mimic: a battered wooden and iron ore cart on a short section of rail track, its top split open like a huge mouth lined with jagged teeth, a long red tongue lolling out, two glowing red eyes inside the dark maw, chunks of ore spilling out. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Copper Golem

File: `public/art/monsters/copper-golem.webp` · Manifest: `'monster.10': 'art/monsters/copper-golem.webp',`

> Create a square 1:1 image with a transparent background. A hulking copper golem built from riveted copper plates, steel railroad rails for arms, chunky boulder fists, a blocky head with a narrow visor slit glowing red, a glowing teal ore crystal set in its chest, patches of green verdigris. Full body, heavy and imposing. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 11 · Storm Witch

File: `public/art/monsters/storm-witch.webp` · Manifest: `'monster.11': 'art/monsters/storm-witch.webp',`

> Create a square 1:1 image with a transparent background. A storm witch riding an iron lightning rod like a broomstick, crackling blue-white electricity trailing from it, a tall crooked dark witch hat, long wild silver hair whipping in the wind, a pale greenish face with glowing eyes and a sly grin, tattered dark robes, a small roiling thundercloud behind her. Boss-tier, powerful and dramatic. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 12 · Phantom Stagecoach

File: `public/art/monsters/phantom-stagecoach.webp` · Manifest: `'monster.12': 'art/monsters/phantom-stagecoach.webp',`

> Create a square 1:1 image with a transparent background. A runaway phantom stagecoach charging forward, its dark weathered body semi-transparent and outlined in ghostly mint-green light, glowing magenta windows, spectral wheels, pulled by two skeleton horses with glowing eyes, an empty driver's seat, a swinging lantern, ghostly mist streaming behind. Boss-tier, powerful and dramatic. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 13 · Canyon Colossus

File: `public/art/monsters/canyon-colossus.webp` · Manifest: `'monster.13': 'art/monsters/canyon-colossus.webp',`

> Create a square 1:1 image with a transparent background. A canyon colossus: a towering stone giant made of layered red and orange sandstone strata, massive boulder arms, a craggy head with two glowing ember eyes set deep in the rock, small saguaro cacti and scrub growing on its shoulders, dust and pebbles falling as it moves. Boss-tier, enormous and ancient. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 14 · The Sun-Eater

File: `public/art/monsters/the-sun-eater.webp` · Manifest: `'monster.14': 'art/monsters/the-sun-eater.webp',`

> Create a square 1:1 image with a transparent background. The Sun-Eater, the final boss: a colossal serpent with deep purple and violet scales coiled in a ring around a blazing golden sun, its jaws open wide about to swallow it, glowing violet eyes, jagged spines along its back, the sun's light casting fiery orange rim light across its scales. Epic, mythic, the most powerful creature in the set. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Weapons

No guns. Crude and homemade at low values, cursed or elemental relics near the top. Show each weapon on its own, angled diagonally, not held by anyone.

### 2 · Coyote Bone Shiv

File: `public/art/weapons/coyote-bone-shiv.webp` · Manifest: `'weapon.2': 'art/weapons/coyote-bone-shiv.webp',`

> Create a square 1:1 image with a transparent background. A crude shiv carved from a coyote leg bone, sharpened to a jagged point, the knobby joint end used as a pommel, the grip wrapped in rawhide strips with a dangling tie. Simple, primitive, homemade. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Railroad Spike Dirk

File: `public/art/weapons/railroad-spike-dirk.webp` · Manifest: `'weapon.3': 'art/weapons/railroad-spike-dirk.webp',`

> Create a square 1:1 image with a transparent background. A dirk forged from a hammered-flat iron railroad spike, the blade dark gray with hammer marks and a bright honed edge, the spike's square head forming the crossguard, the grip tightly wrapped in copper wire. Rugged and practical. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Copper War Pick

File: `public/art/weapons/copper-war-pick.webp` · Manifest: `'weapon.4': 'art/weapons/copper-war-pick.webp',`

> Create a square 1:1 image with a transparent background. A copper war pick: a miner's pickaxe reforged for battle, a gleaming copper head with a long curved spike on one side and a flat hammer face on the other, a sturdy wooden haft, small blue-white electric sparks crackling off the spike's tip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Cactus-Spiked Machete

File: `public/art/weapons/cactus-spiked-machete.webp` · Manifest: `'weapon.5': 'art/weapons/cactus-spiked-machete.webp',`

> Create a square 1:1 image with a transparent background. A broad steel machete with a living green saguaro ridge growing along the spine of the blade, sharp pale cactus spines bristling outward, a tiny pink cactus flower blooming near the tip, a leather-wrapped wooden grip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Stormlash Whip

File: `public/art/weapons/stormlash-whip.webp` · Manifest: `'weapon.6': 'art/weapons/stormlash-whip.webp',`

> Create a square 1:1 image with a transparent background. A coiled bullwhip made of dark storm-blue braided leather, crackling with blue-white lightning along its whole length, the tip splitting into tiny forks of electricity, a worn leather handle. The whip curls in a loose dynamic spiral. Weapon shown on its own. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 7 · Brimstone Hatchet

File: `public/art/weapons/brimstone-hatchet.webp` · Manifest: `'weapon.7': 'art/weapons/brimstone-hatchet.webp',`

> Create a square 1:1 image with a transparent background. A brimstone throwing hatchet with a blackened iron head veined with glowing orange cracks like cooling lava, its edge glowing ember-hot, small flames and yellow sulfur smoke curling off the head, a scorched wooden handle with a leather-wrapped grip. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Gravedigger's Spade-Axe

File: `public/art/weapons/gravediggers-spade-axe.webp` · Manifest: `'weapon.8': 'art/weapons/gravediggers-spade-axe.webp',`

> Create a square 1:1 image with a transparent background. A gravedigger's spade-axe: a long-handled war shovel whose iron blade is sharpened into an axe edge, a faint ghostly face etched into the metal, wisps of pale green spirit-light curling up off the blade like whispering souls, a weathered wooden haft. Cursed and eerie. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Hellfire Saber

File: `public/art/weapons/hellfire-saber.webp` · Manifest: `'weapon.9': 'art/weapons/hellfire-saber.webp',`

> Create a square 1:1 image with a transparent background. A curved cavalry saber whose blade glows red-hot orange from within, flames licking along the edge, a tarnished brass basket hilt and guard, a dark grip, embers drifting off the blade. Forged in a burning saloon and never cooled. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Sundown Scythe

File: `public/art/weapons/sundown-scythe.webp` · Manifest: `'weapon.10': 'art/weapons/sundown-scythe.webp',`

> Create a square 1:1 image with a transparent background. A legendary reaper's scythe with a huge crescent blade glowing in sunset colors, from deep violet at the back of the blade through fiery orange to a brilliant golden edge, a halo of warm sunset light behind it, a long dark wooden snath with leather-wrapped grips. The most powerful weapon in the set. Weapon shown on its own, angled diagonally. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Remedies

Trail food and drink at low values, bottled miracles at the top. Higher values should glow, sparkle or shimmer more.

### 2 · Prickly Pear Juice

File: `public/art/remedies/prickly-pear-juice.webp` · Manifest: `'potion.2': 'art/remedies/prickly-pear-juice.webp',`

> Create a square 1:1 image with a transparent background. Two ripe magenta prickly pear cactus fruits with tiny pale spines, beside a simple glass tumbler of bright pink prickly pear juice with a fruit slice on the rim. Humble trail refreshment. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 3 · Sarsaparilla

File: `public/art/remedies/sarsaparilla.webp` · Manifest: `'potion.3': 'art/remedies/sarsaparilla.webp',`

> Create a square 1:1 image with a transparent background. An old-fashioned long-neck brown glass sarsaparilla bottle with a brass cap, a cream paper label with a simple red ornamental design and no lettering, bubbles fizzing up out of the neck, condensation on the glass. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 4 · Cowboy Coffee

File: `public/art/remedies/cowboy-coffee.webp` · Manifest: `'potion.4': 'art/remedies/cowboy-coffee.webp',`

> Create a square 1:1 image with a transparent background. A blue speckled enamel campfire coffee pot with a curved spout, steam curling up from it, next to a dented tin cup full of thick black coffee. Rugged trail cookware. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 5 · Sweet Tea Jug

File: `public/art/remedies/sweet-tea-jug.webp` · Manifest: `'potion.5': 'art/remedies/sweet-tea-jug.webp',`

> Create a square 1:1 image with a transparent background. A cream stoneware jug with a brown glazed band and a small loop handle, corked, beside a tall glass of amber iced sweet tea with ice cubes and a lemon wedge, beads of condensation on the glass. A faint magical shimmer at the jug's mouth hints that it never runs dry. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 6 · Hot Spring Flask

File: `public/art/remedies/hot-spring-flask.webp` · Manifest: `'potion.6': 'art/remedies/hot-spring-flask.webp',`

> Create a square 1:1 image with a transparent background. A dented pewter hip flask with its cap unscrewed, thick steam rising from the opening, a warm orange glow seeping around the seams as if filled with hot spring water, small mineral crust around the rim. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 7 · Silver Spring Water

File: `public/art/remedies/silver-spring-water.webp` · Manifest: `'potion.7': 'art/remedies/silver-spring-water.webp',`

> Create a square 1:1 image with a transparent background. A round-bottomed glass vial with a pewter stopper, filled with shimmering liquid silver water that swirls and glows softly in the dark, tiny sparkles floating inside and around it. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 8 · Mother Lode Mineral Water

File: `public/art/remedies/mother-lode-mineral-water.webp` · Manifest: `'potion.8': 'art/remedies/mother-lode-mineral-water.webp',`

> Create a square 1:1 image with a transparent background. A tall old glass bottle with a copper cap, filled with fizzing glowing teal mineral water, a cluster of pale blue crystals growing up from the bottom inside the bottle, bubbles streaming upward, a soft teal glow around it. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 9 · Starlight Whiskey

File: `public/art/remedies/starlight-whiskey.webp` · Manifest: `'potion.9': 'art/remedies/starlight-whiskey.webp',`

> Create a square 1:1 image with a transparent background. A squat square whiskey bottle with a cork, the liquid inside a deep indigo night sky full of tiny twinkling stars and a streak of a falling meteor, a cream label showing only a small star emblem, a soft violet glow and sparkles around the bottle. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

### 10 · Bottled Sunrise

File: `public/art/remedies/bottled-sunrise.webp` · Manifest: `'potion.10': 'art/remedies/bottled-sunrise.webp',`

> Create a square 1:1 image with a transparent background. A round corked glass bottle containing a sunrise: a glowing sun just above a horizon line inside the glass, liquid light shading from fiery orange at the bottom to pale gold at the top, brilliant golden rays bursting out from around the bottle. The most powerful remedy in the set, radiant and hopeful. Pulp-fantasy Weird West game item art, comic-book illustration with bold ink outlines, rich painterly color, gritty sun-bleached texture, dramatic rim lighting, weird and adventurous rather than horrific. Single subject, centered, fully in frame with generous margin on all sides, three-quarter view, square 1:1 composition, transparent background, no text, no letters, no numbers, no border, no frame, no watermark, no firearms.

---

## Background (optional)

### Mine background

File: `public/art/ui/mine-background.webp` · Manifest: `'ui.background': 'art/ui/mine-background.webp',`

Size: ChatGPT makes tall images at 1024 × 1536 (2:3), which is enough; the game crops it to fill the screen. No transparency; this one fills the whole screen behind the game.

> Create a tall 2:3 portrait image. Background illustration of the inside of an old haunted silver mine beneath a Weird West ghost town: rough rock walls with veins of faintly glowing silver ore, timber support beams, a rail track curving away into darkness, a few hanging lanterns giving warm pools of light. Dark, low-contrast and moody so light text and cards stay readable on top, with the most detail near the center and quiet darker edges. Pulp-fantasy Weird West style, comic-book illustration with bold ink outlines, rich painterly color, gritty texture, weird and adventurous rather than horrific. No characters, no text, no letters, no numbers, no border, no watermark.
