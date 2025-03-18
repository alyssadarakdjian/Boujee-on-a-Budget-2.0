import 'dotenv/config';

const nextConfig = {
experimental: {
    appDir: true,
},
env: {
    DATABASE_URL: process.env.DATABASE_URL,
},
};

export default nextConfig;
