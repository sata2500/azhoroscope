/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['tr'],
    defaultLocale: 'tr',
  },
};

module.exports = nextConfig;
