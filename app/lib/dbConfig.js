import * as schema from "@/lib/schema.js";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
throw new Error("No database connection string found. Check your .env.local file.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
