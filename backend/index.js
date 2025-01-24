require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoClient = require("mongodb").MongoClient
const cors = require("cors");
// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS for all routes

const MONGO_URI = process.env.MONGO_URI;
const dbName = "portfolioTracker";
let db, usersCollection, stocksCollection;
// Connect to MongoDB
mongoClient.connect(MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true,})
.then((client) =>{ 
    db = client.db(dbName);

    // Pre-fetch collection objects
    usersCollection = db.collection("users");
    stocksCollection = db.collection("stocks");

    // Import and mount routes, passing the collections
    //importing Userapp,stockapp for routes to pass
    const UserApp=require('./Apis/UserRoutes')
    const StockApp=require('./Apis/stockRoutes')
    
    app.set('usersCollection',usersCollection)
    app.set('stocksCollection',stocksCollection)

    app.use("/users-api", UserApp); // User-related routes
    app.use("/stocks-api", StockApp); // Stock-related routes
    
    console.log("MongoDB connected")})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
});

// Default Route
app.get("/", (req, res) => {
    res.send("Portfolio Tracker API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
