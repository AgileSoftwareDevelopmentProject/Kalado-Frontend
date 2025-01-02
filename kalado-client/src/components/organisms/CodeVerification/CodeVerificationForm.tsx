import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeInput, CustomButton, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { verifyCode } from '../../../services/CodeVerificationService';
import { toast } from 'react-toastify';

interface CodeVerificationFormProps {
    onClose: () => void;
}

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [error, setError] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await verifyCode(code);
        if (response.isSuccess) {
            onClose();
            toast(t("success.login"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <p>{t("code_verification.enter_code")}</p>
            <form onSubmit={handleSubmit}>
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <CustomButton
                    text={t("code_verification.verify_btn")}
                    type="submit"
                    disabled={code.length !== 6}
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default CodeVerificationForm;
