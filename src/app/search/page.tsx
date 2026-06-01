import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { getAllBreeds } from "@/data/breeds";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/seo";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  const title = q ? `「${q}」搜尋結果` : "搜尋";
  return buildPageMetadata({
    title,
    description: q
      ? `毛孩照護站中關於「${q}」的文章與品種資訊`
      : "搜尋毛孩照護站的文章、品種與工具",
    path: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const breadcrumb = breadcrumbListSchema([
    { label: "首頁", href: "/" },
    { label: "搜尋" },
  ]);

  const articles = query
    ? getAllArticles().filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query),
      )
    : [];

  const breeds = query
    ? getAllBreeds().filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.nameEn.toLowerCase().includes(query),
      )
    : [];

  const total = articles.length + breeds.length;

  return (
    <>
      <JsonLd data={breadcrumb} />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        {/* Search form */}
        <form action="/search" method="GET" className="mb-8">
          <label htmlFor="search-input" className="sr-only">
            搜尋毛孩照護站
          </label>
          <div className="flex gap-2">
            <input
              id="search-input"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="搜尋品種、文章或工具"
              className="flex-1 rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              autoFocus={!q}
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-3 text-cream-50 font-semibold hover:bg-brand-600 transition-colors"
            >
              搜尋
            </button>
          </div>
        </form>

        {query && (
          <p className="mb-6 text-sm text-ink-500">
            「<span className="font-medium text-ink-900">{q}</span>
            」共找到 {total} 筆結果
          </p>
        )}

        {/* Breed results */}
        {breeds.length > 0 && (
          <section className="mb-8" aria-labelledby="breed-results-heading">
            <h2
              id="breed-results-heading"
              className="mb-3 text-base font-bold text-ink-700"
            >
              🐾 品種（{breeds.length}）
            </h2>
            <ul className="space-y-2">
              {breeds.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/breeds/${b.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                  >
                    <span className="text-xl">
                      {b.petType === "dog" ? "🐕" : "🐈"}
                    </span>
                    <span>
                      <span className="font-semibold text-ink-900">{b.name}</span>
                      <span className="ml-2 text-sm text-ink-500">
                        {b.nameEn}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Article results */}
        {articles.length > 0 && (
          <section aria-labelledby="article-results-heading">
            <h2
              id="article-results-heading"
              className="mb-3 text-base font-bold text-ink-700"
            >
              📖 文章（{articles.length}）
            </h2>
            <ul className="space-y-2">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="block rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                  >
                    <p className="font-semibold leading-snug text-ink-900">{a.title}</p>
                    <p className="mt-1 text-sm text-ink-500 line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* No results */}
        {query && total === 0 && (
          <div className="text-center py-16 text-ink-500">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-medium">找不到「{q}」的相關內容</p>
            <p className="mt-2 text-sm">試試其他關鍵字，或瀏覽下方分類</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <Link
                href="/breeds"
                className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
              >
                品種百科
              </Link>
              <Link
                href="/articles"
                className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
              >
                照護文章
              </Link>
              <Link
                href="/tools"
                className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
              >
                免費工具
              </Link>
            </div>
          </div>
        )}

        {/* Empty state (no query) */}
        {!query && (
          <div className="text-center py-12 text-ink-500">
            <p className="text-4xl mb-4">🐾</p>
            <p className="font-medium">輸入品種名稱或照護主題開始搜尋</p>
          </div>
        )}
      </main>
    </>
  );
}
