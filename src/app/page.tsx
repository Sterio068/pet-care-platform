import Link from "next/link";
import { ArticleCover, BreedCover } from "@/components/ui/CoverImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubscribeForm } from "@/components/newsletter/SubscribeForm";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  getAllArticles,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import { getAllBreeds } from "@/data/breeds";
import { getFeaturedTools, getIntentTools, TOOLS } from "@/lib/tool-catalog";
import { getAllTopicClusters } from "@/lib/topic-clusters";

const POPULAR_TOPICS = [
  { label: "狗狗可以吃什麼水果", href: "/articles/dog-safe-fruits" },
  { label: "貓咪嘔吐原因", href: "/articles/cat-vomiting-reasons" },
  { label: "幼犬第一年照顧", href: "/articles/puppy-first-year" },
  { label: "新手養貓", href: "/articles/new-cat-owner-first-month" },
  { label: "狗飼料怎麼選", href: "/articles/dog-food-brand-comparison" },
  { label: "狗狗中暑急救", href: "/articles/dog-heatstroke-prevention" },
];

const CARE_STEPS = [
  {
    label: "先判斷",
    title: "急不急，需不需要就醫",
    href: "/tools/symptom-checker",
  },
  {
    label: "再計算",
    title: "年齡、熱量、體重與疫苗",
    href: "/tools/food-calculator",
  },
  {
    label: "慢慢查",
    title: "文章、品種、主題中心",
    href: "/articles",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 4);
  const [leadArticle, ...secondaryArticles] = latestArticles;
  const popularBreeds = getAllBreeds().slice(0, 6);
  const featuredTools = getFeaturedTools();
  const intentTools = getIntentTools();
  const clusters = getAllTopicClusters().slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-100">
        <div className="container-page grid gap-10 py-12 md:py-18 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
              <span aria-hidden="true">🐾</span>
              <span>台灣飼主的照護筆記與免費工具</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] text-ink-900 md:text-6xl">
              先判斷，再照護。讓毛孩問題有清楚下一步。
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
              把狗貓健康工具、照護文章、品種百科整理成可以直接使用的路線。從症狀判斷到日常餵食，先知道該做什麼，再決定要查多深。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/symptom-checker"
                className="inline-flex items-center gap-2 rounded-[14px] bg-brand-500 px-6 py-3.5 font-bold text-cream-50 shadow-[0_8px_24px_rgba(230,81,29,0.18)] transition-colors hover:bg-brand-600"
              >
                先做症狀檢查
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-[14px] border border-cream-300 bg-cream-50 px-6 py-3.5 font-bold text-ink-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                看照護文章
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-cream-300 bg-cream-50 p-5 shadow-[0_16px_48px_rgba(42,31,26,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-brand-600">現在可以先做</p>
                <h2 className="mt-1 text-xl font-extrabold text-ink-900">
                  依狀況選入口
                </h2>
              </div>
              <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700">
                14 個工具
              </span>
            </div>
            <div className="space-y-3">
              {intentTools.slice(0, 5).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-4 rounded-[16px] border border-cream-300 bg-cream-100 p-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-cream-50 text-xl"
                  >
                    {tool.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-ink-500">
                      {tool.intent}
                    </span>
                    <span className="block truncate font-bold text-ink-900 group-hover:text-brand-700">
                      {tool.title}
                    </span>
                  </span>
                  <span className="text-brand-500" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-y border-cream-300 bg-cream-50">
          <div className="container-page flex flex-wrap items-center gap-2 py-4">
            <span className="mr-1 text-sm font-bold text-ink-500">
              熱門搜尋
            </span>
            {POPULAR_TOPICS.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="rounded-full border border-cream-300 bg-cream-100 px-3 py-1.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow="CARE ROUTE"
            title="把照護拆成三個可靠步驟"
            description="多數問題不需要一開始就讀十篇文章。先判斷風險，再用工具計算，最後沿著主題中心補齊背景知識。"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {CARE_STEPS.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="group rounded-[20px] border border-cream-300 bg-cream-50 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(42,31,26,0.10)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600">
                    {step.label}
                  </span>
                  <span className="text-3xl font-black text-brand-100">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-ink-900">
                  {step.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-600">
                  前往 <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-12 md:py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow="TOOLS"
            title="最常用的照護工具"
            description="工具頁用產品式介面處理輸入和結果，適合手機上快速完成判斷。"
            actionHref="/tools"
            actionLabel={`看全部 ${TOOLS.length} 個工具`}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="feature" />
            ))}
          </div>
        </div>
      </section>

      {clusters.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-page">
            <SectionHeader
              eyebrow="TOPIC CLUSTERS"
              title="依情境整理的主題中心"
              description="文章、工具、常見問題彼此串起來，讓新手可以循序查，也讓搜尋引擎看懂本站深度。"
              actionHref="/articles"
              actionLabel="全部文章"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {clusters.map((cluster) => (
                <Link
                  key={cluster.slug}
                  href={`/articles/tag/${cluster.slug}`}
                  className="group rounded-[20px] border border-cream-300 bg-cream-50 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-brand-700">
                      #{cluster.label}
                    </span>
                    <span className="rounded-full bg-cream-100 px-2.5 py-1 text-xs font-bold text-ink-500">
                      {cluster.count} 篇
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-ink-900 group-hover:text-brand-700">
                    {cluster.hubTitle}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-600">
                    {cluster.intent}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream-50 py-12 md:py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow="READ"
            title="最新照護文章"
            description="以公開獸醫、官方與學術資料整理成台灣飼主看得懂的版本。"
            actionHref="/articles"
            actionLabel="看全部文章"
          />
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            {leadArticle && (
              <Link
                href={`/articles/${leadArticle.slug}`}
                className="group overflow-hidden rounded-[24px] border border-cream-300 bg-cream-100 transition-all hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(42,31,26,0.10)]"
              >
                <ArticleCover
                  title={leadArticle.title}
                  category={leadArticle.category}
                  variant="hero"
                />
                <div className="p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${CATEGORY_COLORS[leadArticle.category]}`}
                    >
                      {CATEGORY_LABELS[leadArticle.category]}
                    </span>
                    <span className="text-xs font-semibold text-ink-500">
                      {formatDate(leadArticle.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold leading-tight text-ink-900 group-hover:text-brand-700">
                    {leadArticle.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700">
                    {leadArticle.description}
                  </p>
                </div>
              </Link>
            )}
            <div className="grid gap-3">
              {secondaryArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group rounded-[18px] border border-cream-300 bg-cream-100 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${CATEGORY_COLORS[article.category]}`}
                    >
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    <span className="text-xs text-ink-500">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-extrabold leading-snug text-ink-900 group-hover:text-brand-700">
                    {article.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-600">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow="BREEDS"
            title="從品種個性開始做準備"
            description="比較體型、個性、照護重點與常見疾病，降低衝動認養或錯配生活型態的風險。"
            actionHref="/breeds"
            actionLabel="全部品種"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {popularBreeds.map((breed) => (
              <Link
                key={breed.slug}
                href={`/breeds/${breed.slug}`}
                className="group overflow-hidden rounded-[18px] border border-cream-300 bg-cream-50 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <BreedCover
                  petType={breed.petType}
                  name={breed.name}
                  coverUrl={breed.coverUrl}
                />
                <div className="p-3">
                  <h3 className="text-sm font-extrabold leading-snug text-ink-900 group-hover:text-brand-700">
                    {breed.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {breed.sizeLabel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-page">
          <SubscribeForm />
        </div>
      </section>

      <section className="bg-ink-900 py-12 text-cream-100 md:py-16">
        <div className="container-page grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-xs font-bold text-brand-300">TRUST FIRST</p>
            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
              內容可以賺廣告，但信任不能拿來換點擊。
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-cream-200">
            <p>
              毛孩照護站把工具、文章、來源、編輯政策與免責提醒放在同一套體驗裡。讀者先得到答案，再選擇要不要深入閱讀。
            </p>
            <p className="rounded-[14px] border border-ink-700 bg-ink-800/60 p-4 text-cream-200">
              本站內容僅供參考，不能取代專業獸醫師診斷。毛孩身體出現異常時，請優先諮詢您信任的動物醫院。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
