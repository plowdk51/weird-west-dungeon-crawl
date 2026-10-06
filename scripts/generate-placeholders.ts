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

// ------------------------------------------------------------------ weapons

function weapon(value: number): string {
  const t = (value - 2) / 8;
  const metal = ramp(['#6e665c', '#9aa3ab', '#d7dee6', '#f4d27a'], t);
  const wood = ramp(['#5a3a22', '#7a4a26', '#3b2416'], t);
  const parts: string[] = [];
  if (value >= 9) parts.push(`<circle cx="0" cy="0" r="96" fill="url(#glow)"/>`);

  if (value === 2) {
    // Broken bottle
    parts.push(
      `<path d="M-14,60 L-14,10 Q-14,-6 -6,-14 L-6,-34 L6,-34 L6,-14 Q14,-6 14,10 L14,60 Z" transform="rotate(180)" fill="#5d8a4a" stroke="#14100c" stroke-width="4" opacity="0.9"/>`,
      `<path d="M-14,-60 L-8,-72 L-2,-62 L4,-78 L9,-64 L14,-70 L14,-60 Z" fill="#5d8a4a" stroke="#14100c" stroke-width="3"/>`,
    );
  } else if (value <= 4) {
    // Knife (3) / pickaxe (4)
    if (value === 3) {
      parts.push(
        `<path d="M-10,-10 L-10,-78 Q0,-92 10,-70 L10,-10 Z" fill="${metal}" stroke="#14100c" stroke-width="4"/>`,
        `<rect x="-22" y="-12" width="44" height="10" rx="3" fill="#8a6a3a" stroke="#14100c" stroke-width="3"/>`,
        `<rect x="-9" y="-2" width="18" height="56" rx="6" fill="${wood}" stroke="#14100c" stroke-width="4"/>`,
      );
    } else {
      parts.push(
        `<rect x="-7" y="-50" width="14" height="120" rx="5" fill="${wood}" stroke="#14100c" stroke-width="4"/>`,
        `<path d="M-74,-38 Q0,-80 74,-38 L66,-30 Q0,-58 -66,-30 Z" fill="${metal}" stroke="#14100c" stroke-width="4"/>`,
      );
    }
  } else {
    // Firearms: barrel length grows; 7 adds a second barrel, 8+ adds a stock.
    const barrel = lerp(48, 110, (value - 5) / 5);
    const g: string[] = [];
    if (value >= 8) {
      g.push(
        `<path d="M-30,-6 L-96,10 L-100,34 L-30,18 Z" fill="${wood}" stroke="#14100c" stroke-width="4"/>`,
      );
    } else {
      g.push(
        `<path d="M-24,0 Q-40,40 -30,56 L-8,56 Q-10,30 4,10 Z" fill="${wood}" stroke="#14100c" stroke-width="4"/>`,
      );
    }
    g.push(
      `<rect x="-34" y="-14" width="50" height="28" rx="6" fill="${metal}" stroke="#14100c" stroke-width="4"/>`,
    );
    if (value <= 7 || value === 9) {
      g.push(
        `<circle cx="-4" cy="0" r="15" fill="${metal}" stroke="#14100c" stroke-width="4"/><circle cx="-4" cy="0" r="4" fill="#14100c"/>`,
      );
    }
    g.push(
      `<rect x="14" y="-12" width="${barrel}" height="11" rx="3" fill="${metal}" stroke="#14100c" stroke-width="4"/>`,
    );
    if (value === 7) {
      g.push(
        `<rect x="14" y="1" width="${barrel}" height="11" rx="3" fill="${metal}" stroke="#14100c" stroke-width="4"/>`,
      );
    }
    if (value === 8 || value === 10) {
      g.push(`<path d="M-6,14 Q4,34 18,26" fill="none" stroke="#14100c" stroke-width="5"/>`);
    }
    g.push(`<path d="M-4,14 L4,26 L10,14" fill="none" stroke="#14100c" stroke-width="4"/>`);
    parts.push(`<g transform="translate(${value >= 8 ? 6 : -12} 0)">${g.join('')}</g>`);
  }
  const rot = value <= 4 ? 35 : -25;
  return svg(
    `<g transform="translate(100 100) rotate(${rot}) scale(${lerp(0.8, 1, t).toFixed(3)})">${parts.join('')}</g>`,
    value >= 9 ? glowDefs(value === 10 ? '#ffd86b' : '#cfe6ff') : '',
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
