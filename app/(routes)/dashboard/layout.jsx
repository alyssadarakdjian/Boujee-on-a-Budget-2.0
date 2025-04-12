"use client";

import { db } from "@/lib/dbConfig";
import { Budgets } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser(); // Ensure Clerk's `useUser` hook is used
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state for asynchronous operations

  useEffect(() => {
    // Step 1: Ensure Clerk has loaded the user data
    if (!isLoaded) return;

    // Step 2: Ensure user is available and logged in
    if (!user) {
      router.push('/'); // Redirect to home page if the user is not signed in
      return;
    }

    console.log('User Data:', user); // Log user data for debugging

    // Step 3: Ensure that `primaryEmailAddress.emailAddress` is available and correctly used
    if (user?.primaryEmailAddress?.emailAddress) {
      checkUserBudgets(user.primaryEmailAddress.emailAddress); // Pass emailAddress to the query function
    } else {
      console.error("User email is missing!");
    }

    setLoading(false); // Set loading to false once the user is ready
  }, [user, isLoaded, router]);

  const checkUserBudgets = async (userEmail) => {
    const normalizedEmail = userEmail.toLowerCase(); // Normalize email to lower case

    try {
      // Step 4: Query the Budgets table using the `createdBy` field (which holds the email)
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, normalizedEmail)); // Compare normalized email

      console.log('Fetched Budgets:', result); // Log the result for debugging

      // Step 5: Handle case when no budgets are found
      if (result.length === 0) {
        console.log("No budgets found, redirecting...");
        router.replace("/dashboard/budgets"); // Redirect to the budgets page
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  // If the user is signed out while on the dashboard, redirect them to the home page
  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to finish loading
    if (!user) {
      // Log the error and redirect to the home page
      router.push('/'); // Redirect to home if signed out
      return;
    }
  }, [user, isLoaded, router]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        <DashboardHeader />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
