import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography } from '@mui/material';
import AdCard from './AdCard';
import { TProductResponseType } from '../../../constants/apiTypes';

interface AdManagementProps {
  adsList: TProductResponseType[] | null;
}

const AdManagement: React.FC<AdManagementProps> = ({ adsList }) => {
  const { t } = useTranslation();
  const [ads, setAds] = useState<TProductResponseType[] | null>(adsList);

  return (
    <Box sx={{ padding: 15 }}>
      {!ads ? (
        <Typography color="error" align="center">
          {t('error.profile_management.save_failed')}
        </Typography>
      ) : (
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ads && ads.map((ad) => (
              <AdCard ad={ad} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdManagement;


{/* {ads && (
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
      )} */}