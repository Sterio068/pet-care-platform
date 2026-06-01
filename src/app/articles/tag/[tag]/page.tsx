import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ArticleCover } from "@/components/ui/CoverImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  TAGS,
  getAllTags,
  getTagBySlug,
  getArticlesByTagSlug,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import { buildPageMetadata, breadcrumbListSchema, SITE_URL } from "@/lib/seo";
import { getTopicCluster } from "@/lib/topic-clusters";

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

  const cluster = getTopicCluster(tag);
  const learningSteps = cluster
    ? [
        {
          title: "先建立基礎",
          description: cluster.intent,
          href: cluster.featuredArticles[0]
            ? `/articles/${cluster.featuredArticles[0].slug}`
            : undefined,
        },
        {
          title: "再判斷風險",
          description: cluster.questions[0] ?? cluster.audience,
          href: cluster.featuredArticles[1]
            ? `/articles/${cluster.featuredArticles[1].slug}`
            : undefined,
        },
        {
          title: "最後用工具落地",
          description: cluster.toolLinks[0]?.description ?? "用站內工具把文章建議轉成可操作的紀錄。",
          href: cluster.toolLinks[0]?.href,
        },
      ].filter(
        (step): step is { title: string; description: string; href: string } =>
          Boolean(step.href),
      )
    : [];
  const otherTags = getAllTags().filter((t) => t.slug !== tag);
  const breadcrumbSchema = breadcrumbListSchema([
    { label: "首頁", href: "/" },
    { label: "文章", href: "/articles" },
    { label: `#${def.label}` },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cluster?.hubTitle ?? `${def.label}相關文章`,
    description: cluster?.intent ?? def.description,
    url: `${SITE_URL}/articles/tag/${def.slug}`,
    inLanguage: "zh-TW",
    about: cluster?.entities.map((entity) => ({
      "@type": "Thing",
      name: entity,
    })),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
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

      {cluster && (
        <section className="mb-10 grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-5">
          <Card className="bg-white border border-cream-300">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-600 mb-2">
              Topic Cluster
            </p>
            <h2 className="text-2xl font-extrabold text-ink-900 mb-3">
              {cluster.hubTitle}
            </h2>
            <p className="text-ink-700 leading-relaxed">
              {cluster.intent}
            </p>
            <p className="mt-3 text-sm text-ink-500 leading-relaxed">
              {cluster.audience}
            </p>
            {cluster.entities.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {cluster.entities.map((entity) => (
                  <span
                    key={entity}
                    className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-ink-700"
                  >
                    {entity}
                  </span>
                ))}
              </div>
            )}
          </Card>

          <Card className="bg-brand-50 border border-brand-100">
            <h2 className="text-base font-bold text-ink-900 mb-3">
              這個主題常見問題
            </h2>
            <ul className="space-y-2">
              {cluster.questions.map((question) => (
                <li
                  key={question}
                  className="rounded-xl bg-white px-3 py-2 text-sm text-ink-700"
                >
                  {question}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {cluster && learningSteps.length > 0 && (
        <section className="mb-10 rounded-lg border border-cream-300 bg-white p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-600">
                Learning Path
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-ink-900">
                建議閱讀路徑
              </h2>
            </div>
            <p className="text-sm text-ink-500">
              先理解，再判斷，最後用工具整理行動
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {learningSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="group rounded-lg border border-cream-300 bg-cream-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-ink-400">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-bold text-ink-900 group-hover:text-brand-600">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {step.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cluster && cluster.featuredArticles.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-ink-900">建議先讀</h2>
            <span className="text-sm text-ink-500">
              從核心文章開始建立完整脈絡
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cluster.featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <Card className="h-full bg-white border border-cream-300 hover:border-brand-300 hover:bg-brand-50 transition-colors">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[article.category]}`}
                  >
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-700 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cluster && cluster.toolLinks.length > 0 && (
        <section className="mb-10 rounded-2xl border border-cream-300 bg-white p-5">
          <h2 className="text-lg font-bold text-ink-900 mb-3">
            搭配工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cluster.toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-cream-300 bg-cream-100 p-4 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <h3 className="font-bold text-ink-900">{tool.title}</h3>
                <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

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
    </>
  );
}
