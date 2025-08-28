/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // This is experimental but can be enabled to allow parallel builds
    workerThreads: false,
    cpus: 1
  },
  // Enable static optimization for better performance
  trailingSlash: false,
  // Configure image domains if needed
  images: {
    domains: [],
  },
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
  },
}

module.exports = nextConfig

