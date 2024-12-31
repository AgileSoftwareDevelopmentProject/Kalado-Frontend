import React from 'react';
import { Box } from '@mui/material';

interface SideBarBoxProps {
    children: React.ReactNode;
}

const SideBarBox: React.FC<SideBarBoxProps> = ({ children }) => {
    return (
        <Box sx={{
            width: '300px',
            bgcolor: 'transparent',
            padding: 2,
            height: '100vh',
            position: 'fixed',
            overflowY: 'auto',
            top: '150px',
            right: '30px',
            textAlign: 'right',
            p: 2,
        }}>
            {children}
        </Box>
    );
};

export default SideBarBox;
