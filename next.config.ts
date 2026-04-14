import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel optimalizace obrázků
  images: {
    unoptimized: false,
  },
}

export default nextConfig
