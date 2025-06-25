import React from 'react';
import './shared.css';

const LoadingState = ({ title, subtitle, message = "Loading..." }) => (
  <div className="form-container">
    <div className="form-header">
      <div className="header-container">
        <div className="header-content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
    
    <div className="form-content">
      <div className="form-wrapper">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingState;
