import React from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary chart components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = ({ data }) => {
  // Validate that data is an object and contains the necessary keys
  if (typeof data !== "object" || data === null) {
    console.error("LineChart expects 'data' to be an object. Received:", data);
    return <div>Error: Data is not an object</div>;
  }

  // Extract dates and closing prices from the object and convert 'close' values to numbers
  const formattedData = Object.keys(data).map((date) => {
    return {
      date: date, // Date (e.g., '1999-12-31')
      close: parseFloat(data[date].close), // Close price (converted to a number)
      //open:parseFloat(data[date].open),
    };
  });

  // Ensure formattedData is an array
  if (!Array.isArray(formattedData)) {
    console.error("LineChart formattedData should be an array. Received:", formattedData);
    return <div>Error: Data is not formatted correctly</div>;
  }

  const chartData = {
    labels: formattedData.map((item) => item.date), // Dates on the x-axis
    datasets: [
      {
        label: "Closing Price", // Dataset label for the line
        data: formattedData.map((item) => item.close), // Closing prices on the y-axis
        borderColor: "rgb(75, 192, 124)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the line
        tension: 0.1, // Smooth curve
        pointRadius: 3, // Size of the points on the chart
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Stock Prices (Closing)", // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date", // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)", // Y-axis title
        },
        beginAtZero: false, // Do not start the y-axis from 0, as prices are always positive
        min: Math.min(...formattedData.map((item) => item.close)) , // Adjust min to better show data points
        max: Math.max(...formattedData.map((item) => item.close)) , // Adjust max for better scaling
      },
    },
  };

  return (

    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
