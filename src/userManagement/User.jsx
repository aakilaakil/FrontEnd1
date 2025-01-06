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

    return (
        <div>
            <ol>
                <li> <Link to='/CreateUser'>Click To Create </Link></li>
                <li> <Link to='/UpdateUser'>Click To UpdateUser </Link></li>
                <li> <Link to='/DeleteUser'>Click To DeleteUser </Link></li>
            </ol>
            <h1>User :</h1>
            <table border={5}>
                <thead>
                    <tr>
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
    )
}

export default User
