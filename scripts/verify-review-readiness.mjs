const DEFAULT_BASE_URL = "http://localhost:3000";
const baseUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE_URL)
  .replace(/\/$/, "");
const adsAreEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

const expectedAdsTxt =
  "google.com, pub-2306490072598524, DIRECT, f08c47fec0942fa0";

const checks = [];

function pass(label) {
  checks.push({ label, ok: true });
}

function fail(label, message) {
  checks.push({ label, ok: false, message });
}

async function fetchText(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    redirect: "follow",
    headers: { "User-Agent": "pet-care-platform-review-check/1.0" },
  });
  const text = await response.text();
  return { response, text };
}

async function expectWwwRedirectsToApex() {
  const url = new URL(baseUrl);
  const isIpv4Host = /^\d+\.\d+\.\d+\.\d+$/.test(url.hostname);
  if (url.hostname.startsWith("www.") || !url.hostname.includes(".") || isIpv4Host) {
    return;
  }

  const wwwUrl = `${url.protocol}//www.${url.hostname}/`;

  try {
    const response = await fetch(wwwUrl, {
      redirect: "manual",
      headers: { "User-Agent": "pet-care-platform-review-check/1.0" },
    });
    const location = response.headers.get("location") || "";

    if (
      [301, 308].includes(response.status) &&
      location.startsWith(`${url.protocol}//${url.hostname}/`)
    ) {
      pass(`www.${url.hostname} permanently redirects to ${url.hostname}`);
      return;
    }

    fail(
      `www.${url.hostname} redirect`,
      `Expected 301/308 to ${url.hostname}, got ${response.status} ${location}`,
    );
  } catch (error) {
    fail(
      `www.${url.hostname} redirect`,
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function expectOk(pathname) {
  try {
    const result = await fetchText(pathname);
    if (result.response.ok) {
      pass(`${pathname} responds ${result.response.status}`);
      return result.text;
    }

    fail(pathname, `Expected 2xx, got ${result.response.status}`);
  } catch (error) {
    fail(pathname, error instanceof Error ? error.message : String(error));
  }

  return "";
}

const adsTxt = await expectOk("/ads.txt");
if (adsTxt.trim() === expectedAdsTxt) {
  pass("/ads.txt contains the authorized Google seller line");
} else {
  fail("/ads.txt", "Authorized seller line is missing or different");
}

const robots = await expectOk("/robots.txt");
if (robots.includes("Sitemap:") && robots.includes("/sitemap.xml")) {
  pass("/robots.txt points crawlers to sitemap.xml");
} else {
  fail("/robots.txt", "Missing sitemap directive");
}

if (!/Disallow:\s*\/\s*$/m.test(robots)) {
  pass("/robots.txt does not block the full site");
} else {
  fail("/robots.txt", "Full-site disallow found");
}

const sitemap = await expectOk("/sitemap.xml");
if (
  sitemap.includes("<urlset") &&
  sitemap.includes("/articles/") &&
  sitemap.includes("/tools/") &&
  sitemap.includes("/articles/tag/")
) {
  pass("/sitemap.xml includes core articles, tools, and topic clusters");
} else {
  fail("/sitemap.xml", "Missing expected URL groups");
}

const home = await expectOk("/");
if (!adsAreEnabled && !home.includes("pagead2.googlesyndication.com")) {
  pass("AdSense script is absent while NEXT_PUBLIC_ADS_ENABLED is false");
} else if (adsAreEnabled && home.includes("pagead2.googlesyndication.com")) {
  pass("AdSense script is present because NEXT_PUBLIC_ADS_ENABLED is true");
} else {
  fail(
    "AdSense script gate",
    "AdSense script state does not match NEXT_PUBLIC_ADS_ENABLED",
  );
}

await expectWwwRedirectsToApex();

for (const pathname of [
  "/articles",
  "/tools",
  "/editorial-policy",
  "/sources",
  "/privacy",
]) {
  await expectOk(pathname);
}

for (const check of checks) {
  const mark = check.ok ? "PASS" : "FAIL";
  const detail = check.message ? ` - ${check.message}` : "";
  console.log(`${mark} ${check.label}${detail}`);
}

if (checks.some((check) => !check.ok)) {
  process.exitCode = 1;
}
