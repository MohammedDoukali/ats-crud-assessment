/**
 * Handles API error responses and returns appropriate error messages
 * @param {Response} response - The fetch response object
 * @param {string} defaultMessage - Default error message if no specific message is found
 * @returns {Promise<string>} - Promise that resolves to the error message
 */
export const handleApiError = async (response, defaultMessage = 'An error occurred. Please try again.') => {
  let errorMessage = defaultMessage;
  
  try {
    const errorData = await response.json();
    
    // Handle different types of errors based on HTTP status codes
    if (response.status === 409) {
      // Conflict - duplicate email
      errorMessage = errorData.message || 'A user with this email already exists. Please use a different email address.';
    } else if (response.status === 400) {
      // Bad request - validation errors
      if (errorData.firstName || errorData.lastName || errorData.email) {
        // Handle field-specific validation errors
        const fieldErrors = [];
        if (errorData.firstName) fieldErrors.push(`First name: ${errorData.firstName}`);
        if (errorData.lastName) fieldErrors.push(`Last name: ${errorData.lastName}`);
        if (errorData.email) fieldErrors.push(`Email: ${errorData.email}`);
        errorMessage = fieldErrors.join(', ');
      } else {
        errorMessage = errorData.message || 'Invalid input data. Please check your entries.';
      }
    } else if (response.status === 404) {
      errorMessage = errorData.message || 'User not found. The user may have been deleted by another user.';
    } else {
      // Other server errors
      errorMessage = errorData.message || errorMessage;
    }
  } catch (parseError) {
    // If response is not JSON, use default message
    console.error('Error parsing response:', parseError);
  }
  
  return errorMessage;
};

/**
 * Handles network errors (connection issues, etc.)
 * @param {Error} error - The network error object
 * @returns {string} - Network error message
 */
export const handleNetworkError = (error) => {
  console.error('Network error:', error);
  return 'Network error. Please check your internet connection and try again.';
};
