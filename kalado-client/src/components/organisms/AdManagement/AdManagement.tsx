import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';
import EditAdCard from '../AdCard/EditAdCard';
import { TProductResponseType } from '../../../constants/apiTypes';
import { getSellersProducts } from '../../../api/services/ProductService';
import { useAuth } from '../../../contexts';

interface AdManagementProps {
  onEdit: (adData: TProductResponseType) => void;
  selectedAd?: TProductResponseType;
  onCloseEdit: () => void;
}

const AdManagement: React.FC<AdManagementProps> = ({
  onEdit,
  selectedAd,
  onCloseEdit,
}) => {
  const { token } = useAuth();
  const [ads, setAds] = useState<TProductResponseType[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (token) {
          const data = await getSellersProducts(token);
          setAds(data);
        }
      } catch (error) {
        console.error('Error fetching seller’s products:', error);
      }
    };
    fetchAds();
  }, [token]);

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