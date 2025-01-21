import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
//import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import axios from 'axios'
const API_KEY=import.meta.env
console.log(API_KEY)
const PortfolioInsights = () => {
  const [distribution, setDistribution] = useState([]);
 // const [performance, setPerformance] = useState([]);
  const [growth, setGrowth] = useState([]);
  //console.log(API_KEY);
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
      if(tem===undefined){
       const transformedData=[
        { "date": "2022-12-31", "close": 132.50 },
        { "date": "2023-01-31", "close": 135.20 },
        { "date": "2023-02-28", "close": 137.50 },
        { "date": "2023-03-31", "close": 133.80 },
        { "date": "2023-04-30", "close": 136.90 },
        { "date": "2023-05-31", "close": 138.00 },
        { "date": "2023-06-30", "close": 134.50 },
        { "date": "2023-07-31", "close": 140.20 },
        { "date": "2023-08-31", "close": 138.70 },
        { "date": "2023-09-30", "close": 142.30 },
        { "date": "2023-10-31", "close": 139.10 },
        { "date": "2023-11-30", "close": 141.50 },
        { "date": "2023-12-31", "close": 144.00 },
        { "date": "2024-01-31", "close": 146.50 },
        { "date": "2024-02-29", "close": 149.30 },
        { "date": "2024-03-31", "close": 145.00 },
        { "date": "2024-04-30", "close": 148.90 },
        { "date": "2024-05-31", "close": 152.00 },
        { "date": "2024-06-30", "close": 150.70 },
        { "date": "2024-07-31", "close": 154.30 },
        { "date": "2024-08-31", "close": 153.00 },
        { "date": "2024-09-30", "close": 157.40 },
        { "date": "2024-10-31", "close": 160.00 },
        { "date": "2024-11-30", "close": 158.20 },
        { "date": "2024-12-31", "close": 162.50 }
      ]      
      setGrowth(transformedData);       
      }
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
    <div className="container mx-auto mt-8 ">
      <div className="grid grid-cols-3 gap-6 flex justify-end">
        <div className="bg-gray-100 p-4 shadow-md rounded-xl">
          <h2 className="text-xl font-serif text-center font-bold mb-4 text-blue-600">Portfolio Distribution</h2>
          <PieChart data={distribution} />
        </div>
        <div className="bg-gray-100 p-4 shadow-md rounded col-span-2 rounded-xl">
          <h2 className="text-xl font-serif text-center font-bold mb-4 text-blue-600">Portfolio Growth</h2>
          <LineChart data={growth} />         
        </div>
      </div>
    </div>
  );
};
export default PortfolioInsights;
