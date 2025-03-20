import * as dotenv from "dotenv";
dotenv.config();

/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./lib/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
};
console.log("DATABASE_URL:", process.env.DATABASE_URL);