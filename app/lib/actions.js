"use server"; // Ensures this runs only on the server

import { db } from "@/lib/dbConfig";
import { Budgets } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function fetchUserBudgets(email) {
    if (!email) return []; // Avoid errors if email is undefined

    const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, email));

    return result;
}
