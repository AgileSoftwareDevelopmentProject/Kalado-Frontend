import React from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';

interface BackdropProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClose, children }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('MuiBackdrop-root')) {
            onClose();
        }
    };

    return (
        <MuiBackdrop
            open={open}
            onClick={handleBackdropClick}
            sx={{
                zIndex: 1500,
            }}
        >
            {children}
        </MuiBackdrop>
    );
};

export default Backdrop;
