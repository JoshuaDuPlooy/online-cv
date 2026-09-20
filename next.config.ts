import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones/other devices on the LAN to load dev resources (next dev only).
  allowedDevOrigins: ["192.168.68.104", "192.168.68.*", "192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
