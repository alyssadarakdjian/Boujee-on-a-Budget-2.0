'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import BudgetsChart from './_components/BudgetsChart';
import ExpensesChart from './_components/ExpensesChart';
import FinancialSummary from './_components/FinancialSummary';
import SavingsGoalsChart from './_components/SavingsGoalsChart';

const ReportingAndInsightsPage = () => {
  const { user, isSignedIn } = useUser();
  const [budgetsData, setBudgetsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [savingsGoalsData, setSavingsGoalsData] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    totalSaved: 0,
    totalSpent: 0,
    remainingBudget: 0,
    goalsCompleted: 0
  });
  const [loading, setLoading] = useState(true);

  if (!isSignedIn) {
    return <div>Please sign in to view your financial summary.</div>;
  }

  const email = user.primaryEmailAddress.emailAddress;

  // Fetch data for budgets, expenses, and savings goals
  useEffect(() => {
    async function fetchData() {
      try {
        const budgetsResponse = await fetch(`/api/budgets?email=${email}`);
        const expensesResponse = await fetch(`/api/expenses?email=${email}`);
        const savingsGoalsResponse = await fetch(`/api/savings-goals?email=${email}`);
  
        const budgets = await budgetsResponse.json();
        const expenses = await expensesResponse.json();
        const savingsGoals = await savingsGoalsResponse.json();
  
        console.log("Fetched Budgets Data:", budgets);
        console.log("Fetched Expenses Data:", expenses);
        console.log("Fetched Savings Goals Data:", savingsGoals);
  
        setBudgetsData(budgets);
        setSavingsGoalsData(savingsGoals);

        // Add budgetName to expensesData
        const expensesWithBudget = expenses.map(expense => {
          const associatedBudget = budgets.find(budget => budget.id === expense.budgetId);
          expense.budgetName = associatedBudget ? associatedBudget.name : 'Uncategorized';  // Adding the budget name
          return expense;
        });
  
        setExpensesData(expensesWithBudget);
  
        // Recalculate the financial summary after data fetch
        const totalSaved = savingsGoals.reduce(
          (total, goal) => total + (parseFloat(goal.currentAmount) || 0),
          0
        );
        const totalSpent = expenses.reduce(
          (total, expense) => total + (parseFloat(expense.amount) || 0),
          0
        );
  
        // Calculate the remaining budget for each budget
        const remainingBudget = budgets.reduce(
            (total, budget) => total + (parseFloat(budget.amount) - (parseFloat(budget.totalSpend) || 0)),
            0
        );
  
        // Calculate Goals Completed based on currentAmount vs targetAmount
        const goalsCompleted = savingsGoals.filter(
          (goal) => parseFloat(goal.currentAmount) >= parseFloat(goal.targetamount)
        ).length;
  
        setFinancialSummary({
          totalSaved,
          totalSpent,
          remainingBudget,  // Pass the correct remaining budget value here
          goalsCompleted
        });
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  
      }
    }
  
    fetchData();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!budgetsData.length || !expensesData.length || !savingsGoalsData.length) {
    return <div>No data available for reports.</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">Reports & Insights 📊</h1> {/* Title added here */}
      
      <FinancialSummary
        totalSaved={financialSummary.totalSaved}
        totalSpent={financialSummary.totalSpent}
        remainingBudget={financialSummary.remainingBudget}
        goalsCompleted={financialSummary.goalsCompleted}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <BudgetsChart budgetsData={budgetsData} />
        <ExpensesChart expensesData={expensesData} budgetsData={budgetsData} /> {/* Ensure data is passed correctly */}
        <SavingsGoalsChart savingsGoalsData={savingsGoalsData} />
      </div>
    </div>
  );
};

export default ReportingAndInsightsPage;
