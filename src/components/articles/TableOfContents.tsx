"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

let cachedHeadings: Heading[] | null = null;
const EMPTY_HEADINGS: Heading[] = [];

function readHeadings(): Heading[] {
  if (cachedHeadings) return cachedHeadings;
  const article = document.querySelector("article");
  if (!article) return EMPTY_HEADINGS;
  const nodes = article.querySelectorAll("h2, h3");
  const items: Heading[] = [];
  nodes.forEach((node) => {
    const text = node.textContent?.trim() ?? "";
    if (!text) return;
    let id = node.id;
    if (!id) {
      id = slugify(text) || `h-${items.length}`;
      node.id = id;
    }
    items.push({ id, text, level: node.tagName === "H2" ? 2 : 3 });
  });
  cachedHeadings = items.length ? items : EMPTY_HEADINGS;
  return cachedHeadings;
}

function subscribeHeadings() {
  // Static content, no subscription needed
  return () => {
    cachedHeadings = null;
  };
}

export function TableOfContents() {
  const headings = useSyncExternalStore(
    subscribeHeadings,
    readHeadings,
    () => EMPTY_HEADINGS,
  );
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="文章目錄"
      className="sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto text-sm"
    >
      <div className="text-xs font-bold text-ink-900 uppercase tracking-wide mb-3">
        文章目錄
      </div>
      <ul className="space-y-1.5 border-l-2 border-cream-300">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={`block py-1 pl-3 -ml-0.5 border-l-2 transition-colors leading-snug ${
                activeId === h.id
                  ? "border-brand-500 text-brand-600 font-semibold"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              } ${h.level === 3 ? "pl-6 text-xs" : ""}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
