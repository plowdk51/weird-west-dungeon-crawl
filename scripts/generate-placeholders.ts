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

/**
 * Pulp-fantasy Weird West creatures: critters at low values, legends near the top.
 * Each value gets its own silhouette; eyes and auras intensify with the value.
 */
function monster(value: number): string {
  const INK = '#14100c';
  const t = (value - 2) / 12;
  const eye = ramp(['#f2d16b', '#ff8a2a', '#ff2a2a', '#c44dff'], t);
  const stroke = `stroke="${INK}" stroke-width="4"`;
  const eyes = (x: number, y: number, gap: number, r = 5) =>
    `<circle cx="${x - gap}" cy="${y}" r="${r}" fill="${eye}" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="${x + gap}" cy="${y}" r="${r}" fill="${eye}" stroke="${INK}" stroke-width="2"/>`;
  const fangs = (x0: number, x1: number, y: number, n: number, len: number, dir = 1) => {
    let out = '';
    for (let i = 0; i < n; i++) {
      const x = lerp(x0, x1, n === 1 ? 0.5 : i / (n - 1));
      out += `<path d="M${x - 3},${y} L${x},${y + len * dir} L${x + 3},${y} Z" fill="#f5ecd6" stroke="${INK}" stroke-width="1.5"/>`;
    }
    return out;
  };
  const bolt = (d: string, w = 3) =>
    `<path d="${d}" fill="none" stroke="#8fd3ff" stroke-width="${w * 2.2}" stroke-opacity="0.35" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="#e8f6ff" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const scorpion = (x: number, y: number, s: number, flip = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">` +
    `<path d="M10,0 Q40,-4 44,-30 Q46,-52 26,-50" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M10,0 Q40,-4 44,-30 Q46,-52 26,-50" fill="none" stroke="#b5532a" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M26,-50 L16,-44 L24,-38 Z" fill="#9dff6a" stroke="${INK}" stroke-width="2"/>` +
    `<path d="M-30,6 L-40,18 M-20,10 L-26,24 M-10,10 L-12,26 M0,10 L4,24" stroke="${INK}" stroke-width="3"/>` +
    `<ellipse cx="-10" cy="0" rx="26" ry="12" fill="#c8662e" ${stroke}/>` +
    `<path d="M-34,-4 Q-50,-14 -56,-4 M-34,4 Q-50,10 -56,2" fill="none" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M-56,-4 L-64,-10 M-56,-4 L-62,2 M-56,2 L-62,10" stroke="${INK}" stroke-width="3"/>` +
    `<circle cx="-28" cy="-4" r="2.5" fill="#9dff6a"/></g>`;

  const parts: string[] = [];
  let glow: string | null = value >= 11 ? eye : null;
  let defs = '';
  let dx = 0;
  let dy = 0;
  let k = 1;

  switch (value) {
    case 2: // Jackalope Biter
      dy = 10;
      parts.push(
        // antlers
        `<path d="M-38,-34 L-50,-78 M-50,-60 L-66,-70 M-46,-46 L-30,-64 M-26,-34 L-18,-80 M-20,-62 L-6,-72" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`,
        `<path d="M-38,-34 L-50,-78 M-50,-60 L-66,-70 M-46,-46 L-30,-64 M-26,-34 L-18,-80 M-20,-62 L-6,-72" fill="none" stroke="#d9c8a0" stroke-width="4" stroke-linecap="round"/>`,
        // ears
        `<ellipse cx="-12" cy="-44" rx="8" ry="26" transform="rotate(25 -12 -44)" fill="#b08860" ${stroke}/>`,
        // body
        `<ellipse cx="18" cy="28" rx="48" ry="34" fill="#b08860" ${stroke}/>`,
        `<circle cx="62" cy="16" r="10" fill="#efe4cc" ${stroke}/>`,
        `<ellipse cx="0" cy="58" rx="22" ry="8" fill="#9a7450" ${stroke}/>`,
        // head
        `<circle cx="-34" cy="-6" r="26" fill="#b08860" ${stroke}/>`,
        `<circle cx="-40" cy="-12" r="6" fill="${eye}" stroke="${INK}" stroke-width="2"/>`,
        `<circle cx="-56" cy="2" r="4" fill="#d07a8a"/>`,
        // underbite
        `<path d="M-60,10 Q-46,22 -30,14" fill="#5a2a2a" stroke="${INK}" stroke-width="3"/>`,
        fangs(-56, -34, 16, 3, -9),
      );
      break;

    case 3: // Scorpion Swarm
      k = 1.05;
      parts.push(scorpion(-26, 40, 0.7, 1), scorpion(38, 52, 0.6, -1), scorpion(6, -8, 1, 1));
      break;

    case 4: {
      // Tumbleweed Imp: a snarl of dry branches with eyes, teeth and a temper
      parts.push(
        `<path d="M-86,60 Q-70,50 -56,58 M-90,40 Q-76,34 -64,40" fill="none" stroke="#c8a870" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`,
        `<circle cx="0" cy="10" r="62" fill="#c8a066" fill-opacity="0.35" ${stroke}/>`,
      );
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI;
        parts.push(
          `<ellipse cx="0" cy="10" rx="60" ry="${(18 + (i % 3) * 14).toFixed(0)}" transform="rotate(${((a * 180) / Math.PI).toFixed(0)} 0 10)" fill="none" stroke="#9a7440" stroke-width="3"/>`,
        );
      }
      parts.push(
        `<path d="M-50,-30 L-64,-50 M40,-40 L56,-62 M56,40 L74,52 M-56,44 L-72,58" stroke="#7a5a30" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M-30,-6 L-12,0 M30,-6 L12,0" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`,
        eyes(0, 8, 18, 7),
        `<path d="M-28,26 Q0,50 28,26 Z" fill="#3a1010" ${stroke}/>`,
        fangs(-22, 22, 27, 5, 8),
      );
      break;
    }

    case 5: // Vulture Harpy
      dy = 8;
      parts.push(
        `<path d="M-10,0 Q-60,-40 -96,-6 Q-80,-4 -84,8 Q-70,4 -72,18 Q-56,10 -30,30 Z" fill="#3a2a2a" ${stroke}/>`,
        `<path d="M10,0 Q60,-40 96,-6 Q80,-4 84,8 Q70,4 72,18 Q56,10 30,30 Z" fill="#3a2a2a" ${stroke}/>`,
        `<ellipse cx="0" cy="24" rx="28" ry="40" fill="#4a3434" ${stroke}/>`,
        `<path d="M-22,-8 Q0,6 22,-8 L18,6 Q0,16 -18,6 Z" fill="#efe4cc" ${stroke}/>`,
        // talons
        `<path d="M-12,62 L-18,80 M-12,62 L-10,82 M12,62 L6,82 M12,62 L16,80" stroke="#e0b040" stroke-width="5" stroke-linecap="round"/>`,
        // head with wild hair
        `<path d="M-26,-40 L-36,-62 L-16,-50 L-14,-74 L0,-52 L12,-76 L14,-50 L34,-64 L26,-40 Z" fill="#e8e4dc" ${stroke}/>`,
        `<circle cx="0" cy="-30" r="20" fill="#d89a8a" ${stroke}/>`,
        eyes(0, -34, 8, 4),
        `<path d="M-6,-24 L6,-24 L2,-8 Z" fill="#e0b040" ${stroke}/>`,
      );
      break;

    case 6: // Wash Wisp
      glow = '#7fffd4';
      parts.push(
        `<path d="M-20,40 Q-50,70 -70,60 M10,46 Q0,80 -20,90 M30,36 Q60,64 76,56" fill="none" stroke="#bfffe8" stroke-width="5" stroke-linecap="round" opacity="0.6"/>`,
        `<path d="M0,-80 Q30,-40 40,0 Q46,46 0,50 Q-46,46 -40,0 Q-30,-40 0,-80 Z" fill="#8fffe0" fill-opacity="0.55" stroke="#2a7a6a" stroke-width="4"/>`,
        `<path d="M0,-40 Q18,-10 20,10 Q22,34 0,36 Q-22,34 -20,10 Q-18,-10 0,-40 Z" fill="#effff8"/>`,
        `<ellipse cx="-9" cy="6" rx="5" ry="8" fill="#1a3a34"/><ellipse cx="9" cy="6" rx="5" ry="8" fill="#1a3a34"/>`,
        `<path d="M-6,22 Q0,28 6,22" fill="none" stroke="#1a3a34" stroke-width="3"/>`,
      );
      break;

    case 7: {
      // Bone Rattler
      k = 1.35;
      dx = -6;
      const pts: [number, number][] = [];
      for (let i = 0; i <= 16; i++) {
        const a = (i / 16) * Math.PI * 1.6 + 0.4;
        const r = 60 - i * 1.6;
        pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.8 + 10]);
      }
      for (const [x, y] of pts.slice(1)) {
        parts.push(
          `<path d="M${(x - 9).toFixed(1)},${y.toFixed(1)} L${(x + 9).toFixed(1)},${y.toFixed(1)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`,
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#e8dcc0" stroke="${INK}" stroke-width="3"/>`,
        );
      }
      const [hx, hy] = pts[0]!;
      const [tx, ty] = pts[pts.length - 1]!;
      parts.push(
        `<path d="M${tx - 15},${ty + 6} Q${tx - 13},${ty - 22} ${tx},${ty - 24} Q${tx + 13},${ty - 22} ${tx + 15},${ty + 6} Z" fill="#c9a64a" ${stroke}/>`,
        `<circle cx="${tx}" cy="${ty + 9}" r="5" fill="#8a6a20" ${stroke}/>`,
        `<path d="M${hx - 8},${hy - 22} Q${hx + 36},${hy - 26} ${hx + 34},${hy} Q${hx + 20},${hy + 14} ${hx - 6},${hy + 8} Z" fill="#e8dcc0" ${stroke}/>`,
        `<circle cx="${hx + 10}" cy="${hy - 10}" r="6" fill="${INK}"/><circle cx="${hx + 10}" cy="${hy - 10}" r="3" fill="${eye}"/>`,
        fangs(hx + 14, hx + 28, hy + 4, 2, 10),
      );
      break;
    }

    case 8: // Snake-Oil Salesman
      dy = 6;
      parts.push(
        `<path d="M-46,90 L-40,20 Q0,4 40,20 L46,90 Z" fill="#5a2a4a" ${stroke}/>`,
        `<path d="M-12,22 L0,60 L12,22 Z" fill="#efe4cc" ${stroke}/>`,
        `<path d="M-8,26 L8,26 L0,36 Z" fill="#c2412f"/>`,
        // bottle in hand
        `<rect x="40" y="10" width="20" height="34" rx="6" fill="#7a3cff" fill-opacity="0.85" ${stroke}/>`,
        `<rect x="45" y="0" width="10" height="12" fill="#9a6a3c" ${stroke}/>`,
        `<circle cx="50" cy="50" r="9" fill="#d89a7a" ${stroke}/>`,
        // head
        `<ellipse cx="0" cy="-18" rx="30" ry="30" fill="#c8d89a" ${stroke}/>`,
        eyes(0, -26, 12, 5),
        `<path d="M-22,-6 Q0,16 22,-6 Z" fill="#3a1010" ${stroke}/>`,
        fangs(-16, 16, -5, 6, 6),
        `<path d="M0,6 L0,18 M0,18 L-5,24 M0,18 L5,24" stroke="#c2412f" stroke-width="3"/>`,
        // top hat
        `<ellipse cx="0" cy="-44" rx="40" ry="8" fill="#1c1410" ${stroke}/>`,
        `<rect x="-24" y="-92" width="48" height="48" rx="3" fill="#1c1410" ${stroke}/>`,
        `<rect x="-24" y="-56" width="48" height="8" fill="#7a3cff"/>`,
      );
      break;

    case 9: // Mine-Cart Mimic
      dy = 6;
      parts.push(
        `<path d="M-90,74 L90,74 M-90,86 L90,86" stroke="#5a5048" stroke-width="5"/>`,
        `<path d="M-70,70 L-60,64 M-30,70 L-20,64 M10,70 L20,64 M50,70 L60,64" stroke="#6a4426" stroke-width="6"/>`,
        // lid / upper jaw
        `<path d="M-64,-10 L-58,-58 L58,-58 L64,-10 Z" fill="#7a5a3a" ${stroke}/>`,
        // mouth
        `<path d="M-60,-12 L60,-12 L54,14 L-54,14 Z" fill="#3a0a10" ${stroke}/>`,
        fangs(-54, 54, -12, 9, 12),
        fangs(-48, 48, 14, 7, -10),
        `<path d="M-14,10 Q0,40 24,26" fill="none" stroke="#d05a6a" stroke-width="9" stroke-linecap="round"/>`,
        // cart body
        `<path d="M-56,14 L56,14 L46,60 L-46,60 Z" fill="#8a6a44" ${stroke}/>`,
        `<path d="M-50,30 L50,30 M-48,46 L48,46" stroke="#5a4028" stroke-width="3"/>`,
        `<circle cx="-30" cy="64" r="12" fill="#4a4440" ${stroke}/><circle cx="30" cy="64" r="12" fill="#4a4440" ${stroke}/>`,
        eyes(0, -36, 22, 7),
      );
      break;

    case 10: // Copper Golem
      parts.push(
        `<rect x="-36" y="-30" width="72" height="80" rx="8" fill="#c8743a" ${stroke}/>`,
        `<rect x="-26" y="50" width="20" height="36" fill="#a85a2a" ${stroke}/>`,
        `<rect x="6" y="50" width="20" height="36" fill="#a85a2a" ${stroke}/>`,
        // rail arms
        `<rect x="-72" y="-26" width="34" height="18" rx="4" fill="#5e656b" ${stroke}/>`,
        `<rect x="-78" y="-12" width="20" height="58" rx="5" fill="#5e656b" ${stroke}/>`,
        `<rect x="38" y="-26" width="34" height="18" rx="4" fill="#5e656b" ${stroke}/>`,
        `<rect x="58" y="-12" width="20" height="58" rx="5" fill="#5e656b" ${stroke}/>`,
        `<circle cx="-68" cy="52" r="14" fill="#a85a2a" ${stroke}/><circle cx="68" cy="52" r="14" fill="#a85a2a" ${stroke}/>`,
        // head
        `<rect x="-24" y="-72" width="48" height="40" rx="6" fill="#c8743a" ${stroke}/>`,
        `<rect x="-18" y="-58" width="36" height="10" fill="#2a1a10"/>`,
        `<circle cx="-9" cy="-53" r="4" fill="${eye}"/><circle cx="9" cy="-53" r="4" fill="${eye}"/>`,
        // rivets and ore
        `<circle cx="-26" cy="-20" r="3" fill="${INK}"/><circle cx="26" cy="-20" r="3" fill="${INK}"/><circle cx="-26" cy="40" r="3" fill="${INK}"/><circle cx="26" cy="40" r="3" fill="${INK}"/>`,
        `<path d="M-10,0 L4,-10 L16,4 L6,22 L-10,16 Z" fill="#7fe0d0" stroke="${INK}" stroke-width="3"/>`,
      );
      break;

    case 11: // Storm Witch
      glow = '#8fd3ff';
      parts.push(
        `<path d="M-80,-50 Q-80,-84 -40,-80 Q-24,-104 10,-90 Q44,-104 60,-78 Q92,-76 84,-48 Z" fill="#3a3a5e" stroke="#1a1a30" stroke-width="3"/>`,
        bolt('M-40,-50 L-50,-30 L-38,-26 L-48,-6'),
        bolt('M56,-50 L64,-30 L52,-26 L62,-4'),
        // lightning rod broom
        `<path d="M-80,70 L76,-10" stroke="#6e747a" stroke-width="8" stroke-linecap="round"/>`,
        `<path d="M76,-10 L96,-22 L84,-2 Z" fill="#c9a64a" ${stroke}/>`,
        `<path d="M-80,70 L-96,62 M-80,70 L-98,74 M-80,70 L-92,84" stroke="#8fd3ff" stroke-width="4" stroke-linecap="round"/>`,
        // robes
        `<path d="M-30,46 Q-40,10 -6,-6 Q24,0 30,30 L10,40 Z" fill="#2a2a4a" ${stroke}/>`,
        // hair
        `<path d="M-8,-20 Q-50,-20 -60,10 Q-40,0 -30,6 Q-48,24 -54,40 Q-30,24 -18,16 Z" fill="#c8d0e8" ${stroke}/>`,
        // head
        `<circle cx="0" cy="-20" r="18" fill="#a8c8a0" ${stroke}/>`,
        eyes(2, -22, 7, 3.5),
        `<path d="M-4,-10 Q2,-6 8,-10" fill="none" stroke="${INK}" stroke-width="2.5"/>`,
        // hat
        `<path d="M-30,-34 L34,-40 L14,-36 L22,-84 L6,-66 Z" fill="#1c1430" ${stroke}/>`,
        `<path d="M-30,-34 Q2,-44 34,-40" fill="none" stroke="#8fd3ff" stroke-width="3"/>`,
      );
      break;

    case 12: {
      // Phantom Stagecoach: a runaway ghost coach pulled by skeleton horses
      glow = '#8affe0';
      k = 0.9;
      dx = -12;
      dy = 6;
      const ghost = '#bfffe8';
      const horse = (x: number, y: number) =>
        `<path d="M${x - 14},${y + 12} L${x - 20},${y + 46} M${x + 10},${y + 12} L${x + 16},${y + 46}" stroke="${ghost}" stroke-width="4" stroke-linecap="round"/>` +
        `<ellipse cx="${x}" cy="${y + 4}" rx="22" ry="12" fill="none" stroke="${ghost}" stroke-width="4"/>` +
        `<path d="M${x - 12},${y} L${x + 10},${y} M${x - 8},${y + 8} L${x + 8},${y + 8}" stroke="${ghost}" stroke-width="2.5"/>` +
        `<path d="M${x + 18},${y - 2} L${x + 26},${y - 30} L${x + 44},${y - 22} L${x + 40},${y - 12} L${x + 28},${y - 14} Z" fill="#e8dcc0" ${stroke}/>` +
        `<circle cx="${x + 32}" cy="${y - 22}" r="3" fill="${eye}"/>`;
      parts.push(
        `<path d="M-100,72 Q-80,60 -60,74 Q-40,86 -20,72" fill="none" stroke="${ghost}" stroke-width="4" opacity="0.5"/>`,
        // horses (back first)
        horse(30, -2),
        horse(48, 8),
        `<path d="M-4,-6 L40,4" stroke="${ghost}" stroke-width="3"/>`,
        // coach
        `<path d="M-80,-50 L-6,-50 L0,30 L-86,30 Z" fill="#2a3a3a" fill-opacity="0.9" stroke="${ghost}" stroke-width="4"/>`,
        `<rect x="-70" y="-38" width="22" height="24" fill="${eye}" fill-opacity="0.7" stroke="${ghost}" stroke-width="3"/>`,
        `<rect x="-38" y="-38" width="22" height="24" fill="${eye}" fill-opacity="0.7" stroke="${ghost}" stroke-width="3"/>`,
        `<path d="M-84,-50 L-74,-62 L-12,-62 L-2,-50" fill="#1c2a2a" stroke="${ghost}" stroke-width="4"/>`,
        `<circle cx="-2" cy="-40" r="6" fill="#ffe08a" stroke="${INK}" stroke-width="2"/>`,
        // wheels
        `<circle cx="-68" cy="42" r="20" fill="none" stroke="${ghost}" stroke-width="5"/>`,
        `<path d="M-88,42 L-48,42 M-68,22 L-68,62" stroke="${ghost}" stroke-width="3"/>`,
        `<circle cx="-18" cy="44" r="16" fill="none" stroke="${ghost}" stroke-width="5"/>`,
        `<path d="M-34,44 L-2,44 M-18,28 L-18,60" stroke="${ghost}" stroke-width="3"/>`,
      );
      break;
    }

    case 13: // Canyon Colossus
      k = 0.95;
      parts.push(
        // body strata
        `<path d="M-60,90 L-56,-10 Q-50,-40 -20,-44 L20,-44 Q50,-40 56,-10 L60,90 Z" fill="#b8562e" ${stroke}/>`,
        `<path d="M-58,10 Q0,0 58,12 M-59,40 Q0,30 59,42 M-60,66 Q0,60 60,70" fill="none" stroke="#7a3418" stroke-width="5"/>`,
        `<path d="M-58,24 Q0,16 58,26 M-60,54 Q0,46 60,56" fill="none" stroke="#e08a50" stroke-width="3"/>`,
        // arms
        `<path d="M-56,-20 Q-96,0 -86,70 L-64,70 Q-70,20 -50,10 Z" fill="#a84a26" ${stroke}/>`,
        `<path d="M56,-20 Q96,0 86,70 L64,70 Q70,20 50,10 Z" fill="#a84a26" ${stroke}/>`,
        // head
        `<path d="M-28,-44 L-30,-80 Q0,-96 30,-80 L28,-44 Z" fill="#c8663a" ${stroke}/>`,
        `<path d="M-22,-64 L-6,-60 M22,-64 L6,-60" stroke="${INK}" stroke-width="5"/>`,
        `<circle cx="-12" cy="-56" r="5" fill="${eye}"/><circle cx="12" cy="-56" r="5" fill="${eye}"/>`,
        // cactus on shoulder
        `<path d="M44,-36 L44,-70 M44,-56 Q34,-56 34,-66 M44,-50 Q54,-50 54,-62" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`,
        `<path d="M44,-36 L44,-70 M44,-56 Q34,-56 34,-66 M44,-50 Q54,-50 54,-62" fill="none" stroke="#5d8a3a" stroke-width="6" stroke-linecap="round"/>`,
      );
      break;

    case 14: // The Sun-Eater
      glow = '#ffb84a';
      defs += `<radialGradient id="sun"><stop offset="0" stop-color="#fff2b0"/><stop offset="0.6" stop-color="#ffb84a"/><stop offset="1" stop-color="#ff6a2a"/></radialGradient>`;
      parts.push(
        `<circle cx="0" cy="6" r="40" fill="url(#sun)" ${stroke}/>`,
        // coiled serpent around the sun
        `<path d="M60,40 Q90,-30 30,-66 Q-30,-96 -70,-40 Q-100,20 -50,60 Q0,96 50,64" fill="none" stroke="${INK}" stroke-width="28" stroke-linecap="round"/>`,
        `<path d="M60,40 Q90,-30 30,-66 Q-30,-96 -70,-40 Q-100,20 -50,60 Q0,96 50,64" fill="none" stroke="#3a1a5a" stroke-width="20" stroke-linecap="round"/>`,
        `<path d="M60,40 Q90,-30 30,-66 Q-30,-96 -70,-40 Q-100,20 -50,60 Q0,96 50,64" fill="none" stroke="#7a4aaa" stroke-width="4" stroke-dasharray="6 10"/>`,
        // head with open jaws closing on the sun
        `<path d="M50,64 Q70,40 80,30 L44,22 Z" fill="#3a1a5a" ${stroke}/>`,
        `<path d="M50,64 Q60,80 40,90 L30,52 Z" fill="#3a1a5a" ${stroke}/>`,
        fangs(48, 70, 28, 3, 10),
        `<circle cx="66" cy="44" r="5" fill="${eye}" stroke="${INK}" stroke-width="2"/>`,
        `<path d="M-60,-62 L-72,-80 L-50,-70 Z M-80,-30 L-100,-36 L-84,-18 Z" fill="#c44dff" stroke="${INK}" stroke-width="2"/>`,
      );
      break;

    default:
      return monster(8);
  }

  const s = 0.82 * k;
  const body = `<g transform="translate(${100 + dx} ${100 + dy}) scale(${s.toFixed(3)})">${parts.join('')}</g>`;
  return svg(
    (glow ? `<circle cx="100" cy="100" r="96" fill="url(#glow)"/>` : '') + body,
    (glow ? glowDefs(glow) : '') + defs,
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

// ------------------------------------------------------------------ remedies

/**
 * Frontier remedies: trail food and drinks at low values, bottled miracles at the top.
 * Each value gets its own container; glow and sparkle grow with the healing.
 */
function potion(value: number): string {
  const INK = '#14100c';
  const stroke = `stroke="${INK}" stroke-width="4"`;
  const sparkle = (x: number, y: number, r = 7, fill = '#fff6c8') =>
    `<path d="M${x},${y - r} L${x + r * 0.3},${y - r * 0.3} L${x + r},${y} L${x + r * 0.3},${y + r * 0.3} L${x},${y + r} L${x - r * 0.3},${y + r * 0.3} L${x - r},${y} L${x - r * 0.3},${y - r * 0.3} Z" fill="${fill}"/>`;
  const steam = (x: number, y: number, h = 40) =>
    `<path d="M${x},${y} Q${x - 10},${y - h * 0.3} ${x},${y - h * 0.55} Q${x + 10},${y - h * 0.8} ${x},${y - h}" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.75"/>`;
  const shine = (d: string) =>
    `<path d="${d}" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="6" stroke-linecap="round"/>`;
  const parts: string[] = [];
  let glow: string | null = null;
  let defs = '';

  switch (value) {
    case 2: // Prickly Pear Juice: cactus fruit beside a cup of pink juice
      parts.push(
        `<ellipse cx="-36" cy="-10" rx="24" ry="30" fill="#c8285a" ${stroke}/>`,
        `<ellipse cx="-50" cy="34" rx="20" ry="24" fill="#a81e4a" ${stroke}/>`,
        `<path d="M-40,-36 L-44,-46 M-28,-26 L-20,-32 M-46,-6 L-56,-8 M-30,6 L-22,10 M-56,24 L-64,20 M-44,44 L-38,52" stroke="#f3e6b0" stroke-width="3" stroke-linecap="round"/>`,
        `<path d="M-46,-40 Q-36,-56 -26,-40" fill="#5d8a3a" ${stroke}/>`,
        `<path d="M6,-14 L60,-14 L52,60 L14,60 Z" fill="#e8f0f0" fill-opacity="0.35"/>`,
        `<path d="M10,10 L56,10 L52,60 L14,60 Z" fill="#e8467a"/>`,
        `<path d="M6,-14 L60,-14 L52,60 L14,60 Z" fill="none" ${stroke}/>`,
        shine('M18,-4 L22,48'),
        `<circle cx="42" cy="-14" r="12" fill="#c8285a" ${stroke}/>`,
      );
      break;

    case 3: // Sarsaparilla: long-neck brown soda bottle, fizzing
      parts.push(
        `<path d="M-10,-80 L10,-80 L10,-40 Q30,-30 30,-6 L30,70 Q30,78 22,78 L-22,78 Q-30,78 -30,70 L-30,-6 Q-30,-30 -10,-40 Z" fill="#6a3a1a" ${stroke}/>`,
        `<rect x="-30" y="12" width="60" height="34" fill="#f0e2bf" ${stroke}/>`,
        `<path d="M-18,24 Q0,16 18,24 M-14,34 L14,34" fill="none" stroke="#a82a1a" stroke-width="4"/>`,
        `<rect x="-13" y="-92" width="26" height="14" rx="3" fill="#c9a64a" ${stroke}/>`,
        shine('M-20,-4 L-20,4 M-20,54 L-20,66'),
        `<circle cx="-6" cy="-102" r="4" fill="#fff"/><circle cx="6" cy="-110" r="3" fill="#fff"/><circle cx="-2" cy="-118" r="2.5" fill="#fff"/>`,
      );
      break;

    case 4: // Cowboy Coffee: speckled enamel pot and tin cup
      parts.push(
        steam(-14, -62),
        steam(4, -66, 46),
        `<path d="M-50,-40 L22,-40 L32,60 L-60,60 Z" fill="#2f5a8a" ${stroke}/>`,
        `<path d="M22,-26 Q56,-20 50,24 L40,22 Q44,-6 22,-12" fill="#2f5a8a" ${stroke}/>`,
        `<path d="M-54,-30 Q-80,-44 -86,-60 L-74,-62 Q-68,-48 -52,-44" fill="#2f5a8a" ${stroke}/>`,
        `<ellipse cx="-14" cy="-44" rx="38" ry="9" fill="#1f3a5a" ${stroke}/>`,
        `<circle cx="-14" cy="-58" r="7" fill="#1f3a5a" ${stroke}/>`,
        `<circle cx="-30" cy="0" r="3" fill="#dfe8f0"/><circle cx="-6" cy="20" r="3" fill="#dfe8f0"/><circle cx="10" cy="-10" r="3" fill="#dfe8f0"/><circle cx="-40" cy="36" r="3" fill="#dfe8f0"/><circle cx="16" cy="40" r="3" fill="#dfe8f0"/>`,
        `<path d="M40,30 L80,30 L76,70 L44,70 Z" fill="#8a949e" ${stroke}/>`,
        `<path d="M80,38 Q96,44 80,58" fill="none" ${stroke}/>`,
        `<ellipse cx="60" cy="32" rx="18" ry="4" fill="#3a1e0e"/>`,
      );
      break;

    case 5: // Sweet Tea Jug: stoneware jug with a sweating glass
      parts.push(
        `<path d="M-30,-60 L-6,-60 L-4,-44 Q30,-36 32,10 Q34,70 -18,72 Q-70,70 -68,10 Q-66,-36 -32,-44 Z" fill="#efe2bf" ${stroke}/>`,
        `<path d="M-66,-6 Q-18,4 30,-6 L32,10 Q-18,20 -68,10 Z" fill="#8a5a2a"/>`,
        `<path d="M-6,-50 Q24,-58 28,-30" fill="none" stroke="${INK}" stroke-width="8"/>`,
        `<path d="M-6,-50 Q24,-58 28,-30" fill="none" stroke="#efe2bf" stroke-width="4"/>`,
        `<rect x="-26" y="-76" width="16" height="18" rx="3" fill="#9a6a3c" ${stroke}/>`,
        `<path d="M-40,30 L-36,40 M-30,30 L-26,40 M-20,30 L-16,40" stroke="#8a5a2a" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M40,-6 L84,-6 L78,70 L46,70 Z" fill="#e8f0f0" fill-opacity="0.35"/>`,
        `<path d="M42,10 L82,10 L78,70 L46,70 Z" fill="#c8862a"/>`,
        `<rect x="52" y="16" width="12" height="12" rx="2" fill="#e8f4ff" fill-opacity="0.8"/><rect x="62" y="30" width="12" height="12" rx="2" fill="#e8f4ff" fill-opacity="0.8"/>`,
        `<path d="M40,-6 L84,-6 L78,70 L46,70 Z" fill="none" ${stroke}/>`,
        `<circle cx="80" cy="-6" r="10" fill="#f0e060" ${stroke}/>`,
        `<circle cx="48" cy="40" r="2.5" fill="#fff"/><circle cx="76" cy="54" r="2.5" fill="#fff"/>`,
      );
      break;

    case 6: // Hot Spring Flask: steaming metal hip flask
      glow = '#ffb070';
      parts.push(
        steam(-14, -62, 44),
        steam(10, -64, 52),
        `<rect x="-48" y="-40" width="96" height="116" rx="22" fill="#9aa6b2" ${stroke}/>`,
        `<rect x="-36" y="-26" width="72" height="88" rx="14" fill="#b8c2cc"/>`,
        `<rect x="-14" y="-62" width="28" height="24" rx="4" fill="#7a848e" ${stroke}/>`,
        `<path d="M-20,8 Q-10,-4 0,8 Q10,20 20,8" fill="none" stroke="#e86a2a" stroke-width="5" stroke-linecap="round"/>`,
        `<path d="M-20,28 Q-10,16 0,28 Q10,40 20,28" fill="none" stroke="#e86a2a" stroke-width="5" stroke-linecap="round"/>`,
        shine('M-34,-20 L-34,40'),
      );
      break;

    case 7: // Silver Spring Water: vial of shimmering silver
      glow = '#e0eaff';
      defs += `<linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#b8c4d4"/><stop offset="1" stop-color="#eef2f8"/></linearGradient>`;
      parts.push(
        `<path d="M-16,-70 L16,-70 L16,-30 Q46,-14 46,24 Q46,74 0,74 Q-46,74 -46,24 Q-46,-14 -16,-30 Z" fill="#e8f0f8" fill-opacity="0.3"/>`,
        `<path d="M-44,10 Q0,-6 44,10 Q46,74 0,74 Q-46,74 -44,10 Z" fill="url(#silver)"/>`,
        `<path d="M-30,30 Q-10,22 10,30 Q24,36 34,30" fill="none" stroke="#ffffff" stroke-width="3"/>`,
        `<path d="M-16,-70 L16,-70 L16,-30 Q46,-14 46,24 Q46,74 0,74 Q-46,74 -46,24 Q-46,-14 -16,-30 Z" fill="none" ${stroke}/>`,
        `<rect x="-20" y="-86" width="40" height="18" rx="4" fill="#8a949e" ${stroke}/>`,
        shine('M-32,-2 Q-36,20 -30,40'),
        sparkle(-60, -40, 8),
        sparkle(62, -20, 7),
        sparkle(56, 60, 6),
      );
      break;

    case 8: // Mother Lode Mineral Water: fizzy teal water with ore crystals
      glow = '#5ae0c8';
      parts.push(
        `<path d="M-12,-84 L12,-84 L12,-50 Q34,-40 34,-14 L34,70 Q34,78 26,78 L-26,78 Q-34,78 -34,70 L-34,-14 Q-34,-40 -12,-50 Z" fill="#2aa890" fill-opacity="0.85"/>`,
        `<path d="M-30,78 L-20,46 L-10,62 L0,36 L12,58 L20,44 L30,78 Z" fill="#c8f0ff" ${stroke}/>`,
        `<path d="M-20,46 L-16,62 M0,36 L2,60" stroke="#7fb8d8" stroke-width="2"/>`,
        `<circle cx="-14" cy="0" r="4" fill="#e8fff8"/><circle cx="8" cy="-16" r="3" fill="#e8fff8"/><circle cx="16" cy="12" r="5" fill="#e8fff8"/><circle cx="-4" cy="24" r="3" fill="#e8fff8"/>`,
        `<path d="M-12,-84 L12,-84 L12,-50 Q34,-40 34,-14 L34,70 Q34,78 26,78 L-26,78 Q-34,78 -34,70 L-34,-14 Q-34,-40 -12,-50 Z" fill="none" ${stroke}/>`,
        `<rect x="-16" y="-98" width="32" height="16" rx="3" fill="#b87333" ${stroke}/>`,
        shine('M-22,-20 L-22,30'),
        sparkle(-58, -30, 7),
        sparkle(58, 0, 7),
      );
      break;

    case 9: // Starlight Whiskey: squat bottle of night sky
      glow = '#a07aff';
      parts.push(
        `<path d="M-14,-74 L14,-74 L14,-46 L52,-30 L52,66 Q52,76 42,76 L-42,76 Q-52,76 -52,66 L-52,-30 L-14,-46 Z" fill="#1c1450"/>`,
        `<path d="M-52,-10 L52,-10 L52,66 Q52,76 42,76 L-42,76 Q-52,76 -52,66 Z" fill="#3a2a8a"/>`,
        sparkle(-24, 20, 6),
        sparkle(16, 44, 5),
        sparkle(30, 4, 4),
        sparkle(-34, 56, 4),
        `<path d="M-14,-74 L14,-74 L14,-46 L52,-30 L52,66 Q52,76 42,76 L-42,76 Q-52,76 -52,66 L-52,-30 L-14,-46 Z" fill="none" ${stroke}/>`,
        `<rect x="-36" y="-2" width="72" height="30" fill="#efe2bf" ${stroke}/>`,
        `<path d="M0,4 L4,12 L12,12 L6,18 L8,26 L0,21 L-8,26 L-6,18 L-12,12 L-4,12 Z" fill="#3a2a8a"/>`,
        `<rect x="-18" y="-90" width="36" height="18" rx="4" fill="#9a6a3c" ${stroke}/>`,
        sparkle(-66, -50, 8),
        sparkle(64, -64, 9),
        sparkle(70, 30, 6),
      );
      break;

    case 10: // Bottled Sunrise: dawn light, corked
      glow = '#ffd36b';
      defs += `<linearGradient id="dawn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff6a2a"/><stop offset="0.5" stop-color="#ffb84a"/><stop offset="1" stop-color="#fff2b0"/></linearGradient>`;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        parts.push(
          `<path d="M${(Math.cos(a) * 66).toFixed(1)},${(14 + Math.sin(a) * 66).toFixed(1)} L${(Math.cos(a) * 92).toFixed(1)},${(14 + Math.sin(a) * 92).toFixed(1)}" stroke="#ffd36b" stroke-width="6" stroke-linecap="round" opacity="0.8"/>`,
        );
      }
      parts.push(
        `<path d="M-14,-62 L14,-62 L14,-38 Q56,-26 56,18 Q56,72 0,72 Q-56,72 -56,18 Q-56,-26 -14,-38 Z" fill="url(#dawn)"/>`,
        `<circle cx="0" cy="34" r="22" fill="#fff6d0"/>`,
        `<path d="M-50,40 Q0,30 50,40" fill="none" stroke="#c84a1a" stroke-width="4"/>`,
        `<path d="M-14,-62 L14,-62 L14,-38 Q56,-26 56,18 Q56,72 0,72 Q-56,72 -56,18 Q-56,-26 -14,-38 Z" fill="none" ${stroke}/>`,
        `<rect x="-18" y="-80" width="36" height="20" rx="4" fill="#9a6a3c" ${stroke}/>`,
        shine('M-40,0 Q-42,-18 -26,-28'),
      );
      break;

    default:
      return potion(6);
  }

  const s = 0.84;
  const body = `<g transform="translate(100 104) scale(${s.toFixed(3)})">${parts.join('')}</g>`;
  return svg(
    (glow ? `<circle cx="100" cy="100" r="96" fill="url(#glow)"/>` : '') + body,
    (glow ? glowDefs(glow) : '') + defs,
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
