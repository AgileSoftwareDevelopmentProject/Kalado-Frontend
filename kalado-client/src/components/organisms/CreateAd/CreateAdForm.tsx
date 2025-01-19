import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NameInput, PriceInput, YearInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createProductWithImages } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';
import { OptionsComponent } from '../../../constants/options';
import { ProductData } from '../../../utils/apiTypes';
import { openCreateAd, closePopups } from '../../../features/modal/modalSlice';


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
    const dispatch = useDispatch();
    const isCreateAdVisible = useSelector((state) => state.modal.isCreateAdVisible);
    const token = useSelector((state) => state.auth.token);
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { product_categories } = OptionsComponent();

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
        setImages(files);
        setError('');
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
            productionYear: null,
            brand: null,
        });
        setImages([]);
        setError('');
        dispatch(closePopups());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0) {
            setError(t("error.create_add.required_image"));
            return;
        }

        try {
            // Create Ad API call
            console.log("Create Ad API call");
            console.log(formData.category);
            console.log(token);
            console.log(formData);
            console.log(images);

            const response = await createProductWithImages(formData, images, token);

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
        <PopupBox onOpen={isCreateAdVisible} onClose={handleClose}>
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
