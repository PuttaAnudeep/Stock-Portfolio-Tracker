import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/stocks-api/");
        //const data = await response.json();
        console.log(response.data)
        if (response.status) {
          setStocks(response.data);
        } else {
          setError("Failed to fetch stocks.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchStocks();
  }, []);
  console.log(stocks)
  const deleteStock = async (id) => {
    try {
      const response = await axios(`/stocks-api/${id}`, { method: "DELETE" });
      if (response.status) {
        setStocks(stocks.filter((stock) => stock._id !== id));
      } else {
        console.error("Failed to delete stock.");
      }
    } catch (err) {
      console.error("Error deleting stock:", err);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Stock List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Stock Name</th>
            <th className="px-4 py-2">Ticker</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Buy Price</th>
            <th className="px-4 py-2">currentPrice</th>
            <th className="px-4 py-2">Gain/Loss</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td className="border px-4 py-2">{stock.stockName}</td>
              <td className="border px-4 py-2">{stock.ticker}</td>
              <td className="border px-4 py-2">{stock.quantity}</td>
              <td className="border px-4 py-2">${stock.buyPrice}</td>
              <td className="border px-4 py-2">${stock.currentPrice}</td>
              <td className="border px-4 py-2">{((stock.currentPrice-stock.buyPrice)*100/stock.buyPrice).toFixed(2)}%</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/edit-stock/${stock._id}`}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteStock(stock._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
