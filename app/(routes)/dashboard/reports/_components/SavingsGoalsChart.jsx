import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsGoalsChart = ({ savingsGoalsData }) => {
  if (!savingsGoalsData || savingsGoalsData.length === 0) {
    return <div>No data for savings goals.</div>;
  }

  // Find the maximum targetAmount and currentAmount
  const maxTargetAmount = Math.max(...savingsGoalsData.map((goal) => goal.targetamount));
  const maxCurrentAmount = Math.max(...savingsGoalsData.map((goal) => goal.currentAmount));

  // Ensure we have some buffer space
  const maxAmount = Math.max(maxTargetAmount, maxCurrentAmount);
  const chartPadding = maxAmount * 0.1; // Adding a 10% padding on top

  const chartData = {
    labels: savingsGoalsData.map((goal) => goal.name),
    datasets: [
      {
        label: 'Current Amount',
        data: savingsGoalsData.map((goal) => goal.currentAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Target Amount',
        data: savingsGoalsData.map((goal) => goal.targetamount),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxAmount + chartPadding, // Dynamically calculate the maximum value for y-axis
      },
    },
  };

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <h2 className="p-3 text-2xl font-semibold text-pink-500">Savings Goals Progress</h2>
      <Bar data={chartData} options={chartOptions} height={5000} width={5000} />
    </div>
  );
};

export default SavingsGoalsChart;
