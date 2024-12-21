import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField } from '@mui/material';
import { CustomButton } from '../../atoms';
import { fetchItems } from '../../../services/filterService';

const Filter: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) < 0) {
      e.target.value = '0';
    }
    if (e.target.name === 'minPrice') {
      setMinPrice(value ? parseFloat(value) : '');
    } else if (e.target.name === 'maxPrice') {
      setMaxPrice(value ? parseFloat(value) : '');
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleApplyFilters = async () => {
    try {
      const data = await fetchItems(selectedFilter, minPrice, maxPrice);
      console.log('Fetched Items:', data);
    } catch (error) {
      console.error('Failed to apply filters:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '600px',
        right: '30px',
        width: '300px',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold' }}>
        {t("filter.title")}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'right', color: '#FFFFFF' }}>
          {t("filter.price")}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            type="number"
            name="minPrice"
            placeholder={t("filter.min_price")}
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, mr: 1, bgcolor: 'transparent', '& input::placeholder': { color: '#bbb' } }}
          />
          <TextField
            type="number"
            name="maxPrice"
            placeholder={t("filter.max_price")}
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, bgcolor: 'transparent', '& input::placeholder': { color: '#bbb' } }}
          />
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mb: 1, textAlign: 'right', color: '#FFFFFF' }}>
        {t("filter.ad_date")}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          onClick={() => handleFilterSelect('oneDay')}
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedFilter === 'oneDay' ? '#D74101' : 'transparent',
            color: selectedFilter === 'oneDay' ? '#FFFFFF' : '#000000',
            padding: '10px',
            borderRadius: '10px',
            border: '3px solid white',
            textAlign: 'center',
            flexGrow: 1,
            marginRight: '5px',
          }}
        >
          {t('filter.one_day')}
        </Typography>

        <Typography
          onClick={() => handleFilterSelect('oneWeek')}
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedFilter === 'oneWeek' ? '#D74101' : 'transparent',
            color: selectedFilter === 'oneWeek' ? '#FFFFFF' : '#000000',
            padding: '10px',
            borderRadius: '10px',
            border: '3px solid white',
            textAlign: 'center',
            flexGrow: 1,
            marginRight: '5px',
          }}
        >
          {t('filter.one_week')}
        </Typography>

        <Typography
          onClick={() => handleFilterSelect('oneMonth')}
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedFilter === 'oneMonth' ? '#D74101' : 'transparent',
            color: selectedFilter === 'oneMonth' ? '#FFFFFF' : '#000000',
            padding: '10px',
            borderRadius: '10px',
            border: '3px solid white',
            textAlign: 'center',
            flexGrow: 1,
          }}
        >
          {t('filter.one_month')}
        </Typography>

      </Box>

      <CustomButton
        text={t('filter.apply')}
        onClick={handleApplyFilters}
        margin="0px 0px"
      />
    </Box>
  );
};

export default Filter;
