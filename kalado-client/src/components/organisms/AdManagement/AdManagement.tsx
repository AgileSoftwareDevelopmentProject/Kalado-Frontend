import React from 'react';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';
import EditAdCard from '../AdCard/EditAdCard';

interface AdData {
    id: number;
    title: string;
    createdAt: string;
    imageUrls?: string[];
    price: {
        amount: number,
        unit: string,
    },
    description?: string;
    sellerPhoneNumber?: string;
    sellerId: number;
    brand?: string;
    productionYear?: string;
    status: string;
}

interface AdManagementProps {
    ads: AdData[];
    onEdit: (adData: AdData) => void;
    selectedAd?: AdData;
    onCloseEdit: () => void;
}

const AdManagement: React.FC<AdManagementProps> = ({ ads, onEdit, selectedAd, onCloseEdit }) => {
    return (
        <Box sx={{ padding: 15 }}>
            <Box sx={{ marginBottom: 4 }}>
                <AdList ads={ads} onEdit={onEdit} />
            </Box>

            {selectedAd && (
                <Box sx={{ marginTop: 4 }}>
                    <EditAdCard
                        title={selectedAd.title}
                        price={selectedAd.price.amount}
                        category={selectedAd.category}
                        date={selectedAd.createdAt}
                        description={selectedAd.description}
                        images={selectedAd.imageUrls}
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
