import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createAd } from '../../../services/CreateAdService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';

interface ReportSubmissionFormProps {
    onClose: () => void;
}

const ReportSubmissionForm: React.FC<ReportSubmissionFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        date: string;
        type: string | null;
        description: string;
        images: File[];
    }>({
        date: '',
        type: null,
        description: '',
        images: [],
    });
    const [error, setError] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const reportOptions = [
        { value: 'Abuse', label: t("report.category.one") },
        { value: 'Inproper Content', label: t("report.category.two") },
        { value: 'Inproper Price', label: t("report.category.three") },
    ];

    // Unified change handler
    const handleChange = (field: string, value: any) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        handleChange('type', selectedOption ? selectedOption.value : null);
    };

    const handleImageUpload = (files: File[]) => {
        handleChange('images', files);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await createAd(formData.date, formData.type, formData.description, formData.images);
        if (response.isSuccess) {
            setFormData({ date: '', type: null, description: '', images: [] });
            onClose();
            toast(t("success.report"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    options={reportOptions}
                    placeholder={t("report.input.category")}
                    onChange={handleCategoryChange}
                    value={reportOptions.find(option => option.value === formData.type) || null}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateInput
                        label={t("general_inputs.date")}
                        value={selectedDate}
                        onChange={(newValue) => handleChange('date', newValue)}
                    />
                </LocalizationProvider>
                <DescriptionInput
                    name="description"
                    value={formData.description}
                    onChange={(description) => handleChange('description', description)}
                />
                <ImageUploadBox onUpload={handleImageUpload} title={t("report.choose_evidence")} />
                <CustomButton
                    text={t("create_ad.create_ad_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;
