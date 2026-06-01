export type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const DEBUG_ANALYTICS = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

function cleanParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined && entry[1] !== null && entry[1] !== "",
    ),
  );
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const eventParams = cleanParams(params);
  window.dataLayer = window.dataLayer ?? [];

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  } else {
    window.dataLayer.push({ event: eventName, ...eventParams });
  }

  if (DEBUG_ANALYTICS) {
    console.info("[analytics]", eventName, eventParams);
  }
}

export function getContentContext(pathname: string): AnalyticsParams {
  const segments = pathname.split("/").filter(Boolean);
  const [section, subSection, item] = segments;

  if (section === "articles" && subSection === "tag" && item) {
    return {
      content_type: "topic_cluster",
      content_group: "articles",
      item_id: item,
    };
  }

  if (section === "articles" && subSection === "category" && item) {
    return {
      content_type: "article_category",
      content_group: "articles",
      item_id: item,
    };
  }

  if (section === "articles" && subSection) {
    return {
      content_type: "article",
      content_group: "articles",
      item_id: subSection,
    };
  }

  if (section === "tools" && subSection) {
    return {
      content_type: "tool",
      content_group: "tools",
      item_id: subSection,
    };
  }

  if (section === "breeds" && subSection) {
    return {
      content_type: "breed",
      content_group: "breeds",
      item_id: subSection,
    };
  }

  return {
    content_type: section || "home",
    content_group: section || "home",
    item_id: pathname,
  };
}
