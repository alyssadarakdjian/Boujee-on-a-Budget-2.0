const FinancialSummary = ({ totalSaved, totalSpent, remainingBudget, goalsCompleted }) => {
    return (
      <div className="p-5 border rounded-lg shadow-md bg-white mb-6">
        <h2 className="text-2xl font-semibold text-pink-500">Financial Summary</h2>
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Total Saved</p>
            <h3 className="text-2xl font-bold text-green-500">${totalSaved}</h3>
          </div>
          <div>
            <p className="text-gray-500">Total Spent</p>
            <h3 className="text-2xl font-bold text-red-500">${totalSpent}</h3>
          </div>
          <div>
            <p className="text-gray-500">Remaining Budget</p>
            <h3 className="text-2xl font-bold text-blue-500">${remainingBudget}</h3>
          </div>
          <div>
            <p className="text-gray-500">Goals Completed</p>
            <h3 className="text-2xl font-bold text-pink-500">{goalsCompleted} Goals</h3>
          </div>
        </div>
      </div>
    );
  };
  
  export default FinancialSummary;
  