import React from 'react';
import './shared.css';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, confirmText = "Yes", cancelText = "Cancel", type = "default" }) => (
  show && (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <div className="popup-buttons">
          <button onClick={onConfirm} className={`btn-confirm ${type === 'danger' ? 'danger' : ''}`}>{confirmText}</button>
          <button onClick={onCancel} className="btn-cancel">{cancelText}</button>
        </div>
      </div>
    </div>
  )
);

export default ConfirmModal;
