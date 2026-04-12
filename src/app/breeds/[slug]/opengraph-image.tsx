import { ImageResponse } from "next/og";
import { getAllBreeds, getBreedBySlug } from "@/data/breeds";

export const alt = "毛孩照護站品種百科";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllBreeds().map((b) => ({ slug: b.slug }));
}

const ENERGY_BAR = (level: number) =>
  Array.from({ length: 5 }, (_, i) => (i < level ? "●" : "○")).join(" ");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  const name = breed?.name ?? "品種百科";
  const nameEn = breed?.nameEn ?? "";
  const isDog = breed?.petType === "dog";
  const petEmoji = isDog ? "🐕" : "🐈";

  // 狗：橘棕漸層；貓：青藍漸層
  const bgGradient = isDog
    ? "linear-gradient(135deg, #FFF1E6 0%, #FFEAD6 50%, #FFE4C8 100%)"
    : "linear-gradient(135deg, #E6F4FF 0%, #EEF9FF 50%, #E6F7F6 100%)";
  const accentColor = isDog ? "#D4520A" : "#0A7B8A";
  const pillBg = isDog ? "#FF7A3D" : "#0AAFCA";

  const stats = breed
    ? [
        { label: "體型", value: breed.sizeLabel },
        { label: "壽命", value: breed.lifeSpan },
        { label: "體重", value: breed.weightRange },
        { label: "原產地", value: breed.origin },
      ]
    : [];

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
          background: bgGradient,
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: accentColor,
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            <span>🐾</span>
            <span>毛孩照護站</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: pillBg,
              color: "white",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            <span>{petEmoji}</span>
            <span>品種百科</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              fontSize: name.length > 8 ? "72px" : "88px",
              fontWeight: 900,
              color: "#1A1008",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
          {nameEn && (
            <div
              style={{
                fontSize: "32px",
                color: accentColor,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {nameEn}
            </div>
          )}

          {/* Stats row */}
          {stats.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "8px",
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 18px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.7)",
                    border: `1.5px solid rgba(0,0,0,0.08)`,
                  }}
                >
                  <span
                    style={{ fontSize: "16px", color: "#8A7A6F", marginBottom: "3px" }}
                  >
                    {s.label}
                  </span>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: "#2A1F1A" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#8A7A6F",
          }}
        >
          <span>maohai.org</span>
          <span>台灣毛孩家長的照護平台</span>
        </div>
      </div>
    ),
    size,
  );
}
