import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { updateAd } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { OptionsComponent } from '../../../constants/options';
import { ProductData, TProductResponseType } from '../../../constants/apiTypes';

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
    const { t } = useTranslation();
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
        brand: ad.brand || '',
        images: null,
    });

    const [images, setImages] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>(ad.imageUrls || []);

    const handleChange = (field: keyof ProductData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePriceChange = (price: { amount: number; unit: string }) => {
        console.log("Price Changed:", price);
        const normalizedAmount = Number(normalizeDigits(price.amount.toString()));

        if (!isNaN(normalizedAmount)) {
            setFormData(prevData => ({
                ...prevData,
                price: { amount: normalizedAmount, unit: price.unit }
            }));
        } else {
            toast.error(t('error.invalid_number'));
        }
    };

    const handleYearChange = (date: Date | null) => {
        setFormData(prevData => ({
            ...prevData,
            productionYear: date
        }));
    };

    const handleCategoryChange = (selectedOption: Option | null) => {
        setFormData(prevData => ({
            ...prevData,
            category: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleImageUpload = (files: File[]) => {
        console.log("handleImageUpload", files);
        setImages(files);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0 && imageUrls.length === 0) {
            toast.error(t("error.create_ad.required_image"));
            return;
        }

        const filteredData: ProductData = cleanData({
            ...formData,
            price: {
                amount: Number(normalizeDigits(formData.price.amount.toString())),
                unit: formData.price.unit
            },
            images: imageUrls.length > 0 ? imageUrls : null, // ارسال `null` در صورتی که هیچ تصویری نباشد
        });

        console.log("Final ProductData Sent to API:", filteredData);
        console.log("Final Images Sent to API:", images);

        try {
            const response = await updateAd(ad.id, filteredData, images);
            if (response.isSuccess) {
                toast.success(t("success.ad_management.edit"));
                onCancel();
            } else {
                toast.error(t("error.ad_management.edit_failed"));
            }
        } catch (error) {
            console.error("Error updating ad:", error);
            toast.error(t("error.ad_management.edit_failed"));
        }
    };

    return (
        <PopupBox open={true} sx={{ maxWidth: '900px', width: '100%' }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <IconButton  sx={{ display: 'flex' }} onClick={onCancel}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton sx={{ display: 'flex' }} type="submit">
                            <SaveIcon />
                        </IconButton>
                    </Box>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <NameInput
                        name="title"
                        placeholder={t("create_ad.input.title")}
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        isRequired={true}
                        isStarNeeded={true}
                    />

                    <PriceInput
                        value={formData.price}
                        onChange={handlePriceChange}
                        isRequired={true}
                        isStarNeeded={true}
                    />

                    <Dropdown
                        options={product_categories}
                        placeholder={t("create_ad.input.category")}
                        onChange={handleCategoryChange}
                        value={product_categories.find(option => option.value === formData.category) || null}
                    />

                    <YearInput
                        value={formData.productionYear ? formData.productionYear : null}
                        onChange={handleYearChange}
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date()}
                    />

                    <NameInput
                        name="brand"
                        placeholder={t("create_ad.input.brand")}
                        value={formData.brand || ''}
                        onChange={(e) => handleChange("brand", e.target.value)}
                    />

                    <DescriptionInput
                        value={formData.description}
                        onChange={(description: string) => handleChange("description", description)}
                    />
                </Box>

                <Divider sx={{ my: 3 }} />

                <ImageUploadBox onUpload={handleImageUpload} title={t("create_ad.choose_image")} />
            </form>
        </PopupBox>
    );
};

export default EditAdCard;