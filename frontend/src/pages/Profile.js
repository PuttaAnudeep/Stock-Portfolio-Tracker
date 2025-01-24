import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importing the AuthContext to access user information
const Base_Url = process.env.REACT_APP_Backend_Url;
console.log(Base_Url);
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth(); // Access the current user from the AuthContext
  
  // Fetch user details on initial load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          setError("No token found, please log in again.");
          setLoading(false);
          return;
        }
        console.log(token)
        // Check if user.id is available
        if (!user) {
          setError("User ID is missing.");
          setLoading(false);
          return;
        }

        // Make an API call to fetch user details
        const response = await axios.get(`${Base_Url}/users-api`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Debug: Log the response to check its structure
        // Assuming the response contains a data object with name and email
        if (response.status) {
          const { name, email,_id } = response.data; // Correctly accessing response data
          setName(name);
          setEmail(email);
          setUserId(_id);
        } else {
          setError("Failed to fetch user details.");
        }
        setLoading(false);
      } catch (err) {
        console.error(err); // Log the error object to inspect
        setError("An error occurred while fetching user details.");
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    } else {
      setError("User not found.");
      setLoading(false);
    }
  }, [user]);

  // Handle form submission to update the profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        setError("No token found, please log in again.");
        return;
      }
      // Make an API call to update user details
      const response = await axios.put(
        `${Base_Url}/users-api/${userId}`, // Correctly pass the user ID as part of the URL
        { name, email }, // Request body with updated data
        { headers: { Authorization: `Bearer ${token}` } } // Include the authorization token
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating profile.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
