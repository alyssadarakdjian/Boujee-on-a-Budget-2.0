import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({ expensesData, budgetsData }) => {
  if (!expensesData || expensesData.length === 0) {
    return <div>No data for expenses.</div>;
  }

  // Create a map to associate each budget with a unique, brighter pastel color
  const budgetColors = budgetsData.reduce((acc, budget, index) => {
    const color = `hsl(${(index * 360) / budgetsData.length}, 90%, 83%)`; // Brighter pastel: Higher saturation and lightness
    acc[budget.id] = color; // Map budget id to the color
    return acc;
  }, {});

  // Map expenses to ensure they have the correct budget name and color
  const expensesWithColors = expensesData.map((expense) => {
    const associatedBudget = budgetsData.find(budget => budget.id === expense.budgetId);
    const color = associatedBudget ? budgetColors[expense.budgetId] : 'rgba(200, 200, 200, 0.6)'; // Default color if no match
    return { ...expense, color: color, budgetName: associatedBudget ? associatedBudget.name : 'Uncategorized' };
  });

  const chartData = {
    labels: expensesWithColors.map((expense) => expense.name), // Use expense names as labels
    datasets: [
      {
        data: expensesWithColors.map((expense) => expense.amount), // Use expense amounts for the data
        backgroundColor: expensesWithColors.map((expense) => expense.color), // Apply the brighter pastel colors
      },
    ],
  };

  const options = {
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Disable aspect ratio maintenance for free scaling
    plugins: {
      legend: {
        display: true, // Enable the legend
        position: 'top', // Set the position to left for a vertical layout
        labels: {
          boxWidth: 20, // Adjust the size of the legend box
          padding: 15, // Space between legend items
          usePointStyle: true, // Use circular points for the legend items
          generateLabels: function (chart) {
            const budgetNames = budgetsData.map((budget) => budget.name);
            return budgetNames.map((name, index) => {
              return {
                text: name,
                fillStyle: budgetColors[budgetsData[index].id], // Color based on the budget's color
                strokeStyle: budgetColors[budgetsData[index].id], // Stroke for the legend item
                lineWidth: 1,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const expenseName = tooltipItem.label;
            const expenseAmount = tooltipItem.raw;
            return `${expenseName}: $${expenseAmount}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <h2 className="p-3 text-2xl font-semibold text-pink-500">Expenses Breakdown</h2>

      {/* Display the Pie chart with a larger size */}
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpensesChart;
