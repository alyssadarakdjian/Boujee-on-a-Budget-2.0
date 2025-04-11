'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function SavingsGoalItem({ goal, onEdit, onDelete, onAddAmount }) {
  const [amountToAdd, setAmountToAdd] = useState('');

  // Calculate progress percentage similar to the budgets progress bar
  const calculateProgressPerc = () => {
    if (!goal.targetamount || goal.targetamount === 0) return 0;
    const perc = (goal.currentAmount / goal.targetamount) * 100;
    return Math.min(perc, 100).toFixed(2); // Cap at 100%
  };

  // Handle adding amount to savings goal
  const handleAddAmount = async () => {
    if (!amountToAdd || isNaN(amountToAdd) || parseFloat(amountToAdd) <= 0) {
      toast.error('Please enter a valid amount to add.');
      return;
    }

    try {
      // Update the current amount
      await onAddAmount(goal.id, parseFloat(amountToAdd)); 
      setAmountToAdd('');
      toast.success('Amount added to savings goal!');

      // After adding, check if goal is completed
      if (parseFloat(goal.currentAmount) + parseFloat(amountToAdd) >= goal.targetamount) {
        toast.success(`🎉 Congratulations! You've completed your goal: ${goal.name}`);
      }
    } catch (error) {
      console.error('Error adding amount:', error);
      toast.error('Failed to add amount to savings goal.');
    }
  };

  // Calculate remaining amount for the goal
  const amountRemaining = goal.targetamount - goal.currentAmount;

  // Determine if the goal is completed exactly (currentAmount == targetamount)
  const isGoalCompleted = goal.currentAmount === goal.targetamount;

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-pink-500">{goal.name}</h3>
          <p className="text-gray-500 text-sm">Target: ${goal.targetamount}</p>
          <p className="text-gray-500 text-sm">Current: ${goal.currentAmount}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(goal)} // Trigger edit functionality
            className="text-pink-500 hover:text-pink-700"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)} // Trigger delete functionality
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between text-gray-400 text-sm mb-2">
        <span>${goal.currentAmount || 0} Saved</span>
        <span>${amountRemaining.toFixed(2)} Remaining</span>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isGoalCompleted ? 'bg-green-500' : 'bg-pink-500'}`}
          style={{
            width: `${calculateProgressPerc()}%`, // Calculate width based on progress
          }}
        />
      </div>

      {/* Input for adding amount */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          placeholder="Amount to add"
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddAmount}
          className="p-2 bg-pink-500 text-white rounded"
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}

export default SavingsGoalItem;
