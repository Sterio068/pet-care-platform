import { readFile } from "node:fs/promises";
import ts from "typescript";

const MIN_TITLE_UNITS = 10;
const MAX_TITLE_UNITS = 42;
const MIN_DESCRIPTION_UNITS = 32;
const MAX_DESCRIPTION_UNITS = 95;
const MIN_KEYWORDS = 3;
const MAX_KEYWORDS = 8;
const answerSignals = [
  "整理",
  "解析",
  "判斷",
  "清單",
  "步驟",
  "比較",
  "指南",
  "時程",
  "警訊",
  "原因",
  "方法",
  "重點",
  "教學",
  "評估",
  "觀察",
  "計畫",
];

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

function units(text) {
  const han = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = text.match(/[A-Za-z0-9][A-Za-z0-9'_-]*/g)?.length ?? 0;
  return han + words;
}

function getPropertyValue(sourceFile, objectNode, propertyName) {
  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name =
      ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : undefined;
    if (name !== propertyName) continue;

    const initializer = property.initializer;
    if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
      return initializer.text;
    }
    if (ts.isArrayLiteralExpression(initializer)) {
      return initializer.elements
        .map((element) => (ts.isStringLiteral(element) ? element.text : undefined))
        .filter(Boolean);
    }

    return initializer.getText(sourceFile);
  }

  return undefined;
}

function getArticles(sourceText) {
  const sourceFile = ts.createSourceFile(
    "articles.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const articles = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(sourceFile) === "ARTICLES" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        articles.push({
          slug: getPropertyValue(sourceFile, element, "slug"),
          title: getPropertyValue(sourceFile, element, "title"),
          description: getPropertyValue(sourceFile, element, "description"),
          keywords: getPropertyValue(sourceFile, element, "keywords") ?? [],
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return articles;
}

function duplicates(values) {
  const seen = new Set();
  const duplicated = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicated.add(value);
    seen.add(value);
  }
  return [...duplicated];
}

const articleSource = await readFile("src/lib/articles.ts", "utf8");
const articles = getArticles(articleSource);

if (articles.length > 0) {
  pass(`Parsed ${articles.length} article snippets`);
} else {
  fail("Article snippet parsing", "No articles found in src/lib/articles.ts");
}

const badTitleLengths = [];
const badDescriptionLengths = [];
const badKeywordCounts = [];
const weakDescriptions = [];
const titlesWithSiteName = [];
const adInducement = [];
const badSlugs = [];

for (const article of articles) {
  const titleUnits = units(article.title ?? "");
  const descriptionUnits = units(article.description ?? "");
  const keywordCount = Array.isArray(article.keywords) ? article.keywords.length : 0;

  if (titleUnits < MIN_TITLE_UNITS || titleUnits > MAX_TITLE_UNITS) {
    badTitleLengths.push(`${article.slug} (${titleUnits})`);
  }
  if (
    descriptionUnits < MIN_DESCRIPTION_UNITS ||
    descriptionUnits > MAX_DESCRIPTION_UNITS
  ) {
    badDescriptionLengths.push(`${article.slug} (${descriptionUnits})`);
  }
  if (keywordCount < MIN_KEYWORDS || keywordCount > MAX_KEYWORDS) {
    badKeywordCounts.push(`${article.slug} (${keywordCount})`);
  }
  if (!answerSignals.some((signal) => article.description?.includes(signal))) {
    weakDescriptions.push(article.slug);
  }
  if (article.title?.includes("毛孩照護站")) {
    titlesWithSiteName.push(article.slug);
  }
  if (
    /請.{0,8}(點擊|點).{0,8}廣告|幫忙.{0,8}(點擊|點).{0,8}廣告|支持.{0,8}(點擊|點).{0,8}廣告|點擊.{0,8}廣告.{0,8}(支持|幫助|贊助)/.test(
      `${article.title} ${article.description}`,
    )
  ) {
    adInducement.push(article.slug);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug ?? "")) {
    badSlugs.push(article.slug ?? "(missing)");
  }
}

if (badTitleLengths.length === 0) {
  pass(`Article titles fit ${MIN_TITLE_UNITS}-${MAX_TITLE_UNITS} content units`);
} else {
  fail("Article title length", badTitleLengths.join(", "));
}

if (badDescriptionLengths.length === 0) {
  pass(
    `Article descriptions fit ${MIN_DESCRIPTION_UNITS}-${MAX_DESCRIPTION_UNITS} content units`,
  );
} else {
  fail("Article description length", badDescriptionLengths.join(", "));
}

const duplicatedTitles = duplicates(articles.map((article) => article.title));
const duplicatedDescriptions = duplicates(
  articles.map((article) => article.description),
);
if (duplicatedTitles.length === 0 && duplicatedDescriptions.length === 0) {
  pass("Article titles and descriptions are unique");
} else {
  if (duplicatedTitles.length > 0) {
    fail("Duplicate article titles", duplicatedTitles.join(", "));
  }
  if (duplicatedDescriptions.length > 0) {
    fail("Duplicate article descriptions", duplicatedDescriptions.join(", "));
  }
}

if (badKeywordCounts.length === 0) {
  pass(`Article keyword counts fit ${MIN_KEYWORDS}-${MAX_KEYWORDS}`);
} else {
  fail("Article keyword count", badKeywordCounts.join(", "));
}

if (weakDescriptions.length === 0) {
  pass("Article descriptions include intent or answer signals");
} else {
  fail("Weak article descriptions", weakDescriptions.join(", "));
}

if (titlesWithSiteName.length === 0) {
  pass("Article titles do not duplicate the site name");
} else {
  fail("Article title site-name duplication", titlesWithSiteName.join(", "));
}

if (adInducement.length === 0) {
  pass("Article snippets contain no ad click inducement");
} else {
  fail("Ad click inducement in snippets", adInducement.join(", "));
}

if (badSlugs.length === 0) {
  pass("Article slugs are lowercase, hyphenated, and crawlable");
} else {
  fail("Article slug format", badSlugs.join(", "));
}

for (const check of checks) {
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${check.level} ${check.label}${detail}`);
}

if (checks.some((check) => check.level === "FAIL")) {
  process.exitCode = 1;
}
