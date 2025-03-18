"use server";
import { db } from "@/lib/dbConfig";
import { Budgets } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { email } = await req.json();
        console.log("Fetching budgets for email:", email);

        const result = await db
            .select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, email));

        console.log("Fetched budgets:", result);
        return Response.json(result);
    } catch (error) {
        console.error("🔥 API ERROR:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
