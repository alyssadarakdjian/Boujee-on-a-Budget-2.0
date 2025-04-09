'use client';

import { db } from "@/lib/dbConfig";
import { Budgets, Expenses } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";
import EditBudgetModal from "./EditBudgetModal"; // Add this to show the modal

function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget and all of its expenses?"
    );
    if (!confirmed) return;

    try {
      // Disassociate expenses before deleting the budget
      await db
        .update(Expenses)
        .set({ budgetId: null })
        .where(eq(Expenses.budgetId, id));

      // Now delete the budget itself
      await db.delete(Budgets).where(eq(Budgets.id, id));

      toast.success("Budget deleted, expenses disassociated.");
      getBudgetList(); // Refresh the list
    } catch (err) {
      toast.error("Failed to delete budget.");
      console.error(err);
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget); // Open modal or set state for editing
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget />
        {/* Render BudgetItem components here */}
        {budgetList.map((budget) => (
          <BudgetItem
            key={budget.id}
            budget={budget}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editingBudget && (
        <EditBudgetModal
          budget={editingBudget}
          onClose={() => setEditingBudget(null)}
          refresh={getBudgetList}
        />
      )}
    </div>
  );
}

export default BudgetList;
