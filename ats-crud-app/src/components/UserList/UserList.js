import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SuccessModal, ConfirmModal, PageHeader, LoadingState } from '../shared';
import './UserList.css';

// Constants
const API_BASE_URL = 'http://localhost:8080/api/user';

function UserList() {
  // Hooks
  const navigate = useNavigate();

  // State management
  const [users, setUsers] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effects
  useEffect(() => {
    fetchUsers();
  }, []);

  // API Functions
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please check your connection and try again.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal Functions
  const showModalMessage = (message, type = 'success') => {
    setMessage(message);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // Event Handlers
  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete({ id: userId, name: `${user.firstName} ${user.lastName}` });
    setShowDeleteConfirm(true);
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleRetry = () => {
    fetchUsers();
  };

  // Delete Functions
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userToDelete.id}`);
      
      if (response.status === 200) {
        showModalMessage('User deleted successfully!', 'success');
        fetchUsers(); // Refresh the user list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showModalMessage('Failed to delete user. Please try again.', 'error');
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // Render Helper Components
  const renderTableHeader = () => (
    <div className="table-header">
      <div className="table-info">
        <h2>Users</h2>
        <p>A comprehensive list of all users in the system</p>
      </div>
      <button className="add-button">
        <Link to="/add-user">+ Add User</Link>
      </button>
    </div>
  );

  const renderUserRow = (user, index) => (
    <tr key={user.id}>
      <td data-label="Index">{index + 1}</td>
      <td data-label="FirstName">{user.firstName}</td>
      <td data-label="LastName">{user.lastName}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Actions">
        <button 
          className="edit-button"
          onClick={() => handleEditUser(user.id)}
        >
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
  );

  // Early returns for different states
  if (isLoading) {
    return (
      <LoadingState
        title="User Management"
        subtitle="Manage and organize user accounts"
        message="Loading users..."
      />
    );
  }

  if (error) {
    return (
      <div className="container">
        <PageHeader 
          title="User Management"
          subtitle="Manage and organize user accounts"
        />
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

  if (users.length === 0) {
    return (
      <div className="container">
        <PageHeader 
          title="User Management"
          subtitle="Manage and organize user accounts"
        />
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

  // Main render
  return (
    <div className="container">
      <PageHeader 
        title="User Management"
        subtitle="Manage and organize user accounts"
      />
      
      <div className="table-container">
        {renderTableHeader()}
        
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
            {users.map((user, index) => renderUserRow(user, index))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        show={showDeleteConfirm}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${userToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <SuccessModal
        show={showMessage}
        type={messageType}
        message={message}
        onClose={() => setShowMessage(false)}
      />
    </div>
  );
}

export default UserList;