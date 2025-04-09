'use client';

import BudgetItem from '@/(routes)/dashboard/budgets/_components/BudgetItem';
import AddExpense from '@/(routes)/dashboard/expenses/_components/AddExpense';
import { db } from '@/lib/dbConfig';
import { Budgets, Expenses } from '@/lib/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import { Pencil, Trash2 } from 'lucide-react'; // Icons for Edit and Delete
import { useParams } from 'next/navigation'; // For retrieving the ID from the URL
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import EditBudgetModal from '../../budgets/_components/EditBudgetModal';

function ExpensesScreen() {
  const { id } = useParams(); // Get the budget ID from the URL using useParams
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State for showing the modal
  const [editingBudget, setEditingBudget] = useState(null); // Store the budget to be edited

  useEffect(() => {
    if (user && id) {
      getBudgetInfo();
    }
  }, [user, id]);

  const getBudgetInfo = async () => {
    const budgetData = await db
      .select({
        id: Budgets.id,
        name: Budgets.name,
        amount: Budgets.amount,
        icon: Budgets.icon,
        createdBy: Budgets.createdBy,
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    const expensesData = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id));

    setBudgetInfo(budgetData[0]);
    setExpenses(expensesData);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await db
        .delete(Expenses)
        .where(eq(Expenses.id, expenseId));

      toast.success('Expense deleted!');
      getBudgetInfo(); // refresh data
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete expense.');
    }
  };

  const handleDeleteBudget = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget and all of its expenses?"
    );
    if (!confirmed) return;

    try {
      await db
        .delete(Budgets)
        .where(eq(Budgets.id, id));

      toast.success('Budget deleted!');
      getBudgetInfo(); // refresh the data after deletion
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete budget.');
    }
  };

  const handleEditBudget = () => {
    setIsEditing(true); // Open the modal
    setEditingBudget(budgetInfo); // Store the budget to be edited
  };

  return (
    <div className="p-10">
  <h2 className="text-3xl font-bold text-pink-500 mt-4">My Expenses 💵</h2> {/* Added margin-top and pink color */}
  
  <div className="flex justify-between mt-6 mb-6"> {/* Increased margin top and bottom */}
    <div className="flex gap-2">
      {/* Edit and Delete buttons for the budget */}
      <button
        onClick={handleEditBudget}
        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
      >
        <Pencil className="inline-block mr-2" /> Edit
      </button>
      <button
        onClick={handleDeleteBudget}
        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
      >
        <Trash2 className="inline-block mr-2" /> Delete
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
    {budgetInfo ? (
      <BudgetItem budget={budgetInfo} showActions={false} />
    ) : (
      <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
    )}

    <AddExpense budgetId={id} user={user} refreshData={getBudgetInfo} />
  </div>

  <div className="mt-10">
    <h3 className="text-xl font-bold text-pink-400 mb-2">Your Expenses</h3>
    {expenses.length > 0 ? (
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{expense.name}</div>
              <div className="text-sm text-gray-500">
                ${expense.amount} •{' '}
                {expense.createdAt
                  ? new Date(
                      typeof expense.createdAt === 'string'
                        ? expense.createdAt.replace(' ', 'T')
                        : expense.createdAt
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'No date'}
              </div>
            </div>
            <button
              onClick={() => handleDeleteExpense(expense.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete Expense"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic">No expenses yet.</p>
    )}
  </div>

  {isEditing && (
    <EditBudgetModal
      budget={editingBudget}
      onClose={() => setIsEditing(false)}
      refresh={getBudgetInfo}
    />
  )}
</div>

  );
}

export default ExpensesScreen;
