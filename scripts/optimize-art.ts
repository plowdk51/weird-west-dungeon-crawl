/**
 * Turns full-size art masters in art-src/ (not committed) into small WebP files in
 * public/art/ (committed), keeping the same subfolders and names.
 *
 *   art-src/monsters/jackalope-biter.png  →  public/art/monsters/jackalope-biter.webp
 *
 * Card art is fitted into 512×512 with a transparent background. Anything under
 * art-src/ui/ (backgrounds) keeps its shape and is capped at 1290×2800.
 *
 * art-src/icon.png (or .jpg/.webp) is the app icon master: it becomes the favicon, iPhone
 * home-screen icon and Android app icons in public/icons/. Until it exists, the icons come
 * from scripts/placeholder-icon.svg.
 *
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
const iconDir = join(root, 'public/icons');
const force = process.argv.includes('--force');
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

/** Fills transparent areas of the icon (iOS shows them as black). */
const ICON_BG = '#1c120c';

/** Every icon the web app manifest and index.html refer to. */
const ICONS: { file: string; size: number; maskable?: boolean }[] = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  // Android crops icons into circles and other shapes; keep the art inside the middle 80%.
  { file: 'maskable-512.png', size: 512, maskable: true },
];

const isIconMaster = (path: string) =>
  dirname(path) === srcDir && /^icon\.(png|jpe?g|webp)$/i.test(path.split(/[\\/]/).pop()!);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return IMAGE_EXT.has(extname(name).toLowerCase()) && !isIconMaster(path) ? [path] : [];
  });
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
const slash = (path: string) => path.replace(/\\/g, '/');

async function makeIcons(): Promise<void> {
  const master = ['png', 'jpg', 'jpeg', 'webp']
    .map((ext) => join(srcDir, `icon.${ext}`))
    .find((path) => existsSync(path));
  const src = master ?? join(root, 'scripts/placeholder-icon.svg');
  const outputs = ICONS.map((icon) => join(iconDir, icon.file));
  const fresh = outputs.every(
    (out) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs,
  );
  if (!force && fresh) return;

  mkdirSync(iconDir, { recursive: true });
  for (const icon of ICONS) {
    const inner = icon.maskable ? Math.round(icon.size * 0.8) : icon.size;
    const pad = (icon.size - inner) / 2;
    const art = await sharp(src, { density: 300 })
      .resize(inner, inner, { fit: 'contain', background: ICON_BG })
      .flatten({ background: ICON_BG })
      .png()
      .toBuffer();
    await sharp(art)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: ICON_BG })
      // A 256-colour palette shrinks painterly icons about 70% with no visible change.
      .png({ palette: true, quality: 100, effort: 10, dither: 1, compressionLevel: 9 })
      .toFile(join(iconDir, icon.file));
  }
  const from = master ? slash(relative(root, master)) : 'placeholder icon';
  console.log(`App icons (${from}) → public/icons/: ${ICONS.map((i) => i.file).join(', ')}`);
}

async function main() {
  await makeIcons();
  if (!existsSync(srcDir)) {
    console.log(
      'No art-src/ folder yet. Save full-size images there, e.g. art-src/monsters/name.png',
    );
    return;
  }
  let made = 0;
  let skipped = 0;
  for (const src of walk(srcDir)) {
    const rel = slash(relative(srcDir, src));
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
      `${rel} (${kb(statSync(src).size)}) → public/art/${slash(relative(outDir, out))} ` +
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
