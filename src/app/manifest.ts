import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "毛孩照護站",
    short_name: "毛孩照護站",
    description: "狗貓健康工具與飼養知識",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#FF6B35",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
