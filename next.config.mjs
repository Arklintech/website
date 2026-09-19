/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['jwks-rsa', 'jose'],
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/start',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/request',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/start-project',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/work-with-us',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/work-with-zaqvoro',
        destination: '/start-a-system',
        permanent: true,
      },
      {
        source: '/work/neominds-enrollment',
        destination: '/work/neominds',
        permanent: true,
      },
      {
        source: '/work/parivar-restaurant',
        destination: '/work/parivar',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
