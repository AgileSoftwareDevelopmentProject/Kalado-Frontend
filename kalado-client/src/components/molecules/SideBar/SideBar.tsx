import React from 'react';
import { Box } from '@mui/material';

interface SideBarProps {
    children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
    return (
        <Box
            sx={{
                width: '250px',
                bgcolor: 'transparent',
                padding: 2,
                height: '100vh',
                position: 'fixed',
                right: 0,
                top: 0,
                overflowY: 'auto',
            }}
        >
            {children}
        </Box>
    );
};

export default SideBar;
