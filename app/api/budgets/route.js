'use server';

import { db } from "@/lib/dbConfig";
import { Budgets, Expenses } from "@/lib/schema"; // Import both Budgets and Expenses schemas
import { eq, sql } from "drizzle-orm"; // Drizzle ORM equality operator

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

      // Fetch budgets along with the total spend calculated
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          createdBy: Budgets.createdBy,
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number), // Aggregating total spend
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)) // Join with Expenses to calculate total spend
        .where(eq(Budgets.createdBy, email))
        .groupBy(Budgets.id); // Group by budget ID to get aggregated data

      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error("🔥 API ERROR:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}
