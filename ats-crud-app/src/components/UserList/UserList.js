import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please check your connection and try again.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete({ id: userId, name: `${user.firstName} ${user.lastName}` });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/${userToDelete.id}`);
      
      if (response.status === 200) {
        setMessage('User deleted successfully!');
        setShowMessage(true);
        fetchUsers(); // Refresh the user list
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user. Please try again.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleRetry = () => {
    fetchUsers();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container">
        <header className="header">
          <h1>User Management</h1>
          <p>Manage and organize user accounts</p>
        </header>
        
        <div className="table-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <header className="header">
          <h1>User Management</h1>
          <p>Manage and organize user accounts</p>
        </header>
        
        <div className="table-container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Failed to Load Users</h3>
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Try Again
            </button>
            <button className="add-button" style={{ marginTop: '16px' }}>
              <Link to="/add-user">+ Add User</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (users.length === 0) {
    return (
      <div className="container">
        <header className="header">
          <h1>User Management</h1>
          <p>Manage and organize user accounts</p>
        </header>
        
        <div className="table-container">
          <div className="empty-container">
            <div className="empty-icon">👥</div>
            <h3>No Users Found</h3>
            <p>There are no users in the system yet. Add your first user to get started.</p>
            <button className="add-button">
              <Link to="/add-user">+ Add First User</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>User Management</h1>
        <p>Manage and organize user accounts</p>
      </header>
      
      <div className="table-container">
        <div className="table-header">
          <div className="table-info">
            <h2>Users</h2>
            <p>A comprehensive list of all users in the system</p>
          </div>
          <button className="add-button">
            <Link to="/add-user">+ Add User</Link>
          </button>
        </div>
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td data-label="Index">{index + 1}</td>
                <td data-label="FirstName">{user.firstName}</td>
                <td data-label="LastName">{user.lastName}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Actions">
                  <button className="edit-button">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
            <div className="popup-buttons">
              <button onClick={confirmDelete} className="btn-confirm">Yes, Delete</button>
              <button onClick={cancelDelete} className="btn-cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Message Toast */}
      {showMessage && (
        <div className="message-popup">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default UserList;