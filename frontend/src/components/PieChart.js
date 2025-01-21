import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

/*const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; // Generates a random color in HSL format
    colors.push(randomColor);
  }
  return colors;
};*/

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
        /*backgroundColor: colors, // Dynamically generated colors
        borderColor: colors.map((color) => color.replace("60%", "50%")),*/
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

/*import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.totalValue),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return <Pie data={chartData} />;
};
export default PieChart;*/
/*import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new ChartJS(chartRef.current, {
        type: "pie", // Chart type
        data: {
          labels: data.labels, // Assuming `data` has `labels` and `values`
          datasets: [
            {
              label: "Portfolio Distribution",
              data: data.values, // The distribution data
              backgroundColor: data.colors, // Assuming `data` has `colors`
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      return () => {
        // Destroy the chart when the component unmounts
        chartInstance.destroy();
      };
    }
  }, [data]); // Re-render when `data` changes

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;*/

