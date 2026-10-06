import type { Card } from '../engine';
import { artManifest } from './manifest';

// Placeholder files are named like `monster-7.svg`; the key becomes `monster.7`.
const placeholderFiles = import.meta.glob<string>('./placeholders/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const placeholders: Record<string, string> = {};
for (const [path, url] of Object.entries(placeholderFiles)) {
  const name = path
    .split('/')
    .pop()!
    .replace(/\.svg$/, '');
  placeholders[name.replace(/-/g, '.')] = url;
}

/** Art keys for a card, most specific first. */
export function artKeys(card: Card): string[] {
  return [
    `${card.role}.${card.suit}.${card.value}`,
    `${card.role}.${card.value}`,
    `${card.role}.default`,
  ];
}

export function resolveArtKey(keys: string[]): string | null {
  for (const key of keys) {
    const custom = artManifest[key];
    if (custom) return import.meta.env.BASE_URL + custom.replace(/^\//, '');
    if (placeholders[key]) return placeholders[key];
  }
  return null;
}

export function cardArt(card: Card): string | null {
  return resolveArtKey(artKeys(card));
}
