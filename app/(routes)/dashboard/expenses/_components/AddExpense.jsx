'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/dbConfig';
import { Expenses } from '@/lib/schema';
import { useUser } from '@clerk/nextjs';
import { eq, sql } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      toast.error('Please log in to add an expense.');
    }
  }, [isSignedIn]);

  const addNewExpense = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error('User email is missing. Please log in.');
      return;
    }

    const numericAmount = Number(amount);

    // ✅ Validate that amount is not negative
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Amount cannot be negative.');
      return;
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name,
          amount: numericAmount,
          budgetId,
          createdBy: user.primaryEmailAddress.emailAddress,
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        toast.success('New Expense Added!');
        refreshData();
        setName('');
        setAmount('');

        setTimeout(async () => {
          const updatedBudget = await db.query.Budgets.findFirst({
            where: (b, { eq }) => eq(b.id, budgetId),
          });

          const totalSpent = await db
            .select({ total: sql`sum(${Expenses.amount})`.mapWith(Number) })
            .from(Expenses)
            .where(eq(Expenses.budgetId, budgetId));

          if (
            totalSpent[0]?.total &&
            updatedBudget?.amount &&
            totalSpent[0].total > updatedBudget.amount
          ) {
            toast.warning('You have exceeded your budget!');
          }
        }, 600);
      }
    } catch (error) {
      console.error('Error while adding expense:', error);
      toast.error('Failed to add expense.');
    }
  };

  return (
    <div className="border p-5 rounded-lg bg-white shadow-sm">
      <h2 className="font-bold text-lg">Add Expense</h2>

      <div className="mt-4">
        <label className="text-pink-400 font-medium mb-1 block">Expense Name</label>
        <Input
          value={name}
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
          className="border-pink-400 focus:ring-pink-500"
        />
      </div>

      <div className="mt-4">
        <label className="text-pink-400 font-medium mb-1 block">Expense Amount</label>
        <Input
          value={amount}
          placeholder="e.g. 1000"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          className="border-pink-400 focus:ring-pink-500"
        />
      </div>

      <Button
        onClick={addNewExpense}
        disabled={!(name && amount)}
        className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
