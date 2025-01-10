/*import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.stockName),
    datasets: [
      {
        label: "Performance",
        data: data.map((item) => item.performance),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
*//*import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new ChartJS(chartRef.current, {
        type: "bar", // Chart type
        data: {
          labels: data.labels, // Assuming `data` has `labels` and `values`
          datasets: [
            {
              label: "Stock Performance",
              data: data.values, // Stock performance data
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
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
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
*/