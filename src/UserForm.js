import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';
import config from './config.json';

function UserForm({ mode }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tempUser, setTempUser] = useState({});
  const [formData, setFormData] = useState({});
  const [changed, setChanged] = useState(false);
  const SERVER_URL = config.SERVER_URL;

  useEffect(() => {
    if (mode === 'create') {
      // Create Mode: Initialize empty user
      setUser({});
      setTempUser({});
      setFormData({});
    } else {
      // View or Edit Mode: Fetch user data
      axios.get(`${SERVER_URL}/users/${id}`) // Use SERVER_URL here
        .then((response) => {
          if (response.status==200) {
            const userData = response.data;
            setUser(userData);
            setTempUser({ ...userData });
            setFormData(userData);
          } else {
            console.error('Invalid response structure:', response);
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id, mode, SERVER_URL]); // Include SERVER_URL in dependencies

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChanged(true);
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if required fields are missing
    if (
      !tempUser.firstName ||
      !tempUser.lastName ||
      !tempUser.email ||
      !tempUser.phoneNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (mode === 'create') {
      axios.post(`${SERVER_URL}/users`, tempUser)
        .then((response) => {
          if (response.status === 200) {
            window.location.href = `../`;
          } else {
            console.error('Invalid response structure:', response);
          }
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    } else if (mode === 'edit') {
      axios.put(`${SERVER_URL}/users/${id}`, tempUser)
        .then((response) => {
          if (response.status === 200) {
            window.location.href = `../`;
          } else {
            console.error('Invalid response structure:', response);
          }
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };
  

  return (
    <div className="UserForm">
      <h2>{mode === 'create' ? 'Create User' : mode === 'edit' ? 'Edit User' : 'View User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="_id"
            value={tempUser._id || ''}
            onChange={handleInputChange}
            readOnly={mode!='create' }
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={tempUser.firstName || ''}
            onChange={handleInputChange}
            readOnly={mode === 'view'}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={tempUser.lastName || ''}
            onChange={handleInputChange}
            readOnly={mode === 'view'}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={tempUser.email || ''}
            onChange={handleInputChange}
            readOnly={mode === 'view'}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={tempUser.phoneNumber || ''}
            onChange={handleInputChange}
            readOnly={mode === 'view'}
          />
        </div>

        {mode === 'view' ? (
          <div></div>
        ) : (
          <div>
            <button type="submit" disabled={!changed}>
              Save Changes
            </button>
            <button type="button" onClick={() => {setTempUser(user);   window.location.href = `../`;}}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserForm;
