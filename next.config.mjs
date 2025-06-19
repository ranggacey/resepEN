/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.spoonacular.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.spoonacular.com',
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
