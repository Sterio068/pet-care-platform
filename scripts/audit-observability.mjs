import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const checks = [];

function record(level, label, message = "") {
  checks.push({ level, label, message });
}

function pass(label) {
  record("PASS", label);
}

function fail(label, message) {
  record("FAIL", label, message);
}

async function exists(relativePath) {
  try {
    await stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function expectIncludes(text, required, label) {
  const missing = required.filter((item) => !text.includes(item));
  if (missing.length === 0) {
    pass(label);
  } else {
    fail(label, `Missing: ${missing.join(", ")}`);
  }
}

const packageJson = JSON.parse(await read("package.json"));
const scripts = packageJson.scripts ?? {};
const layout = await read("src/app/layout.tsx");
const siteAnalytics = await read("src/components/analytics/SiteAnalytics.tsx");
const toolTracker = await read("src/components/tools/ToolInteractionTracker.tsx");
const analyticsLib = await read("src/lib/analytics.ts");
const adsLib = await read("src/lib/ads.ts");
const envExample = await read(".env.local.example");
const vercelIgnore = await read(".vercelignore");
const playbook = await read("DEVELOPMENT-PLAYBOOK.md");
const publicFiles = await readdir(path.join(root, "public"));

const requiredScripts = [
  "content:audit",
  "snippet:audit",
  "schema:audit",
  "observability:audit",
  "review:check",
  "test",
];
const missingScripts = requiredScripts.filter((script) => !scripts[script]);
if (missingScripts.length === 0) {
  pass("Package exposes review and observability scripts");
} else {
  fail("Package script coverage", `Missing: ${missingScripts.join(", ")}`);
}

expectIncludes(
  scripts.test ?? "",
  ["content:audit", "snippet:audit", "schema:audit", "observability:audit"],
  "npm test includes all local quality gates",
);

expectIncludes(
  envExample,
  [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_GA_ID",
    "NEXT_PUBLIC_ANALYTICS_DEBUG=false",
    "NEXT_PUBLIC_ADS_ENABLED=false",
    "NEXT_PUBLIC_ADSENSE_ID",
  ],
  ".env.local.example documents analytics and AdSense gates",
);

expectIncludes(
  vercelIgnore,
  [".env", ".env.*", "!.env.local.example"],
  ".vercelignore excludes real env files from CLI deployments",
);

expectIncludes(
  layout,
  [
    "NEXT_PUBLIC_GA_ID",
    "googletagmanager.com/gtag/js",
    "gtag('config'",
    "<SiteAnalytics />",
    "verification",
    "google-adsense-account",
  ],
  "Root layout wires GA4, SiteAnalytics, GSC, and AdSense account metadata",
);

expectIncludes(
  siteAnalytics,
  [
    "article_view",
    "tool_view",
    "topic_cluster_view",
    "article_category_view",
    "breed_view",
    "content_view",
    "search",
    "select_content",
    "topic_cluster_click",
    "outbound",
  ],
  "SiteAnalytics covers content, search, internal click, and outbound events",
);

expectIncludes(
  toolTracker,
  ["tool_start", "tool_result_view", "interaction_type", "tool_name"],
  "ToolInteractionTracker covers tool start and result-view events",
);

expectIncludes(
  analyticsLib,
  ["dataLayer", "gtag", "NEXT_PUBLIC_ANALYTICS_DEBUG", "cleanParams"],
  "Analytics helper supports GA4 and debug-safe dataLayer fallback",
);

expectIncludes(
  adsLib,
  ["APPROVED_AD_SLOTS", "article-mid", "article-bottom", "sidebar", "ADS_ENABLED"],
  "AdSense rendering is guarded by conservative slot allowlist",
);

const googleVerificationFiles = publicFiles.filter((file) =>
  /^google[a-z0-9]+\.html$/i.test(file),
);
if (googleVerificationFiles.length > 0 || layout.includes("verification")) {
  pass("Google Search Console verification signal exists");
} else {
  fail("Google Search Console verification", "No public google*.html or metadata verification found");
}

const requiredReviewFiles = [
  "scripts/verify-review-readiness.mjs",
  "scripts/audit-content-quality.mjs",
  "scripts/audit-search-snippets.mjs",
  "scripts/audit-structured-data.mjs",
  ".vercelignore",
  "src/app/ads.txt/route.ts",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/feed.xml/route.ts",
];
const missingReviewFiles = [];
for (const file of requiredReviewFiles) {
  if (!(await exists(file))) missingReviewFiles.push(file);
}
if (missingReviewFiles.length === 0) {
  pass("Review, crawl, and feed audit surfaces exist");
} else {
  fail("Review surface files", `Missing: ${missingReviewFiles.join(", ")}`);
}

expectIncludes(
  playbook,
  [
    "Phase 7",
    "observability:audit",
    "review:check",
    "content:audit",
    "snippet:audit",
    "schema:audit",
    "Google Search Console",
    "GA4",
    "AdSense",
  ],
  "Development playbook documents post-review monitoring workflow",
);

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}
