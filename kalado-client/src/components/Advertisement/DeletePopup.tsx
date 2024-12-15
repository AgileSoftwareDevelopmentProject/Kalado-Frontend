import React from 'react';

interface DeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-popup">
      <div className="delete-popup-header">
        <button aria-label="close" className="close-button">✖</button>
      </div>
      <h3>Are you sure you want to delete this item?</h3>
      <div className="delete-popup-buttons">
        <button className="confirm-button" aria-label="confirm" onClick={onConfirm}>✔</button>
        <button className="cancel-button" aria-label="cancel" onClick={onCancel}>✖</button>
      </div>
    </div>
  );
};

export default DeletePopup;