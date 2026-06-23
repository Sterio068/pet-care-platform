import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

// Enforces the portfolio site-kit contract: primitives marked "exact-shared"
// must stay byte-identical across travel-tools, taiwan-labor-tools, and
// pet-care-platform. If you intentionally change a shared primitive, update
// src/components/ui/site-kit.lock.json in ALL THREE repos together.
const root = process.cwd();
const uiDir = path.join(root, "src/components/ui");
const lock = JSON.parse(
  readFileSync(path.join(uiDir, "site-kit.lock.json"), "utf8"),
);

let failed = 0;
for (const [file, expected] of Object.entries(lock.sha256)) {
  let actual;
  try {
    actual = createHash("sha256")
      .update(readFileSync(path.join(uiDir, file)))
      .digest("hex");
  } catch {
    console.error(`FAIL  ${file}: file missing`);
    failed++;
    continue;
  }
  if (actual === expected) {
    console.log(`OK    ${file}`);
  } else {
    console.error(
      `FAIL  ${file}: drifted from the site-kit canonical copy — re-sync the shared primitive across all three sites and update site-kit.lock.json`,
    );
    failed++;
  }
}

if (failed > 0) {
  console.error(`\nsite-kit drift check: ${failed} primitive(s) out of sync`);
  process.exit(1);
}
console.log(`\nsite-kit drift check: ${Object.keys(lock.sha256).length} exact-shared primitives in sync`);
