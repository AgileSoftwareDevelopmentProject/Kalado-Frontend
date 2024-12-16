import React from 'react';
import Box from '@mui/material/Box';

const Logo: React.FC = () => {
    return (
        <Box
            component="img"
            src="/assets/images/logo.png"
            alt="کالادو"
            sx={{
                height: 54,
                width: 'auto',
                marginBottom: '10px',
            }}
        />
    );
};

export default Logo;
