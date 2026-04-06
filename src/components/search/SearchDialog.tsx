"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getSearchIndex, searchItems, type SearchItem } from "@/lib/search-index";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(() => searchItems(query, index), [query, index]);

  const closeDialog = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  const typeColors: Record<string, string> = {
    article: "bg-brand-100 text-brand-700",
    breed: "bg-accent-100 text-accent-700",
    tool: "bg-yellow-100 text-yellow-700",
    page: "bg-cream-200 text-ink-700",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition-colors text-sm"
        aria-label="搜尋"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <span className="hidden md:inline">搜尋</span>
        <span className="hidden md:inline text-xs text-ink-300 border border-cream-300 rounded px-1.5 py-0.5">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          onClick={closeDialog}
        >
          <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-cream-300">
              <svg className="w-5 h-5 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋文章、品種、工具⋯⋯"
                className="flex-1 bg-transparent outline-none text-ink-900 placeholder:text-ink-300"
              />
              <button
                type="button"
                onClick={closeDialog}
                className="text-xs text-ink-500 border border-cream-300 rounded px-1.5 py-0.5"
              >
                ESC
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="p-8 text-center text-ink-500 text-sm">
                  找不到「{query}」的結果
                </div>
              )}
              {!query && (
                <div className="p-8 text-center text-ink-500 text-sm">
                  輸入關鍵字搜尋文章、品種與工具
                </div>
              )}
              {results.length > 0 && (
                <ul className="py-2">
                  {results.map((r: SearchItem, i) => (
                    <li key={i}>
                      <Link
                        href={r.href}
                        onClick={closeDialog}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-cream-100 transition-colors"
                      >
                        <span
                          className={`mt-0.5 shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[r.type]}`}
                        >
                          {r.typeLabel}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink-900 truncate">
                            {r.title}
                          </div>
                          <div className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                            {r.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
