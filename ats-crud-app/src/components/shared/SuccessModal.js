import React from 'react';
import './shared.css';

const SuccessModal = ({ show, type, message, onClose }) => (
  show && (
    <div className="success-overlay">
      <div className={`success-modal ${type}`}>
        <div className="success-icon">
          {type === 'success' ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="fas fa-exclamation-circle"></i>
          )}
        </div>
        <h3>{type === 'success' ? 'Success!' : 'Error'}</h3>
        <p>{message}</p>
        <button 
          className={`success-ok-button ${type}`}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  )
);

export default SuccessModal;
