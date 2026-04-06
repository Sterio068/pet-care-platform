import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "首頁", icon: "🏠" },
  { href: "/tools", label: "工具", icon: "🧰" },
  { href: "/articles", label: "文章", icon: "📖" },
  { href: "/about", label: "關於", icon: "ℹ️" },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cream-300 shadow-[0_-2px_12px_rgba(42,31,26,0.06)]">
      <ul className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2 text-ink-500 hover:text-brand-600 transition-colors"
            >
              <span aria-hidden="true" className="text-xl">
                {item.icon}
              </span>
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
