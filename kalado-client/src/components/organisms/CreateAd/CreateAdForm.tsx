import React, { useState } from 'react';
import './CreateAdForm.css';
import NameInput from '../../atoms/Input/NameInput';
import PriceInput from '../../atoms/Input/PriceInput';
import Dropdown from '../../atoms/Input/Dropdown';
import DescriptionInput from '../../atoms/Input/DescriptionInput';
import ImageUpload from '../../atoms/Input/ImageUpload';
import { FaTimes } from 'react-icons/fa';
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
        <div className="create-ad-popup">
            <div className="create-ad-header">
                <img src="/images/logo.png" alt="کالادو" className="logo" />
                <button onClick={onClose} className="close-button" aria-label="close">
                    <FaTimes size={24} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="create-ad-form">
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
                    placeholder="انتخاب دسته‌بندی"
                    onChange={handleCategoryChange}
                    value={categoryOptions.find(option => option.value === formData.category) || null}
                />
                <DescriptionInput
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionchange}
                />
                <p>انتخاب عکس</p>
                <div className="image-upload-row">
                    <ImageUpload />
                    <ImageUpload />
                    <ImageUpload />
                </div>

                <button type="submit" className="cerate-ad-button">ثبت آگهی</button>
            </form>
        </div>
    );
};

export default CreateAdForm;
