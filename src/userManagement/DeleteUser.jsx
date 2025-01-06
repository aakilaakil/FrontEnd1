import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();
  // Fetching the user list when the component mounts
  useEffect(() => {
    axios
      .get("https://crud-mwcx.onrender.com/user/fetch")
      .then((data) => {
        setUsers(data.data); // Updating state with fetched data
      })
      .catch((err) => {
        console.log(err); // Logging any error during fetch
      });
  }, []);

  // Handle user deletion
  const handleDelete = (userEmail) => {
    let id = users.find((val)=>{
        return val.email === userEmail;
    })
    axios
      .delete(`https://crud-mwcx.onrender.com/user/delete/${id._id}`)
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black", // Light background color
        padding: "20px",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>User List</h1>
      <ol>
        <li>
          <Link to="/CreateUser" style={{ color: "lightblue", fontSize: "18px" }}>
            Click To Create User
          </Link>
        </li>
      </ol>
      <table border={5} style={{ width: "80%", marginTop: "20px" }}>
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
                  <button
                    onClick={() => handleDelete(user.email)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
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
      <button onClick = {()=>{Navigate('/')}} >
                    Click to Home
                </button>
    </div>
  );
};

export default User;
