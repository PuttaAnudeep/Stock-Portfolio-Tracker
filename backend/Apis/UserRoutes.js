const  express=require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserApp=express.Router()//mini express application

  // Register a new user
UserApp.post("/register", async(req, res) => {
    //get users-collection object from express obj
    const usersCollection=req.app.get('usersCollection')
    try {
    const { name, email, password } = req.body;
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to register user" });
    }
});

  // Login a user
UserApp.post("/login", async(req, res) => {
    //get users-collection object from express obj
    const usersCollection=req.app.get('usersCollection')
    try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to log in" });
    }
});

  // Get user details
  const { ObjectId } = require("mongodb"); // Import ObjectId directly from mongodb

  UserApp.get("/:id", async (req, res) => {
    // Get the users-collection object from the Express app
    const usersCollection = req.app.get("usersCollection");
  
    try {
      const userId = req.params.id; // Extract the user ID from the route parameter
  
      // Check if the ID is a valid MongoDB ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      // Find the user in the collection by ID, excluding the password field
      const user = await usersCollection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { password: 0 } } // Exclude the password field
      );
  
      if (!user) {
        // If no user is found, return a 404 response
        return res.status(404).json({ message: "User not found" });
      }
  
      // Respond with the user details
      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user details:", err.message);
  
      // Send a 500 status with a relevant error message
      res.status(500).json({ message: "Failed to fetch user details" });
    }
  });
  
module.exports=UserApp