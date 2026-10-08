import { MAX_HEALTH, type Card, type EquippedWeapon } from '../engine';

/** Rendering helpers the App lends to slides, so mock-ups match the real game exactly. */
export interface Pieces {
  card(
    card: Card,
    opts?: { note?: string; muted?: boolean; focus?: boolean; dealt?: number },
  ): string;
  badge(card: Card): string;
  health(health: number): string;
  weapon(weapon: EquippedWeapon | null): string;
}

export interface Slide {
  title: string;
  /** One or two short sentences; may contain inline HTML. */
  body: string;
  scene(p: Pieces): string;
}

const mon = (value: number): Card => ({
  id: `clubs-${value}`,
  suit: 'clubs',
  value,
  role: 'monster',
});
const wpn = (value: number): Card => ({
  id: `diamonds-${value}`,
  suit: 'diamonds',
  value,
  role: 'weapon',
});
const pot = (value: number): Card => ({
  id: `hearts-${value}`,
  suit: 'hearts',
  value,
  role: 'potion',
});

const row = (...cards: string[]) => `<div class="mock-row">${cards.join('')}</div>`;
const down = (label = '') =>
  `<div class="mock-arrow">↓${label ? ` <span>${label}</span>` : ''}</div>`;
const sum = (...parts: string[]) => `<p class="mock-sum">${parts.join(' ')}</p>`;
const heart = (n: number) => `<span class="mock-heart">♥︎ ${n}</span>`;

export const SLIDES: Slide[] = [
  {
    title: 'Into the Silver Seam',
    body: `Forty-four cards lie between you and daylight: <b>monsters</b>, <b>weapons</b> and <b>remedies</b>. You start with ${MAX_HEALTH} health. Get through every card alive to win.`,
    scene: (p) => `${p.health(MAX_HEALTH)}${row(p.card(mon(9)), p.card(wpn(5)), p.card(pot(6)))}`,
  },
  {
    title: 'Chambers',
    body: 'The mine is dealt <b>four cards at a time</b>. Each deal is a chamber. Tap a card to deal with it, in any order you like.',
    scene: (p) =>
      row(
        p.card(mon(6), { dealt: 0 }),
        p.card(wpn(4), { dealt: 1 }),
        p.card(pot(3), { dealt: 2 }),
        p.card(mon(11), { dealt: 3 }),
      ),
  },
  {
    title: 'Pressing deeper',
    body: 'Once you’ve handled <b>three</b> cards, the fourth stays put and three new cards join it.',
    scene: (p) => `
      ${row(
        p.card(mon(6), { muted: true, note: 'Done' }),
        p.card(wpn(4), { muted: true, note: 'Done' }),
        p.card(pot(3), { muted: true, note: 'Done' }),
        p.card(mon(11), { focus: true }),
      )}
      ${down()}
      ${row(
        p.card(mon(3), { dealt: 0 }),
        p.card(pot(8), { dealt: 1 }),
        p.card(mon(5), { dealt: 2 }),
        p.card(mon(11), { focus: true }),
      )}`,
  },
  {
    title: 'Sneaking past',
    body: 'Before you touch a chamber, you may <b>sneak past</b> it. Its cards go to the bottom of the mine, to face later. You can’t sneak past two chambers in a row.',
    scene: (p) => `
      ${row(p.card(mon(13)), p.card(mon(12)), p.card(mon(10)), p.card(pot(2)))}
      ${down('to the bottom of the mine')}
      <div class="mock-deck"></div>`,
  },
  {
    title: 'Monsters',
    body: 'Fight a monster <b>bare-handed</b> and it hurts you for its full number.',
    scene: (p) => `
      ${row(p.card(mon(7)))}
      ${sum(heart(20), '−', p.badge(mon(7)), '=', heart(13))}
      ${p.health(13)}`,
  },
  {
    title: 'Weapons',
    body: 'Fight <b>with a weapon</b> and its number is taken off the damage. Picking up a new weapon replaces the one you carry.',
    scene: (p) => `
      ${row(p.card(wpn(5)), '<span class="mock-vs">vs</span>', p.card(mon(7)))}
      ${sum(p.badge(mon(7)), '−', p.badge(wpn(5)), '=', '<b>2 damage</b>')}`,
  },
  {
    title: 'Weapons wear down',
    body: 'After a kill, a weapon only works on monsters <b>no stronger than its last kill</b>. This one last killed a 6, so it can’t touch the 8. Fight small fry bare-handed to keep your weapon sharp.',
    scene: (p) => `
      ${p.weapon({ card: wpn(5), slain: [mon(9), mon(6)] })}
      ${row(p.card(mon(4), { note: 'Can use' }), p.card(mon(8), { muted: true, note: 'Too worn' }))}`,
  },
  {
    title: 'Remedies',
    body: `Remedies heal by their number, up to ${MAX_HEALTH}. Only <b>one remedy per chamber</b> works. Any more are wasted.`,
    scene: (p) => `
      ${row(p.card(pot(5)), p.card(pot(7), { muted: true, note: 'Won’t heal' }))}
      ${sum(heart(12), '+', p.badge(pot(5)), '=', heart(17))}
      ${p.health(17)}`,
  },
  {
    title: 'Keeping score',
    body: 'Make it out and you score your remaining health. At full health, a remedy as the very last card adds its number. Fall, and you lose the strength of every monster you never faced.',
    scene: (p) => `
      <div class="mock-outcomes">
        <div class="mock-outcome mock-outcome--won">
          <span class="mock-outcome-label">Make it out</span>
          ${heart(14)}<span class="mock-outcome-sub">left</span>
          <span class="mock-score">Score <b>14</b></span>
        </div>
        <div class="mock-outcome mock-outcome--lost">
          <span class="mock-outcome-label">Fall</span>
          <span>${p.badge(mon(7))} ${p.badge(mon(12))}</span><span class="mock-outcome-sub">never faced</span>
          <span class="mock-score">Score <b>−19</b></span>
        </div>
      </div>`,
  },
  {
    title: 'Ready to descend',
    body: 'That’s all you need to know. Good luck down there.',
    scene: (p) => `
      <ul class="mock-recap">
        <li><span class="mock-recap-icon">4</span>Handle three cards per chamber; the fourth stays.</li>
        <li>${p.badge(mon(7))}Hurts you for its number.</li>
        <li>${p.badge(wpn(5))}Takes its number off the damage, but only on monsters no stronger than its last kill.</li>
        <li>${p.badge(pot(5))}Heals, once per chamber.</li>
      </ul>`,
  },
];
