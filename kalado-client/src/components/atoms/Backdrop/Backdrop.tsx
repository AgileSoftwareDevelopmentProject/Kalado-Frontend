import React from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';

interface BackdropProps {
    open: boolean; // Add an open prop to control visibility
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClick, children }) => {
    return (
        <MuiBackdrop
            open={open}
            onClick={onClick}
            sx={{
                backgroundColor: 'rgba(39, 44, 72, 0.7)',
                zIndex: 100,
            }}
        >
            {children}
        </MuiBackdrop>
    );
};

export default Backdrop;
