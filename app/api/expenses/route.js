'use server';

import { db } from "@/lib/dbConfig";
import { Expenses } from "@/lib/schema"; // Your schema
import { eq } from "drizzle-orm"; // Drizzle ORM equality operator

export async function GET(req) {
    try {
      const url = new URL(req.url);
      const email = url.searchParams.get("email");
  
      if (!email) {
        return new Response(
          JSON.stringify({ error: "Email parameter is missing" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.createdBy, email));
  
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error", details: error.message }),
        { status: 500 }
      );
    }
  }
  
