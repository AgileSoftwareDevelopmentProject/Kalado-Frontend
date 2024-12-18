import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, ButtonGroup } from '@mui/material';
import CustomButton from '../../atoms/Buttons/CustomButton';
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
        position: 'relative',
        width: '400px',
        bgcolor: '#272C48',
        p: 2,
        borderRadius: 2,
        marginTop: '10px',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF' }}>
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
      <ButtonGroup variant="text" aria-label="ad age options" fullWidth>
        <CustomButton
          text={t('filter.one_day')}
          onClick={() => handleFilterSelect('oneDay')}
          variant={selectedFilter === 'oneDay' ? 'contained' : 'text'}
        />
        <CustomButton
          text={t('filter.one_week')}
          onClick={() => handleFilterSelect('oneWeek')}
          variant={selectedFilter === 'oneWeek' ? 'contained' : 'text'}
        />
        <CustomButton
          text={t('filter.one_month')}
          onClick={() => handleFilterSelect('oneMonth')}
          variant={selectedFilter === 'oneMonth' ? 'contained' : 'text'}
        />
      </ButtonGroup>

      <CustomButton text={t('filter.apply')} onClick={handleApplyFilters} />
    </Box>
  );
};

export default Filter;
