import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateInput, Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';


const ReportSubmissionForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        date: string;
        type: string;
        description: string;
        images: File[];
    }>({
        date: '',
        type: '',
        description: '',
        images: [],
    });
    const [error, setError] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { report_options } = OptionsComponent();
    const {
        isReportSubmissionVisible,
    } = useModalContext();



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

        const response = await submitReport(formData.date, formData.type, formData.description, formData.images);
        if (response.isSuccess) {
            setFormData({ date: '', type: '', description: '', images: [] });
            toast(t("success.report"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox open={isReportSubmissionVisible}>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    options={report_options}
                    placeholder={t("report.input.category")}
                    onChange={handleCategoryChange}
                    value={report_options.find(option => option.value === formData.type) || null}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateInput
                        label={t("general_inputs.date")}
                        value={selectedDate}
                        onChange={(newValue) => {
                            setSelectedDate(newValue);
                            if (newValue) {
                                handleChange('date', newValue.toISOString());
                            }
                        }}
                    />
                </LocalizationProvider>
                <DescriptionInput
                    value={formData.description}
                    onChange={(description) => handleChange('description', description)}
                />
                <ImageUploadBox onUpload={handleImageUpload} title={t("report.choose_evidence")} />
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;
