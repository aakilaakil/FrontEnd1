import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();

  // Fetching the user list when the component mounts
  useEffect(() => {
    axios
      .get("https://backend1-wzsp.onrender.com/user/fetch")
      .then((data) => {
        setUsers(data.data); // Updating state with fetched data
      })
      .catch((err) => {
        console.log(err); // Logging any error during fetch
      });
  }, []);

  // Handle user deletion
  const handleDelete = (userEmail) => {
    let id = users.find((val) => {
      return val.email === userEmail;
    });
    axios
      .delete(`https://backend1-wzsp.onrender.com/user/delete/${id._id}`)
      .then((response) => {
        alert("User deleted successfully!"); // Show success message
        setUsers(users.filter((user) => user.email !== userEmail)); // Remove user from state
      })
      .catch((err) => {
        console.error("Error deleting user:", err); // Log error if delete fails
        alert("Failed to delete user. Please try again.");
      });
  };

  return (
    <div style={containerStyle}>
      <h1>User List</h1>
    

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th> {/* Column for actions */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {/* Delete button for each user */}
                  <button onClick={() => handleDelete(user.email)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={() => {Navigate('/')}} style={homeButtonStyle}>
        Click to Home
      </button>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "black", // Light background color
  padding: "20px",
  color: "white",
  minHeight: "100vh",
};

const tableStyle = {
  width: "80%",
  marginTop: "20px",
  borderCollapse: "collapse",
  backgroundColor: "white", // White background for table
  color: "black", // Black text for clarity
  borderRadius: "4px",
  border: "1px solid #ddd",
};

const linkStyle = {
  color: "lightblue",
  fontSize: "18px",
  textDecoration: "none",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#f44336", // Red color for delete button
  color: "white",
  border: "none",
  borderRadius: "4px",
};

const homeButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff", // Blue color for home button
  color: "white",
  border: "none",
  borderRadius: "4px",
  marginTop: "20px",
  cursor: "pointer",
};

export default User;
