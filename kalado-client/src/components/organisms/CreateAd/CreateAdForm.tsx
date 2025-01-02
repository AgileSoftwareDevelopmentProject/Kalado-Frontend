import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createAd } from '../../../services/product/CreateAdService';


import { toast } from 'react-toastify';


interface CreateAdFormProps {
    onClose: () => void;
}

const CreateAdForm: React.FC<CreateAdFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        title: string;
        price: number;
        category: string;
        description: string;
        images: File[];
    }>({
        title: '',
        price: 0,
        category: '',
        description: '',
        images: [],
    });
    const [error, setError] = useState<string>('');

    const categoryOptions = [
        { value: 'Real estate', label: t("category.one") },
        { value: 'Transportation', label: t("category.two") },
        { value: 'House and Kitchen', label: t("category.three") },
        { value: 'Digital Stuff', label: t("category.four") },
        { value: 'Entertainment', label: t("category.five") },
        { value: 'Personal Stuff', label: t("category.six") },
        { value: 'Others', label: t("category.seven") },
    ];

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
            setFormData({ title: '', price: 0, category: '', description: '', images: [] });
            onClose();
            toast(t("success.create_ad"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox onClose={onClose}>
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
                    options={categoryOptions}
                    placeholder={t("create_ad.input.category")}
                    onChange={handleCategoryChange}
                    value={categoryOptions.find(option => option.value === formData.category) || null}
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
