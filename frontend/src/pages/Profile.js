import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <form onSubmit={handleUpdate}>
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
