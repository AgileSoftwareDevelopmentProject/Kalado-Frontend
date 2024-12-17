import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './CustomButton';

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
    return (
        <Button
            onClick={onClose}
            style={{
                color: 'white',
                backgroundColor: 'transparent',
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '0',
            }}
        >
            <FaTimes size={24} />
        </Button>
    );
};

export default CloseButton;
