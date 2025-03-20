"use client";

import { db } from "@/lib/dbConfig";
import { Budgets } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router=useRouter();

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

      console.log(result);
      {
        router.replace('/dashboard/budgets')
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

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
