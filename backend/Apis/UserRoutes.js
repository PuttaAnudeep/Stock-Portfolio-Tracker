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
UserApp.get("/:id", async (req, res) => {
    //get users-collection object from express obj
    const usersCollection=req.app.get('usersCollection')
    try {
    const userId = req.params.id;
    const user = await usersCollection.findOne(
        { _id: new require("mongodb").ObjectId(userId) },
        { projection: { password: 0 } }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch user details" });
    }
});

module.exports=UserApp