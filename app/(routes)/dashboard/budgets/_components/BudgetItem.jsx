function BudgetItem({ budget }) {
    return (
      <div className="bg-white p-6 border rounded-lg shadow-md  cursor-pointer hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-pink-100 rounded-full">
              <span className="text-3xl">{budget.icon}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-pink-500">{budget.name}</h2>
              <p className="text-gray-500 text-sm">{budget.totalItem} Items</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-pink-500">${budget.amount}</h3>
        </div>
        <div className="flex justify-between text-gray-400 text-sm mb-3">
          <span>${budget.totalSpend || 0} Spent</span>
          <span>${budget.amount - (budget.totalSpend || 0)} Remaining</span>
        </div>
        <div className="bg-gray-200 h-2 rounded-full">
          <div
            className="bg-pink-500 h-2 rounded-full"
            style={{
              width: `${((budget.totalSpend || 0) / budget.amount) * 100}%`,
            }}
          />
        </div>
      </div>
    );
}

export default BudgetItem;

