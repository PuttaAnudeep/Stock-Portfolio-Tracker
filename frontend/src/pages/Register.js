import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import background_img from "../assets/image2.png";
const Base_Url = process.env.REACT_APP_Backend_Url;
console.log(Base_Url);
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request with user data
      const response = await axios.post(`${Base_Url}/users-api/register`, {
        name,
        email,
        password,
      });
      // Check if the registration was successful
      if (response.status) {
        navigate("/login"); // Redirect to login page
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      // Handle errors
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  const backgroundStyle = {
      backgroundImage: `url('${background_img}')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '76vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  return (
    <div style={backgroundStyle}>
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default Register;
