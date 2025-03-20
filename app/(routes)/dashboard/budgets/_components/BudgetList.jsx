"use client";
import { db } from "@/lib/dbConfig";
import { Budgets, Expenses } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  const { user } = useUser();

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  const [BudgetList, setBudgetList] = useState([]);

  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result = await db
      .select({
        id: Budgets.id,
        name: Budgets.name,
        amount: Budgets.amount,
        icon: Budgets.icon,
        createdBy: Budgets.createdBy,
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget />
        {BudgetList.map((Budget, index) => (
          <BudgetItem key={index} budget={Budget} />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
