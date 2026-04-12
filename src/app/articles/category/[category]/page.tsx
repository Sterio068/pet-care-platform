import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  getArticlesByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import type { ArticleCategory } from "@/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, breadcrumbListSchema } from "@/lib/seo";

const CATEGORIES: ArticleCategory[] = [
  "health",
  "food",
  "behavior",
  "grooming",
  "beginner",
];

const CATEGORY_SEO: Record<
  ArticleCategory,
  { title: string; description: string; keywords: string[] }
> = {
  health: {
    title: "寵物健康文章 — 狗貓疾病預防與照護",
    description: "完整的狗貓健康相關文章，包含慢性腎病、關節炎、肥胖管理、老年照護等常見健康問題與預防方法。",
    keywords: ["寵物健康", "狗健康", "貓健康", "寵物疾病", "毛孩照護"],
  },
  food: {
    title: "寵物飲食文章 — 狗貓營養與餵食指南",
    description: "解析狗貓的營養需求、飼料選擇、禁忌食物、飲水量等，幫助飼主正確餵食毛孩。",
    keywords: ["寵物飲食", "狗飼料", "貓飼料", "寵物營養", "寵物禁忌食物"],
  },
  behavior: {
    title: "寵物行為文章 — 狗貓訓練與行為矯正",
    description: "狗狗吠叫、貓咪亂尿、幼犬咬人、分離焦慮等行為問題的成因分析與訓練方法。",
    keywords: ["寵物行為", "狗狗訓練", "貓行為", "寵物焦慮", "寵物訓練"],
  },
  grooming: {
    title: "寵物美容文章 — 洗澡、剪指甲、梳毛指南",
    description: "狗狗洗澡頻率、剪指甲步驟、貓砂選擇等美容清潔實用教學。",
    keywords: ["寵物美容", "狗狗洗澡", "狗剪指甲", "貓砂推薦", "寵物梳毛"],
  },
  beginner: {
    title: "新手飼主文章 — 第一次養狗養貓必讀",
    description: "從幼犬第一年照護到新手養貓第一個月，完整的新手飼主指南與注意事項。",
    keywords: ["新手養狗", "新手養貓", "幼犬照顧", "養寵物準備"],
  },
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export const dynamicParams = false;

type Params = Promise<{ category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as ArticleCategory)) return {};
  const seo = CATEGORY_SEO[category as ArticleCategory];
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: `/articles/category/${category}`,
  });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as ArticleCategory)) notFound();
  const cat = category as ArticleCategory;
  const articles = getArticlesByCategory(cat);
  const breadcrumb = breadcrumbListSchema([
    { label: "首頁", href: "/" },
    { label: "文章", href: "/articles" },
    { label: CATEGORY_LABELS[cat] },
  ]);

  return (
    <>
    <JsonLd data={breadcrumb} />
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <nav className="mb-6 text-sm">
        <Link
          href="/articles"
          className="text-ink-500 hover:text-brand-600 inline-flex items-center gap-1"
        >
          <span aria-hidden="true">←</span> 全部文章
        </Link>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${CATEGORY_COLORS[cat]}`}
          >
            {CATEGORY_LABELS[cat]}
          </span>
          <span className="text-sm text-ink-500">{articles.length} 篇文章</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-2">
          {CATEGORY_LABELS[cat]}相關文章
        </h1>
        <p className="text-ink-500">{CATEGORY_SEO[cat].description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group">
            <Card className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-ink-500">
                  {formatDate(a.publishedAt)} · {a.readingMinutes} 分鐘
                </span>
              </div>
              <h2 className="font-bold text-xl text-ink-900 mb-2 group-hover:text-brand-600 transition-colors">
                {a.title}
              </h2>
              <p className="text-sm text-ink-700 leading-relaxed">
                {a.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* 其他分類 */}
      <section className="mt-12 pt-8 border-t border-cream-300">
        <h2 className="text-lg font-bold text-ink-900 mb-4">其他分類</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c !== cat).map((c) => (
            <Link
              key={c}
              href={`/articles/category/${c}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${CATEGORY_COLORS[c]} hover:opacity-80 transition-opacity`}
            >
              {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
