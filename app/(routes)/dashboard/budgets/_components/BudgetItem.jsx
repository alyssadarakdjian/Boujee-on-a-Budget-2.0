import Link from 'next/link'
import React from 'react'

function BudgetItem({ budget }) {

    const calculateProgressPerc=()=>{
      const perc=(budget.totalSpend/budget.amount)*100;
      return perc.toFixed(2);
    }
    return (
      <Link href={'/dashboard/expenses/'+budget?.id} className="p-5 border rounded-lg 
      shadow-md hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
            
            <div>
              <h2 className="text-lg font-semibold text-pink-500">{budget.name}</h2>
              <h2 className="text-gray-500 text-sm">{budget.totalItem} Items</h2>
            </div>

        </div>
          <h2 className="text-2xl font-bold text-pink-500">${budget.amount}</h2>
        </div>

        <div className="flex justify-between text-gray-400 text-sm mb-3">
          <span>${budget.totalSpend || 0} Spent</span>
          <span>${budget.amount - (budget.totalSpend || 0)} Remaining</span>

        </div>
        <div className="bg-gray-200 h-2 
        rounded-full">
          <div className="bg-pink-500 h-2 
          rounded-full"
          style={{
            width:'${calculateProgressPerc()}%'
          }}>
            </div>
        </div>
      </Link>
    );
}

export default BudgetItem;

