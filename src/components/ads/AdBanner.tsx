interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "square" | "vertical" | "auto";
  className?: string;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

/**
 * Google AdSense 廣告位
 * Phase 1: 預留位置（不顯示）
 * Phase 3: 啟用 NEXT_PUBLIC_ADSENSE_ID 環境變數後自動顯示廣告
 */
export function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  // Phase 1 尚未啟用 AdSense，顯示佔位區（開發環境）
  if (!ADSENSE_ID || !slot) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`my-6 p-4 rounded-[14px] border-2 border-dashed border-cream-300 bg-cream-50 text-center text-xs text-ink-500 ${className}`}
          aria-label="廣告位置"
        >
          [Ad Placeholder · {format}]
        </div>
      );
    }
    return null;
  }

  const heights = {
    horizontal: "h-24 md:h-[90px]",
    square: "h-[250px]",
    vertical: "h-[600px]",
    auto: "min-h-[100px]",
  };

  return (
    <div className={`my-6 ${className}`} aria-label="廣告">
      <ins
        className={`adsbygoogle block ${heights[format]}`}
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}
