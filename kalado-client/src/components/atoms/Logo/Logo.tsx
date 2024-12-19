import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../../../assets/images/logo.png';

const style = {
    height: 70,
    width: 'auto',
    marginBottom: '10px',
}

const Logo: React.FC = () => {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
                component="img"
                src={logo}
                alt="کالادو"
                sx={style}
            />
        </Link>
    );
};

export default Logo;
