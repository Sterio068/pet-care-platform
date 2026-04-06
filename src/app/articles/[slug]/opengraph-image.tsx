import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug, CATEGORY_LABELS } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? "毛孩照護站";
  const category = article?.category;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #FFF1EA 0%, #FFF8F0 50%, #E6F8F6 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#FF6B35",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          <span>🐾</span>
          <span>毛孩照護站</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {category && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "#FF6B35",
                color: "white",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              {CATEGORY_LABELS[category]}
            </div>
          )}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#2A1F1A",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#8A7A6F",
          }}
        >
          pet-care-platform.com
        </div>
      </div>
    ),
    size,
  );
}
