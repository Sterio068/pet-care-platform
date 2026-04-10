import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ArticleCover, BreedCover } from "@/components/ui/CoverImage";
import { SubscribeForm } from "@/components/newsletter/SubscribeForm";
import {
  getAllArticles,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";
import { getAllBreeds } from "@/data/breeds";

const FEATURED_TOOLS = [
  {
    href: "/tools/pet-age",
    icon: "🎂",
    title: "寵物年齡換算",
    desc: "看看毛孩相當於人類幾歲",
    color: "from-brand-50 to-cream-50",
  },
  {
    href: "/tools/vaccine-schedule",
    icon: "💉",
    title: "疫苗時程表",
    desc: "完整幼犬幼貓預防針時間表",
    color: "from-accent-50 to-cream-50",
  },
  {
    href: "/tools/symptom-checker",
    icon: "🩺",
    title: "症狀檢查器",
    desc: "快速評估毛孩身體狀況",
    color: "from-yellow-50 to-cream-50",
  },
  {
    href: "/tools/food-calculator",
    icon: "🥣",
    title: "餵食計算機",
    desc: "科學計算每日飲食份量",
    color: "from-pink-50 to-cream-50",
  },
];

const MORE_TOOLS = [
  { href: "/tools/toxic-checker", icon: "🔍", title: "毒物查詢" },
  { href: "/tools/emergency-guide", icon: "🚨", title: "急救指南" },
  { href: "/tools/weight-tracker", icon: "📊", title: "體重追蹤" },
  { href: "/tools/cost-calculator", icon: "💰", title: "養寵花費" },
  { href: "/tools/breed-match", icon: "🎯", title: "品種配對" },
  { href: "/tools/breed-compare", icon: "⚖️", title: "品種比較" },
  { href: "/tools/name-generator", icon: "✨", title: "寵物取名" },
  { href: "/tools/vaccine-reminder", icon: "🔔", title: "疫苗提醒" },
  { href: "/tools/food-compare", icon: "📦", title: "飼料比較" },
  { href: "/tools/vet-prep", icon: "🏥", title: "就醫準備" },
];

const POPULAR_TOPICS = [
  { label: "狗狗可以吃什麼水果", href: "/articles/dog-safe-fruits" },
  { label: "貓咪嘔吐原因", href: "/articles/cat-vomiting-reasons" },
  { label: "幼犬第一年照顧", href: "/articles/puppy-first-year" },
  { label: "新手養貓", href: "/articles/new-cat-owner-first-month" },
  { label: "狗飼料怎麼選", href: "/articles/dog-food-brand-comparison" },
  { label: "狗狗中暑急救", href: "/articles/dog-heatstroke-prevention" },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const popularBreeds = getAllBreeds().slice(0, 8);
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 via-cream-100 to-cream-100 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-brand-600 text-sm font-semibold shadow-sm mb-6">
            <span aria-hidden="true">🐾</span>
            <span>免費 · 無需註冊 · 手機也好用</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-ink-900 leading-tight mb-5">
            陪你一起<span className="text-brand-500">科學養寵</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-700 max-w-2xl mx-auto leading-relaxed mb-8">
            實用的毛孩健康工具與照護知識，讓每位飼主都能安心照顧自己的寶貝。
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold px-7 py-3.5 rounded-[14px] shadow-md hover:bg-brand-600 hover:shadow-lg transition-all"
            >
              開始使用工具
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/breeds"
              className="inline-flex items-center gap-2 bg-white text-ink-900 font-semibold px-7 py-3.5 rounded-[14px] shadow-sm hover:shadow-md transition-all border border-cream-300"
            >
              瀏覽品種百科
            </Link>
          </div>

          {/* 熱門話題 */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm text-ink-500 mr-1">熱門：</span>
            {POPULAR_TOPICS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="inline-flex items-center text-sm px-3 py-1.5 rounded-full bg-white text-ink-700 hover:text-brand-600 hover:bg-brand-50 border border-cream-300 transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-2">
              實用工具
            </h2>
            <p className="text-ink-500">每個工具都經過獸醫專業審核</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className={`bg-gradient-to-br ${tool.color} h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow`}>
                  <div className="flex flex-col h-full">
                    <div className="text-4xl mb-3" aria-hidden="true">
                      {tool.icon}
                    </div>
                    <h3 className="font-bold text-lg text-ink-900 mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-ink-500 mb-4 flex-1">
                      {tool.desc}
                    </p>
                    <span className="text-brand-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      立即使用 <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* 更多工具 */}
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {MORE_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-cream-300 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
                  <span className="font-semibold text-sm text-ink-900">{tool.title}</span>
                </Link>
              ))}
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:gap-2 transition-all"
              >
                看全部 14 個工具 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-2">
                最新文章
              </h2>
              <p className="text-ink-500">實用的狗貓照護知識</p>
            </div>
            <Link
              href="/articles"
              className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:gap-2 transition-all"
            >
              看全部文章 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group"
              >
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
                        {formatDate(a.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-ink-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-sm text-ink-700 leading-relaxed flex-1 line-clamp-3">
                      {a.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm"
            >
              看全部文章 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Breeds Preview */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-2">
                熱門品種
              </h2>
              <p className="text-ink-500">了解不同犬貓的性格與照護重點</p>
            </div>
            <Link
              href="/breeds"
              className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:gap-2 transition-all"
            >
              全部品種 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularBreeds.map((b) => (
              <Link key={b.slug} href={`/breeds/${b.slug}`} className="group">
                <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
                  <BreedCover petType={b.petType} name={b.name} coverUrl={b.coverUrl} />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-ink-900 group-hover:text-brand-600 transition-colors leading-snug">
                      {b.name}
                    </h3>
                    <p className="text-xs text-ink-500 mt-0.5">{b.sizeLabel}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/breeds"
              className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm"
            >
              全部品種 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-8 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SubscribeForm />
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-6 text-center">
            為台灣毛孩家長打造
          </h2>
          <div className="prose prose-lg max-w-none text-ink-700 leading-relaxed space-y-4">
            <p>
              <strong>毛孩照護站</strong>
              是專為台灣飼主設計的寵物照護資訊平台。我們相信，每一位飼主都值得擁有清楚、正確、實用的照護知識。
            </p>
            <p>
              從幼犬幼貓第一次打預防針、到選擇適合的飼料份量，再到判斷愛寵是否需要就醫——我們希望透過簡單易用的工具和深入淺出的文章，讓養寵不再需要盲目摸索。
            </p>
            <p className="text-sm text-ink-500 border-l-4 border-brand-300 pl-4 italic">
              ※ 本站所有工具與內容僅供參考，不能取代專業獸醫師的診斷與建議。毛孩身體出現異常時，請優先諮詢您信任的動物醫院。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
