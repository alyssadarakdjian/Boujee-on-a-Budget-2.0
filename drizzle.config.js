import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql',
  schema: "./utils/schema.jsx",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  }
});