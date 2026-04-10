import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ArticleCover } from "@/components/ui/CoverImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  TAGS,
  getAllTags,
  getTagBySlug,
  getArticlesByTagSlug,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return TAGS.map((t) => ({ tag: t.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ tag: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { tag } = await params;
  const def = getTagBySlug(tag);
  if (!def) return {};
  const articles = getArticlesByTagSlug(tag);
  return buildPageMetadata({
    title: `${def.label} — 相關照護文章與知識`,
    description: `${def.description}目前收錄 ${articles.length} 篇相關文章。`,
    keywords: [def.label, ...def.match.slice(0, 5)],
    path: `/articles/tag/${def.slug}`,
  });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const def = getTagBySlug(tag);
  if (!def) notFound();

  const articles = getArticlesByTagSlug(tag);
  if (articles.length === 0) notFound();

  const otherTags = getAllTags().filter((t) => t.slug !== tag);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "文章", href: "/articles" },
          { label: `#${def.label}` },
        ]}
      />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-3">
          <span aria-hidden="true">#</span>
          <span>主題標籤</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          {def.label}
        </h1>
        <p className="text-ink-500 max-w-2xl mx-auto leading-relaxed">
          {def.description}
        </p>
        <p className="text-sm text-ink-500 mt-3">
          收錄 {articles.length} 篇文章
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group">
            <Card
              padding="sm"
              className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0"
            >
              <ArticleCover title={a.title} category={a.category} />
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[a.category]}`}
                  >
                    {CATEGORY_LABELS[a.category]}
                  </span>
                  <span className="text-xs text-ink-500">
                    {formatDate(a.publishedAt)} · {a.readingMinutes} 分鐘
                  </span>
                </div>
                <h2 className="font-bold text-xl text-ink-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-ink-700 leading-relaxed flex-1 line-clamp-3">
                  {a.description}
                </p>
                <span className="mt-4 text-brand-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  閱讀文章 <span aria-hidden="true">→</span>
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* 其他主題 */}
      {otherTags.length > 0 && (
        <section className="mt-14 pt-8 border-t border-cream-300">
          <h2 className="text-lg font-bold text-ink-900 mb-4">其他主題標籤</h2>
          <div className="flex flex-wrap gap-2">
            {otherTags.map((t) => (
              <Link
                key={t.slug}
                href={`/articles/tag/${t.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-cream-300 text-ink-700 text-sm font-semibold hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                <span>#{t.label}</span>
                <span className="text-xs text-ink-500">{t.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
