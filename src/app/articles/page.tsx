import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ArticleCover } from "@/components/ui/CoverImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  getAllArticles,
  getAllTags,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import type { ArticleCategory } from "@/types";
import { buildPageMetadata } from "@/lib/seo";

const CATEGORIES: ArticleCategory[] = [
  "beginner",
  "health",
  "food",
  "behavior",
  "grooming",
];

export const metadata: Metadata = buildPageMetadata({
  title: "毛孩照護知識 — 狗貓飼養與健康文章",
  description:
    "毛孩照護站的部落格文章，包含幼犬幼貓照護、飲食、健康、行為、美容等完整實用知識，由獸醫專業審核。",
  keywords: ["狗貓飼養", "寵物文章", "毛孩知識", "幼犬照顧", "幼貓照顧"],
  path: "/articles",
});

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default function ArticlesListPage() {
  const articles = getAllArticles();
  const tags = getAllTags();
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "文章" }]} />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          毛孩照護知識
        </h1>
        <p className="text-ink-500 max-w-xl mx-auto">
          飼養、健康、行為、美容，陪你一路成長
        </p>
      </div>

      {/* 分類篩選 */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Link
          href="/articles"
          className="px-4 py-2 rounded-full text-sm font-semibold bg-ink-900 text-white"
        >
          全部（{articles.length}）
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/articles/category/${c}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${CATEGORY_COLORS[c]} hover:opacity-80 transition-opacity`}
          >
            {CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {/* 主題標籤 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <span className="text-xs text-ink-500 self-center mr-1">主題：</span>
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/articles/tag/${t.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-cream-300 text-ink-700 text-xs font-semibold hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              <span>#{t.label}</span>
              <span className="text-ink-500">{t.count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group">
            <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
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
                <p className="text-sm text-ink-700 leading-relaxed flex-1">
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
    </div>
  );
}
