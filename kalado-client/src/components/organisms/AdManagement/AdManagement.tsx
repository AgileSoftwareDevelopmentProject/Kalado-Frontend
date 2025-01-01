import React from 'react';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';

interface AdData {
    id: number;
    title: string;
    price: string;
    status: string;
    category: string;
    description: string;
    date: string;
    images: string[];
}

interface AdManagementProps {
    ads: AdData[]; // Include ads as a prop
    onEdit: (adData: AdData) => void; // Enforce type of adData
}

const AdManagement: React.FC<AdManagementProps> = ({ ads, onEdit }) => {
    return (
        <Box>
            <AdList ads={ads} onEdit={onEdit} />
        </Box>
    );
};

export default AdManagement;
