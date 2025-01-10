const  express=require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { ObjectId }=require('mongodb')
// Correct!

const StockApp=express.Router()//mini express application

  // Add a new stock
StockApp.post("/", async (req, res) => {
    //get users-collection object from express obj
    const stockCollection=req.app.get('stocksCollection')
    try {
    const { stockName, ticker, quantity, buyPrice, currentPrice } = req.body;

    const newStock = { stockName, ticker, quantity:parseFloat(quantity), buyPrice:parseFloat(buyPrice) ,currentPrice:parseFloat(currentPrice)};
    const result = await stockCollection.insertOne(newStock);
    res.status(201).json({ message: "Stock added successfully", stockId: result.insertedId });
    }
    catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to add stock" });
    }
});

  // Fetch all stocks
StockApp.get("/", async (req, res) => {
    //get users-collection object from express obj
    const stockCollection=req.app.get('stocksCollection')
    try {
    const stocks = await stockCollection.find().toArray();
    res.status(200).json(stocks);
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch stocks" });
    }
});

  // Update stock details
StockApp.put("/:id", async (req, res) => {
    //get users-collection object from express obj
    const stocksCollection=req.app.get('stocksCollection')
    try {
    const stockId = req.params.id;
    console.log(stockId)
    const { stockName, ticker, quantity, buyPrice,currentPrice } = req.body;
    const result = await stocksCollection.updateOne(
        { _id:new ObjectId(stockId)},
        { $set: { stockName, ticker, quantity, buyPrice,currentPrice } }
    );
    console.log(result)
    if (result.matchedCount === 0) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json({ message: "Stock updated successfully" });
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to update stock" });
    }
});

// Delete a stock
StockApp.delete("/:id", async (req, res) => {
    //get users-collection object from express obj
    const stockCollection=req.app.get('stocksCollection')
    try {
    const stockId = req.params.id;
    
    // Perform the delete operation
    const result = await stockCollection.deleteOne({ _id:new ObjectId(stockId)});

   
    if (result.deletedCount === 0) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json({ message: "Stock deleted successfully" });
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to delete stock" });
    }
});

  // Portfolio distribution (Pie Chart data)
StockApp.get("/portfolio-distribution/", async (req, res) => {
    // Get stocks-collection object from the app
    const stockCollection = req.app.get("stocksCollection");

    try {
        const distribution = await stockCollection.aggregate([
        {
            $addFields: {
            // Calculate totalValue for each stock
            totalValue: { $multiply: ["$quantity", "$currentPrice"] },
            // Calculate gain/loss status
            gainOrLoss: {
                $cond: [
                { $gt: [
                        { $multiply: ["$quantity", "$currentPrice"] },
                        {$multiply: ["$quantity", "$buyPrice"] } 
                        ]
                },
                "Gain",
                "Loss",
                ],
            },
            },
        },
        {
            $group: {
            _id: "$stockName", // Group by stock name
            totalQuantity: { $sum: "$quantity" }, // Sum of quantities for each stock
            totalValue: { $sum: "$totalValue" }, // Sum of total values
            gainOrLoss: { $first: "$gainOrLoss" }, // Use gain/loss from the first stock record
            },
        },
        {
            $project: {
            _id: 0, // Exclude the `_id` field
            stockName: "$_id", // Rename `_id` to `stockName`
            totalQuantity: 1, // Include totalQuantity
            totalValue: 1, // Include totalValue
            gainOrLoss: 1, // Include gain/loss
            },
        },
    ]).toArray();

      // Respond with the transformed data
    res.status(200).json(distribution);
    } catch (err) {
        console.error("Error fetching portfolio distribution:", err.message);
        res.status(500).json({ message: "Failed to fetch portfolio distribution" });
    }
});


  // Stock performance (Bar Graph data)
StockApp.get("/stock-performance/:portfolioId", async (req, res) => {
    //get users-collection object from express obj
    const stockCollection=req.app.get('stocksCollection')
    try {
    const { portfolioId } = req.params;
    const performance = await stockCollection.aggregate([
        { $match: { portfolioId } },
        {
        $project: {
            stockName: 1,
            performance: { $multiply: ["$quantity", "$buyPrice"] },
        },
        },
    ]).toArray();
    res.status(200).json(performance);
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch stock performance" });
    }
});

module.exports=StockApp