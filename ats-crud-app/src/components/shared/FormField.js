import React from 'react';
import './shared.css';

const FormField = ({ name, label, type = 'text', placeholder = '', value, onChange, error, required = true }) => (
  <div className="form-field">
    <label>
      {label} {required && <span className="required">*</span>}
    </label>
    <input 
      className={`form-input ${error ? 'error' : ''}`}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default FormField;
