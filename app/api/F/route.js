'use server';

import { db } from "@/lib/dbConfig"; // Your database configuration
import { Budgets } from "@/lib/schema"; // Your schema
import { eq } from "drizzle-orm"; // Drizzle ORM equality operator

// Handling GET requests
export async function GET(req) {
  try {
    // Extract email from query parameters (GET request)
    const url = new URL(req.url);
    const email = url.searchParams.get("email");  // Get the email from query params

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email parameter is missing" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Fetching budgets for email:", email);

    // Fetch data from the database for the provided email
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, email));

    console.log("Fetched budgets:", result);

    // Return the result as JSON
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
