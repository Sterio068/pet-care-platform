import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const SITE_NAME = "毛孩照護站";

export interface PageMetaInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const images = image
    ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ]
    : undefined;
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "zh_TW",
      type,
      ...(images ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function webApplicationSchema(tool: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TWD",
    },
    inLanguage: "zh-TW",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "台灣毛孩家長的實用工具與照護知識網站",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "zh-TW",
  };
}
