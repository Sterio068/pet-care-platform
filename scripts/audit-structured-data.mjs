import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["src/app", "src/components", "src/lib"];
const allowedFaqPageFiles = new Set(["src/app/faq/page.tsx"]);
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

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function fileExists(relativePath) {
  try {
    await stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

const files = [];
for (const scanRoot of scanRoots) {
  files.push(...(await collectFiles(path.join(root, scanRoot))));
}

const schemaTypeUsage = new Map();
const deprecatedUsage = [];
const faqMisuse = [];

for (const file of files) {
  const relativePath = path.relative(root, file);
  const text = await readFile(file, "utf8");
  const typeMatches = [
    ...text.matchAll(/["@']@type["@']\s*:\s*["']([^"']+)["']/g),
  ];

  for (const match of typeMatches) {
    const schemaType = match[1];
    schemaTypeUsage.set(
      schemaType,
      (schemaTypeUsage.get(schemaType) ?? 0) + 1,
    );

    if (schemaType === "HowTo") {
      deprecatedUsage.push(`${relativePath}:HowTo`);
    }

    if (
      schemaType === "FAQPage" &&
      !allowedFaqPageFiles.has(relativePath)
    ) {
      faqMisuse.push(relativePath);
    }
  }
}

const requiredFiles = [
  "src/app/layout.tsx",
  "src/app/articles/[slug]/page.tsx",
  "src/app/articles/tag/[tag]/page.tsx",
  "src/app/faq/page.tsx",
  "src/components/seo/JsonLd.tsx",
  "src/lib/seo.ts",
];
const missingRequiredFiles = [];
for (const requiredFile of requiredFiles) {
  if (!(await fileExists(requiredFile))) missingRequiredFiles.push(requiredFile);
}
if (missingRequiredFiles.length === 0) {
  pass("Structured data source files exist");
} else {
  fail("Missing structured data source files", missingRequiredFiles.join(", "));
}

const requiredTypes = [
  "Organization",
  "WebSite",
  "Article",
  "BreadcrumbList",
  "CollectionPage",
  "WebApplication",
  "FAQPage",
];
const missingTypes = requiredTypes.filter((type) => !schemaTypeUsage.has(type));
if (missingTypes.length === 0) {
  pass("Core supported schema types are present");
} else {
  fail("Missing core schema types", missingTypes.join(", "));
}

if (deprecatedUsage.length === 0) {
  pass("No deprecated HowTo schema usage found");
} else {
  fail("Deprecated HowTo schema usage", deprecatedUsage.join(", "));
}

if (faqMisuse.length === 0) {
  pass("FAQPage schema is limited to the dedicated FAQ page");
} else {
  fail("FAQPage schema outside dedicated FAQ page", [...new Set(faqMisuse)].join(", "));
}

const articlePage = await readFile(
  path.join(root, "src/app/articles/[slug]/page.tsx"),
  "utf8",
);
const requiredArticleFields = [
  "headline",
  "description",
  "datePublished",
  "dateModified",
  "image",
  "author",
  "publisher",
  "citation",
  "mainEntityOfPage",
];
const missingArticleFields = requiredArticleFields.filter(
  (field) => !articlePage.includes(field),
);
if (missingArticleFields.length === 0) {
  pass("Article schema includes authority and freshness fields");
} else {
  fail("Article schema missing fields", missingArticleFields.join(", "));
}

const seoLib = await readFile(path.join(root, "src/lib/seo.ts"), "utf8");
if (
  seoLib.includes("SearchAction") &&
  seoLib.includes("WebSite") &&
  seoLib.includes("Organization")
) {
  pass("Sitewide Organization and WebSite schemas include search entity data");
} else {
  fail(
    "Sitewide schema completeness",
    "Expected Organization, WebSite, and SearchAction in src/lib/seo.ts",
  );
}

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}
