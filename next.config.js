const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // optimizeFonts: false,
  swcMinify: true,
  sassOptions: {
    includePaths: []
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
    // domains: [
    //   'zos.alipayobjects.com',
    //   'img.dongdongdong.xyz'
    // ]
  },
  async rewrites() {
    // if (isProd) {
    //   return []
    // }
    return [
      {
        source: '/web/:slug*',
        destination: 'http://www.dongdongdong.xyz/web/:slug*'
      }
    ]
  }
}

module.exports = nextConfig
