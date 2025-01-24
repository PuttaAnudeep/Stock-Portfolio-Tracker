import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Base_Url = process.env.REACT_APP_Backend_Url;
console.log(Base_Url);
const AddEditStock = () => {
  const { id } = useParams(); // Get stock ID from URL for editing
  const navigate = useNavigate();

  const [stockName, setStockName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id ? `${Base_Url}/stocks-api/${id}` : `${Base_Url}/stocks-api/`;
    const method = id ? "PUT" : "POST";

    try {
      const response = await axios(url, {
        method,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ stockName, ticker, quantity, buyPrice,currentPrice }),
      });

      if (response.status) {
        navigate("/stock-list");
      } else {
        console
        .error("Failed to save stock");
      }
    } catch (err) {
      console.error("Error saving stock:", err);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg bg-gray-200 border-2 border-grey-800">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit Stock" : "Add Stock"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Name"
          className="w-full p-2 border rounded mb-4"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ticker"
          className="w-full p-2 border rounded mb-4"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mb-4"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Buy Price"
          className="w-full p-2 border rounded mb-4"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="current Price"
          className="w-full p-2 border rounded mb-4"
          value={currentPrice}
          onChange={(e) => setcurrentPrice(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {id ? "Update Stock" : "Add Stock"}
        </button>
      </form>
    </div>
    
  );
};

export default AddEditStock;
