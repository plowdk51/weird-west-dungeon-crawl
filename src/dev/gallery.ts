// Dev-only page (/art-gallery.html): every card's resolved art, for checking new art drops.
import { buildDungeon } from '../engine';
import { artKeys, cardArt } from '../art/resolveArt';
import { cardInfo } from '../content/catalog';

const root = document.querySelector<HTMLDivElement>('#gallery')!;
document.body.style.cssText =
  'margin:0;padding:16px;background:#2a1c14;color:#f1e4c8;font-family:system-ui,sans-serif';
root.style.cssText =
  'display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px';

for (const card of buildDungeon()) {
  const fig = document.createElement('figure');
  fig.style.cssText = 'margin:0;padding:8px;background:#3d2a1e;border-radius:8px;text-align:center';
  const img = document.createElement('img');
  img.src = cardArt(card) ?? '';
  img.alt = cardInfo(card).name;
  img.style.cssText = 'width:100%;aspect-ratio:1;object-fit:contain';
  const cap = document.createElement('figcaption');
  cap.style.fontSize = '12px';
  cap.innerHTML = `<b>${cardInfo(card).name}</b> (${card.value})<br><code>${artKeys(card)[1]}</code>`;
  fig.append(img, cap);
  root.append(fig);
}
