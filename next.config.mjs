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
    // Files in /public are served with max-age=0 by default, so every visit re-validates
    // every image. Fonts never change in place; other static media get a week plus SWR.
    const staticMedia = 'public, max-age=604800, stale-while-revalidate=86400';
    return [
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      ...['/brand/:path*', '/assets/:path*', '/visuals/:path*', '/Layers/:path*', '/what%20we%20do%20images/:path*', '/How%20we%20help%20images/:path*', '/Industry%20images/:path*'].map((source) => ({
        source,
        headers: [{ key: 'Cache-Control', value: staticMedia }],
      })),
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
