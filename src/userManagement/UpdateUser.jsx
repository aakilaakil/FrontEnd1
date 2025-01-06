import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);

  // Fetching the user list on component mount
  useEffect(() => {
    axios
      .get("https://crud-mwcx.onrender.com/user/fetch")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle user deletion
  const handleDelete = (userEmail) => {
    axios
      .delete(`https://crud-mwcx.onrender.com/user/update/${userEmail}`)
      .then((response) => {
        alert("User deleted successfully!");
        // Update the user list after successful deletion
        setUsers(users.filter((user) => user.email !== userEmail));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Please try again.");
      });
  };

  return (
    <div>
      <ol>
        <li>
          <Link to="/CreateUser">Click To Create </Link>
        </li>
        <li>
          <Link to="/UpdateUser">Click To UpdateUser </Link>
        </li>
        <li>
          <Link to="/DeleteUser">Click To DeleteUser </Link>
        </li>
      </ol>
      <h1>User:</h1>
      <table border={5}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                {/* Update and Delete Buttons */}
                <Link
                  to={`/UpdateUser/${user.email}`}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
