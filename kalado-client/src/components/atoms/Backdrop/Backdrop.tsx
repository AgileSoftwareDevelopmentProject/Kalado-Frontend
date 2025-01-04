import React from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';

interface BackdropProps {
    open: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClick, children }) => {
    return (
        <MuiBackdrop
            open={open}
            onClick={onClick}
            sx={{
                zIndex: 1500,
            }}
        >
            {children}
        </MuiBackdrop>
    );
};

export default Backdrop;
