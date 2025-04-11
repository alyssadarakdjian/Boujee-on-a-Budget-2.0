'use client';

import { db } from '@/lib/dbConfig'; // Database configuration
import { SavingsGoals } from '@/lib/schema'; // Assuming you have a SavingsGoals schema
import { useUser } from '@clerk/nextjs'; // User session handling with Clerk
import { Pencil, Trash2 } from 'lucide-react'; // Icons for Edit and Delete
import { useParams, useRouter } from 'next/navigation'; // For fetching params and navigation
import { useEffect, useState } from 'react';
import { toast } from 'sonner'; // For toast notifications
import EditSavingsGoalModal from '../_components/EditSavingsGoalsModal'; // Modal for editing savings goal

function SavingsGoalsScreen() {
  const { user } = useUser(); // Get user session from Clerk
  const [savingsGoals, setSavingsGoals] = useState([]); // State for savings goals
  const [isEditing, setIsEditing] = useState(false); // For showing edit modal
  const [editingGoal, setEditingGoal] = useState(null); // Store goal to be edited
  const { id } = useParams(); // Get any specific goal id if needed
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-in if not logged in
    } else {
      getSavingsGoals(); // Fetch savings goals once the user is signed in
    }
  }, [user, router]);

  const getSavingsGoals = async () => {
    try {
      const goalsData = await db.select().from(SavingsGoals).where(eq(SavingsGoals.createdBy, user?.primaryEmailAddress?.emailAddress));
      setSavingsGoals(goalsData);
    } catch (error) {
      console.error('Error fetching savings goals:', error);
      toast.error('Failed to load savings goals.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await db.delete(SavingsGoals).where(eq(SavingsGoals.id, goalId));
      toast.success('Savings goal deleted!');
      getSavingsGoals(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete savings goal.');
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal); // Set the goal to be edited
    setIsEditing(true); // Show the edit modal
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-pink-500 mt-4">My Savings Goals 💰</h2>

      {/* Savings goals list */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.length > 0 ? (
          savingsGoals.map((goal) => (
            <div key={goal.id} className="p-5 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-pink-500">{goal.name}</h3>
                  <p className="text-gray-500 text-sm">Target: ${goal.targetamount}</p>
                  <p className="text-gray-500 text-sm">Current: ${goal.currentAmount}</p>
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditGoal(goal)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No savings goals yet.</p>
        )}
      </div>

      {/* Modal for editing savings goal */}
      {isEditing && (
        <EditSavingsGoalModal
          goal={editingGoal}
          onClose={() => setIsEditing(false)}
          refreshData={getSavingsGoals}
        />
      )}
    </div>
  );
}

export default SavingsGoalsScreen;
