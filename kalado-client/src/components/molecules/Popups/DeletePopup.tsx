import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface DeletePopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="delete-popup">
            <h3>{message}</h3>
            <div className="delete-popup-buttons">
                <button className="cancel-button" onClick={onCancel}>
                    <FaTimes size={40} />
                </button>
                <button className="confirm-button" onClick={onConfirm}>
                    <FaCheck size={40} />
                </button>
            </div>
        </div>
    );
};

export default DeletePopup;