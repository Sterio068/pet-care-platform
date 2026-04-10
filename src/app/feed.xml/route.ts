import { getAllArticles } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export async function GET() {
  const articles = getAllArticles();
  const latestDate = articles[0]?.publishedAt ?? new Date().toISOString();

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/articles/${a.slug}`;
      return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${formatRfc822(a.publishedAt)}</pubDate>
      <description>${xmlEscape(a.description)}</description>
      <category>${xmlEscape(a.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>台灣毛孩家長的照護平台 — 實用工具、品種百科與飼養知識。</description>
    <language>zh-TW</language>
    <lastBuildDate>${formatRfc822(latestDate)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
