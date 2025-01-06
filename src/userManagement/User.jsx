import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const User = () => {
    const [users, setUsers] = React.useState([])

    useEffect(() => {
        axios.get('https://backend1-wzsp.onrender.com/user/fetch')
            .then(data => {
                setUsers(data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // State to handle button hover
    const [hoveredButton, setHoveredButton] = React.useState(null);

    const handleMouseEnter = (button) => {
        setHoveredButton(button);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div>
            {/* Navbar with buttons */}
            <nav style={navStyle}>
                <button 
                    style={buttonStyle(hoveredButton === 'create')}
                    onMouseEnter={() => handleMouseEnter('create')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to='/CreateUser' style={linkStyle}>Create User</Link>
                </button>
                <button 
                    style={buttonStyle(hoveredButton === 'update')}
                    onMouseEnter={() => handleMouseEnter('update')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to='/UpdateUser' style={linkStyle}>Update User</Link>
                </button>
                <button 
                    style={buttonStyle(hoveredButton === 'delete')}
                    onMouseEnter={() => handleMouseEnter('delete')}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to='/DeleteUser' style={linkStyle}>Delete User</Link>
                </button>
            </nav>

            <div style={containerStyle}>
                <h1>User:</h1>

                <table style={tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Navbar style
const navStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Distribute the buttons evenly
    width: '100%',
    marginBottom: '20px'
};

// Function to generate button style, including hover effect
const buttonStyle = (isHovered) => ({
    backgroundColor: isHovered ? '#0056b3' : '#007bff', // Change color when hovered
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1, // Makes the buttons take equal width
    margin: '0 5px', // Adds spacing between the buttons
    borderRadius: '4px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease', // Smooth transition effect
});

const linkStyle = {
    textDecoration: 'none',
    color: 'white'
};

const containerStyle = {
    maxWidth: '80%', // Sets the maximum width of the container
    margin: '0 auto', // Centers the container horizontally
    textAlign: 'center', // Centers the text in the container
    padding: '20px 0'
};

const tableStyle = {
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
    borderCollapse: 'color', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black', 
    borderRadius: '8px',
    border: '1px solid #ddd',
};

const headerRowStyle = {
    backgroundColor: '#28a745',
    color: 'white', // Set text color to white for better contrast
    fontWeight: 'bold',
    border: '1px solid black', // Add border to header cells
};

export default User;
