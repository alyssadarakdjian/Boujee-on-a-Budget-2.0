'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/dbConfig';
import { Expenses } from '@/lib/schema';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk
import { eq, sql } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  // Use Clerk's useUser hook to get the current user
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // Check if the user is signed in
    if (!isSignedIn) {
      toast.error('Please log in to add an expense.');
    }
  }, [isSignedIn]);

  const addNewExpense = async () => {
    // Ensure user.email is available before attempting to insert
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error('User email is missing. Please log in.');
      console.log('User data is missing. Make sure the user is logged in and email is available.');
      return;  // Exit function if the email is missing
    }

    try {
      // Log user email to check if it is correctly populated
      console.log('Inserting expense with user email:', user.primaryEmailAddress.emailAddress);

      // Insert new expense into database
      const result = await db
        .insert(Expenses)
        .values({
          name,
          amount: Number(amount),
          budgetId,
          createdBy: user.primaryEmailAddress.emailAddress, // This should be valid
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        toast.success('New Expense Added!');
        refreshData(); // Refresh the data after adding the new expense

        // Reset form fields
        setName('');
        setAmount('');

        // Check if the total spent exceeds the budget after the new expense is added
        setTimeout(async () => {
          const updatedBudget = await db.query.Budgets.findFirst({
            where: (b, { eq }) => eq(b.id, budgetId),
          });

          const totalSpent = await db
            .select({ total: sql`sum(${Expenses.amount})`.mapWith(Number) })
            .from(Expenses)
            .where(eq(Expenses.budgetId, budgetId));

          // Compare total spent to budget amount and display a warning if exceeded
          if (
            totalSpent[0]?.total &&
            updatedBudget?.amount &&
            totalSpent[0].total > updatedBudget.amount
          ) {
            toast.warning('You have exceeded your budget!');
          }
        }, 600); // Small delay to prevent UI overlap
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
        disabled={!(name && amount)} // Disable button if name or amount is missing
        className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
