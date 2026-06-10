import { ADSENSE_ID, shouldRenderAds } from "@/lib/ads";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "square" | "vertical" | "auto";
  className?: string;
}

/**
 * Google AdSense 廣告位
 * 審查期預設關閉。需同時設定 NEXT_PUBLIC_ADS_ENABLED=true
 * 與 NEXT_PUBLIC_ADSENSE_ID 才會渲染廣告。
 */
export function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  if (!slot || !shouldRenderAds(slot)) {
    return null;
  }

  const heights = {
    horizontal: "h-24 md:h-[90px]",
    square: "h-[250px]",
    vertical: "h-[600px]",
    auto: "min-h-[100px]",
  };

  /* 骨架容器固定 min-height 預留版位空間，
     避免 AdSense 載入後改寫 ins 高度造成 CLS */
  const skeletonHeights = {
    horizontal: "min-h-24 md:min-h-[90px]",
    square: "min-h-[250px]",
    vertical: "min-h-[600px]",
    auto: "min-h-[100px]",
  };

  return (
    <aside
      className={`my-8 ${className}`}
      aria-label="廣告"
      role="complementary"
    >
      <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-400">
        廣告
      </div>
      <div className={`rounded-[12px] bg-cream-200/60 ${skeletonHeights[format]}`}>
        <ins
          className={`adsbygoogle block ${heights[format]}`}
          style={{ display: "block" }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format === "auto" ? "auto" : undefined}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
