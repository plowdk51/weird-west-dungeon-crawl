import {
  applyAction,
  avoidBlockedReason,
  canUseWeapon,
  damageFor,
  MAX_HEALTH,
  newGame,
  weaponLimit,
  type Action,
  type Card,
  type GameEvent,
  type GameState,
  type Slot,
} from '../engine';
import { cardArt, resolveArtKey } from '../art/resolveArt';
import { cardInfo, ROLE_LABEL } from '../content/catalog';
import { loadBest, loadSave, recordScore, saveGame } from '../storage';
import { describeEvent } from './messages';
import { HOW_TO_PLAY } from './howToPlay';

type Overlay = { kind: 'combat'; slot: Slot } | { kind: 'help' } | { kind: 'menu' } | null;

const SLOTS: Slot[] = [0, 1, 2, 3];
const ICON = { monster: '☠︎', weapon: '⚔︎', potion: '✚︎' } as const;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export class App {
  private state: GameState | null = null;
  private overlay: Overlay = null;
  private log = '';
  private newBest = false;

  constructor(private root: HTMLElement) {
    const bg = resolveArtKey(['ui.background']);
    if (bg) document.documentElement.style.setProperty('--bg-image', `url("${bg}")`);
    root.addEventListener('click', (e) => this.onClick(e));
    this.renderTitle();
  }

  // ------------------------------------------------------------ flow

  private start(state: GameState, log: string): void {
    this.state = state;
    this.overlay = null;
    this.log = log;
    this.newBest = false;
    saveGame(state);
    this.renderGame([]);
  }

  private dispatch(action: Action): void {
    if (!this.state) return;
    const { state, events } = applyAction(this.state, action);
    this.state = state;
    this.overlay = null;
    saveGame(state);
    const lines = events.map(describeEvent).filter(Boolean);
    if (lines.length) this.log = lines.join(' ');
    if (state.score !== null) this.newBest = recordScore(state.score);
    this.renderGame(events);
  }

  private onClick(e: Event): void {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
    if (!el || (el as HTMLButtonElement).disabled) return;
    const act = el.dataset.act!;
    const slot = Number(el.dataset.slot) as Slot;

    switch (act) {
      case 'new':
        this.start(
          newGame().state,
          'You descend into the Silver Seam mine. Something is breathing down there.',
        );
        break;
      case 'continue': {
        const saved = loadSave();
        if (saved) this.start(saved, 'You pick up where you left off.');
        break;
      }
      case 'title':
        this.state = null;
        this.renderTitle();
        break;
      case 'tile':
        this.onTile(slot);
        break;
      case 'weapon':
      case 'barehanded':
        this.dispatch({ type: 'playCard', slot, combat: act });
        break;
      case 'confirm':
        this.dispatch({ type: 'playCard', slot });
        break;
      case 'avoid':
        this.dispatch({ type: 'avoidRoom' });
        break;
      case 'help':
      case 'menu':
        this.overlay = { kind: act };
        this.refresh();
        break;
      case 'close':
        this.overlay = null;
        this.refresh();
        break;
    }
  }

  private onTile(slot: Slot): void {
    const s = this.state!;
    const card = s.room[slot];
    if (!card || s.status !== 'playing') return;
    // Monsters get a choice sheet when there is a choice to make or the hit would be fatal.
    if (card.role === 'monster' && (s.weapon || card.value >= s.health)) {
      this.overlay = { kind: 'combat', slot };
      this.refresh();
      return;
    }
    this.dispatch({ type: 'playCard', slot });
  }

  private refresh(): void {
    if (this.state) this.renderGame([]);
    else this.renderTitle();
  }

  // ------------------------------------------------------------ screens

  private renderTitle(): void {
    const canContinue = loadSave() !== null;
    const best = loadBest();
    this.root.innerHTML = `
      <div class="screen title-screen">
        <div class="title-block">
          <p class="eyebrow">A frontier descent</p>
          <h1>Weird West<br><span>Dungeon Crawl</span></h1>
          <p class="tagline">Forty-four horrors, tools and tonics lie between you and daylight.</p>
        </div>
        <div class="title-actions">
          ${canContinue ? `<button class="btn btn--primary" data-act="continue">Continue run</button>` : ''}
          <button class="btn ${canContinue ? '' : 'btn--primary'}" data-act="new">${canContinue ? 'New run' : 'Descend'}</button>
          <button class="btn btn--ghost" data-act="help">How to play</button>
          ${best !== null ? `<p class="best">Best score: <b>${best}</b></p>` : ''}
        </div>
        ${this.overlay?.kind === 'help' ? this.helpSheet() : ''}
      </div>`;
  }

  private renderGame(events: GameEvent[]): void {
    const s = this.state!;
    const dealt = new Set(events.flatMap((e) => (e.type === 'roomDealt' ? e.slots : [])));
    const avoidReason = avoidBlockedReason(s);
    const damage = events.reduce((n, e) => n + (e.type === 'monsterSlain' ? e.damage : 0), 0);
    const healed = events.reduce((n, e) => n + (e.type === 'healed' ? e.amount : 0), 0);

    this.root.innerHTML = `
      <div class="screen game-screen">
        ${this.hud(s)}
        <main class="room" aria-label="Chamber ${s.roomNumber}">
          ${SLOTS.map((slot) => this.tile(s, slot, dealt.has(slot))).join('')}
        </main>
        <p class="log" aria-live="polite">${esc(this.log)}</p>
        ${this.weaponPanel(s)}
        <footer class="actions">
          <button class="btn btn--avoid" data-act="avoid" ${avoidReason ? 'disabled' : ''}>
            Sneak past this chamber
            <small>${avoidReason ? esc(avoidReason) : 'Its cards go to the bottom of the mine'}</small>
          </button>
        </footer>
        ${this.overlayHtml(s)}
      </div>`;

    if (damage > 0) this.floatText(`−${damage}`, 'float--hurt');
    if (healed > 0) this.floatText(`+${healed}`, 'float--heal');
  }

  // ------------------------------------------------------------ pieces

  private hud(s: GameState): string {
    const pct = (s.health / MAX_HEALTH) * 100;
    const tone = pct > 50 ? 'ok' : pct > 25 ? 'warn' : 'bad';
    return `
      <header class="hud">
        <div class="health health--${tone}" role="meter" aria-label="Health"
             aria-valuemin="0" aria-valuemax="${MAX_HEALTH}" aria-valuenow="${s.health}">
          <span class="health-icon" aria-hidden="true">♥︎</span>
          <div class="health-bar"><div class="health-fill" style="width:${pct}%"></div></div>
          <span class="health-num">${s.health}<small>/${MAX_HEALTH}</small></span>
        </div>
        <div class="hud-meta">
          <span>Chamber ${s.roomNumber}</span>
          <span>${s.dungeon.length} left below</span>
          <button class="icon-btn" data-act="menu" aria-label="Menu">☰</button>
        </div>
      </header>`;
  }

  private tile(s: GameState, slot: Slot, dealt: boolean): string {
    const card = s.room[slot];
    if (!card) return `<div class="tile tile--empty" aria-hidden="true"></div>`;
    const info = cardInfo(card);
    const wasted = card.role === 'potion' && s.potionUsedThisRoom;
    const note = wasted ? `<span class="tile-note">Won't heal</span>` : '';
    return `
      <button class="tile tile--${card.role} ${dealt ? 'tile--dealt' : ''} ${wasted ? 'tile--muted' : ''}"
              style="--deal-delay:${slot * 70}ms" data-act="tile" data-slot="${slot}"
              aria-label="${esc(`${info.name}, ${ROLE_LABEL[card.role]} ${card.value}`)}">
        ${this.art(card)}
        <span class="badge badge--${card.role}">${ICON[card.role]} ${card.value}</span>
        <span class="tile-name">${esc(info.name)}</span>
        ${note}
      </button>`;
  }

  private art(card: Card): string {
    const url = cardArt(card);
    return url
      ? `<img class="art" src="${url}" alt="" draggable="false">`
      : `<span class="art"></span>`;
  }

  private weaponPanel(s: GameState): string {
    const w = s.weapon;
    if (!w) {
      return `<section class="weapon weapon--none"><span class="weapon-label">Bare hands</span>
        <span class="weapon-hint">Pick up a weapon to soften the blows.</span></section>`;
    }
    const limit = weaponLimit(w);
    const slain = w.slain.length
      ? w.slain
          .map((c) => `<span class="chip">${c.value}</span>`)
          .join('<span class="arrow">›</span>')
      : '<span class="weapon-hint">Unbloodied</span>';
    return `
      <section class="weapon">
        <div class="weapon-art">${this.art(w.card)}</div>
        <div class="weapon-body">
          <div class="weapon-title"><b>${esc(cardInfo(w.card).name)}</b>
            <span class="badge badge--weapon">${ICON.weapon} ${w.card.value}</span></div>
          <div class="weapon-slain">${slain}</div>
          <div class="weapon-limit">${limit === null ? 'Works on any foe' : `Works on foes ≤ ${limit}`}</div>
        </div>
      </section>`;
  }

  private overlayHtml(s: GameState): string {
    if (s.status !== 'playing') return this.endSheet(s);
    if (!this.overlay) return '';
    if (this.overlay.kind === 'help') return this.helpSheet();
    if (this.overlay.kind === 'menu') return this.menuSheet();
    return this.combatSheet(s, this.overlay.slot);
  }

  private combatSheet(s: GameState, slot: Slot): string {
    const card = s.room[slot]!;
    const info = cardInfo(card);
    const bare = damageFor(card, 'barehanded', s.weapon);
    const fatal = (dmg: number) => (dmg >= s.health ? ' <em>— fatal</em>' : '');
    let weaponBtn = '';
    if (s.weapon) {
      const name = esc(cardInfo(s.weapon.card).name);
      if (canUseWeapon(s.weapon, card)) {
        const dmg = damageFor(card, 'weapon', s.weapon);
        weaponBtn = `<button class="btn btn--primary" data-act="weapon" data-slot="${slot}">
          Use ${name}<small>Take ${dmg} damage${fatal(dmg)}</small></button>`;
      } else {
        weaponBtn = `<button class="btn" disabled>${name}<small>Too worn — only works on foes ≤ ${weaponLimit(s.weapon)}</small></button>`;
      }
    }
    return `
      <div class="scrim" data-act="close"></div>
      <div class="sheet" role="dialog" aria-label="Fight ${esc(info.name)}">
        <div class="sheet-head">
          <div class="sheet-art">${this.art(card)}</div>
          <div><h2>${esc(info.name)}</h2><p class="flavor">${esc(info.flavor)}</p>
            <span class="badge badge--monster">${ICON.monster} ${card.value}</span></div>
        </div>
        <div class="sheet-actions">
          ${weaponBtn}
          <button class="btn ${s.weapon ? '' : 'btn--danger'}" data-act="barehanded" data-slot="${slot}">
            Fight bare-handed<small>Take ${bare} damage${fatal(bare)}</small></button>
          <button class="btn btn--ghost" data-act="close">Back off</button>
        </div>
      </div>`;
  }

  private menuSheet(): string {
    return `
      <div class="scrim" data-act="close"></div>
      <div class="sheet" role="dialog" aria-label="Menu">
        <div class="sheet-actions">
          <button class="btn" data-act="help">How to play</button>
          <button class="btn" data-act="new">Abandon run &amp; start over</button>
          <button class="btn" data-act="title">Title screen</button>
          <button class="btn btn--ghost" data-act="close">Back to the mine</button>
        </div>
      </div>`;
  }

  private helpSheet(): string {
    return `
      <div class="scrim" data-act="close"></div>
      <div class="sheet sheet--tall" role="dialog" aria-label="How to play">
        <h2>How to play</h2>
        <div class="help">${HOW_TO_PLAY}</div>
        <div class="sheet-actions"><button class="btn btn--primary" data-act="close">Got it</button></div>
      </div>`;
  }

  private endSheet(s: GameState): string {
    const won = s.status === 'won';
    const slain = [...s.discard, ...(s.weapon?.slain ?? [])].filter(
      (c) => c.role === 'monster',
    ).length;
    const best = loadBest();
    return `
      <div class="scrim"></div>
      <div class="sheet sheet--end ${won ? 'sheet--won' : 'sheet--lost'}" role="dialog" aria-label="Run over">
        <h2>${won ? 'Daylight at last' : 'Buried in the Seam'}</h2>
        <p class="flavor">${won ? 'You claw your way out of the mine, alive and rich with stories.' : 'The mine keeps another prospector.'}</p>
        <div class="score"><span>Score</span><b>${s.score}</b>${this.newBest ? '<em>New best!</em>' : ''}</div>
        <ul class="stats">
          <li><b>${s.roomNumber}</b> chambers</li>
          <li><b>${slain}</b> monsters slain</li>
          <li><b>${best ?? s.score}</b> best</li>
        </ul>
        <div class="sheet-actions">
          <button class="btn btn--primary" data-act="new">Ride again</button>
          <button class="btn btn--ghost" data-act="title">Title screen</button>
        </div>
      </div>`;
  }

  private floatText(text: string, cls: string): void {
    const hud = this.root.querySelector('.health');
    if (!hud) return;
    hud.classList.add(cls === 'float--hurt' ? 'health--hit' : 'health--healed');
    const el = document.createElement('span');
    el.className = `float ${cls}`;
    el.textContent = text;
    el.addEventListener('animationend', () => el.remove());
    hud.append(el);
  }
}
