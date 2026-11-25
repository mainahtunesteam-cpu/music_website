/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/blinding-love.mp4',
        destination: '/Blinding%20Love.mp4',
      },
    ];
  },
};
export default nextConfig;
