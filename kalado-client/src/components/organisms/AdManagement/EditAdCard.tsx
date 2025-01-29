import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography, Card, IconButton, Divider } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { PriceInput, Dropdown } from '../../atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from '../../../resource.json';
import ImageUploadBox from '../../molecules/Boxes/ImageUploadBox';
import { updateAd } from '../../../api/services/ProductService';
import { ProductData, TProductResponseType } from '../../../constants/apiTypes';
import { OptionsComponent } from '../../../constants/options';

const defaultProductData: ProductData = {
  title: '',
  price: { amount: 0, unit: 'TOMAN' },
  category: '',
  description: '',
  productionYear: null,
  brand: null,
  images: [],
};

type EditAdCardProps = {
  ad: TProductResponseType;
  onCancel: () => void;
};

const normalizeDigits = (value: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  return value.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const EditAdCard: React.FC<EditAdCardProps> = ({ ad, onCancel }) => {
  const { t, i18n } = useTranslation();
  const { product_categories } = OptionsComponent();
  const [formData, setFormData] = useState<ProductData>({ ...defaultProductData, ...ad });
  const [images, setImages] = useState<File[]>([]);
  const language = i18n.language;
  const isRtl = language === 'fa';

  const handleChange = (field: keyof ProductData, value: any) => {
    if (field === 'title' || field === 'price') {
      if (field === 'price') {
        const normalizedValue = normalizeDigits(value.toString());
        const numericValue = Number(normalizedValue);
        if (!isNaN(numericValue)) {
          setFormData((prev) => ({ ...prev, price: { amount: numericValue, unit: prev.price.unit } }));
        } else {
          toast.error('Invalid input. Please enter a valid number.');
        }
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  const handleImageUpload = (files: File[]) => {
    setImages(files);
  };

  const handleEditAd = async (id: number) => {
    const response = await updateAd(id, formData);
    if (response.isSuccess) {
      toast(t('success.ad_management.edit'));
    } else {
      toast(t('error.ad_management.edit_failed'));
    }
  };

  return (
    <Card sx={{ padding: '30px', borderRadius: '20px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', maxWidth: '900px', margin: '20px auto', direction: isRtl ? 'rtl' : 'ltr' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5">{formData.title}</Typography>
          <Typography variant="subtitle1">{resources[language]?.ad_list?.ad_status?.[ad.status]}</Typography>
        </Box>
        <Box>
          <IconButton onClick={onCancel}><CloseIcon /></IconButton>
          <IconButton onClick={() => handleEditAd(ad.id)}><SaveIcon /></IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '15px' }}>
        <Typography>{resources[language]?.general_inputs.price}</Typography>
        <PriceInput
          value={formData.price}
          onChange={(price: { amount: number; unit: string }) => handleChange('price', price.amount)}
          isRequired={true}
        />
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {formData.images?.map((image, index) => (
          <Box key={index} sx={{ width: '160px', height: '160px', position: 'relative' }}>
            <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton onClick={() => handleImageUpload(images.filter((_, i) => i !== index))} sx={{ position: 'absolute', top: 5, right: 5 }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        {(formData.images?.length || 0) < 3 && <ImageUploadBox onUpload={handleImageUpload} />}
      </Box>
    </Card>
  );
};

export default EditAdCard;
