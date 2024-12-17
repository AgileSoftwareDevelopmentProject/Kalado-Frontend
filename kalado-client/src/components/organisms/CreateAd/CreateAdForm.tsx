import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NameInput from '../../atoms/Inputs/NameInput';
import PriceInput from '../../atoms/Inputs/PriceInput';
import Dropdown from '../../atoms/Inputs/Dropdown';
import DescriptionInput from '../../atoms/Inputs/DescriptionInput';
import ImageUpload from '../../atoms/Inputs/ImageUpload';
import CustomButton from '../../atoms/Buttons/CustomButton';
import PopupBox from '../../molecules/PopupBox/PopupBox';
import axios from 'axios';


interface CreateAdFormProps {
    onClose: () => void;
}

const CreateAdForm: React.FC<CreateAdFormProps> = ({ onClose }) => {

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
        { value: 'Real estate', label: 'املاک' },
        { value: 'Transportation', label: 'وسایل نقلیه' },
        { value: 'House and Kitchen', label: 'خانه و آشپزخانه' },
        { value: 'Digital Stuff', label: 'کالای دیجیتال' },
        { value: 'Entertainment', label: 'سرگرمی' },
        { value: 'Personal Stuff', label: 'لوازم شخصی' },
        { value: 'Others', label: 'موارد دیگر' },
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
            const response = await axios.post('https://kalado.com/create-ad', formData);
            console.log('Create Ad successfully:', response.data);
            onClose();
        } catch (error) {
            console.error('Create Ad error:', error);
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <NameInput
                    name="title"
                    placeholder="عنوان آگهی"
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
                    placeholder="دسته‌بندی"
                    onChange={handleCategoryChange}
                    value={categoryOptions.find(option => option.value === formData.category) || null}
                />
                <DescriptionInput
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionchange}
                />
                <p>انتخاب عکس</p>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <ImageUpload />
                    <ImageUpload />
                    <ImageUpload />
                </Box>
                <CustomButton text="ثبت آگهی" type="submit" />
            </form>
        </PopupBox>
    );
};

export default CreateAdForm;
