import React from 'react';
import { Box } from '@mui/material';
import AdCard from '../AdCard/AdCard';

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

interface AdListProps {
    ads: AdData[];
    onEdit: (adData: AdData) => void;
}

const AdList: React.FC<AdListProps> = ({ ads, onEdit }) => {
    return (
        <Box>
            {ads.map((ad) => (
                <AdCard
                    key={ad.id}
                    title={ad.title}
                    status={ad.status}
                    onEdit={() => onEdit(ad)}
                    onDelete={() => console.log('Delete clicked')}
                    onStatusChange={(event) => console.log(event.target.value)}
                    onEditTitle={(newTitle) => console.log(newTitle)}
                />
            ))}
        </Box>
    );
};

export default AdList;
