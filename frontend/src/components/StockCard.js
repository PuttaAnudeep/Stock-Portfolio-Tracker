const StockCard = ({ stock, className }) => {
  const gainLossPercentage = ((stock.currentPrice - stock.buyPrice) * 100) / stock.buyPrice;

  return (
    <div className={`p-6 shadow-lg bg-gray-200 rounded-xl ${className} transition-transform duration-300 hover:scale-105`}>
      {/* Stock Name and Ticker */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif font-bold text-gray-800 truncate">{stock.stockName}</h2>
        <p className="text-sm text-gray-500">{stock.ticker}</p>
      </div>

      {/* Quantity and Buy Price */}
      <div className="text-lg text-gray-700 mb-2">
        <p>Quantity: <span className="font-medium">{stock.quantity}</span></p>
        <p>Buy Price: <span className="font-medium">${stock.buyPrice}</span></p>
      </div>

      {/* Current Value and Gain/Loss */}
      <div className="text-lg text-gray-700 mt-4">
        <p>
          Current Value:{" "}
          <span className="font-medium text-green-500">
            ${stock.currentPrice}
          </span>
        </p>
        <p className="mt-2">
          Gain/Loss:{" "}
          <span
            className={`font-medium ${
              gainLossPercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {gainLossPercentage >= 0 ? "+" : ""}
            {gainLossPercentage.toFixed(2)}%
          </span>
        </p>
      </div>

      {/* Add Hover effect to make the card interactive */}
      <div className="mt-4">
        <button className="text-sm text-gray-100 hover:underline focus:outline-none">
          View Details
        </button>
      </div>
    </div>
  );
};

export default StockCard;
