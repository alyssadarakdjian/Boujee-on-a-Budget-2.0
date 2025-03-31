"use client"

import { getTableColumns } from 'drizzle-orm';
import React from 'react'
import Link from "next/link";

<Link href="/dashboard">Go to Dashboard</Link>

function ExpensesScreen({params}) { 
    const {user}=useUser();
    const[budgetInfo,setbudgetInfo]=useState();
    useEffect(()=>{
      
        user&&getBudgetInfo();
    },[user]);

    const getBudgetInfo=async()=>{
        const result = await db
        .select({
            ...getTableColumns(Budgets),
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          createdBy: Budgets.createdBy,
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id,params.id))
        .groupBy(Budgets.id)

        setbudgetInfo(result[0]);
        
       
    }
    
    return (
        <div className='p=10'>
            <h2 className='text-2xl font-bold'>My Expenses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6'>
                {budgetInfo? <BudgetItem
                budget={budgetInfo}
                />:
                <div className='h-[150px] w-full bg-slate rounded-lg animate-pulse'>

                </div>}

            </div>
        </div>
    )
}

export default ExpensesScreen



