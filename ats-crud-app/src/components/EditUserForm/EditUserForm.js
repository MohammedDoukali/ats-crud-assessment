import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LuUserRound } from "react-icons/lu";
import { FormField, SuccessModal, PageHeader, LoadingState } from '../shared';
import '../AddUserForm/AddUserForm.css';

// Constants
const API_BASE_URL = 'http://localhost:8080/api/user';
const EMAIL_REGEX = /\S+@\S+\.\S+/;

// Initial form state
const INITIAL_FORM_DATA = {
  email: '',
  firstName: '',
  lastName: ''
};

function EditUserForm() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');
  const [userNotFound, setUserNotFound] = useState(false);

  // Effects
  useEffect(() => {
    fetchUser();
  }, [id]);

  // API Functions
  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      
      if (response.ok) {
        const userData = await response.json();
        setFormData({
          email: userData.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || ''
        });
        setUserNotFound(false);
      } else if (response.status === 404) {
        setUserNotFound(true);
        showModalMessage('User not found', 'error');
      } else {
        showModalMessage('Failed to load user data', 'error');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      showModalMessage('Network error. Please check your connection.', 'error');
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Validation Functions
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modal Functions
  const showModalMessage = (message, type = 'success') => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === 'success') {
      setTimeout(() => navigate('/'), 300);
    }
  };

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showModalMessage('User updated successfully!', 'success');
      } else {
        const errorData = await response.json();
        showModalMessage(errorData.message || 'Failed to update user. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showModalMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Early returns for different states
  if (isLoadingUser) {
    return (
      <LoadingState
        title="Edit User"
        subtitle="Loading user data..."
        message="Loading user information..."
      />
    );
  }

  if (userNotFound) {
    return (
      <div className="form-container">
        <PageHeader 
          title="Edit User"
          subtitle="User not found"
          onBack={() => navigate('/')}
        />
        <div className="form-content">
          <div className="form-wrapper">
            <div className="empty-state">
              <i className="fas fa-user-slash"></i>
              <h2>User Not Found</h2>
              <p>The user with ID {id} could not be found.</p>
              <button className="btn-create" onClick={() => navigate('/')}>
                Back to User List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="form-container">
      <PageHeader 
        title="Edit User"
        subtitle="Update user information in the system"
        onBack={() => navigate('/')}
      />
      
      <div className="form-content">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="section-header">
                <div className="section-header-with-icon">
                  <LuUserRound size={20} color="#6b7280"/>
                  <h2>User Information</h2>
                </div>
                <p>Please fill in all required fields marked with an asterisk (*)</p>
              </div>
              
              <div className="form-grid">
                <FormField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <FormField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
                <FormField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => navigate('/')}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`btn-create ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading && <div className="loading-spinner"></div>}
                {isLoading ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal
        show={showModal}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default EditUserForm;
