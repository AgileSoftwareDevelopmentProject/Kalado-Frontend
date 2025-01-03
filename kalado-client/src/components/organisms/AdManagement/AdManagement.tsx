import React from 'react';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';
import EditAdCard from '../AdCard/EditAdCard'; // Import EditAdCard

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
    selectedAd?: AdData;
    onCloseEdit: () => void;
}

const AdManagement: React.FC<AdManagementProps> = ({ ads, onEdit, selectedAd, onCloseEdit }) => {
    return (
        <Box sx={{ padding: 15}}>
            {/* Ad List */}
            <Box sx={{ marginBottom: 4 }}>
                <AdList ads={ads} onEdit={onEdit} />
            </Box>

            {/* Edit Ad Card */}
            {selectedAd && (
                <Box sx={{ marginTop: 4 }}>
                    <EditAdCard
                        title={selectedAd.title}
                        price={selectedAd.price}
                        category={selectedAd.category}
                        date={selectedAd.date}
                        description={selectedAd.description}
                        images={selectedAd.images}
                        status={selectedAd.status}
                        onEdit={(updatedData) => onEdit(updatedData)}
                        onCancel={onCloseEdit}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdManagement;
