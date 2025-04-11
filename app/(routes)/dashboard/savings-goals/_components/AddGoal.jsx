'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/dbConfig';
import { SavingsGoals } from '@/lib/schema';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddGoal({ user, refreshData }) {
  const [name, setName] = useState('');
  const [targetamount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || targetamount <= 0 || isNaN(targetamount) || isNaN(currentAmount)) {
      toast.error('Please fill in all fields with valid values.');
      return;
    }

    try {
      await db.insert(SavingsGoals).values({
        name,
        targetamount: Number(targetamount),
        currentAmount: Number(currentAmount),
        createdBy: user?.primaryEmailAddress?.emailAddress, // Ensure email is passed
      });

      toast.success('New savings goal added!');
      refreshData(); // Refresh data after adding goal

      // Reset form fields
      setName('');
      setTargetAmount('');
      setCurrentAmount('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add savings goal.');
    }
  };

  return (
    <div className="border p-5 rounded-lg bg-white shadow-sm">
      <h2 className="font-bold text-lg text-pink-400">Set Your Savings Goal</h2>

      <div className="mt-4">
        <label className="text-pink-400 font-medium mb-1 block">Goal Name</label>
        <Input
          value={name}
          placeholder="e.g., Emergency Fund"
          onChange={(e) => setName(e.target.value)}
          className="border-pink-400 focus:ring-pink-500"
        />
      </div>

      <div className="mt-4">
        <label className="text-pink-400 font-medium mb-1 block">Target Amount ($)</label>
        <Input
          value={targetamount}
          placeholder="e.g., 5000"
          type="number"
          onChange={(e) => setTargetAmount(e.target.value)}
          className="border-pink-400 focus:ring-pink-500"
        />
      </div>

      <div className="mt-4">
        <label className="text-pink-400 font-medium mb-1 block">Current Amount ($)</label>
        <Input
          value={currentAmount}
          placeholder="e.g., 1000"
          type="number"
          onChange={(e) => setCurrentAmount(e.target.value)}
          className="border-pink-400 focus:ring-pink-500"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!(name && targetamount && currentAmount)} // Disable if fields are empty
        className="mt-4 w-full bg-pink-500 text-white py-3 rounded-md shadow-md hover:bg-pink-600 transition duration-300"
      >
        Add Goal
      </Button>
    </div>
  );
}
