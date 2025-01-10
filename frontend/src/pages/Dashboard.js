import React, { useState, useEffect } from "react";
import StockCard from "../components/StockCard";
import { FaBox } from "react-icons/fa"; // Import the stock icon
import axios from "axios";
//import PortfolioInsights from "./PortfolioInsights";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
const API_KEY='JY6HOCG8J6IA295J'
const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalPortfolio, setTotalPortfolio] = useState(0);
  //const [totalPortfolio,setTotalPortfolio]=useState([]);
  const [showStockCards, setShowStockCards] = useState(false); // Toggle visibility of stock cards
  //const [distribution, setDistribution] = useState([]);
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/stocks-api/");
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
  // Function to toggle stock cards' visibility
  const toggleStockCards = () => {
    setShowStockCards(!showStockCards);
  };
  const [distribution, setDistribution] = useState([]);
 // const [performance, setPerformance] = useState([]);
  const [growth, setGrowth] = useState([]);

    const fetchDistribution = async () => {
      const response = await axios.get("/stocks-api/portfolio-distribution");
      setDistribution(response.data);
      console.log(response.data)
    };
/*
    const fetchPerformance = async () => {
      const response = await axios.get("/stocks-api/stock-performance/portfolioId123");
      
      setPerformance(response.data);
    };
  */
    const fetchGrowth = async () => {
      const response = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${API_KEY}');
      // Transform the growth data into an array of { date, close }
      //console.log(response.data)
      const tem=response.data["Monthly Time Series"]
      if (response.data && tem) {
        // Transform the growth data into an array of { date, close }
        const transformedData = Object.keys(tem).map((date) => {
          return {
            date: date, // Date in format 'YYYY-MM-DD'
            close: parseFloat(response.data["Monthly Time Series"][date]["4. close"]), // Close price
          };
        });
        //console.log(transformedData)
        setGrowth(transformedData);
        } 
      else {
        console.error("API response does not contain 'Monthly Time Series'.", response.data);
      }
    };
    
    fetchDistribution();
    //fetchPerformance();
    fetchGrowth();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Welcome to Your Portfolio</h1>
        <div>
          <p className="text-center mb-8 text-gray-700 font-semibold">Track your investments, monitor growth, and unlock insights to maximize your portfolio's potential.</p>
          <div className="text-right mb-6">
            <h2 className="text-2xl text-gray-800">Your Portfolio Value:</h2>
            <p className="text-xl font-semibold text-gray-700">${totalPortfolio.toFixed(2)}</p>
          </div>
        </div>
      <div className="container mx-auto mt-10">
      <div className="grid grid-cols-3 gap-6 flex justify-end">
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-bold mb-4">Portfolio Distribution</h2>
              <PieChart data={distribution} />
            </div>
            <div className="bg-white p-4 shadow-md rounded col-span-2">
              <h2 className="text-xl font-bold mb-4">Portfolio Growth</h2>
              <LineChart data={growth} />         
            </div>
            </div>
          </div>
        {/* Button to toggle stock cards */}
        <div className="flex-end mb-6">
          <button
            className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={toggleStockCards}
          >
            <FaBox size={32} />
          </button>
          <p className="text-xl font-semibold text-gray-700">stock summary</p>
        </div>

        {/* Display stock cards if showStockCards is true */}
        {showStockCards && (
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
