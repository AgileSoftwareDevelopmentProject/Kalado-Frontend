import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import logo from '../../../assets/images/logo.png';


const Logo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Box
            component="img"
            src={logo}
            alt={t("brand_name")}
            sx={{
                height: 70,
                width: 'auto',
                marginBottom: '10px',
                cursor: 'pointer',
            }}
        // onClick={}
        />
    );
};

export default Logo;
