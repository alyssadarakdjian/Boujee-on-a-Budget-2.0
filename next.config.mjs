import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, 
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"], 
  env: {
    DATABASE_URL: process.env.DATABASE_URL, 
  },
};

export default nextConfig;
