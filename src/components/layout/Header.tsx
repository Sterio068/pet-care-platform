import Link from "next/link";
import { SearchDialog } from "@/components/search/SearchDialog";

const NAV_LINKS = [
  { href: "/tools", label: "工具" },
  { href: "/articles", label: "文章" },
  { href: "/breeds", label: "品種" },
  { href: "/about", label: "關於" },
];

export function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-cream-100/90 backdrop-blur-sm border-b border-cream-300">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span aria-hidden="true" className="text-2xl">🐾</span>
            <span className="text-ink-900">毛孩照護站</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-[12px] text-ink-700 font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 pl-2 border-l border-cream-300">
              <SearchDialog />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
