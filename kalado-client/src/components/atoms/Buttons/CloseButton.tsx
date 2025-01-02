import React from 'react';
import { useTheme } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import Button from './CustomButton';

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
    const theme = useTheme();

    return (
        <Button
            onClick={onClose}
            style={{
                color: theme.palette.primary.main,
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
