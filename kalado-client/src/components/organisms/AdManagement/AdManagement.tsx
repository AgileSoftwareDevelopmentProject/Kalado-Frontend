import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';

const AdManagement = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <AdList />
        </Box>
    );
};

export default AdManagement;
