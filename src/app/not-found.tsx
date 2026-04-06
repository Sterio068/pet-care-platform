import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
      <div className="text-7xl mb-6" aria-hidden="true">🐾</div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-brand-500 mb-2">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-4">
        毛孩迷路了⋯⋯
      </h2>
      <p className="text-ink-500 mb-8 leading-relaxed">
        你要找的頁面不存在或已被移除。試試從下面幾個方向繼續探索吧。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Link
          href="/"
          className="px-5 py-3 rounded-[14px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
        >
          回首頁
        </Link>
        <Link
          href="/tools"
          className="px-5 py-3 rounded-[14px] bg-white border border-brand-200 text-brand-600 font-semibold hover:bg-brand-50 transition-colors"
        >
          瀏覽工具
        </Link>
        <Link
          href="/articles"
          className="px-5 py-3 rounded-[14px] bg-white border border-brand-200 text-brand-600 font-semibold hover:bg-brand-50 transition-colors"
        >
          閱讀文章
        </Link>
      </div>
      <p className="text-xs text-ink-500">
        或試試看我們的{" "}
        <Link href="/breeds" className="text-brand-600 underline">
          品種百科
        </Link>{" "}
        了解不同犬貓特性
      </p>
    </div>
  );
}
