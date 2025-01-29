import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography, TextField, Card, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ConfirmationDialog } from '../../../components/molecules';
import EditAdCard from './EditAdCard';
import { TProductResponseType } from '../../../constants/apiTypes';
import { updateAdStatus, deleteAd } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';

interface AdCardProps {
  ad: TProductResponseType;
};

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingModeActive, setIsEditingModeActive] = useState(false);
  const [adNewStatus, setAdNewStatus] = useState(ad.status);

  const handleAdStatusChange = async (id: number, newStatus: string) => {
    const response = await updateAdStatus(id, newStatus);
    setIsDialogOpen(false);
    if (response.isSuccess) {
      toast(t('success.ad_management.status_change'));
    } else {
      toast(t('error.ad_management.status_change_failed'));
    }
  };

  const handleDeleteAd = async (id: number) => {
    setIsDialogOpen(false);
    const response = await deleteAd(id);
    if (response.isSuccess) {
      toast(t('success.ad_management.delete'));
    } else {
      toast(t('error.ad_management.delete_failed'));
    }
  };

  const handleEditAdTitle = (id: number) => (newTitle: string) => {
    // setAds((prevAds) =>
    //   prevAds.map((ad) => (ad.id === id ? { ...ad, title: newTitle } : ad))
    // );
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 40px',
          marginBottom: '40px',
          borderRadius: '40px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <Tooltip title={ad.title} arrow>
          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px',
            }}
          >
            {ad.title}
          </Typography>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: '30px' }}>
          <Select
            value={adNewStatus}
            onChange={(e) => {
              const newStatus = e.target.value;
              setAdNewStatus(newStatus);
              handleAdStatusChange(ad.id, newStatus);
            }}
            displayEmpty
            sx={{ minWidth: '150px', fontSize: '1rem' }}
            inputProps={{
              'aria-label': t('ad_list.ad_status.dropdown'),
            }}
          >
            <MenuItem value="active">{t('ad_list.ad_status.ACTIVE')}</MenuItem>
            <MenuItem value="reserved">{t('ad_list.ad_status.RESERVED')}</MenuItem>
            <MenuItem value="sold">{t('ad_list.ad_status.SOLD')}</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <IconButton onClick={() => setIsEditingModeActive(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>

      <ConfirmationDialog
        isDialogOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCheck={() => handleDeleteAd(ad.id)}
        message={t("ad_list.delete_confirmation.title")}
      />

      {isEditingModeActive && (
        <Box sx={{ marginTop: 4 }}>
          <EditAdCard
            ad={ad}
            onCancel={() => setIsEditingModeActive(false)}
          />
        </Box>
      )}
    </>
  );
}

export default AdCard;
