import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../../../assets/images/logo.png';

const Logo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
                component="img"
                src={logo}
                alt={t("brand_name")}
                sx={{
                    height: 70,
                    width: 'auto',
                    marginBottom: '10px',
                }}
            />
        </Link>
    );
};

export default Logo;
