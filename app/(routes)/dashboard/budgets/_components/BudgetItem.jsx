'use client';

import { Pencil, Trash2 } from 'lucide-react'; // Assuming the icons you want to use
import Link from 'next/link';

function BudgetItem({ budget, onEdit, onDelete, showActions = true }) {
  const isOverBudget = budget.totalSpend > budget.amount;

  const calculateProgressPerc = () => {
    if (!budget.amount || budget.amount === 0) return 0;
    const perc = (budget.totalSpend / budget.amount) * 100;
    return Math.min(perc, 100).toFixed(2); // cap at 100%
  };

  const amountRemaining = budget.amount - (budget.totalSpend || 0);
  const overAmount = Math.abs(amountRemaining).toFixed(2);

  return (
    <Link
      href={`/dashboard/expenses/${budget.id}`} // Link that navigates to the expenses page for the specific budget
      className="relative p-5 border rounded-lg shadow-md hover:shadow-md cursor-pointer h-[190px] flex flex-col justify-between group"
    >
      {/* Action Buttons on Top Left (Only show if showActions is true) */}
      {showActions && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior (i.e., navigation)
              onEdit(budget); // Make sure onEdit is called properly
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior (i.e., navigation)
              onDelete(budget.id); // Ensure onDelete is called with the correct budget ID
            }}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Budget Icon and Name */}
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="text-lg font-semibold text-pink-500">{budget.name}</h2>
            <h2 className="text-gray-500 text-sm">{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-pink-500">${budget.amount}</h2>
      </div>

      {/* Budget Progress Bar */}
      <div className="flex justify-between text-gray-400 text-sm mb-2">
        <span>${budget.totalSpend || 0} Spent</span>
        {isOverBudget ? (
          <span className="text-red-500 font-semibold">Over Budget by ${overAmount}</span>
        ) : (
          <span>${amountRemaining.toFixed(2)} Remaining</span>
        )}
      </div>

      <div className="bg-gray-200 h-2 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isOverBudget ? 'bg-red-500' : 'bg-pink-500'}`}
          style={{
            width: `${calculateProgressPerc()}%`,
          }}
        />
      </div>
    </Link>
  );
}

export default BudgetItem;
