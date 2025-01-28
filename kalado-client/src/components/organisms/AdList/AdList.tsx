import React, { useState, useEffect } from 'react';
import AdCard from '../AdCard/AdCard';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent, Typography, Box } from '@mui/material';
import { TProductResponseType } from '../../../constants/apiTypes';
import {
  getSellersProducts,
  updateAdStatus,
  deleteAd,
} from '../../../api/services/ProductService';
import { useAuth } from '../../../contexts';
import resources from '../../../resource.json';

const AdList = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as keyof typeof resources;
  const isRtl = language === 'fa';
  const [ads, setAds] = useState<TProductResponseType[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { token } = useAuth();
        if (token) {
          const data = await getSellersProducts(token);
          setAds(data);
        }
      } catch (error) {
        console.error('Error fetching seller’s products:', error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    setAds((prevAds) =>
      prevAds.map((ad) => ({
        ...ad,
        title: ad.title || `${t('ad_list.create_ad.input.title')} ${ad.id}`,
      }))
    );
  }, [t, i18n.language]);

  const handleStatusChange = (id: number) => async (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    try {
      await updateAdStatus(id, newStatus);
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad))
      );
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAd(id);
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleEditTitle = (id: number) => (newTitle: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) => (ad.id === id ? { ...ad, title: newTitle } : ad))
    );
  };

  return (
    <div style={{ padding: '20px', direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Heading for Ad List */}
      <Box
        sx={{
          marginBottom: '50px',
          textAlign: 'right',
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: '#FFF', marginBottom: '15px' }}
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
