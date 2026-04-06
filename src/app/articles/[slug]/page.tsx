import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
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
import { buildPageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";

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
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    path: `/articles/${article.slug}`,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "zh-TW",
    url: `${SITE_URL}/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  const articleUrl = `${SITE_URL}/articles/${article.slug}`;

  return (
    <>
      <JsonLd data={articleSchema} />
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
                  {formatDate(article.publishedAt)} · 閱讀約 {article.readingMinutes} 分鐘
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight mb-3">
                {article.title}
              </h1>
              <p className="text-lg text-ink-500 leading-relaxed">
                {article.description}
              </p>
            </header>

            <div className="prose-article">
              <Content />
            </div>

            <AdBanner slot="article-mid" format="auto" className="my-6" />

            <AdBanner slot="article-bottom" format="horizontal" />

            <div className="mt-10 py-6 border-y border-cream-300">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            <footer className="mt-6">
              <p className="text-xs text-ink-500 italic leading-relaxed">
                ※ 本文資訊僅供參考，不能取代專業獸醫師的診斷與建議。若毛孩身體出現異常，請優先諮詢您信任的動物醫院。
              </p>
            </footer>

            <ArticleNav currentSlug={article.slug} />

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
