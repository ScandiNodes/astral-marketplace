/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // CAPA Crystals webapp has same pattern — cosmjs type conflicts
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
