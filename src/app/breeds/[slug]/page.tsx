import Link from "next/link";
import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { RatingBar } from "@/components/ui/RatingBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreedCover } from "@/components/ui/CoverImage";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { getAllBreeds, getBreedBySlug, getRelatedBreeds } from "@/data/breeds";
import { getAllArticles } from "@/lib/articles";
import { buildPageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return getAllBreeds().map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};
  return buildPageMetadata({
    title: `${breed.name} (${breed.nameEn}) — 個性、體型、照護完整介紹`,
    description: breed.summary,
    keywords: [breed.name, breed.nameEn, `${breed.name}個性`, `${breed.name}照顧`, `${breed.name}疾病`],
    path: `/breeds/${breed.slug}`,
    image: breed.coverUrl,
    imageAlt: `${breed.name} ${breed.nameEn}`,
    type: "article",
  });
}

// 根據品種關鍵字找出相關文章（petType + 常見疾病關鍵字）
function getRelatedArticlesForBreed(petType: "dog" | "cat", diseases: string[]) {
  const typeKeyword = petType === "dog" ? "狗" : "貓";
  const simplifiedDiseases = diseases.map((d) =>
    d.replace(/症|病|炎|綜合|症候群/g, "").slice(0, 3),
  );
  const all = getAllArticles();
  const scored = all.map((a) => {
    let score = 0;
    const text = `${a.title} ${a.description} ${a.keywords.join(" ")}`;
    if (text.includes(typeKeyword)) score += 1;
    for (const kw of simplifiedDiseases) {
      if (kw && text.includes(kw)) score += 3;
    }
    // 品種常見議題：皮膚、關節、腎、牙、飲食
    for (const topic of ["皮膚", "關節", "腎", "牙", "飲食", "洗澡", "掉毛"]) {
      if (text.includes(topic)) score += 1;
    }
    return { article: a, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.article);
}

const BREED_TOOLS = [
  {
    href: "/tools/pet-age",
    icon: "🎂",
    title: "年齡換算",
    desc: "看看牠現在相當於人類幾歲",
  },
  {
    href: "/tools/food-calculator",
    icon: "🥣",
    title: "餵食計算",
    desc: "根據體重算出每日熱量",
  },
  {
    href: "/tools/vaccine-schedule",
    icon: "💉",
    title: "疫苗時程",
    desc: "查看必要與建議疫苗",
  },
  {
    href: "/tools/symptom-checker",
    icon: "🩺",
    title: "症狀檢查",
    desc: "快速評估身體狀況",
  },
];

export default async function BreedDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const relatedBreeds = getRelatedBreeds(breed.slug, 4);
  const relatedArticles = getRelatedArticlesForBreed(
    breed.petType,
    breed.commonDiseases,
  );
  const breedUrl = `${SITE_URL}/breeds/${breed.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${breed.name}（${breed.nameEn}）品種介紹：個性、照護與常見疾病`,
          description: breed.summary,
          url: `${SITE_URL}/breeds/${breed.slug}`,
          image: [breed.coverUrl],
          inLanguage: "zh-TW",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/breeds/${breed.slug}`,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          author: {
            "@type": "Organization",
            name: SITE_NAME,
          },
          about: {
            "@type": "Thing",
            name: `${breed.name}（${breed.nameEn}）`,
          },
        }}
      />
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "品種", href: "/breeds" },
            { label: breed.name },
          ]}
        />

        <div className="mb-6 -mx-4 sm:mx-0">
          <BreedCover petType={breed.petType} name={breed.name} coverUrl={breed.coverUrl} variant="hero" />
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight">
            {breed.name}
          </h1>
          <p className="text-ink-500 mt-1 mb-4">
            {breed.nameEn} · {breed.origin}
          </p>
          <p className="text-lg text-ink-700 leading-relaxed">{breed.summary}</p>
        </header>

        {/* 基本資料 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">基本資料</h2>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <dt className="text-xs text-ink-500 mb-1">體型</dt>
              <dd className="font-semibold text-ink-900">{breed.sizeLabel}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500 mb-1">體重範圍</dt>
              <dd className="font-semibold text-ink-900">{breed.weightRange}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500 mb-1">預期壽命</dt>
              <dd className="font-semibold text-ink-900">{breed.lifeSpan}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500 mb-1">被毛</dt>
              <dd className="font-semibold text-ink-900">{breed.coatLabel}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500 mb-1">原產地</dt>
              <dd className="font-semibold text-ink-900">{breed.origin}</dd>
            </div>
          </dl>
        </Card>

        {/* 個性評分 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">個性評分</h2>
          <div className="space-y-3">
            <RatingBar label="活動量" value={breed.energyLevel} />
            <RatingBar label="親人度" value={breed.friendliness} />
            <RatingBar label="訓練難易" value={breed.trainability} />
            <RatingBar label="掉毛量" value={breed.shedding} />
          </div>
        </Card>

        {/* 個性特質 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">個性特質</h2>
          <div className="flex flex-wrap gap-2">
            {breed.personality.map((p, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </Card>

        {/* 常見疾病 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">常見疾病</h2>
          <ul className="space-y-2">
            {breed.commonDiseases.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-ink-700">
                <span className="text-brand-500 mt-1">●</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 照護要點 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">照護要點</h2>
          <ul className="space-y-2">
            {breed.careNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-ink-700">
                <span className="text-accent-500 mt-1">✓</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 適合飼養對象 */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-ink-900 mb-4">適合飼養對象</h2>
          <div className="flex flex-wrap gap-2">
            {breed.suitableFor.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-accent-50 text-accent-700 text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </Card>

        {/* 實用工具 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-ink-900 mb-4">
            照顧{breed.name}的實用工具
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BREED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-cream-50 hover:from-brand-100 hover:to-cream-100 transition-colors"
              >
                <div className="text-3xl mb-2" aria-hidden="true">
                  {tool.icon}
                </div>
                <div className="font-bold text-ink-900 mb-0.5">{tool.title}</div>
                <div className="text-xs text-ink-500 leading-snug">{tool.desc}</div>
                <div className="text-brand-600 text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  立即使用 <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 分享 */}
        <div className="mb-8 py-4 border-y border-cream-300">
          <ShareButtons title={`${breed.name}（${breed.nameEn}）品種介紹`} url={breedUrl} />
        </div>

        {/* 相關品種 */}
        {relatedBreeds.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-900 mb-4">
              其他相似{breed.petType === "dog" ? "犬種" : "貓種"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedBreeds.map((b) => (
                <Link
                  key={b.slug}
                  href={`/breeds/${b.slug}`}
                  className="group"
                >
                  <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
                    <BreedCover
                      petType={b.petType}
                      name={b.name}
                      coverUrl={b.coverUrl}
                    />
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
          </section>
        )}

        {/* 相關文章 */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-900 mb-4">
              推薦閱讀
            </h2>
            <div className="space-y-3">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="block group"
                >
                  <Card padding="md" className="group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow">
                    <h3 className="font-bold text-base text-ink-900 group-hover:text-brand-600 transition-colors mb-1">
                      {a.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-2">
                      {a.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-8 pt-6 border-t border-cream-300">
        <AdBanner slot="breed-bottom" format="horizontal" className="mt-6" />
          <p className="text-xs text-ink-500 italic leading-relaxed">
            ※ 以上資訊為品種常見特性整理，實際個體會因血統、成長環境、訓練而異。領養前建議實際接觸並與獸醫諮詢。
          </p>
        </footer>
      </div>
    </>
  );
}
