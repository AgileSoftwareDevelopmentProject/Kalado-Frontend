import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CustomButton, NumberInput } from '../../atoms';
import { LabelList } from '../../molecules';
import { fetchItems } from '../../../api/services/FilterService';

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

  const handleFilterSelect = (filter: string | null) => {
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

  const dateOptions = [
    { title: t('filter.one_day'), value: 'oneDay' },
    { title: t('filter.one_week'), value: 'oneWeek' },
    { title: t('filter.one_month'), value: 'oneMonth' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        {t("filter.title")}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
          {t("filter.price")}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NumberInput
            name="minPrice"
            placeholder={t("filter.min_price")}
            onChange={handlePriceChange}
          />
          <NumberInput
            name="maxPrice"
            placeholder={t("filter.max_price")}
            onChange={handlePriceChange}
          />
        </Box>
      </Box>

      <LabelList
        items={dateOptions}
        selectedValue={selectedFilter}
        onSelect={handleFilterSelect}
        title={t("filter.ad_date")}
      />

      <CustomButton
        text={t('filter.apply')}
        onClick={handleApplyFilters}
        margin="20px 0px"
      />
    </Box>
  );
};

export default Filter;
