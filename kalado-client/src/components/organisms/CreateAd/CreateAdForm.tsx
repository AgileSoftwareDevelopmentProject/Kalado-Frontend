import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { NameInput, PriceInput, Dropdown, DescriptionInput, ImageUpload, CustomButton } from '../../atoms';
import { PopupBox } from '../../molecules';
import { createAd } from '../../../services/CreateAdService';

interface CreateAdFormProps {
    onClose: () => void;
}

const CreateAdForm: React.FC<CreateAdFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        title: string;
        price: number;
        category: string | null;
        description: string;
        images: string;
    }>({
        title: '',
        price: 0,
        category: null,
        description: '',
        images: '',
    });

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
            category: selectedOption ? selectedOption.value : null
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createAd(formData);
            console.log('Create Ad successfully');
            onClose();
        } catch (error) {
            console.error(error);
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
                    name="price"
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
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionchange}
                />
                <p>{t("create_ad.choose_image")}</p>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <ImageUpload />
                    <ImageUpload />
                    <ImageUpload />
                </Box>
                <CustomButton
                    text={t("create_ad.create_ad_btn")}
                    type="submit"
                    padding="10px 40px"
                />
            </form>
        </PopupBox>
    );
};

export default CreateAdForm;
