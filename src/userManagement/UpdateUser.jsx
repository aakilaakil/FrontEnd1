import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    axios
      .get("https://backend1-wzsp.onrender.com/user/fetch")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  }, []);

  // Handle the edit button click
  const handleEdit = (user) => {
    setEditingUser(user._id); // Mark the user as being edited by _id
    setEditedData({
      name: user.name,
      email: user.email,
      address: user.address
    });
  };

  // Handle the save operation after editing
  const handleSave = (id) => {
    if (!editedData.name || !editedData.email || !editedData.address) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put(`https://backend1-wzsp.onrender.com/user/updateUser/${id}`, editedData)
      .then((response) => {
        alert("User updated successfully!");
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, ...editedData } : user
          )
        );
        setEditingUser(null); // Exit edit mode
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  // Handle the input changes while editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle the delete operation
  const handleDelete = (id) => {
    axios
      .delete(`https://backend1-wzsp.onrender.com/user/delete/${id}`)
      .then((response) => {
        alert("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="text"
                    name="address"
                    value={editedData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.address
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <button
                    onClick={() => handleSave(user._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      borderRadius: "4px",
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "4px",
                    }}
                  >
                    Update
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
