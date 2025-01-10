import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
//import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import axios from 'axios'
const API_KEY='JY6HOCG8J6IA295J'
const PortfolioInsights = () => {
  const [distribution, setDistribution] = useState([]);
 // const [performance, setPerformance] = useState([]);
  const [growth, setGrowth] = useState([]);

  useEffect(() => {
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
  }, []);


  return (
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
  );
};
export default PortfolioInsights;
