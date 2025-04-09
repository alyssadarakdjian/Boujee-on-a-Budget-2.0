'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/dbConfig';
import { Budgets } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import { toast } from 'sonner';

function EditBudgetModal({ budget, onClose, refresh }) {
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.amount);
  const [icon, setIcon] = useState(budget.icon || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !amount) {
      toast.warning('Name and amount are required');
      return;
    }

    try {
      setLoading(true);
      await db
        .update(Budgets)
        .set({
          name,
          amount: Number(amount),
          icon,
        })
        .where(eq(Budgets.id, budget.id));

      toast.success('Budget updated!');
      onClose();
      refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update budget.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative transition-all duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-pink-500 mb-4">Edit Budget</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Icon</label>
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            {loading ? 'Updating...' : 'Update Budget'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditBudgetModal;
