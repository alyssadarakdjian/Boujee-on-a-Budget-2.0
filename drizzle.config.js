import "dotenv/config";

export default {
  schema: "@/lib/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
