import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  BREED_TRAITS,
  getTraitBySlug,
  getBreedsByTrait,
} from "@/lib/breed-traits";
import { buildPageMetadata, breadcrumbListSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return BREED_TRAITS.map((t) => ({ trait: t.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ trait: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { trait } = await params;
  const def = getTraitBySlug(trait);
  if (!def) return {};
  const breeds = getBreedsByTrait(trait);
  return buildPageMetadata({
    title: `${def.label}品種推薦 — ${breeds.length} 種狗貓整理`,
    description: def.seoDescription,
    keywords: def.keywords,
    path: `/breeds/trait/${def.slug}`,
  });
}

const ENERGY_STARS = (level: number) => "★".repeat(level) + "☆".repeat(5 - level);

export default async function BreedTraitPage({ params }: { params: Params }) {
  const { trait } = await params;
  const def = getTraitBySlug(trait);
  if (!def) notFound();

  const breeds = getBreedsByTrait(trait);
  if (breeds.length === 0) notFound();

  const dogs = breeds.filter((b) => b.petType === "dog");
  const cats = breeds.filter((b) => b.petType === "cat");

  const pageUrl = `${SITE_URL}/breeds/trait/${def.slug}`;
  const breadcrumb = breadcrumbListSchema([
    { label: "首頁", href: "/" },
    { label: "品種百科", href: "/breeds" },
    { label: def.label },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${def.label}品種列表`,
    description: def.seoDescription,
    url: pageUrl,
    numberOfItems: breeds.length,
    itemListElement: breeds.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/breeds/${b.slug}`,
    })),
  };

  const otherTraits = BREED_TRAITS.filter((t) => t.slug !== trait);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "品種百科", href: "/breeds" },
            { label: def.label },
          ]}
        />

        <header className="text-center mb-10">
          <div className="text-5xl mb-4" aria-hidden="true">
            {def.emoji}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            {def.label}品種推薦
          </h1>
          <p className="text-ink-500 max-w-2xl mx-auto leading-relaxed">
            {def.seoDescription}
          </p>
          <p className="text-sm text-ink-500 mt-3">
            共 {breeds.length} 個品種
            {dogs.length > 0 && cats.length > 0
              ? `（🐕 ${dogs.length} 種犬 · 🐈 ${cats.length} 種貓）`
              : dogs.length > 0
                ? `（🐕 ${dogs.length} 種犬）`
                : `（🐈 ${cats.length} 種貓）`}
          </p>
        </header>

        {/* 狗狗 */}
        {dogs.length > 0 && (
          <section className="mb-12">
            {dogs.length > 0 && cats.length > 0 && (
              <h2 className="text-xl font-bold text-ink-900 mb-5">
                🐕 狗狗品種（{dogs.length}）
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dogs.map((b) => (
                <BreedCard key={b.slug} breed={b} />
              ))}
            </div>
          </section>
        )}

        {/* 貓咪 */}
        {cats.length > 0 && (
          <section className="mb-12">
            {dogs.length > 0 && cats.length > 0 && (
              <h2 className="text-xl font-bold text-ink-900 mb-5">
                🐈 貓咪品種（{cats.length}）
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cats.map((b) => (
                <BreedCard key={b.slug} breed={b} />
              ))}
            </div>
          </section>
        )}

        {/* 其他場景 */}
        <section className="mt-10 pt-8 border-t border-cream-300">
          <h2 className="text-lg font-bold text-ink-900 mb-4">更多飼養場景</h2>
          <div className="flex flex-wrap gap-2">
            {otherTraits.map((t) => (
              <Link
                key={t.slug}
                href={`/breeds/trait/${t.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-cream-300 text-ink-700 text-sm font-semibold hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/breeds"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:underline"
          >
            <span aria-hidden="true">←</span> 瀏覽全部 70 種品種
          </Link>
        </div>
      </div>
    </>
  );
}

function BreedCard({
  breed,
}: {
  breed: import("@/types").BreedProfile;
}) {
  return (
    <Link
      href={`/breeds/${breed.slug}`}
      className="group block p-5 rounded-2xl bg-white border border-cream-300 hover:border-brand-300 hover:shadow-[0_4px_16px_rgba(42,31,26,0.09)] transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-bold text-lg text-ink-900 group-hover:text-brand-600 transition-colors">
            {breed.name}
          </h3>
          <p className="text-sm text-ink-500">{breed.nameEn}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cream-200 text-ink-600 font-semibold whitespace-nowrap">
          {breed.sizeLabel}
        </span>
      </div>
      <p className="text-sm text-ink-700 leading-relaxed line-clamp-3 mb-3">
        {breed.summary}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-ink-500">
        <span>壽命 {breed.lifeSpan}</span>
        <span>·</span>
        <span>體重 {breed.weightRange}</span>
      </div>
      <span className="mt-3 text-brand-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
        查看詳情 <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
