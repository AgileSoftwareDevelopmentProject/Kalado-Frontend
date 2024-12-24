import React, { useState, useEffect } from 'react';
import AdCard from '../AdCard/AdCard';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent, Typography, Box } from '@mui/material';

const AdList = () => {
  const { t, i18n } = useTranslation();

  const [ads, setAds] = useState([
    { id: 1, title: '', status: 'active' },
    { id: 2, title: '', status: 'reserved' },
    { id: 3, title: '', status: 'active' },
    { id: 4, title: '', status: 'reserved' },
  ]);

  useEffect(() => {
    setAds((prevAds) =>
      prevAds.map((ad) => ({
        ...ad,
        title: `${t('ad_list.create_ad.input.title')} ${ad.id}`,
      }))
    );
  }, [t, i18n.language]);

  const handleStatusChange = (id: number) => (event: SelectChangeEvent<string>) => {
    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, status: event.target.value } : ad
      )
    );
  };

  const handleDelete = (id: number) => {
    setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
  };

  const handleEditTitle = (id: number) => (newTitle: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, title: newTitle } : ad
      )
    );
  };

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      {/* Heading for Ad List */}
      <Box
        sx={{
          marginBottom: '50px',
          textAlign: 'right',
        }}
      >
        <Typography
          variant="h5"
          sx={{color: '#FFF', marginBottom: '15px' }}
        >
          {t('ad_list.heading')}
        </Typography>
      </Box>

      {/* List of Ad Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            status={ad.status}
            onStatusChange={handleStatusChange(ad.id)}
            onDelete={() => handleDelete(ad.id)}
            onEditTitle={handleEditTitle(ad.id)}
          />
        ))}
      </Box>
    </div>
  );
};

export default AdList;