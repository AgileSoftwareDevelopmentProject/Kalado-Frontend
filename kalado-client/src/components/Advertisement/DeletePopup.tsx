import React from 'react';
import './DeletePopup.css';
import '../Common.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface DeletePopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ message, onConfirm, onCancel, onClose }) => {

    return (
        <div className="delete-popup">
            <div className="delete-popup-header">
                <button onClick={onClose} className="close-button" aria-label="close">
                    <FaTimes size={24} color="#FFFFFF" />
                </button>
            </div>
            <h3>{message}</h3>
            <div className="delete-popup-buttons">
                <button className="confirm-button" onClick={onConfirm}>
                    <FaCheck size={60} color="#318C00" />
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    <FaTimes size={60} color="#FF0000" />
                </button>
            </div>
        </div>
    );
};

export default DeletePopup;