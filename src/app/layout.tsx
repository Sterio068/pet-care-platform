import type { Metadata } from "next";
import Script from "next/script";
import { Nunito, Noto_Sans_TC } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "毛孩照護站 — 狗貓健康工具與飼養知識",
    template: "%s | 毛孩照護站",
  },
  description:
    "提供寵物年齡換算、疫苗時程、症狀檢查、餵食計算等免費工具，以及實用的狗貓照護知識。幫助台灣毛孩家長科學養寵。",
  keywords: [
    "寵物照護",
    "狗年齡換算",
    "貓年齡計算",
    "寵物疫苗",
    "狗飼料量",
    "貓熱量",
    "毛孩健康",
    "養狗",
    "養貓",
  ],
  authors: [{ name: "毛孩照護站" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    siteName: "毛孩照護站",
    title: "毛孩照護站 — 狗貓健康工具與飼養知識",
    description:
      "提供寵物年齡換算、疫苗時程、症狀檢查、餵食計算等免費工具，以及實用的狗貓照護知識。",
  },
  twitter: {
    card: "summary_large_image",
    title: "毛孩照護站",
    description: "狗貓健康工具與飼養知識",
  },
  verification: {
    google: "4cQ2afZzsQF5yaoFPSw0hVOO4D5A1Mj71YV3JYTg7gQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "毛孩照護站 RSS 訂閱" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${nunito.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100 text-ink-900">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
