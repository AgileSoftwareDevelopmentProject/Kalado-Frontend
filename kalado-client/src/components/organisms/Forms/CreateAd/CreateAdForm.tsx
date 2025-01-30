import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox, ImageUploadBox } from '../../../molecules';
import { createProductWithImages, updateAd } from '../../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../../contexts';
import { OptionsComponent } from '../../../../constants/options';
import { ProductData, TProductResponseType } from '../../../../constants/apiTypes';

interface CreateAdFormProps {
    initialFormData?: TProductResponseType;
    isEditingMode?: boolean;
}

const CreateAdForm: React.FC<CreateAdFormProps> = ({ initialFormData, isEditingMode }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ProductData>(() => {
        if (initialFormData) {
            return {
                title: initialFormData.title,
                price: initialFormData.price,
                category: initialFormData.category,
                description: initialFormData.description,
                productionYear: initialFormData.productionYear,
                brand: initialFormData.brand,
            };
        }
        return {
            title: '',
            price: { amount: 0, unit: 'TOMAN' },
            category: '',
            description: '',
            productionYear: null,
            brand: null,
        };
    });
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { product_categories } = OptionsComponent();
    const { isCreateAdVisible, handleClosePopups } = useModalContext();

    useEffect(() => {
        if (initialFormData) {
            setFormData({
                title: initialFormData.title,
                price: initialFormData.price,
                category: initialFormData.category,
                description: initialFormData.description,
                productionYear: initialFormData.productionYear,
                brand: initialFormData.brand,
            });
        }
    }, [initialFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleYearChange = (date: Date | null) => {
        setFormData(prevData => ({
            ...prevData,
            productionYear: date ? date.getFullYear() : null
        }));
    };

    const handleImageUpload = (files: File[]) => {
        setImages(files);
        setError('');
    };

    const handleClose = () => {
        setFormData({
            title: '',
            price: { amount: 0, unit: 'TOMAN' },
            category: '',
            description: '',
            productionYear: null,
            brand: null,
        });
        setImages([]);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0 && !isEditingMode) {
            setError(t("error.create_ad.required_image"));
            return;
        }

        try {
            if (isEditingMode && initialFormData) {
                const response = await updateAd(initialFormData.id, formData, images);
                if (response.isSuccess) {
                    handleClose();
                    toast(t("success.edit_ad"));
                } else {
                    setError(t("error.create_ad.edit_failed"));
                }
            } else {
                const response = await createProductWithImages(formData, images);
                if (response.isSuccess) {
                    handleClose();
                    toast(t("success.create_ad"));
                } else {
                    setError(t("error.create_ad.submit_failed"));
                }
            }
        } catch (error) {
            setError(t("error.create_ad.submission_failed"));
        }
    };

    return (
        <PopupBox open={isCreateAdVisible} onClose={handleClose}>
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
                    onChange={(price: { amount: number; unit: string }) => setFormData(prevData => ({ ...prevData, price }))}
                    isRequired={true}
                    isStarNeeded={true}
                />
                <Dropdown
                    options={product_categories}
                    placeholder={t("create_ad.input.category")}
                    onChange={(selectedOption: Option | null) => setFormData(prevData => ({
                        ...prevData,
                        category: selectedOption ? selectedOption.value : ''
                    }))}
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
                    text={isEditingMode ? t("create_ad.edit_ad_btn") : t("create_ad.create_ad_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default CreateAdForm;
