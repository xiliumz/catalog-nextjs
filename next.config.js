/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    host: process.env.host,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: process.env.hostname,
        port: process.env.port,
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
