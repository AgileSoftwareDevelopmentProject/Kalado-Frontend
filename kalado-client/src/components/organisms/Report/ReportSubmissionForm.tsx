import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DescriptionInput, CustomButton, FormError } from '../../atoms';
import { PopupBox, ImageUploadBox } from '../../molecules';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { createReport } from '../../../api/services/ReportService';
import { ReportData } from '../../../utils/apiTypes';


const ReportSubmissionForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ReportData>({
        date: '',
        violationType: '',
        description: '',
        images: [],
        reportedUserId: 0,
        reportedContentId: 0,
    });
    const [error, setError] = useState<string>('');
    const { report_options } = OptionsComponent();
    const {
        isReportSubmissionVisible,
        handleClosePopups,
    } = useModalContext();

    const handleChange = (field: string, value: any) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
        handleChange('type', selectedOption ? selectedOption.value : '');
    };

    const handleImageUpload = (files: File[]) => {
        handleChange('images', files);
    };

    const handleClose = () => {
        setFormData({
            title: '',
            price: {
                amount: 0,
                unit: 'Toman',
            },
            category: '',
            description: '',
            images: [],
            productionYear: null,
            brand: null,
        });
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await createReport(formData);
        if (response.isSuccess) {
            handleClose();
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
