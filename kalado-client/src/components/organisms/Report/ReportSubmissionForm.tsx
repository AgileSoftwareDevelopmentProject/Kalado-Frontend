import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { DateInput, Dropdown, DescriptionInput, ImageUpload, CustomButton } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createAd } from '../../../services/CreateAdService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface ReportSubmissionFormProps {
    onClose: () => void;
}

const ReportSubmissionForm: React.FC<ReportSubmissionFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        title: string;
        price: number;
        category: string | null;
        description: string;
        images: File[];
    }>({
        title: '',
        price: 0,
        category: null,
        description: '',
        images: [],
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const reportOptions = [
        { value: 'Abuse', label: t("report.category.one") },
        { value: 'Inproper Content', label: t("report.category.two") },
        { value: 'Inproper Price', label: t("report.category.three") },
    ];

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        setFormData(prevData => ({
            ...prevData,
            category: selectedOption ? selectedOption.value : null
        }));
    };

    const handleDescriptionChange = (description: string) => {
        setFormData(prevData => ({
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

        const submissionData = {
            ...formData,
            date: selectedDate,
            price: formData.price
        };

        try {
            await createAd(submissionData);
            console.log('Create Ad successfully');
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    options={reportOptions}
                    placeholder={t("report.input.category")}
                    onChange={handleCategoryChange}
                    value={reportOptions.find(option => option.value === formData.category) || null}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateInput
                        label={t("general_inputs.date")}
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                    />
                </LocalizationProvider>
                <DescriptionInput
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                />
                <ImageUploadBox onUpload={handleImageUpload} title={t("report.choose_evidence")} />
                <CustomButton
                    text={t("create_ad.create_ad_btn")}
                    type="submit"
                    padding="10px 40px"
                />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;
