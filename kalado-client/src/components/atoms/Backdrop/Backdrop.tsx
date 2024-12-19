import React from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';

interface BackdropProps {
    open: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

const style = {
    backgroundColor: 'rgba(39, 44, 72, 0.7)',
    zIndex: 1300,
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClick, children }) => {
    return (
        <MuiBackdrop
            open={open}
            onClick={onClick}
            sx={style}
        >
            {children}
        </MuiBackdrop>
    );
};

export default Backdrop;
