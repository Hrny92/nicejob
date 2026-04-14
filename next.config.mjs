/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimalizace pro statická média
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
