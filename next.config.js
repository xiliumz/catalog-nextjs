/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    host: process.env.host,
  },
  images: {
    remotePatterns: [
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
