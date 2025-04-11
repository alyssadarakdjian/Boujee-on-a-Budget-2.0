'use client';

import { Button } from "@/components/ui/button"; // Custom Button
import { Input } from "@/components/ui/input"; // Custom Input
import { db } from '@/lib/dbConfig'; // Database logic
import { toast } from 'sonner'; // For toast notifications

function EditSavingsGoalModal({ goal, onClose, refreshData }) {
  const [name, setName] = useState(goal.name);
  const [targetamount, setTargetamount] = useState(goal.targetamount);
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await db
        .update(SavingsGoals)
        .set({ name, targetamount, currentAmount })
        .where({ id: goal.id });

      toast.success('Savings goal updated!');
      refreshData(); // Refresh the list of goals
      onClose(); // Close modal
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update savings goal.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">Edit Savings Goal</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-pink-500 font-medium">Goal Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-pink-400 focus:ring-pink-500"
            />
          </div>
          <div className="mt-4">
            <label className="text-pink-500 font-medium">Target Amount ($)</label>
            <Input
              type="number"
              value={targetamount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-3 border-pink-400 focus:ring-pink-500"
            />
          </div>
          <div className="mt-4">
            <label className="text-pink-500 font-medium">Current Amount ($)</label>
            <Input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="w-full p-3 border-pink-400 focus:ring-pink-500"
            />
          </div>
          <div className="mt-6 flex justify-between gap-4">
            <Button type="submit" className="bg-pink-500 text-white py-2 w-full">
              Save Changes
            </Button>
            <Button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 w-full">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSavingsGoalModal;
