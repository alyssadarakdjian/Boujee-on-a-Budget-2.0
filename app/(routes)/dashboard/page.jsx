'use client'; // Ensure this is at the top of your file

import { db } from "@/lib/dbConfig";
import { useUser } from "@clerk/nextjs";
import { sql } from 'drizzle-orm';
import { DollarSign, FileText, Wallet } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser(); // Using Clerk's useUser hook
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBudgets, setTotalBudgets] = useState(0);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk is fully loaded
    if (!isSignedIn) {
      router.replace("/sign-in"); // Redirect unauthorized users to Sign In
    } else {
      // Log the user object to check if email is available
      console.log('User Object:', user);
      if (user) {
        fetchDashboardData();
      }
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, router, user]);

  const fetchDashboardData = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();  // Access the email directly from Clerk's user object
      console.log('User Email:', userEmail);  // Log the user email to ensure it's correctly fetched

      // Ensure user email is available
      if (!userEmail) {
        console.error('User email is missing!');
        return;
      }

      // Query for total budget, using COALESCE to handle nulls
      const budgetData = await db.execute(
        sql`SELECT COALESCE(sum("amount"::numeric), 0) AS sum FROM "budgets" WHERE "createdBy" = ${userEmail}`
      );
      console.log('Budget Data:', budgetData);  // Log the query result

      // Query for total spent, using COALESCE to handle nulls
      const spentData = await db.execute(
        sql`SELECT COALESCE(sum("amount"::numeric), 0) AS sum FROM "expenses" WHERE "createdBy" = ${userEmail}`
      );
      console.log('Spent Data:', spentData);  // Log the query result

      // Query for the number of budgets, using COALESCE to handle nulls
      const budgetCount = await db.execute(
        sql`SELECT COALESCE(count(*), 0) AS count FROM "budgets" WHERE "createdBy" = ${userEmail}`
      );
      console.log('Budget Count:', budgetCount);  // Log the query result

      // Ensure we get numeric values even when count is returned as a string
      const totalBudget = parseFloat(budgetData.rows[0]?.sum) || 0;
      const totalSpent = parseFloat(spentData.rows[0]?.sum) || 0;
      const totalBudgets = parseInt(budgetCount.rows[0]?.count, 10) || 0;

      console.log('Processed Data:', { totalBudget, totalSpent, totalBudgets });

      setTotalBudget(totalBudget);
      setTotalSpent(totalSpent);
      setTotalBudgets(totalBudgets);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to fetch dashboard data.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Redirecting...</p>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Hello, {user?.firstName || 'User'} 👋</h2>
      <p className="text-lg text-gray-600 mb-6">Here's what's happening with your money. Let's manage your expenses.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Budget Card */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="text-blue-500 w-8 h-8 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Budget</h3>
              <p className="text-xl font-bold text-pink-500">
                {totalBudget > 0 ? `$${totalBudget}` : "No Budget Found"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Spend Card */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="text-green-500 w-8 h-8 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Spend</h3>
              <p className="text-xl font-bold text-pink-500">
                {totalSpent > 0 ? `$${totalSpent}` : "No Spending Data"}
              </p>
            </div>
          </div>
        </div>

        {/* Number of Budgets Card */}
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="text-purple-500 w-8 h-8 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">No. Of Budgets</h3>
              <p className="text-xl font-bold text-pink-500">
                {totalBudgets > 0 ? totalBudgets : "No Budgets"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
