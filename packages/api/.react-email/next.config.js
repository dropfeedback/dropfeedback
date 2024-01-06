/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    externalDir: true, // compile files that are located next to the .react-email directory
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/html',
    ],
  },
  transpilePackages: [
    '@react-email/components',
    '@react-email/render',
    '@react-email/html',
  ],
};

module.exports = nextConfig;
