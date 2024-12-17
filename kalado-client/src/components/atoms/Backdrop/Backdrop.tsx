import React from 'react';
import { Backdrop as MuiBackdrop } from '@mui/material';

interface BackdropProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, children }) => {
    return (
        <MuiBackdrop
            open={true}
            onClick={onClick}
            sx={{
                backgroundColor: 'rgba(39, 44, 72, 0.7)',
                zIndex: 100
            }}
        >
            {children}
        </MuiBackdrop>
    );
};

export default Backdrop;
