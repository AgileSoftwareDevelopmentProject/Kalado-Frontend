import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
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
    });

    const [images, setImages] = useState<File[]>(ad.images || []);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
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
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0) {
            setError(t("error.create_ad.required_image"));
            return;
        }

        const filteredData = cleanData(formData);
        console.log("Updating Ad:", filteredData);

        const response = await updateAd(ad.id, filteredData);
        if (response.isSuccess) {
            toast.success(t("success.ad_management.edit"));
            onCancel();
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox open={true} onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <NameInput
                    name="title"
                    placeholder={t("create_ad.input.title")}
                    value={formData.title}
                    onChange={handleChange}
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
                    onChange={handleChange}
                />
                <DescriptionInput
                    value={formData.description}
                    onChange={(description: string) => setFormData(prevData => ({ ...prevData, description }))}
                />
                <ImageUploadBox onUpload={handleImageUpload} title={t("create_ad.choose_image")} />
                <CustomButton
                    text={t("create_ad.create_ad_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default EditAdCard;