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
      {/* Navbar with buttons */}
      <nav style={styles.navStyle}>
        <button style={styles.buttonStyle}>
          <Link to="/CreateUser" style={styles.linkStyle}>Create User</Link>
        </button>
        <button style={styles.buttonStyle}>
          <Link to="/UpdateUser" style={styles.linkStyle}>Update User</Link>
        </button>
        <button style={styles.buttonStyle}>
          <Link to="/DeleteUser" style={styles.linkStyle}>Delete User</Link>
        </button>
      </nav>

      <h1>User:</h1>

      <div style={styles.containerStyle}>
        <table style={styles.tableStyle}>
          <thead>
            <tr style={styles.headerRowStyle}>
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
                      style={styles.inputStyle}
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
                      style={styles.inputStyle}
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
                      style={styles.inputStyle}
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <button
                      onClick={() => handleSave(user._id)}
                      style={styles.saveButtonStyle}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      style={styles.updateButtonStyle}
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(user._id)}
                    style={styles.deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  // Navbar style
  navStyle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  // Button style for navbar
  buttonStyle: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
    margin: "0 5px",
    borderRadius: "4px",
    textAlign: "center",
  },

  // Link style inside buttons
  linkStyle: {
    textDecoration: "none",
    color: "white",
  },

  // Table container style
  containerStyle: {
    maxWidth: "80%",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px 0",
  },

  // Table style
  tableStyle: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    borderCollapse: "color",
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    color: "black",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },

  // Header row style
  headerRowStyle: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    border: "1px solid black",
  },

  // Input style for editing
  inputStyle: {
    width: "100%",
    padding: "5px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },

  // Save button style
  saveButtonStyle: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "4px",
  },

  // Update button style
  updateButtonStyle: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "4px",
  },

  // Delete button style
  deleteButtonStyle: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    borderRadius: "4px",
    marginLeft: "10px",
  },
};

export default User;
