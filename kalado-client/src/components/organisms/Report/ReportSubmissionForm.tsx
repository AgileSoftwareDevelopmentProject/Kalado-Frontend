import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { createReport } from '../../../api/services/ReportService';
import ImageUploadBox from './ImageUploadBox';

const ReportSubmissionForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        violationType: string;
        description: string;
        images: File[];
    }>({
        violationType: '',
        description: '',
        images: [],
    });
    const [error, setError] = useState<string>('');
    const { report_options } = OptionsComponent();
    const { isReportSubmissionVisible, handleClosePopups } = useModalContext();

    const handleChange = (field: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        handleChange('violationType', selectedOption ? selectedOption.value : '');
    };

    const handleImageUpload = (files: File[]) => {
        handleChange('images', files);
    };

    const resetForm = () => {
        setFormData({
            violationType: '',
            description: '',
            images: [],
        });
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.violationType) {
            setError(t('report.error.missing_violation_type'));
            return;
        }

        if (!formData.description && formData.images.length === 0) {
            setError(t('report.error.missing_description_or_image'));
            return;
        }

        try {
            const reportData = {
                violationType: formData.violationType,
                description: formData.description,
            };

            const response = await createReport(reportData, formData.images);

            if (response.isSuccess) {
                resetForm();
                toast(t('report.success.report_submitted'));
            } else {
                setError(response.message || t('report.error.submission_failed'));
            }
        } catch (err) {
            setError(t('report.error.submission_failed'));
            console.error(err);
        }
    };

    return (
        <PopupBox open={isReportSubmissionVisible}>
            <form onSubmit={handleSubmit}>
                {/* Dropdown for Violation Type */}
                <Dropdown
                    options={report_options}
                    placeholder={t('report.input.category')}
                    onChange={handleCategoryChange}
                    value={report_options.find((option) => option.value === formData.violationType) || null}
                    isRequired={true}
                    errorMessage={t('report.error.missing_violation_type')}
                />

                {/* Description Input */}
                <DescriptionInput
                    value={formData.description}
                    onChange={(description) => handleChange('description', description)}
                />

                {/* Image Upload */}
                <ImageUploadBox
                    onUpload={handleImageUpload}
                    title={t('report.choose_evidence')}
                    isRequired={formData.description.length === 0} // if no description
                    errorMessage={t('report.error.missing_description_or_image')}
                />

                {/* Submit Button */}
                <CustomButton
                    text={t('item_details.report_submission_btn')}
                    type="submit"
                />

                {/* Error Message */}
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;
