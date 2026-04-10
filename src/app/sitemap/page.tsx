import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  getAllArticles,
  getAllTags,
  CATEGORY_LABELS,
} from "@/lib/articles";
import type { ArticleCategory } from "@/types";
import { getAllBreeds, getBreedsByPetType } from "@/data/breeds";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "網站地圖 — 所有工具、文章與品種頁面",
  description:
    "毛孩照護站完整網站地圖，一次瀏覽所有實用工具、照護文章、狗貓品種百科與主題標籤，快速找到你需要的內容。",
  keywords: ["網站地圖", "sitemap", "毛孩照護站", "全部內容"],
  path: "/sitemap",
});

const TOOLS = [
  { href: "/tools/pet-age", label: "寵物年齡換算" },
  { href: "/tools/vaccine-schedule", label: "疫苗時程表" },
  { href: "/tools/symptom-checker", label: "症狀檢查器" },
  { href: "/tools/food-calculator", label: "餵食計算機" },
  { href: "/tools/weight-tracker", label: "體重追蹤" },
  { href: "/tools/cost-calculator", label: "養寵花費" },
  { href: "/tools/breed-match", label: "品種配對" },
  { href: "/tools/breed-compare", label: "品種比較" },
  { href: "/tools/name-generator", label: "寵物取名" },
  { href: "/tools/vaccine-reminder", label: "疫苗提醒" },
  { href: "/tools/food-compare", label: "飼料比較" },
  { href: "/tools/toxic-checker", label: "毒物查詢" },
  { href: "/tools/emergency-guide", label: "急救指南" },
  { href: "/tools/vet-prep", label: "就醫準備" },
];

const CATEGORIES: ArticleCategory[] = [
  "health",
  "food",
  "behavior",
  "grooming",
  "beginner",
];

export default function HtmlSitemapPage() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const dogs = getBreedsByPetType("dog");
  const cats = getBreedsByPetType("cat");
  const totalBreeds = getAllBreeds().length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "網站地圖" }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          網站地圖
        </h1>
        <p className="text-ink-500 leading-relaxed">
          毛孩照護站所有頁面的完整索引。包含 {TOOLS.length} 個工具、{articles.length} 篇文章與 {totalBreeds} 種狗貓品種介紹。
        </p>
      </header>

      {/* 主要頁面 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          主要頁面
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <li><Link href="/" className="text-ink-700 hover:text-brand-600">首頁</Link></li>
          <li><Link href="/tools" className="text-ink-700 hover:text-brand-600">工具總覽</Link></li>
          <li><Link href="/articles" className="text-ink-700 hover:text-brand-600">文章首頁</Link></li>
          <li><Link href="/breeds" className="text-ink-700 hover:text-brand-600">品種百科</Link></li>
          <li><Link href="/about" className="text-ink-700 hover:text-brand-600">關於我們</Link></li>
          <li><Link href="/faq" className="text-ink-700 hover:text-brand-600">常見問題</Link></li>
          <li><Link href="/privacy" className="text-ink-700 hover:text-brand-600">隱私權政策</Link></li>
          <li><Link href="/terms" className="text-ink-700 hover:text-brand-600">使用條款</Link></li>
        </ul>
      </section>

      {/* 實用工具 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          實用工具（{TOOLS.length}）
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {TOOLS.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="text-ink-700 hover:text-brand-600">
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 文章分類 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          文章分類
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                href={`/articles/category/${c}`}
                className="text-ink-700 hover:text-brand-600"
              >
                {CATEGORY_LABELS[c]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 主題標籤 */}
      {tags.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
            主題標籤（{tags.length}）
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {tags.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/articles/tag/${t.slug}`}
                  className="text-ink-700 hover:text-brand-600"
                >
                  #{t.label}（{t.count}）
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 全部文章 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          全部文章（{articles.length}）
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className="text-ink-700 hover:text-brand-600 line-clamp-1"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 狗狗品種 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          狗狗品種（{dogs.length}）
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5 text-sm">
          {dogs.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/breeds/${b.slug}`}
                className="text-ink-700 hover:text-brand-600"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 貓咪品種 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
          貓咪品種（{cats.length}）
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5 text-sm">
          {cats.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/breeds/${b.slug}`}
                className="text-ink-700 hover:text-brand-600"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="pt-6 border-t border-cream-300 text-sm text-ink-500">
        <p>
          需要讓爬蟲讀取的 XML 版本請見{" "}
          <Link href="/sitemap.xml" className="text-brand-600 hover:underline">
            /sitemap.xml
          </Link>
          ，RSS 訂閱請見{" "}
          <Link href="/feed.xml" className="text-brand-600 hover:underline">
            /feed.xml
          </Link>
          。
        </p>
      </footer>
    </div>
  );
}
