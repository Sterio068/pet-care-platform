import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const articleDir = path.join(root, "src/content/articles");
const minContentUnits = 800;
const minHeadingCount = 4;
const approvedAdSlots = new Set(["article-mid", "article-bottom", "sidebar"]);
const checks = [];

function record(level, label, message = "") {
  checks.push({ level, label, message });
}

function pass(label) {
  record("PASS", label);
}

function warn(label, message) {
  record("WARN", label, message);
}

function fail(label, message) {
  record("FAIL", label, message);
}

async function exists(filePath) {
  try {
    await stat(path.join(root, filePath));
    return true;
  } catch {
    return false;
  }
}

function contentUnits(text) {
  const clean = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ");
  const han = clean.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = clean.match(/[A-Za-z0-9][A-Za-z0-9'_-]*/g)?.length ?? 0;
  return han + words;
}

function sourceCounts(sourceText) {
  const counts = new Map();
  const blockPattern = /"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\]/g;
  for (const match of sourceText.matchAll(blockPattern)) {
    counts.set(match[1], match[2].match(/url:\s*"https?:\/\//g)?.length ?? 0);
  }
  return counts;
}

function findAdSlots(sourceText) {
  return [...sourceText.matchAll(/<AdBanner\b[^>]*\bslot="([^"]+)"/g)].map(
    (match) => match[1],
  );
}

const files = (await readdir(articleDir))
  .filter((file) => file.endsWith(".mdx"))
  .sort();
const articleSlugs = files.map((file) => file.replace(/\.mdx$/, ""));
const articlesText = await readFile(path.join(root, "src/lib/articles.ts"), "utf8");
const sourcesText = await readFile(path.join(root, "src/lib/article-sources.ts"), "utf8");
const topicText = await readFile(path.join(root, "src/lib/topic-clusters.ts"), "utf8");
const analyticsText = await readFile(
  path.join(root, "src/components/analytics/SiteAnalytics.tsx"),
  "utf8",
);
const toolTrackerText = await readFile(
  path.join(root, "src/components/tools/ToolInteractionTracker.tsx"),
  "utf8",
);
const articleMetadataSection = articlesText.slice(
  0,
  articlesText.indexOf("export const CATEGORY_LABELS"),
);
const articleMetadataSlugs = [
  ...articleMetadataSection.matchAll(/slug:\s*"([a-z0-9-]+)"/g),
].map((match) => match[1]);
const sourceBySlug = sourceCounts(sourcesText);

const missingMetadata = articleSlugs.filter((slug) => !articleMetadataSlugs.includes(slug));
const missingMdx = articleMetadataSlugs.filter((slug) => !articleSlugs.includes(slug));
if (missingMetadata.length === 0 && missingMdx.length === 0) {
  pass("All MDX articles are registered in src/lib/articles.ts");
} else {
  if (missingMetadata.length > 0) {
    fail("Article metadata coverage", `Missing metadata: ${missingMetadata.join(", ")}`);
  }
  if (missingMdx.length > 0) {
    fail("Article MDX coverage", `Missing MDX files: ${missingMdx.join(", ")}`);
  }
}

const thinArticles = [];
const lowHeadingArticles = [];
const missingSources = [];
const lowInternalLinks = [];

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const text = await readFile(path.join(articleDir, file), "utf8");
  const units = contentUnits(text);
  const headingCount = text.match(/^#{2,3}\s+/gm)?.length ?? 0;
  const internalLinks = text.match(/\]\(\/(?:articles|tools|breeds)\//g)?.length ?? 0;
  const sourceCount = sourceBySlug.get(slug) ?? 0;

  if (units < minContentUnits) thinArticles.push(`${slug} (${units})`);
  if (headingCount < minHeadingCount) lowHeadingArticles.push(`${slug} (${headingCount})`);
  if (sourceCount < 1) missingSources.push(slug);
  if (internalLinks < 1) lowInternalLinks.push(slug);
}

if (thinArticles.length === 0) {
  pass(`All articles meet the ${minContentUnits} content-unit floor`);
} else {
  fail("Thin article content", thinArticles.join(", "));
}

if (lowHeadingArticles.length === 0) {
  pass(`All articles have at least ${minHeadingCount} useful sections`);
} else {
  fail("Article section depth", lowHeadingArticles.join(", "));
}

if (missingSources.length === 0) {
  pass("All articles have at least one source entry");
} else {
  fail("Article source coverage", missingSources.join(", "));
}

if (lowInternalLinks.length === 0) {
  pass("All articles include at least one contextual internal link");
} else {
  warn("Internal linking opportunities", lowInternalLinks.join(", "));
}

const sourceUrls = [...sourcesText.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
const invalidUrls = sourceUrls.filter((url) => {
  try {
    const parsed = new URL(url);
    return !["http:", "https:"].includes(parsed.protocol);
  } catch {
    return true;
  }
});
if (invalidUrls.length === 0) {
  pass("All source URLs are valid HTTP(S) URLs");
} else {
  fail("Invalid source URLs", invalidUrls.join(", "));
}

const criticalFiles = [
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/editorial-policy/page.tsx",
  "src/app/sources/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/ads.txt/route.ts",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
];
const missingCritical = [];
for (const filePath of criticalFiles) {
  if (!(await exists(filePath))) missingCritical.push(filePath);
}
if (missingCritical.length === 0) {
  pass("Core review and policy pages exist");
} else {
  fail("Missing core review files", missingCritical.join(", "));
}

const sourceFiles = [
  ...(await readdir(path.join(root, "src/app"), { recursive: true })),
  ...(await readdir(path.join(root, "src/components"), { recursive: true })).map((file) =>
    path.join("..", "components", file),
  ),
].filter((file) => /\.(tsx|ts)$/.test(file));
const adSlotViolations = [];
const clickInducement = [];
for (const relativeFile of sourceFiles) {
  const filePath = relativeFile.startsWith("..")
    ? path.join(root, "src/app", relativeFile)
    : path.join(root, "src/app", relativeFile);
  const text = await readFile(filePath, "utf8");
  for (const slot of findAdSlots(text)) {
    if (!approvedAdSlots.has(slot)) {
      adSlotViolations.push(`${path.relative(root, filePath)}:${slot}`);
    }
  }
  if (
    /請.{0,8}(點擊|點).{0,8}廣告|幫忙.{0,8}(點擊|點).{0,8}廣告|支持.{0,8}(點擊|點).{0,8}廣告|點擊.{0,8}廣告.{0,8}(支持|幫助|贊助)/.test(
      text,
    )
  ) {
    clickInducement.push(path.relative(root, filePath));
  }
}
if (adSlotViolations.length === 0) {
  pass("AdBanner usage is limited to approved conservative slots");
} else {
  fail("Unapproved ad slots", adSlotViolations.join(", "));
}
if (clickInducement.length === 0) {
  pass("No ad click inducement copy found in app/components");
} else {
  fail("Potential ad click inducement copy", clickInducement.join(", "));
}

const clusterCount = topicText.match(/hubTitle:/g)?.length ?? 0;
if (clusterCount >= 8 && topicText.includes("toolLinks")) {
  pass(`Topic cluster configuration is present (${clusterCount} clusters)`);
} else {
  fail("Topic cluster depth", "Expected at least 8 clusters with tool links");
}

if (
  analyticsText.includes("article_view") &&
  analyticsText.includes("topic_cluster_click") &&
  toolTrackerText.includes("tool_start") &&
  toolTrackerText.includes("tool_result_view")
) {
  pass("GA4 taxonomy covers content views, topic clicks, and tool engagement");
} else {
  fail("GA4 event taxonomy", "Missing one or more required content/tool events");
}

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}
