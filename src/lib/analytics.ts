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

/**
 * Maps site-specific event names onto the portfolio-wide standardized funnel
 * vocabulary. When a legacy name fires, the standardized alias is emitted with
 * the same params so cross-site GA4 reporting stays consistent without touching
 * every call site.
 */
const STANDARD_EVENT_ALIASES: Record<string, string> = {
  tool_view: "tool_viewed",
  tool_start: "tool_started",
  tool_result_view: "tool_result",
};

function emit(eventName: string, eventParams: Record<string, string | number | boolean>) {
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

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const eventParams = cleanParams(params);
  emit(eventName, eventParams);

  const alias = STANDARD_EVENT_ALIASES[eventName];
  if (alias && alias !== eventName) {
    emit(alias, eventParams);
  }
}

export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating?: string;
}

/**
 * Reports a Core Web Vital (LCP/INP/CLS/FCP/TTFB) to GA4 as a `web_vital`
 * event, matching the cross-site RUM convention.
 */
export function trackWebVital(metric: WebVitalMetric) {
  if (
    typeof window === "undefined" ||
    !metric ||
    typeof metric.name !== "string" ||
    !metric.name.trim() ||
    typeof metric.id !== "string" ||
    !metric.id.trim() ||
    !Number.isFinite(metric.value)
  ) {
    return;
  }

  trackEvent("web_vital", {
    name: metric.name,
    value: Math.round(metric.value * 1000) / 1000,
    rating: metric.rating ?? "unknown",
    id: metric.id,
  });
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
