// Self-host breed cover images.
//
// Reads the live Unsplash coverUrl for every breed in src/data/breeds.ts,
// downloads each one, and re-encodes it as multi-size WebP into
// public/images/breeds/<slug>.webp (800w) + <slug>-400w.webp (400w) using
// sharp (already present transitively via Next).
//
// Attribution (Unsplash photo id + source URL) is preserved in
// src/data/breed-images.json so the breed pages can show a credit line and we
// keep an audit trail of which source each local asset came from.
//
// Failures never produce broken images: a breed whose download/encode fails is
// listed in the report and keeps `local: false`, so the UI falls back to the
// remote Unsplash URL for that breed only.
//
// Usage: node scripts/fetch-breed-images.mjs

import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BREEDS_FILE = path.join(root, "src/data/breeds.ts");
const MANIFEST_FILE = path.join(root, "src/data/breed-images.json");
const OUT_DIR = path.join(root, "public/images/breeds");

const SIZES = [
  { suffix: "", width: 800 },
  { suffix: "-400w", width: 400 },
];
const WEBP_QUALITY = 78;
const FETCH_TIMEOUT_MS = 20000;

/** Parse breed slug + coverUrl pairs straight from the data file. */
async function parseBreeds() {
  const src = await readFile(BREEDS_FILE, "utf8");
  const blocks = src.split(/\n {2}\{\n/).slice(1);
  const breeds = [];
  for (const block of blocks) {
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    const coverMatch = block.match(/coverUrl:\s*"([^"]+)"/);
    breeds.push({
      slug: slugMatch[1],
      coverUrl: coverMatch ? coverMatch[1] : null,
    });
  }
  return breeds;
}

/** Best-effort Unsplash photo id from the hotlinked image URL. */
function unsplashPhotoId(url) {
  const m = url.match(/photo-([a-z0-9]+)/i);
  return m ? `photo-${m[1]}` : null;
}

async function downloadBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arr = await res.arrayBuffer();
    return Buffer.from(arr);
  } finally {
    clearTimeout(timer);
  }
}

async function encodeAll(buffer, slug) {
  for (const { suffix, width } of SIZES) {
    const out = path.join(OUT_DIR, `${slug}${suffix}.webp`);
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(out);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const breeds = await parseBreeds();

  const manifest = {};
  const succeeded = [];
  const failed = [];

  for (const { slug, coverUrl } of breeds) {
    if (!coverUrl) {
      failed.push({ slug, reason: "no coverUrl in data" });
      manifest[slug] = { local: false, source: null, photoId: null };
      continue;
    }
    const photoId = unsplashPhotoId(coverUrl);
    try {
      const buffer = await downloadBuffer(coverUrl);
      await encodeAll(buffer, slug);
      manifest[slug] = {
        local: true,
        source: coverUrl,
        photoId,
        // Unsplash hotlink URLs do not embed the photographer name; record the
        // canonical Unsplash photo page so a human-readable credit can resolve.
        sourcePage: photoId ? `https://unsplash.com/photos/${photoId.replace(/^photo-/, "")}` : null,
        credit: "Photo via Unsplash",
        width: 800,
        height: 600,
      };
      succeeded.push(slug);
      console.log(`OK    ${slug}`);
    } catch (err) {
      manifest[slug] = { local: false, source: coverUrl, photoId };
      failed.push({ slug, reason: String(err.message || err) });
      console.error(`FAIL  ${slug}: ${err.message || err}`);
    }
  }

  // Stable key order for clean diffs.
  const sortedManifest = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((k) => [k, manifest[k]]),
  );
  await writeFile(MANIFEST_FILE, JSON.stringify(sortedManifest, null, 2) + "\n");

  console.log("\n=== breed image fetch report ===");
  console.log(`total:     ${breeds.length}`);
  console.log(`succeeded: ${succeeded.length}`);
  console.log(`failed:    ${failed.length}`);
  if (failed.length) {
    console.log("\nfailed breeds (kept remote Unsplash fallback):");
    for (const f of failed) console.log(`  - ${f.slug}: ${f.reason}`);
  }
  console.log(`\nmanifest written: ${path.relative(root, MANIFEST_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
