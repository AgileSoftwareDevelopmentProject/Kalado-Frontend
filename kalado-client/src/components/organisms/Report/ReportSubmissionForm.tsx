import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { DateInput, Dropdown, DescriptionInput, ImageUpload, CustomButton } from '../../atoms';
import { PopupBox } from '../../molecules';
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
        images: string;
    }>({
        title: '',
        price: 0,
        category: null,
        description: '',
        images: '',
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const reportOptions = [
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
                <Dropdown
                    options={reportOptions}
                    placeholder={t("report.input.category")}
                    onChange={handleCategoryChange}
                    value={reportOptions.find(option => option.value === formData.category) || null}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateInput
                        label="Select a date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <DescriptionInput
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionchange}
                />
                <p>{t("report.choose_evidence")}</p>
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

export default ReportSubmissionForm;
