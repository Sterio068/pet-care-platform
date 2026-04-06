import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink-900 text-cream-100 pb-24 md:pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <span aria-hidden="true">🐾</span>
              <span>毛孩照護站</span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              台灣毛孩家長的實用工具與照護知識網站，陪你科學養寵。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-cream-100">工具</h3>
            <ul className="columns-2 gap-x-6 space-y-2 text-sm text-cream-300">
              <li><Link href="/tools/pet-age" className="hover:text-cream-100">年齡換算</Link></li>
              <li><Link href="/tools/vaccine-schedule" className="hover:text-cream-100">疫苗時程</Link></li>
              <li><Link href="/tools/vaccine-reminder" className="hover:text-cream-100">疫苗提醒</Link></li>
              <li><Link href="/tools/symptom-checker" className="hover:text-cream-100">症狀檢查</Link></li>
              <li><Link href="/tools/food-calculator" className="hover:text-cream-100">餵食計算</Link></li>
              <li><Link href="/tools/weight-tracker" className="hover:text-cream-100">體重追蹤</Link></li>
              <li><Link href="/tools/cost-calculator" className="hover:text-cream-100">花費計算</Link></li>
              <li><Link href="/tools/breed-match" className="hover:text-cream-100">品種配對</Link></li>
              <li><Link href="/tools/breed-compare" className="hover:text-cream-100">品種比較</Link></li>
              <li><Link href="/tools/name-generator" className="hover:text-cream-100">寵物取名</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-cream-100">關於</h3>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>
                <Link href="/about" className="hover:text-cream-100">
                  關於我們
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-cream-100">
                  部落格
                </Link>
              </li>
              <li>
                <Link href="/breeds" className="hover:text-cream-100">
                  品種百科
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cream-100">
                  常見問題
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-ink-700 text-xs text-cream-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} 毛孩照護站 · 本站內容僅供參考，不能取代專業獸醫診療
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cream-100">隱私權政策</Link>
            <Link href="/terms" className="hover:text-cream-100">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
