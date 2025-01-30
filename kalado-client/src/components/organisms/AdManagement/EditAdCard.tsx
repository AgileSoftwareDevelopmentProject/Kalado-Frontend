import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography, Card, IconButton, Divider, TextField } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { PriceInput, Dropdown } from '../../atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from '../../../resource.json';
import ImageUploadBox from '../../molecules/Boxes/ImageUploadBox';
import { updateAd } from '../../../api/services/ProductService';
import { ProductData, TProductResponseType } from '../../../constants/apiTypes';
import { OptionsComponent } from '../../../constants/options';

type EditAdCardProps = {
  ad: TProductResponseType;
  onCancel: () => void;
};

const cleanData = (data: any) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)
  );
};

const normalizeDigits = (value: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  return value.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const EditAdCard: React.FC<EditAdCardProps> = ({ ad, onCancel }) => {
  const { t, i18n } = useTranslation();
  const { product_categories } = OptionsComponent();
  
  const [formData, setFormData] = useState<ProductData>({
    title: ad.title || '',
    price: {
      amount: ad.price?.amount || 0,
      unit: ad.price?.unit || 'TOMAN',
    },
    category: ad.category || '',
    description: ad.description || '',
    productionYear: ad.productionYear || null,
    brand: ad.brand || null,
    images: ad.images || [],
  });

  const [images, setImages] = useState<File[]>([]);
  const language = i18n.language as keyof typeof resources;
  const isRtl = language === 'fa';

  const handleChange = (field: keyof ProductData, value: any) => {
    console.log(`Updating field: ${field} =>`, value);

    if (field === 'price') {
      const normalizedValue = normalizeDigits(value.toString());
      const numericValue = Number(normalizedValue);
      if (!isNaN(numericValue)) {
        setFormData((prev) => ({ ...prev, price: { amount: numericValue, unit: prev.price.unit } }));
      } else {
        toast.error(t('error.invalid_number'));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (files: File[]) => {
    console.log("Uploading images:", files);
    if (images.length + files.length <= 3) {
      setImages([...images, ...files]);
    } else {
      toast.error(t('error.max_images', { count: 3 }));
    }
  };

  const handleEditAd = async (id: number) => {
    try {
      console.log("Editing Ad ID:", id); // لاگ مقدار id قبل از ارسال درخواست

      const filteredData = cleanData(formData);
      console.log("Filtered Data before sending:", filteredData); // لاگ داده‌های تمیز شده قبل از ارسال

      if (!filteredData.category) {
        toast.error(t('error.category_required'));
        return;
      }

      if (!filteredData.price || isNaN(filteredData.price.amount)) {
        toast.error(t('error.invalid_price'));
        return;
      }

      const response = await updateAd(id, filteredData);
      console.log("API Response:", response);

      if (response.isSuccess) {
        toast.success(t('success.ad_management.edit'));
      } else {
        toast.error(t('error.ad_management.edit_failed'));
      }
    } catch (error) {
      console.error("Error updating ad:", error);
      toast.error(t('error.ad_management.edit_failed'));
    }
  };

  return (
    <Card
      sx={{
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '650px', 
        margin: 'auto',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">{formData.title}</Typography>
        <Box>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => handleEditAd(ad.id)}>
            <SaveIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography fontWeight="bold">{t('general_inputs.price')}</Typography>
        <PriceInput
          value={formData.price}
          onChange={(price: { amount: number; unit: string }) => 
            setFormData((prev) => ({ ...prev, price }))}
          isRequired
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Dropdown
          options={product_categories}
          onChange={(selectedOption: any) => setFormData(prev => ({
            ...prev, category: selectedOption ? selectedOption.value : ''
          }))}
          value={product_categories.find(option => option.value === formData.category) || null}
          width="100%"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography fontWeight="bold">{t('create_ad.input.brand')}</Typography>
        <TextField
          value={formData.brand || ''}
          onChange={(e) => handleChange('brand', e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography fontWeight="bold">{t('create_ad.input.year')}</Typography>
        <TextField
          value={formData.productionYear || ''}
          onChange={(e) => handleChange('productionYear', e.target.value)}
          fullWidth
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {images.slice(0, 3).map((image, index) => (
          <Box key={index} sx={{ width: '100px', height: '100px', position: 'relative' }}>
            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            <IconButton onClick={() => setImages(images.filter((_, i) => i !== index))}
                        sx={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', color: '#fff' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        {images.length < 3 && <ImageUploadBox onUpload={handleImageUpload} />}
      </Box>
    </Card>
  );
};

export default EditAdCard;
