import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF6B35 0%, #FF8651 100%)",
          borderRadius: "100px",
        }}
      >
        <span style={{ fontSize: "280px" }}>🐾</span>
      </div>
    ),
    size,
  );
}
