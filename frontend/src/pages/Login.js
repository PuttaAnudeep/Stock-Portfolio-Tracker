import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate(); // Navigation hook for redirecting

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/users-api/login", {//fetching database 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json();
      if (response.ok) {
        // Store token in localStorage and redirect to dashboard
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
