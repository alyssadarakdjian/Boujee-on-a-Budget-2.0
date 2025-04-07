import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Budgets } from '@/lib/schema';
import React from 'react'

function AddExpense(budgetId,user,refreshData) {
    const [name,setName]=useState();
    const [amount,setAmount]=useState();
    const addNewExpense=async()=>{
        const result=await db.instert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id});

        console.log(result);
        if(result) {
            refreshData()
            toast('New Expense Added!')
        }
    }
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-pink-400 font-medium my-1">Expense Name</h2>
                <Input placeholder="e.g. Bedroom Decor" onChange={(e) => setName(e.target.value)}
                    className="border-pink-400 focus:ring-pink-500" />
            </div>
            <div className="mt-2">
                <h2 className="text-pink-400 font-medium my-1">Expense Amount</h2>
                <Input
                    placeholder="e.g. 1000"
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-pink-400 focus:ring-pink-500"
                />
            </div>
            <Button disabled={!(name&&amount)}
            onClick={()=>addNewExpense()}
            className='mt-3 w-full'>Add New Expense</Button>
        </div>
    )
}

export default AddExpense