'use client';

import { Pencil, Trash2 } from 'lucide-react';

function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="p-5 border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-pink-500">{expense.name}</h2>
          <p className="text-gray-500 text-sm">${expense.amount}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit(expense);  // Trigger the onEdit function
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(expense.id);  // Trigger the onDelete function
            }}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
