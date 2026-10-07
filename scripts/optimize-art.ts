/**
 * Turns full-size art masters in art-src/ (not committed) into small WebP files in
 * public/art/ (committed), keeping the same subfolders and names.
 *
 *   art-src/monsters/jackalope-biter.png  →  public/art/monsters/jackalope-biter.webp
 *
 * Card art is fitted into 512×512 with a transparent background. Anything under
 * art-src/ui/ (backgrounds) keeps its shape and is capped at 1290×2800.
 * Unchanged images are skipped; pass --force to redo everything.
 *
 * Run: npm run art:optimize
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'art-src');
const outDir = join(root, 'public/art');
const force = process.argv.includes('--force');
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return IMAGE_EXT.has(extname(name).toLowerCase()) ? [path] : [];
  });
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  if (!existsSync(srcDir)) {
    console.log(
      'No art-src/ folder yet. Save full-size images there, e.g. art-src/monsters/name.png',
    );
    return;
  }
  let made = 0;
  let skipped = 0;
  for (const src of walk(srcDir)) {
    const rel = relative(srcDir, src).replace(/\\/g, '/');
    const out = join(outDir, rel.replace(/\.[^.]+$/, '.webp'));
    if (!force && existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) {
      skipped++;
      continue;
    }
    mkdirSync(dirname(out), { recursive: true });
    const isUi = rel.startsWith('ui/');
    const image = sharp(src).rotate();
    const resized = isUi
      ? image.resize(1290, 2800, { fit: 'inside', withoutEnlargement: true })
      : image.resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
    const info = await resized.webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(out);
    console.log(
      `${rel} (${kb(statSync(src).size)}) → public/art/${relative(outDir, out).replace(/\\/g, '/')} ` +
        `${info.width}×${info.height}, ${kb(info.size)}`,
    );
    made++;
  }
  console.log(`Done: ${made} optimized, ${skipped} unchanged.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
