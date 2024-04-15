/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    host: process.env.host,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/d/**',
      },
      {
        protocol: 'http',
        hostname: process.env.hostname,
        port: '9000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: process.env.hostname,
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
