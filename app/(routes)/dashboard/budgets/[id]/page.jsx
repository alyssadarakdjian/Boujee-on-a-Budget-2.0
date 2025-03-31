export default async function ExpensePage({ params }) {
    const expenseId = params.id;

    // Fetch data from an API or database
    const res = await fetch(`https://your-api.com/expenses/${expenseId}`, {
        cache: "no-store", // Ensures fresh data each time
    });

    if (!res.ok) {
        return <h1>Expense Not Found</h1>;
    }

    const expense = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{expense.name}</h1>
            <p className="text-gray-600">${expense.amount}</p>
        </div>
    );
}

