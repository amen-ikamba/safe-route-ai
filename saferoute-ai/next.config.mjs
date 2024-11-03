// File: next.config.mjs
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Add other configurations as needed
  webpack(config) {
    return config;
  },
}

export default nextConfig;