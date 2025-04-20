/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "ldka.space",
      },
    ],
  },
  compiler: {
    removeConsole: false,
    // Keep value set to true in production. Change to false during development (Do not push to Git).
  },
};

export default nextConfig;
