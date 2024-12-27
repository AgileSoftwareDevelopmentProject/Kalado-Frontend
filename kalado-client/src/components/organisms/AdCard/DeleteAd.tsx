import React from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';

type DeleteAdProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteAd: React.FC<DeleteAdProps> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#2c2f3e',
          color: '#fff',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          {t('delete_confirmation.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            onClick={onConfirm}
            sx={{
              backgroundColor: 'green',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            ✔
          </Button>
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              '&:hover': { backgroundColor: 'darkred' },
            }}
          >
            ✘
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteAd;
