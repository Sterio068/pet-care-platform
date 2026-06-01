import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleNeighbors,
  getTagsForArticle,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArticleNav } from "@/components/articles/ArticleNav";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { ArticleCover } from "@/components/ui/CoverImage";
import { AdBanner } from "@/components/ads/AdBanner";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { ReadingProgress } from "@/components/articles/ReadingProgress";
import { TableOfContents } from "@/components/articles/TableOfContents";
import { ArticleLeadPanel, VetSignalPanel } from "@/components/articles/ArticleTrustPanels";
import { buildPageMetadata, breadcrumbListSchema, SITE_URL, SITE_NAME } from "@/lib/seo";
import { getToolSuggestionsForCategory } from "@/lib/article-tools";
import { getArticleSources } from "@/lib/article-sources";
import { getTopicCluster } from "@/lib/topic-clusters";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const modifiedAt = article.updatedAt ?? article.publishedAt;
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    path: `/articles/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: modifiedAt,
    imageAlt: article.title,
  });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { default: Content } = await import(`@/content/articles/${slug}.mdx`);

  const articleTags = getTagsForArticle(article);
  const articleTopicClusters = articleTags
    .map((tag) => getTopicCluster(tag.slug))
    .filter((cluster): cluster is NonNullable<ReturnType<typeof getTopicCluster>> =>
      Boolean(cluster),
    );
  const { prev: prevArticle, next: nextArticle } = getArticleNeighbors(article.slug);
  const toolSuggestions = getToolSuggestionsForCategory(article.category);
  const sources = getArticleSources(article.slug);
  const modifiedAt = article.updatedAt ?? article.publishedAt;
  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const articleImage = `${articleUrl}/opengraph-image`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: modifiedAt,
    inLanguage: "zh-TW",
    url: articleUrl,
    image: [articleImage],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: CATEGORY_LABELS[article.category],
    keywords: article.keywords.join(", "),
    citation: sources.map((s) => s.url),
    wordCount: article.readingMinutes * 300,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
      },
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    editor: {
      "@type": "Organization",
      name: `${SITE_NAME}編輯部`,
      url: `${SITE_URL}/editorial-policy`,
    },
  };

  const breadcrumbSchema = breadcrumbListSchema([
    { label: "首頁", href: "/" },
    { label: "文章", href: "/articles" },
    { label: CATEGORY_LABELS[article.category], href: `/articles/category/${article.category}` },
    { label: article.title },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <article className="max-w-3xl">
            <Breadcrumb
              items={[
                { label: "首頁", href: "/" },
                { label: "文章", href: "/articles" },
                {
                  label: CATEGORY_LABELS[article.category],
                  href: `/articles/category/${article.category}`,
                },
                { label: article.title },
              ]}
            />

            <div className="mb-8 -mx-4 sm:mx-0">
              <ArticleCover
                title={article.title}
                category={article.category}
                variant="hero"
              />
            </div>

            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[article.category]}`}
                >
                  {CATEGORY_LABELS[article.category]}
                </span>
                <span className="text-xs text-ink-500">
                  更新 {formatDate(modifiedAt)} · 閱讀約 {article.readingMinutes} 分鐘
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight mb-3">
                {article.title}
              </h1>
              <p className="text-lg text-ink-500 leading-relaxed">
                {article.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-500">
                <span>作者：毛孩照護站編輯部</span>
                <span aria-hidden="true">·</span>
                <span>資料校對：公開獸醫與官方資料</span>
                <span aria-hidden="true">·</span>
                <span>首次發布：{formatDate(article.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>最近更新：{formatDate(modifiedAt)}</span>
              </div>
            </header>

            <ArticleLeadPanel
              article={article}
              modifiedLabel={formatDate(modifiedAt)}
              sources={sources}
              toolSuggestions={toolSuggestions}
            />

            <div className="prose-article">
              <Content />
            </div>

            <VetSignalPanel category={article.category} />

            <AdBanner slot="article-mid" format="auto" className="my-6" />

            {toolSuggestions.length > 0 && (
              <section className="my-8 p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-cream-100 border border-brand-100">
                <h2 className="text-base font-bold text-ink-900 mb-3">試試這些免費工具</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {toolSuggestions.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group flex items-start gap-3 p-3 rounded-xl bg-white hover:shadow-sm hover:bg-white transition-all border border-cream-200 hover:border-brand-200"
                    >
                      <span className="text-2xl mt-0.5" aria-hidden="true">{t.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-ink-900 group-hover:text-brand-600 transition-colors">{t.title}</div>
                        <div className="text-xs text-ink-500 leading-snug">{t.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <AdBanner slot="article-bottom" format="horizontal" />

            {articleTopicClusters.length > 0 && (
              <section className="mt-10 rounded-lg border border-cream-300 bg-white p-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-600">
                    Topic Cluster
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-ink-900">
                    延伸主題中心
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {articleTopicClusters.slice(0, 4).map((cluster) => (
                    <Link
                      key={cluster.slug}
                      href={`/articles/tag/${cluster.slug}`}
                      className="group rounded-lg border border-cream-300 bg-cream-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
                        {cluster.hubTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">
                        {cluster.intent}
                      </p>
                      <span className="mt-3 inline-flex text-xs font-bold text-brand-600">
                        {cluster.count} 篇相關文章
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {articleTags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                <span className="text-xs text-ink-500 self-center mr-1">相關主題：</span>
                {articleTags.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/articles/tag/${t.slug}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
                  >
                    #{t.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-6 py-6 border-y border-cream-300">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            <footer className="mt-6">
              <p className="text-xs text-ink-500 italic leading-relaxed">
                ※ 本文資訊僅供參考，不能取代專業獸醫師的診斷與建議。若毛孩身體出現異常，請優先諮詢您信任的動物醫院。
              </p>
            </footer>

            {sources.length > 0 && (
              <section className="mt-8 rounded-2xl border border-cream-300 bg-white p-5">
                <h2 className="text-base font-bold text-ink-900 mb-2">
                  資料來源與校對說明
                </h2>
                <p className="text-sm text-ink-700 leading-relaxed mb-3">
                  本文由毛孩照護站編輯部整理，優先參考獸醫學組織、動物醫院教學資源、政府或學術資料。內容會轉成台灣飼主容易操作的判斷方式，不作為診斷或處方。
                </p>
                <ul className="space-y-2">
                  {sources.map((source) => (
                    <li key={source.url} className="text-sm text-ink-700">
                      <a
                        href={source.url}
                        className="font-semibold text-brand-600 hover:underline"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                      <span className="text-ink-500">（{source.publisher}）</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ArticleNav currentSlug={article.slug} />

            {/* 上/下一篇文章 */}
            {(prevArticle || nextArticle) && (
              <nav
                aria-label="文章導覽"
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-cream-300 bg-white hover:border-brand-300 hover:bg-brand-50 transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="text-brand-500 text-xl transition-transform group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-ink-500">上一篇</div>
                      <div className="font-bold text-ink-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-600">
                        {prevArticle.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
                {nextArticle ? (
                  <Link
                    href={`/articles/${nextArticle.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-cream-300 bg-white hover:border-brand-300 hover:bg-brand-50 transition-colors sm:justify-end sm:text-right"
                  >
                    <div className="min-w-0 sm:order-1">
                      <div className="text-xs text-ink-500">下一篇</div>
                      <div className="font-bold text-ink-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-600">
                        {nextArticle.title}
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-brand-500 text-xl transition-transform group-hover:translate-x-1 sm:order-2"
                    >
                      →
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}

            <RelatedArticles slug={article.slug} />
          </article>

          <aside className="hidden lg:block pt-[4.5rem]">
            <TableOfContents />
            <div className="mt-8"><AdBanner slot="sidebar" format="square" /></div>
          </aside>
        </div>
      </div>
    </>
  );
}
