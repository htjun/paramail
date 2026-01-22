/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  // Note: optimizePackageImports requires Next.js 13.5+
  // After upgrading Next.js, add:
  // experimental: {
  //   optimizePackageImports: [
  //     '@heroicons/react',
  //     '@radix-ui/react-dialog',
  //     '@radix-ui/react-popover',
  //     '@radix-ui/react-tabs',
  //     '@radix-ui/react-toggle-group',
  //     '@radix-ui/react-checkbox',
  //   ],
  // },
}

module.exports = nextConfig
