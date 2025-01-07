import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { createReportWithImages } from '../../../api/services/ReportService';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { ReportData } from '../../../utils/apiTypes';

interface ReportSubmissionFormProps {
    reportedContentId: number;
}

const ReportSubmissionForm: React.FC<ReportSubmissionFormProps> = ({ reportedContentId }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ReportData>({
        violationType: '',
        description: '',
        reportedContentId,
    });
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const { report_options } = OptionsComponent();
    const { isReportSubmissionVisible, handleClosePopups } = useModalContext();

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        setFormData((prevData) => ({
            ...prevData,
            violationType: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleDescriptionChange = (description: string) => {
        setFormData((prevData) => ({
            ...prevData,
            description,
        }));
    };

    const handleImageUpload = (files: File[]) => {
        setImages(files);
    };

    const handleClose = () => {
        setFormData({
            violationType: '',
            description: '',
            reportedContentId,
        });
        setImages([]);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createReportWithImages(formData, images);
            if (response.isSuccess) {
                handleClose();
                toast(t("success.report_submission"));
            } else {
                setError(response.message || t("error.report_submission"));
            }
        } catch (err) {
            setError(t("error.report_submission"));
        }
    };

    return (
        <PopupBox open={isReportSubmissionVisible}>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    options={report_options}
                    placeholder={t("report.input.category")}
                    onChange={handleCategoryChange}
                    value={report_options.find(option => option.value === formData.violationType) || null}
                />
                <DescriptionInput
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder={t("report.input.description")}
                />
                <ImageUploadBox
                    onUpload={handleImageUpload}
                    title={t("report.choose_evidence")}
                />
                <CustomButton
                    text={t("report.submit_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ReportSubmissionForm;