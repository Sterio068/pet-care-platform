import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { RatingBar } from "@/components/ui/RatingBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreedCover } from "@/components/ui/CoverImage";
import { getAllBreeds, getBreedBySlug } from "@/data/breeds";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

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
  });
}

export default async function BreedDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${breed.name} 品種介紹`,
          description: breed.summary,
          url: `${SITE_URL}/breeds/${breed.slug}`,
          inLanguage: "zh-TW",
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
          <BreedCover petType={breed.petType} name={breed.name} variant="hero" />
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

        <footer className="mt-8 pt-6 border-t border-cream-300">
          <p className="text-xs text-ink-500 italic leading-relaxed">
            ※ 以上資訊為品種常見特性整理，實際個體會因血統、成長環境、訓練而異。領養前建議實際接觸並與獸醫諮詢。
          </p>
        </footer>
      </div>
    </>
  );
}
