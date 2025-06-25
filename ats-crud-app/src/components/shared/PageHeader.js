import React from 'react';
import './shared.css';

const PageHeader = ({ title, subtitle, onBack, showBackButton = true }) => (
  <div className="form-header">
    <div className="header-container">
      {showBackButton && (
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
      <div className="header-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  </div>
);

export default PageHeader;
