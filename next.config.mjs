/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lionconnect-backend.onrender.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fhbzivnxhjmhvihrlqwm.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://lionconnect-backend.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
