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
 * Pulp-fantasy frontier weapons: crude and homemade at low values, cursed or
 * elemental relics near the top. Each value gets its own silhouette.
 */
function weapon(value: number): string {
  const INK = '#14100c';
  const wood = '#6a4426';
  const leather = '#5a3a24';
  const bone = '#e8dcc0';
  const ember = '#ff7a2a';
  const spark = '#8fd3ff';
  const stroke = `stroke="${INK}" stroke-width="4"`;
  const bolt = (d: string, w = 4) =>
    `<path d="${d}" fill="none" stroke="${spark}" stroke-width="${w * 2.2}" stroke-opacity="0.35" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="#e8f6ff" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const flame = (x: number, y: number, h: number) =>
    `<path d="M${x - h * 0.3},${y} Q${x - h * 0.4},${y - h * 0.6} ${x},${y - h} Q${x + h * 0.1},${y - h * 0.5} ${x + h * 0.3},${y - h * 0.7} Q${x + h * 0.45},${y - h * 0.3} ${x + h * 0.3},${y} Z" fill="${ember}" fill-opacity="0.85"/>`;
  const wrap = (x: number, y0: number, y1: number, w: number, step = 9) => {
    let out = '';
    for (let y = y0; y < y1; y += step) {
      out += `<path d="M${x - w},${y} L${x + w},${y + 5}" stroke="${INK}" stroke-width="2" opacity="0.6"/>`;
    }
    return out;
  };
  const parts: string[] = [];
  let glow: string | null = null;
  let rot = 35;
  // Per-item framing: offset and size multiplier so each silhouette fills its tile.
  let dx = 0;
  let dy = 0;
  let k = 1;

  switch (value) {
    case 2: // Coyote Bone Shiv: a sharpened leg bone bound in rawhide
      k = 1.3;
      parts.push(
        `<path d="M-9,40 L-9,-50 L0,-92 L9,-50 L9,40 Z" fill="${bone}" ${stroke}/>`,
        `<path d="M-2,-40 L-2,30" stroke="#b8a888" stroke-width="3"/>`,
        `<circle cx="-10" cy="52" r="13" fill="${bone}" ${stroke}/>`,
        `<circle cx="10" cy="52" r="13" fill="${bone}" ${stroke}/>`,
        `<rect x="-12" y="-2" width="24" height="36" rx="4" fill="#a87c4c" ${stroke}/>`,
        wrap(0, 2, 32, 12, 8),
        `<path d="M12,26 Q26,40 18,58" fill="none" stroke="#a87c4c" stroke-width="4" stroke-linecap="round"/>`,
      );
      break;

    case 3: // Railroad Spike Dirk
      k = 1.25;
      parts.push(
        `<path d="M-11,-8 L-11,-62 L0,-94 L11,-62 L11,-8 Z" fill="#7d858c" ${stroke}/>`,
        `<path d="M0,-86 L0,-14" stroke="#c3cad0" stroke-width="3"/>`,
        `<rect x="-22" y="-12" width="44" height="12" rx="2" fill="#5e656b" ${stroke}/>`,
        `<rect x="-9" y="0" width="18" height="50" fill="#5e656b" ${stroke}/>`,
        wrap(0, 4, 48, 10, 7).replace(/stroke="#14100c"/g, 'stroke="#b87333"'),
        `<rect x="-17" y="50" width="34" height="14" rx="2" fill="#5e656b" ${stroke}/>`,
      );
      break;

    case 4: // Copper War Pick
      rot = 25;
      glow = spark;
      parts.push(
        `<rect x="-7" y="-50" width="14" height="128" rx="5" fill="${wood}" ${stroke}/>`,
        `<path d="M-6,-64 L-6,-40 L-70,-26 L-82,-36 Z" fill="#c8743a" ${stroke}/>`,
        `<path d="M6,-64 L32,-66 L32,-38 L6,-40 Z" fill="#c8743a" ${stroke}/>`,
        `<rect x="-11" y="-70" width="22" height="36" rx="3" fill="#a85a2a" ${stroke}/>`,
        `<path d="M-70,-30 L-20,-40" stroke="#f0a870" stroke-width="3"/>`,
        bolt('M-84,-36 L-92,-54 L-80,-56 L-88,-74', 3),
        bolt('M-78,-28 L-96,-20 L-88,-12', 2.5),
      );
      break;

    case 5: // Cactus-Spiked Machete: saguaro ridge along the spine of the blade
      k = 1.15;
      dy = 4;
      parts.push(
        `<path d="M-14,0 L-14,-70 Q-14,-96 6,-98 Q22,-90 22,-60 L14,0 Z" fill="#a9b2ba" ${stroke}/>`,
        `<path d="M-6,-10 L-6,-80" stroke="#dfe5ea" stroke-width="3"/>`,
      );
      parts.push(
        `<rect x="-22" y="-90" width="10" height="84" rx="5" fill="#4f8a3a" ${stroke}/>`,
        `<path d="M-17,-84 L-17,-12" stroke="#7fb85a" stroke-width="2"/>`,
        `<circle cx="-17" cy="-92" r="5" fill="#e85a8a" stroke="${INK}" stroke-width="2"/>`,
      );
      for (let i = 0; i < 7; i++) {
        const y = -86 + i * 12;
        parts.push(
          `<path d="M-21,${y} L-38,${y - 7} M-21,${y + 3} L-36,${y + 9}" stroke="#7a5a1a" stroke-width="3" stroke-linecap="round"/>`,
        );
      }
      parts.push(
        `<rect x="-20" y="-4" width="40" height="10" rx="3" fill="#4a3a2a" ${stroke}/>`,
        `<rect x="-9" y="6" width="18" height="56" rx="7" fill="${leather}" ${stroke}/>`,
        wrap(0, 12, 58, 9, 8),
      );
      break;

    case 6: // Stormlash Whip
      rot = 0;
      k = 1.2;
      glow = spark;
      parts.push(
        `<path d="M-40,70 Q-80,10 -30,-20 Q20,-50 50,-20 Q80,10 40,30 Q10,44 20,70" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>`,
        `<path d="M-40,70 Q-80,10 -30,-20 Q20,-50 50,-20 Q80,10 40,30 Q10,44 20,70" fill="none" stroke="#3a4a7a" stroke-width="6" stroke-linecap="round"/>`,
        bolt('M-58,20 L-46,8 L-54,0 L-40,-14', 3),
        bolt('M30,-40 L44,-30 L38,-22 L56,-12', 3),
        bolt('M58,10 L46,24 L56,30 L44,44', 3),
        `<path d="M20,70 L30,86 M20,70 L14,88 M20,70 L24,92" stroke="#cfe8ff" stroke-width="3" stroke-linecap="round"/>`,
        `<rect x="-62" y="62" width="44" height="16" rx="7" transform="rotate(-50 -40 70)" fill="${leather}" ${stroke}/>`,
      );
      break;

    case 7: // Brimstone Hatchet
      rot = 30;
      glow = ember;
      dy = 16;
      dx = 8;
      parts.push(
        flame(-46, -78, 40),
        flame(-24, -82, 30),
        `<rect x="-8" y="-60" width="16" height="140" rx="6" fill="${wood}" ${stroke}/>`,
        `<path d="M-6,-62 L-6,-30 L-58,-16 Q-78,-46 -58,-84 Z" fill="#2e2622" ${stroke}/>`,
        `<path d="M-58,-84 Q-76,-50 -58,-16" fill="none" stroke="${ember}" stroke-width="5"/>`,
        `<path d="M-48,-62 L-34,-52 L-40,-40 M-34,-52 L-18,-58" fill="none" stroke="${ember}" stroke-width="3" stroke-linecap="round"/>`,
        `<rect x="-10" y="-68" width="20" height="44" rx="4" fill="#3a302a" ${stroke}/>`,
        wrap(0, 40, 76, 10, 8),
      );
      break;

    case 8: // Gravedigger's Spade-Axe
      rot = 20;
      glow = '#8affc8';
      k = 0.95;
      dy = 12;
      parts.push(
        `<rect x="-6" y="-60" width="12" height="150" rx="4" fill="${wood}" ${stroke}/>`,
        `<path d="M-10,90 L10,90 L10,104 Q0,110 -10,104 Z" fill="#4a4440" ${stroke}/>`,
        `<path d="M-34,-66 L34,-66 L40,-102 Q0,-128 -40,-102 Z" fill="#7a8278" ${stroke}/>`,
        `<path d="M-40,-102 Q0,-128 40,-102" fill="none" stroke="#d8e0d8" stroke-width="4"/>`,
        `<rect x="-12" y="-70" width="24" height="18" rx="3" fill="#4a4440" ${stroke}/>`,
        `<path d="M-22,-90 Q-30,-104 -20,-112 Q-26,-100 -14,-94" fill="none" stroke="#bfffe0" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`,
        `<path d="M22,-88 Q34,-100 26,-114 Q36,-104 34,-90" fill="none" stroke="#bfffe0" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`,
        `<circle cx="-10" cy="-86" r="4" fill="#14100c"/><circle cx="10" cy="-86" r="4" fill="#14100c"/>`,
        `<path d="M-8,-76 Q0,-70 8,-76" fill="none" stroke="#14100c" stroke-width="3"/>`,
      );
      break;

    case 9: // Hellfire Saber
      rot = 25;
      glow = '#ff4a1a';
      k = 1.1;
      dy = 16;
      parts.push(
        `<path d="M-8,-6 Q-14,-60 6,-104 Q4,-60 10,-6 Z" fill="#ff5a1f" ${stroke}/>`,
        `<path d="M-2,-14 Q-6,-56 4,-92" fill="none" stroke="#ffd36b" stroke-width="4" stroke-linecap="round"/>`,
        flame(-14, -40, 34),
        flame(10, -70, 28),
        `<path d="M-26,-4 Q0,-16 26,-4 L26,4 Q0,-6 -26,4 Z" fill="#c9a64a" ${stroke}/>`,
        `<path d="M14,2 Q34,24 14,56" fill="none" stroke="#c9a64a" stroke-width="5"/>`,
        `<rect x="-8" y="2" width="16" height="50" rx="6" fill="#3a1a12" ${stroke}/>`,
        `<circle cx="0" cy="58" r="8" fill="#c9a64a" ${stroke}/>`,
      );
      break;

    case 10: // Sundown Scythe
      rot = 15;
      k = 0.95;
      dx = 18;
      dy = 12;
      glow = '#ff9a3a';
      parts.push(
        `<circle cx="-20" cy="-50" r="44" fill="url(#sun)"/>`,
        `<rect x="-5" y="-90" width="10" height="190" rx="4" fill="#3a2418" ${stroke}/>`,
        `<path d="M-2,-88 Q-60,-112 -110,-60 Q-70,-88 -2,-68 Z" fill="url(#dusk)" ${stroke}/>`,
        `<path d="M-100,-64 Q-60,-98 -6,-84" fill="none" stroke="#fff0b0" stroke-width="3" stroke-linecap="round"/>`,
        `<rect x="-10" y="-94" width="20" height="30" rx="4" fill="#5a3a24" ${stroke}/>`,
        `<rect x="-22" y="8" width="20" height="10" rx="4" fill="#5a3a24" ${stroke}/>`,
      );
      break;

    default:
      return weapon(6);
  }

  const s = 0.78;
  const body = `<g transform="translate(${100 + dx} ${100 + dy}) rotate(${rot}) scale(${(s * k).toFixed(3)})">${parts.join('')}</g>`;
  const extraDefs =
    value === 10
      ? `<radialGradient id="sun"><stop offset="0" stop-color="#ffd36b" stop-opacity="0.9"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient>` +
        `<linearGradient id="dusk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a3cff"/><stop offset="0.5" stop-color="#ff5a2a"/><stop offset="1" stop-color="#ffd36b"/></linearGradient>`
      : '';
  return svg(
    (glow ? `<circle cx="100" cy="100" r="96" fill="url(#glow)"/>` : '') + body,
    (glow ? glowDefs(glow) : '') + extraDefs,
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
