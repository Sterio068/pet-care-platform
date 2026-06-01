export const ADSENSE_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-2306490072598524";
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export const APPROVED_AD_SLOTS = [
  "article-mid",
  "article-bottom",
  "sidebar",
] as const;

export type ApprovedAdSlot = (typeof APPROVED_AD_SLOTS)[number];

export function isApprovedAdSlot(slot: string): slot is ApprovedAdSlot {
  return APPROVED_AD_SLOTS.includes(slot as ApprovedAdSlot);
}

export function shouldRenderAds(slot?: string) {
  if (slot && !isApprovedAdSlot(slot)) {
    return false;
  }

  return ADS_ENABLED && Boolean(ADSENSE_ID);
}
