import React from 'react';
import { Box } from '@mui/material';
import Logo from '../../atoms/Logo/Logo';
import CloseButton from '../../atoms/Buttons/CloseButton';

interface PopupBoxProps {
    onClose: () => void;
    children: React.ReactNode;
}

const PopupBox: React.FC<PopupBoxProps> = ({ onClose, children }) => {
    return (
        <Box sx={{
            width: "25vw",
            padding: "50px 0px",
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#272C48',
            borderRadius: 10,
            border: '2px solid rgba(255, 255, 255, 0.5)',
        }}>
            <Logo />
            <CloseButton onClose={onClose} />
            {children}
        </Box>
    );
};

export default PopupBox;
