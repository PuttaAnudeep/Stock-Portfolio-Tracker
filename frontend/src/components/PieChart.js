import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("PieChart expects 'data' to be an array. Received:", data);
    return <div>Error: Data is not an array</div>;
  }
  //const colors = generateColors(data.length)
  const chartData = {
    labels: data.map((item) => item.stockName), // Ensure `_id` exists
    datasets: [
      {
        label:"Stock Distribution",
        data: data.map((item) => item.totalQuantity), // Ensure `totalValue` exists
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
          "#FF9F40", "#8A89A6", "#E377C2", "#7FDBFF", "#01FF70", 
          "#FF4136", "#B10DC9", "#85144B", "#FFDC00", "#39CCCC", 
          "#3D9970", "#111111", "#AAAAAA", "#FF851B", "#F012BE"
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const stockName = context.label || "";
            const value = context.raw || 0;
            const gainOrLoss = data[context.dataIndex]?.gainOrLoss || "";
            return `${stockName}: ${value} (${gainOrLoss})`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 14,
        },
        formatter: function (value, context) {
          const gainOrLoss = data[context.dataIndex]?.gainOrLoss || "";
          return `$${value}\n(${gainOrLoss})`; // Display total value and gain/loss
        },
      },
    },
  };
  return (
    <div className="bg-pink-200 p-6 rounded-lg shadow-md">
    <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;

