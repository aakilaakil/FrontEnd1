import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Createuser = () => {
  // State to manage form data, including name, email, and address
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "", // Add address field
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server
    axios
      .post("https://backend1-wzsp.onrender.com/user/create", formData)
      .then((response) => {
        alert("User created successfully!");
        navigate("/"); // Redirect to home or user list after successful creation
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        alert("Failed to create user. Please try again.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black", // Light background color
        height: "100vh", // Full height
        justifyContent: "center", // Center content vertically
      }}
    >
      <h1>Create User</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          width: "300px",
          padding: "20px",
          backgroundColor: "#ffffff", // Form background color
          borderRadius: "8px", // Rounded corners for the form
          color: "black",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <label>
          Name : 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email : 
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address : 
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Create User
        </button>
      </form>
      <Link
        to="/"
        style={{
          marginTop: "20px",
          textDecoration: "none",
          color: "#007bff",
        }}
      >
        Back to User List
      </Link>
    </div>
  );
};

export default Createuser;
