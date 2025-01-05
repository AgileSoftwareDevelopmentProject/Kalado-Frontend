import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, DateInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createAd } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';


const CreateAdForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        title: string;
        price: number;
        category: string;
        description: string;
        images: File[];
        date: string;
    }>({
        title: '',
        price: 0,
        category: '',
        description: '',
        images: [],
        date: '',
    });
    const [error, setError] = useState<string>('');
    const { create_ad_options } = OptionsComponent();

    const {
        isCreateAdVisible,
        handleClosePopups,
    } = useModalContext();

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        setFormData(prevData => ({
            ...prevData,
            category: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriceChange = (price: number) => {
        setFormData((prevData) => ({
            ...prevData,
            price,
        }));
    };

    const handleDescriptionchange = (description: string) => {
        setFormData((prevData) => ({
            ...prevData,
            description,
        }));
    };

    const handleImageUpload = (files: File[]) => {
        setFormData(prevData => ({
            ...prevData,
            images: files
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await createAd(formData.title, formData.description, formData.price, formData.category);
        if (response.isSuccess) {
            // setFormData({ title: '', price: 0, category: '', description: '', images: [] });
            handleClosePopups();
            toast(t("success.create_ad"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox open={isCreateAdVisible}>
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
                    options={create_ad_options}
                    placeholder={t("create_ad.input.category")}
                    onChange={handleCategoryChange}
                    value={create_ad_options.find(option => option.value === formData.category) || null}
                />
                <DateInput
                    label={t("create_ad.input.production_year")}
                    value={formData.date ? new Date(formData.date) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            handleChange('date', newValue.toISOString());
                        }
                    }}
                />
                <DescriptionInput
                    value={formData.description}
                    onChange={handleDescriptionchange}
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

export default CreateAdForm;
