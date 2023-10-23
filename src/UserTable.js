import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css';
import { Link } from 'react-router-dom';
import config from './config.json';

function UserTable() {
  const [users, setUsers] = useState([]);
  const SERVER_URL = config.SERVER_URL;
 // console.log( SERVER_URL);
  
  

  useEffect(() => {
    axios.get(`${SERVER_URL}/users`)
      .then((response) => {
        if (response.status==200) {
          //console.log(response);
          const users = response.data;
  
          setUsers(users);
        } else {
          console.log(process.env.REACT_APP_SERVER_URL);
          console.error('Invalid response structure:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    axios.delete(`${SERVER_URL}/users/${userId}`)
      .then(() => {
        // Update the state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

  return (
    <div className="UserTable">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button className="create-user-button" onClick={() => {
                    window.location.href = `/viewUser/${user._id}`;
                  }}>View
                  </button>
                </td>
                <td>
                  <button className="create-user-button" onClick={() => {
                    window.location.href = `/editUser/${user._id}`;
                  }}>Edit
                  </button>
                </td>
                <td>
                  <button className="create-user-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/createUser" className="create-user-button">
        Create User
      </Link>
    </div>
  );
}

export default UserTable;
