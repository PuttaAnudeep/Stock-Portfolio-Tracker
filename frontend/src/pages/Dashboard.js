import React, { useState, useEffect } from "react";
import StockCard from "../components/StockCard";
import axios from "axios";
import PortfolioInsights from "./PortfolioInsights";
const Base_Url = process.env.REACT_APP_Backend_Url;
console.log(Base_Url);
const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalPortfolio, setTotalPortfolio] = useState(0);
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${Base_Url}/stocks-api/`);
        setStocks(response.data);
        const totalValue = calculateTotalPortfolio(response.data);
        setTotalPortfolio(totalValue)
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);
  const calculateTotalPortfolio = (stocks) => {
    return stocks.reduce((accumulator, stock) => {
      const stockQuantity = parseFloat(stock.quantity) || 0;
      const stockCurrentPrice = parseFloat(stock.currentPrice) || 0;
      return accumulator + stockQuantity * stockCurrentPrice;
    }, 0);
  };
  return (
    <div className="bg-grey-100 min-h-screen ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Welcome to Your Portfolio</h1>
        <div>
          <p className="text-center mb-8 text-gray-700 font-semibold">Track your investments, monitor growth, and unlock insights to maximize your portfolio's potential.</p>
          <div className="text-right mb-6">
            <h2 className="text-2xl text-green-600">Your Portfolio Value:</h2>
            <p className="text-xl font-semibold text-gray-700">${totalPortfolio.toFixed(2)}</p>
          </div>
        </div>
        <PortfolioInsights />
        <br></br>
        <div className="flex-end mb-6">
          <p className="text-xl font-serif font-bold text-center mb-4 text-blue-700">Stock Summary</p>
        </div>

        {/* Display stock cards if showStockCards is true */}
        {(
          <div className="grid grid-cols-4 gap-6">
            {stocks.map((stock) => (
              <StockCard
                key={stock._id}
                stock={stock}
                className="w-60 h-85 bg-white p-4 shadow-lg rounded-md transition duration-300 hover:shadow-xl"
              />
            ))}
          </div>
        )}

        <div className="mt-12">
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
