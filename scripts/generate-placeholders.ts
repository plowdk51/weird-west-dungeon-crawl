/**
 * Generates the placeholder SVG art in src/art/placeholders/.
 * Each value gets its own file whose size, color and detail scale with the value,
 * so the prototype reads well before real art exists. Run: npm run art:placeholders
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../src/art/placeholders');
mkdirSync(outDir, { recursive: true });

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hex = (c: number[]) =>
  '#' + c.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
/** Interpolate across a list of color stops. */
function ramp(stops: string[], t: number): string {
  const pos = t * (stops.length - 1);
  const i = Math.min(Math.floor(pos), stops.length - 2);
  const a = rgb(stops[i]!);
  const b = rgb(stops[i + 1]!);
  return hex(a.map((x, k) => lerp(x, b[k]!, pos - i)));
}

const svg = (body: string, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">` +
  `<defs>${defs}</defs>${body}</svg>\n`;

const glowDefs = (color: string) =>
  `<radialGradient id="glow"><stop offset="0" stop-color="${color}" stop-opacity="0.7"/>` +
  `<stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

// ------------------------------------------------------------------ monsters

function monster(value: number): string {
  const t = (value - 2) / 12;
  const s = lerp(0.62, 0.88, t);
  const bone = ramp(['#e3d3ad', '#b98a5a', '#8c2f2a', '#4a1030', '#1d0d26'], t);
  const shade = ramp(['#a8956b', '#7a5434', '#5a1717', '#2a0718', '#0a0410'], t);
  const eye = ramp(['#f2d16b', '#ff8a2a', '#ff2a2a', '#c44dff'], t);
  const parts: string[] = [];

  if (value >= 11) parts.push(`<circle cx="0" cy="-10" r="98" fill="url(#glow)"/>`);

  // Horns grow from value 5 upward.
  if (value >= 5) {
    const h = lerp(18, 70, (value - 5) / 9);
    for (const d of [-1, 1]) {
      parts.push(
        `<path d="M${d * 38},-52 C${d * 60},${-60 - h * 0.4} ${d * (55 + h * 0.5)},${-70 - h * 0.6} ${d * (40 + h * 0.6)},${-62 - h}` +
          ` C${d * (42 + h * 0.2)},${-62 - h * 0.4} ${d * 30},-50 ${d * 22},-44 Z" fill="${shade}" stroke="#120806" stroke-width="3"/>`,
      );
    }
  }
  // Spiked crown for the face-card tier.
  if (value >= 11) {
    const n = value - 7;
    for (let i = 0; i < n; i++) {
      const x = lerp(-40, 40, i / (n - 1));
      parts.push(
        `<path d="M${x - 7},-62 L${x},${-90 - (i % 2) * 12} L${x + 7},-62 Z" fill="${eye}" stroke="#120806" stroke-width="2"/>`,
      );
    }
  }

  // Skull: cranium + jaw.
  parts.push(
    `<ellipse cx="0" cy="-18" rx="60" ry="54" fill="${bone}" stroke="#120806" stroke-width="4"/>`,
    `<rect x="-38" y="12" width="76" height="44" rx="12" fill="${bone}" stroke="#120806" stroke-width="4"/>`,
    `<ellipse cx="0" cy="-18" rx="44" ry="14" fill="${shade}" opacity="0.35"/>`,
  );
  // Eye sockets with glowing pupils.
  const pr = lerp(4, 8, t);
  for (const d of [-1, 1]) {
    parts.push(
      `<ellipse cx="${d * 22}" cy="-12" rx="15" ry="${lerp(15, 11, t)}" fill="#140a08" transform="rotate(${d * lerp(0, 18, t)} ${d * 22} -12)"/>`,
      `<circle cx="${d * 22}" cy="-10" r="${pr}" fill="${eye}"/>`,
    );
  }
  // A third eye from the Hex-Wolf (7) upward.
  if (value >= 7) {
    parts.push(
      `<ellipse cx="0" cy="-44" rx="8" ry="10" fill="#140a08"/><circle cx="0" cy="-43" r="${pr * 0.7}" fill="${eye}"/>`,
    );
  }
  parts.push(`<path d="M-6,8 L0,-2 L6,8 Z" fill="#140a08"/>`);

  // Teeth: more and longer as the value rises.
  const teeth = 4 + Math.round(t * 5);
  const fang = lerp(8, 22, t);
  for (let i = 0; i < teeth; i++) {
    const x = lerp(-30, 30, i / (teeth - 1));
    const len = i === 0 || i === teeth - 1 ? fang : fang * 0.55;
    parts.push(
      `<path d="M${x - 4},20 L${x},${20 + len} L${x + 4},20 Z" fill="#f5ecd6" stroke="#120806" stroke-width="1.5"/>`,
    );
  }
  // Cracks and scars on stronger monsters.
  if (value >= 9) {
    parts.push(
      `<path d="M18,-66 L10,-48 L20,-38 L12,-26" fill="none" stroke="#120806" stroke-width="3"/>`,
    );
  }

  return svg(
    `<g transform="translate(100 124) scale(${s.toFixed(3)})">${parts.join('')}</g>`,
    value >= 11 ? glowDefs(eye) : '',
  );
}

// ------------------------------------------------------------------ weapons (no firearms)

/**
 * Magic-touched frontier objects, matching the Bounty Hunter setting: physical,
 * fire and electric items that get stranger and stronger as the value rises.
 */
function weapon(value: number): string {
  const INK = '#14100c';
  const wood = '#6a4426';
  const ember = '#ff7a2a';
  const spark = '#8fd3ff';
  const bolt = (d: string, w = 4) =>
    `<path d="${d}" fill="none" stroke="${spark}" stroke-width="${w * 2.2}" stroke-opacity="0.35" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="#e8f6ff" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const parts: string[] = [];
  let glow: string | null = null;
  let rot = 0;
  // Per-item framing: offset and size multiplier so each silhouette fills its tile.
  let dx = 0;
  let dy = 0;
  let k = 1;

  switch (value) {
    case 2: {
      // Thorned Spur: heel band, shank and a thorny rowel
      rot = -10;
      k = 1.15;
      dx = 8;
      dy = -14;
      const band = 'M-70,-30 Q-70,30 -10,30 Q40,30 40,-30';
      parts.push(
        `<path d="${band}" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>`,
        `<path d="${band}" fill="none" stroke="#a89474" stroke-width="12" stroke-linecap="round"/>`,
        `<path d="M-14,30 L40,52" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`,
        `<path d="M-14,30 L40,52" stroke="#8a7a62" stroke-width="5" stroke-linecap="round"/>`,
      );
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const pt = (ang: number, r: number) =>
          `${(50 + Math.cos(ang) * r).toFixed(1)},${(56 + Math.sin(ang) * r).toFixed(1)}`;
        parts.push(
          `<path d="M${pt(a, 8)} L${pt(a + 0.2, 30)} L${pt(a + 0.4, 8)} Z" fill="#5d7a3a" stroke="${INK}" stroke-width="2.5"/>`,
        );
      }
      parts.push(
        `<circle cx="50" cy="56" r="10" fill="#8a7a62" stroke="${INK}" stroke-width="3"/>`,
      );
      for (const [x, y] of [
        [-66, -6],
        [-48, 22],
        [24, 18],
      ]) {
        parts.push(
          `<path d="M${x},${y} l-10,-8 l12,2 Z" fill="#5d7a3a" stroke="${INK}" stroke-width="2"/>`,
        );
      }
      break;
    }

    case 3: // Silver Pocket Knife
      rot = 35;
      k = 1.15;
      parts.push(
        `<path d="M-12,-6 L-12,-80 Q6,-96 16,-64 L16,-6 Z" fill="#e6edf3" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-3,-14 L-3,-70" stroke="#ffffff" stroke-width="3" stroke-opacity="0.8"/>`,
        `<rect x="-13" y="-8" width="26" height="78" rx="11" fill="#cfd6dc" stroke="${INK}" stroke-width="4"/>`,
        `<rect x="-6" y="4" width="12" height="54" rx="6" fill="#9aa6b2"/>`,
        `<circle cx="0" cy="0" r="4" fill="${INK}"/>`,
        `<path d="M28,-44 l4,-10 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 Z" fill="#ffffff"/>`,
      );
      break;

    case 4: {
      // Hot Coal
      glow = ember;
      const cracks =
        'M-40,-10 L-14,0 L-20,24 M-14,0 L14,-20 L38,-4 M14,-20 L10,-42 M-2,20 L22,30 L40,16';
      parts.push(
        `<path d="M-30,-58 Q-10,-80 0,-60 Q14,-90 26,-56 Q36,-74 40,-48" fill="none" stroke="${ember}" stroke-width="8" stroke-linecap="round" stroke-opacity="0.85"/>`,
        `<path d="M-58,10 L-40,-36 L-6,-50 L34,-40 L60,-6 L50,38 L10,56 L-36,48 Z" fill="#2a1a14" stroke="${INK}" stroke-width="4"/>`,
        `<path d="${cracks}" fill="none" stroke="${ember}" stroke-width="6" stroke-linecap="round"/>`,
        `<path d="${cracks}" fill="none" stroke="#ffd36b" stroke-width="2" stroke-linecap="round"/>`,
      );
      break;
    }

    case 5: {
      // Static Horseshoe
      glow = spark;
      const shoe = 'M-52,60 L-52,-4 Q-52,-64 0,-64 Q52,-64 52,-4 L52,60';
      parts.push(
        `<path d="${shoe}" fill="none" stroke="${INK}" stroke-width="30"/>`,
        `<path d="${shoe}" fill="none" stroke="#8d96a0" stroke-width="22"/>`,
      );
      for (const [x, y] of [
        [-52, 40],
        [-52, 10],
        [-40, -36],
        [52, 40],
        [52, 10],
        [40, -36],
      ]) {
        parts.push(`<rect x="${x! - 3}" y="${y! - 5}" width="6" height="10" fill="${INK}"/>`);
      }
      parts.push(
        bolt('M-70,-70 L-58,-52 L-70,-44 L-56,-26'),
        bolt('M70,-66 L60,-50 L72,-42 L60,-24'),
        bolt('M-12,-92 L-4,-76 L-14,-70', 3),
      );
      break;
    }

    case 6: // Rusty Hatchet
      rot = 30;
      parts.push(
        `<rect x="-8" y="-60" width="16" height="140" rx="6" fill="${wood}" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-6,-62 L-6,-30 L-58,-18 Q-76,-46 -58,-82 Z" fill="#9a4a24" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-58,-82 Q-74,-50 -58,-18" fill="none" stroke="#c9a088" stroke-width="4"/>`,
        `<circle cx="-34" cy="-58" r="5" fill="#6a2a14"/><circle cx="-22" cy="-40" r="3" fill="#6a2a14"/>`,
        `<rect x="-10" y="-68" width="20" height="44" rx="4" fill="#7a3a1c" stroke="${INK}" stroke-width="4"/>`,
      );
      break;

    case 7: // Lightning Rod Fragment
      glow = spark;
      rot = 20;
      k = 0.9;
      dy = 12;
      parts.push(
        `<rect x="-6" y="-56" width="12" height="130" rx="3" fill="#6e747a" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-16,-56 L0,-96 L16,-56 Z" fill="#c9a64a" stroke="${INK}" stroke-width="4"/>`,
        `<circle cx="0" cy="-20" r="14" fill="#c9a64a" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-14,74 L-6,56 L6,62 L14,48" fill="none" stroke="${INK}" stroke-width="5"/>`,
        bolt('M0,-96 L-22,-70 L-8,-64 L-34,-30'),
        bolt('M0,-96 L24,-74 L10,-66 L36,-40'),
        bolt('M14,-20 L40,-8 L30,0 L52,14', 3),
      );
      break;

    case 8: // Storm Jar
      glow = '#6f8cff';
      rot = -15;
      parts.push(
        `<rect x="-46" y="-50" width="92" height="118" rx="20" fill="#2a3f8a" fill-opacity="0.85"/>`,
        `<path d="M-30,10 Q-34,-14 -10,-14 Q-4,-34 16,-24 Q38,-28 34,-4 Q46,12 26,18 L-20,18 Q-40,22 -30,10 Z" fill="#3a3a5e" stroke="#1a1a30" stroke-width="3"/>`,
        bolt('M2,18 L-8,36 L6,40 L-4,60', 3.5),
        `<rect x="-46" y="-50" width="92" height="118" rx="20" fill="none" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-34,-30 Q-38,10 -30,40" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="6" stroke-linecap="round"/>`,
        `<rect x="-40" y="-72" width="80" height="24" rx="5" fill="#7a5530" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-40,-52 Q0,-40 40,-52" fill="none" stroke="#b08850" stroke-width="5"/>`,
        `<circle cx="50" cy="-36" r="11" fill="#b08850" stroke="${INK}" stroke-width="3"/>`,
      );
      break;

    case 9: {
      // Hellfire Branding Iron
      glow = '#ff4a1a';
      rot = -35;
      k = 0.85;
      dx = 10;
      dy = 26;
      const brand = 'M-32,-30 L-32,-62 Q-32,-90 0,-90 Q32,-90 32,-62 L32,-30';
      parts.push(
        `<rect x="-5" y="-30" width="10" height="110" fill="#4a4440" stroke="${INK}" stroke-width="3"/>`,
        `<rect x="-11" y="50" width="22" height="44" rx="6" fill="${wood}" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-30,-92 Q-50,-120 -20,-128 Q-8,-110 0,-136 Q12,-110 24,-128 Q52,-118 30,-92" fill="${ember}" fill-opacity="0.75"/>`,
        `<path d="${brand}" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`,
        `<path d="${brand}" fill="none" stroke="#ff5a1f" stroke-width="9" stroke-linecap="round"/>`,
        `<path d="M0,-74 L5,-60 L19,-60 L8,-51 L12,-38 L0,-46 L-12,-38 L-8,-51 L-19,-60 L-5,-60 Z" fill="#ffd36b" stroke="${INK}" stroke-width="2.5"/>`,
        `<rect x="-24" y="-34" width="48" height="8" rx="3" fill="#4a4440" stroke="${INK}" stroke-width="3"/>`,
      );
      break;
    }

    case 10: {
      // Thunderhead in a Bottle
      glow = '#9fd8ff';
      const bottle =
        'M-14,-66 L14,-66 L14,-42 Q60,-30 60,16 Q60,74 0,74 Q-60,74 -60,16 Q-60,-30 -14,-42 Z';
      parts.push(
        `<path d="${bottle}" fill="#1c2a5a" fill-opacity="0.9"/>`,
        `<path d="M-40,8 Q-46,-20 -16,-20 Q-8,-44 18,-32 Q46,-38 42,-8 Q56,12 30,20 L-24,20 Q-50,26 -40,8 Z" fill="#4a4a70" stroke="#14142a" stroke-width="3"/>`,
        bolt('M-10,20 L-22,40 L-6,44 L-18,66'),
        bolt('M18,20 L10,36 L24,40 L16,58', 3),
        `<path d="${bottle}" fill="none" stroke="${INK}" stroke-width="4"/>`,
        `<path d="M-44,0 Q-46,-22 -28,-32" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="6" stroke-linecap="round"/>`,
        `<rect x="-18" y="-86" width="36" height="22" rx="4" fill="#9a6a3c" stroke="${INK}" stroke-width="4"/>`,
        bolt('M-60,-60 L-48,-44 L-60,-38 L-46,-20', 3),
        bolt('M62,-62 L52,-46 L64,-40 L52,-22', 3),
      );
      break;
    }

    default:
      return weapon(6);
  }

  const s = lerp(0.82, 1, (value - 2) / 8);
  const body = `<g transform="translate(${100 + dx} ${100 + dy}) rotate(${rot}) scale(${(s * k).toFixed(3)})">${parts.join('')}</g>`;
  return svg(
    (glow ? `<circle cx="100" cy="100" r="96" fill="url(#glow)"/>` : '') + body,
    glow ? glowDefs(glow) : '',
  );
}

// ------------------------------------------------------------------ potions

function potion(value: number): string {
  const t = (value - 2) / 8;
  const s = lerp(0.68, 1, t);
  const liquid = ramp(['#8a6a3a', '#b04a2a', '#c8202f', '#7a3cff', '#7fe6ff'], t);
  const level = lerp(0.35, 0.95, t);
  const bodyTop = -30;
  const bodyBottom = 70;
  const fillY = bodyBottom - (bodyBottom - bodyTop) * level;
  const parts: string[] = [];
  if (value >= 8) parts.push(`<circle cx="0" cy="20" r="96" fill="url(#glow)"/>`);
  parts.push(
    `<clipPath id="bottle"><path d="M-14,-62 L14,-62 L14,-36 Q56,-26 56,20 Q56,72 0,72 Q-56,72 -56,20 Q-56,-26 -14,-36 Z"/></clipPath>`,
    `<path d="M-14,-62 L14,-62 L14,-36 Q56,-26 56,20 Q56,72 0,72 Q-56,72 -56,20 Q-56,-26 -14,-36 Z" fill="#e8e2d0" fill-opacity="0.25"/>`,
    `<rect x="-60" y="${fillY.toFixed(1)}" width="120" height="${(80 - fillY).toFixed(1)}" fill="${liquid}" clip-path="url(#bottle)"/>`,
    `<path d="M-14,-62 L14,-62 L14,-36 Q56,-26 56,20 Q56,72 0,72 Q-56,72 -56,20 Q-56,-26 -14,-36 Z" fill="none" stroke="#14100c" stroke-width="4"/>`,
    `<rect x="-17" y="-80" width="34" height="20" rx="4" fill="#9a6a3c" stroke="#14100c" stroke-width="4"/>`,
    `<path d="M-38,4 Q-40,-16 -24,-24" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="6" stroke-linecap="round"/>`,
  );
  // Label band on mid-tier tonics.
  if (value >= 5 && value <= 8) {
    parts.push(
      `<rect x="-34" y="18" width="68" height="24" rx="3" fill="#efe2bf" stroke="#14100c" stroke-width="3"/><path d="M-20,30 L20,30" stroke="#7a2a1a" stroke-width="4"/>`,
    );
  }
  // Holy water gets a cross.
  if (value === 10) {
    parts.push(
      `<path d="M0,6 L0,46 M-14,20 L14,20" stroke="#fff8d8" stroke-width="7" stroke-linecap="round"/>`,
    );
  }
  // Sparkles increase with potency.
  const sparkles = Math.round(t * 6);
  for (let i = 0; i < sparkles; i++) {
    const a = (i / Math.max(sparkles, 1)) * Math.PI * 2 + 0.6;
    const x = Math.cos(a) * 74;
    const y = 10 + Math.sin(a) * 74;
    parts.push(
      `<path d="M${x},${y - 7} L${x + 2},${y - 2} L${x + 7},${y} L${x + 2},${y + 2} L${x},${y + 7} L${x - 2},${y + 2} L${x - 7},${y} L${x - 2},${y - 2} Z" fill="#fff6c8"/>`,
    );
  }
  return svg(
    `<g transform="translate(100 104) scale(${s.toFixed(3)})">${parts.join('')}</g>`,
    value >= 8 ? glowDefs(liquid) : '',
  );
}

const files: Record<string, string> = {};
for (let v = 2; v <= 14; v++) files[`monster-${v}`] = monster(v);
for (let v = 2; v <= 10; v++) files[`weapon-${v}`] = weapon(v);
for (let v = 2; v <= 10; v++) files[`potion-${v}`] = potion(v);
files['monster-default'] = monster(8);
files['weapon-default'] = weapon(6);
files['potion-default'] = potion(6);

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(outDir, `${name}.svg`), content);
}
console.log(`Wrote ${Object.keys(files).length} placeholder SVGs to ${outDir}`);
