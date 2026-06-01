import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.maohai.org" }],
        destination: "https://maohai.org/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
