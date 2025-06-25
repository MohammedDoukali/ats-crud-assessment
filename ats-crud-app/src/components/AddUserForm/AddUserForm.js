import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuUserRound } from "react-icons/lu";
import { FormField, SuccessModal, PageHeader } from '../shared';
import './AddUserForm.css';

// Constants
const API_BASE_URL = 'http://localhost:8080/api/user';
const EMAIL_REGEX = /\S+@\S+\.\S+/;

// Initial form state
const INITIAL_FORM_DATA = {
  email: '',
  firstName: '',
  lastName: ''
};

function AddUserForm() {
  // Hooks
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

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
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showModalMessage('User created successfully!', 'success');
        setFormData(INITIAL_FORM_DATA); // Reset form
      } else {
        const errorData = await response.json();
        showModalMessage(errorData.message || 'Failed to create user. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showModalMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Main render
  return (
    <div className="form-container">
      <PageHeader 
        title="Add New User"
        subtitle="Create a new user account in the system"
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
                {isLoading ? 'Creating...' : 'Create User'}
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

export default AddUserForm;