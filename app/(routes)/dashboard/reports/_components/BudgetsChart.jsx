import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetsChart = ({ budgetsData }) => {
  if (!budgetsData || budgetsData.length === 0) {
    return <div>No data for budgets.</div>;
  }

  const chartData = {
    labels: budgetsData.map((budget) => budget.name),
    datasets: [
      {
        label: 'Total Spend',
        data: budgetsData.map((budget) => budget.totalSpend),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Budgeted Amount',
        data: budgetsData.map((budget) => budget.amount),
        backgroundColor: 'rgba(53, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <h2 className="p-3 text-2xl font-semibold text-pink-500">Budgets Overview</h2>
      <Bar data={chartData} width={1000} height={1000} options={{ responsive: true }} /> {/* Adjusted size */}
    </div>
  );
};

export default BudgetsChart;
