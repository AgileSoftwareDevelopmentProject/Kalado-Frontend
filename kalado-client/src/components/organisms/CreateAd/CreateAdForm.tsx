import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createProductWithImages } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { ProductData } from '../../../utils/apiTypes';
import { useAuth } from '../../../contexts';


const CreateAdForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ProductData>({
        title: '',
        price: {
            amount: 0,
            unit: 'TOMAN',
        },
        category: '',
        description: '',
        productionYear: null,
        brand: null,
    });
    const { token } = useAuth();
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { create_ad_options } = OptionsComponent();
    const { isCreateAdVisible, handleClosePopups } = useModalContext();

    const handleCategoryChange = (selectedOption: Option | null) => {
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

    const handlePriceChange = (price: { amount: number; unit: string }) => {
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

    const handleClose = () => {
        setFormData({
            title: '',
            price: {
                amount: 0,
                unit: 'TOMAN',
            },
            category: '',
            description: '',
            // images: [],
            productionYear: null,
            brand: null,
        });
        setImages([]);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Create Ad API call
            console.log("Create Ad API call");
            console.log(token);
            console.log(formData);
            console.log(images);
            const response = await createProductWithImages(formData, images);
            console.log(response);
            if (response.isSuccess) {
                handleClose();
                toast(t("success.create_ad"));
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('An error occurred while creating the product');
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
                <YearInput />
                <NameInput
                    name="brand"
                    placeholder={t("create_ad.input.brand")}
                    value={formData.brand || ''}
                    onChange={handleChange}
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
