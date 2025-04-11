'use client';

import { db } from '@/lib/dbConfig';
import { SavingsGoals } from '@/lib/schema'; // Ensure this is imported correctly
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm'; // Drizzle equality operator
import { useEffect, useState } from 'react';
import { toast } from 'sonner'; // For toast notifications (if you're using this package)
import SavingsGoalItem from './_components/SavingsGoalItem';

const SavingsGoalsPage = () => {
  const { user } = useUser(); // Assuming you're using Clerk for user management
  const [savingsGoals, setSavingsGoals] = useState([]); // To hold current savings goals
  const [goalName, setGoalName] = useState(''); // Input for new savings goal name
  const [targetamount, setTargetAmount] = useState(''); // Input for target amount
  const [editMode, setEditMode] = useState(false); // To handle edit mode
  const [currentGoalId, setCurrentGoalId] = useState(null); // Track which goal is being edited

  // Fetch savings goals
  const getSavingsGoals = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error('User email not found.');
      return;
    }

    try {
      const email = user.primaryEmailAddress.emailAddress;
      const goalsData = await db
        .select()
        .from(SavingsGoals)
        .where(eq(SavingsGoals.createdBy, email));
      setSavingsGoals(goalsData);
    } catch (error) {
      console.error('Error fetching savings goals:', error);
      toast.error('Failed to load savings goals.');
    }
  };

  // Add a new savings goal
  const addSavingsGoal = async () => {
    if (!goalName || !targetamount) {
      toast.error('Please provide both goal name and target amount.');
      return;
    }

    try {
      const email = user.primaryEmailAddress.emailAddress;
      await db.insert(SavingsGoals).values({
        name: goalName,
        targetamount: parseFloat(targetamount),
        currentAmount: 0, // You can start with a current amount of 0
        createdBy: email,
      });
      setGoalName('');
      setTargetAmount('');
      getSavingsGoals(); // Refresh the list after adding
      toast.success('Savings goal added!');
    } catch (error) {
      console.error('Error adding savings goal:', error);
      toast.error('Failed to add savings goal.');
    }
  };

  // Edit a savings goal
  const editSavingsGoal = async () => {
    if (!goalName || !targetamount) {
      toast.error('Please provide both goal name and target amount.');
      return;
    }

    try {
      await db
        .update(SavingsGoals)
        .set({
          name: goalName,
          targetamount: parseFloat(targetamount),
        })
        .where(eq(SavingsGoals.id, currentGoalId));

      setGoalName('');
      setTargetAmount('');
      setEditMode(false); // Exit edit mode
      getSavingsGoals(); // Refresh the list after editing
      toast.success('Savings goal updated!');
    } catch (error) {
      console.error('Error updating savings goal:', error);
      toast.error('Failed to update savings goal.');
    }
  };

  // Delete a savings goal
  const deleteSavingsGoal = async (goalId) => {
    try {
      await db.delete(SavingsGoals).where(eq(SavingsGoals.id, goalId));
      toast.success('Savings goal deleted!');
      getSavingsGoals(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete savings goal.');
    }
  };

  // Start editing a goal
  const handleEdit = (goal) => {
    setEditMode(true); // Enable edit mode
    setGoalName(goal.name); // Set the goal name for editing
    setTargetAmount(goal.targetamount.toString()); // Set the target amount for editing
    setCurrentGoalId(goal.id); // Track which goal is being edited
  };

  // Add amount to current savings goal
  const addAmountToGoal = async (goalId, amount) => {
    try {
      // Fetch the current goal to get the existing currentAmount
      const goals = await db
        .select()
        .from(SavingsGoals)
        .where(eq(SavingsGoals.id, goalId));

      if (goals.length === 0) {
        toast.error('Goal not found.');
        return;
      }

      const goal = goals[0]; // Get the first (and only) result

      // Convert currentAmount to a number and add the new amount
      const newCurrentAmount = parseFloat(goal.currentAmount) + parseFloat(amount);

      // Update the goal with the new currentAmount
      await db
        .update(SavingsGoals)
        .set({ currentAmount: newCurrentAmount })
        .where(eq(SavingsGoals.id, goalId));

      getSavingsGoals(); // Refresh the list after adding the amount
    } catch (error) {
      console.error('Error adding amount:', error);
      toast.error('Failed to add amount to savings goal.');
    }
  };

  useEffect(() => {
    getSavingsGoals(); // Fetch savings goals on initial load
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-pink-500 mt-4">My Savings Goals 💸</h2>

      {/* Form to add a new or edit an existing savings goal */}
      <div className="mt-6">
        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="Enter goal name"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={targetamount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="Enter target amount"
          className="p-2 border rounded ml-2"
        />
        {editMode ? (
          <button
            onClick={editSavingsGoal}
            className="p-2 bg-pink-500 text-white rounded ml-2"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={addSavingsGoal}
            className="p-2 bg-pink-500 text-white rounded ml-2"
          >
            Add Goal
          </button>
        )}
      </div>

      {/* Savings goals list */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.length > 0 ? (
          savingsGoals.map((goal) => (
            <SavingsGoalItem
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={deleteSavingsGoal}  // Pass delete function here
              onAddAmount={addAmountToGoal} // Pass the addAmountToGoal function
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No savings goals yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavingsGoalsPage;
