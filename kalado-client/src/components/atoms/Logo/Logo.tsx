import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Logo: React.FC = () => {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
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
        </Link>
    );
};

export default Logo;
