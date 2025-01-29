import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, IconButton, Divider } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import { PriceInput, Dropdown, NameInput, DescriptionInput } from '../../atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from '../../../resource.json';
import ImageUploadBox from '../../molecules/Boxes/ImageUploadBox';
import { updateAd } from '../../../api/services/ProductService';
import { ProductData, TProductResponseType } from '../../../constants/apiTypes';
import { OptionsComponent } from '../../../constants/options';

interface EditAdCardProps {
    ad: TProductResponseType;
    onCancel: () => void;
}

const normalizeDigits = (value: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  return value.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const EditAdCard: React.FC<EditAdCardProps> = ({ ad, onCancel }) => {
  const { t, i18n } = useTranslation();
  const { product_categories } = OptionsComponent();
  const [formData, setFormData] = useState<ProductData>({
        title: ad.title,
        price: ad.price,
        category: ad.category,
        description: ad.description || '',
        productionYear: ad.productionYear || null,
        brand: ad.brand || '',
    });
  const [images, setImages] = useState<File[]>([]);
  const language = i18n.language;
  const isRtl = language === 'fa';

  const handleChange = (field: keyof ProductData, value: any) => {
    if (field === 'price') {
      const normalizedValue = normalizeDigits(value.toString());
      const numericValue = Number(normalizedValue);
      if (!isNaN(numericValue)) {
        setFormData(prev => ({ ...prev, price: { amount: numericValue, unit: prev.price.unit } }));
      } else {
        toast.error('Invalid input. Please enter a valid number.');
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (files: File[]) => {
    setImages(files);
  };

    const handleEditAd = async () => {
    const response = await updateAd(ad.id, formData);
    if (response.isSuccess) {
      toast.success(t('success.ad_management.edit'));
        onCancel();
    } else {
      toast.error(t('error.ad_management.edit_failed'));
    }
  };

  return (
    <Card
      sx={{
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        maxWidth: '900px',
        margin: '20px auto',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5">{formData.title}</Typography>
          <Typography variant="subtitle1">{resources[language]?.ad_list?.ad_status?.[ad.status]}</Typography>
        </Box>
        <Box>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handleEditAd}>
            <SaveIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginY: '20px' }} />

            <NameInput name="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
            <PriceInput value={formData.price} onChange={(price) => handleChange('price', price)} />
            <Dropdown options={product_categories} value={formData.category} onChange={(selected) => handleChange('category', selected?.value || '')} />
            <DescriptionInput value={formData.description} onChange={(value) => handleChange('description', value)} />
            <NameInput name="brand" value={formData.brand} onChange={(e) => handleChange('brand', e.target.value)} />
            <NameInput name="productionYear" value={formData.productionYear ? formData.productionYear.toString() : ''} onChange={(e) => handleChange('productionYear', Number(e.target.value))} />
            <ImageUploadBox onUpload={handleImageUpload} />
    </Card>
  );
};

export default EditAdCard;
