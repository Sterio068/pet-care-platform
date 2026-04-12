import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BreedCover } from "@/components/ui/CoverImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getBreedsByPetType } from "@/data/breeds";
import { BREED_TRAITS } from "@/lib/breed-traits";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "狗貓品種百科 — 常見犬貓品種特性與照護",
  description:
    "完整介紹黃金獵犬、柴犬、美短、英短等常見犬貓品種的個性、體型、壽命、常見疾病與照護要點。",
  keywords: ["狗品種", "貓品種", "品種介紹", "犬種", "貓種"],
  path: "/breeds",
});

const SIZE_ORDER: Array<"xs" | "s" | "m" | "l" | "xl"> = ["xs", "s", "m", "l", "xl"];
const SIZE_LABELS: Record<"xs" | "s" | "m" | "l" | "xl", string> = {
  xs: "迷你型",
  s: "小型",
  m: "中型",
  l: "大型",
  xl: "超大型",
};

export default function BreedsIndexPage() {
  const dogs = getBreedsByPetType("dog");
  const cats = getBreedsByPetType("cat");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb
        items={[{ label: "首頁", href: "/" }, { label: "品種" }]}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          狗貓品種百科
        </h1>
        <p className="text-ink-500 max-w-xl mx-auto mb-6">
          了解不同品種的個性、體型、壽命與照護要點
        </p>
        {/* 場景快速導覽 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="text-xs text-ink-500 self-center mr-1">依需求找品種：</span>
          {BREED_TRAITS.map((t) => (
            <Link
              key={t.slug}
              href={`/breeds/trait/${t.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-cream-300 text-ink-700 text-xs font-semibold hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </Link>
          ))}
        </div>

        <div className="inline-flex items-center gap-3 flex-wrap justify-center">
          <a
            href="#dog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors"
          >
            <span aria-hidden="true">🐶</span>
            <span>狗狗品種（{dogs.length} 種）</span>
          </a>
          <a
            href="#cat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white font-semibold text-sm hover:bg-accent-600 transition-colors"
          >
            <span aria-hidden="true">🐱</span>
            <span>貓咪品種（{cats.length} 種）</span>
          </a>
        </div>
      </div>

      {/* 狗狗品種 */}
      <section id="dog" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">🐶</span>
          <h2 className="text-2xl font-bold text-ink-900">
            狗狗品種 <span className="text-base font-normal text-ink-500">（{dogs.length} 種）</span>
          </h2>
        </div>
        {SIZE_ORDER.map((size) => {
          const group = dogs.filter((b) => b.size === size);
          if (group.length === 0) return null;
          const anchorId = `dog-${size}`;
          return (
            <div key={size} id={anchorId} className="mb-10 scroll-mt-20">
              <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-500 rounded-full" aria-hidden="true" />
                {SIZE_LABELS[size]}犬（{group.length}）
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/breeds/${b.slug}`}
                    className="group"
                  >
                    <Card padding="sm" className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow overflow-hidden p-0">
                      <BreedCover petType={b.petType} name={b.name} coverUrl={b.coverUrl} />
                      <div className="p-4">
                        <h4 className="font-bold text-lg text-ink-900 mb-1 group-hover:text-brand-600 transition-colors">
                          {b.name}
                        </h4>
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
            </div>
          );
        })}
      </section>

      {/* 貓咪品種 */}
      <section id="cat" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl" aria-hidden="true">🐱</span>
          <h2 className="text-2xl font-bold text-ink-900">
            貓咪品種 <span className="text-base font-normal text-ink-500">（{cats.length} 種）</span>
          </h2>
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
