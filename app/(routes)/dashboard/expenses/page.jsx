'use client';

import { useUser } from '@clerk/nextjs';
import { PiggyBank } from 'lucide-react'; // Import Lucide PiggyBank icon
import { useRouter } from 'next/navigation'; // For routing
import { useEffect, useState } from 'react';

function ExpensesScreen() {
  const router = useRouter(); // To handle routing
  const { user } = useUser(); // Get user session from Clerk
  const [selectedBudget, setSelectedBudget] = useState(null); // Track selected budget

  useEffect(() => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-in if the user is not logged in
    }
  }, [user, router]);

  const handleGoToBudgets = () => {
    // Navigate to the budgets screen
    router.push('/dashboard/budgets');
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      {/* Lucide Piggy Bank Icon */}
      <div className="flex justify-center items-center mt-8">
        <PiggyBank className="w-20 h-20 text-pink-500" /> {/* Using Lucide Piggy Bank icon with a refined size */}
      </div>

      {/* Message informing user they haven't selected a budget */}
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">You have not selected a budget</h2>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Please select a budget to view and add expenses.
      </p>

      {/* Button to go to budgets page */}
      <button
        onClick={handleGoToBudgets}
        className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-all duration-200 ease-in-out"
      >
        Go to Budgets
      </button>
    </div>
  );
}

export default ExpensesScreen;

