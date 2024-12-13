import React, { useState } from 'react';
import './CreateAd.css';
import NameInput from '../Input/NameInput';
import PriceInput from '../Input/PriceInput';
import Dropdown from '../Input/Dropdown';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';


interface CreateAdFormProps {
    onClose: () => void;
}

const CreateAd: React.FC<CreateAdFormProps> = ({ onClose }) => {

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
        { value: 'electronics', label: 'الکترونیک' },
        { value: 'clothing', label: 'پوشاک' },
        { value: 'home', label: 'خانه و آشپزخانه' },
        // Add more categories as needed
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
                    <FaTimes size={24} color="#FFFFFF" />
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
                <button type="submit" className="cerate-ad-button">ثبت آگهی</button>
            </form>
        </div>
    );
};

export default CreateAd;
