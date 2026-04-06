import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BreedCover } from "@/components/ui/CoverImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getBreedsByPetType } from "@/data/breeds";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "狗貓品種百科 — 常見犬貓品種特性與照護",
  description:
    "完整介紹黃金獵犬、柴犬、美短、英短等常見犬貓品種的個性、體型、壽命、常見疾病與照護要點。",
  keywords: ["狗品種", "貓品種", "品種介紹", "犬種", "貓種"],
  path: "/breeds",
});

export default function BreedsIndexPage() {
  const dogs = getBreedsByPetType("dog");
  const cats = getBreedsByPetType("cat");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb
        items={[{ label: "首頁", href: "/" }, { label: "品種" }]}
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          狗貓品種百科
        </h1>
        <p className="text-ink-500 max-w-xl mx-auto">
          了解不同品種的個性、體型、壽命與照護要點
        </p>
      </div>

      {/* 狗狗品種 */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl" aria-hidden="true">🐶</span>
          <h2 className="text-2xl font-bold text-ink-900">狗狗品種</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dogs.map((b) => (
            <Link
              key={b.slug}
              href={`/breeds/${b.slug}`}
              className="group"
            >
              <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
                <BreedCover petType={b.petType} name={b.name} coverUrl={b.coverUrl} />
                <div className="p-4">
                <h3 className="font-bold text-lg text-ink-900 mb-1 group-hover:text-brand-600 transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-ink-500 mb-3">{b.nameEn}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-ink-700">
                    {b.sizeLabel}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-ink-700">
                    {b.weightRange}
                  </span>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed line-clamp-2">
                  {b.summary}
                </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 貓咪品種 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl" aria-hidden="true">🐱</span>
          <h2 className="text-2xl font-bold text-ink-900">貓咪品種</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((b) => (
            <Link
              key={b.slug}
              href={`/breeds/${b.slug}`}
              className="group"
            >
              <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
                <BreedCover petType={b.petType} name={b.name} coverUrl={b.coverUrl} />
                <div className="p-4">
                <h3 className="font-bold text-lg text-ink-900 mb-1 group-hover:text-brand-600 transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-ink-500 mb-3">{b.nameEn}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-ink-700">
                    {b.sizeLabel}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-ink-700">
                    {b.weightRange}
                  </span>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed line-clamp-2">
                  {b.summary}
                </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
