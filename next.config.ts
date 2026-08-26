import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 exige declarar las calidades permitidas. 75 es el default;
    // 82 lo usan el hero y las cards de portafolio.
    qualities: [75, 82],
  },
};

export default nextConfig;
