"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getContentContext, trackEvent } from "@/lib/analytics";

function getViewEventName(contentType: AnalyticsParams["content_type"]) {
  switch (contentType) {
    case "article":
      return "article_view";
    case "tool":
      return "tool_view";
    case "topic_cluster":
      return "topic_cluster_view";
    case "article_category":
      return "article_category_view";
    case "breed":
      return "breed_view";
    default:
      return "content_view";
  }
}

type AnalyticsParams = ReturnType<typeof getContentContext>;

export function SiteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  useEffect(() => {
    const context = getContentContext(pathname);
    const searchTerm = searchParams.get("q")?.trim();

    trackEvent(getViewEventName(context.content_type), {
      ...context,
      page_path: pathname,
      page_location: window.location.href,
    });

    if (pathname === "/search" && searchTerm) {
      trackEvent("search", {
        search_term: searchTerm,
        method: "site_search_page",
      });
    }
  }, [pathname, queryString, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      const linkText = link.textContent?.trim().slice(0, 80);

      if (url.origin !== window.location.origin) {
        trackEvent("click", {
          link_url: url.href,
          link_domain: url.hostname,
          outbound: true,
        });
        return;
      }

      const context = getContentContext(url.pathname);
      trackEvent("select_content", {
        ...context,
        link_url: url.pathname,
        link_text: linkText,
      });

      // Standardized cross-site funnel: a click whose destination is a tool
      // page is a tool-card click (article->tool or tool directory entry).
      if (context.content_type === "tool" && url.pathname !== pathname) {
        trackEvent("tool_card_click", {
          ...context,
          tool_id: context.item_id,
          link_url: url.pathname,
          link_text: linkText,
          from_path: pathname,
        });
      }

      if (context.content_type === "topic_cluster") {
        trackEvent("topic_cluster_click", {
          ...context,
          link_url: url.pathname,
          link_text: linkText,
        });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
