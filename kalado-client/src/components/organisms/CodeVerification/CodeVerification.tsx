import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeInput, CustomButton, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { verifyCode } from '../../../services/CodeVerificationService';

interface CodeVerificationProps {
    email: string;
    onClose: () => void;
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ email, onClose }) => {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (/^\d*$/.test(value) && value.length <= 5) {
            setCode(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await verifyCode(email, code);
            console.log('Verification successful:', response);
            onClose();
        } catch (error) {
            console.error('Verification error:', error);
            setError('Invalid code. Please try again.');
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <p>{t("code_verification.enter_code")}</p>
            <form onSubmit={handleSubmit}>
                <CodeInput value={code} onChange={handleChange} />
                <CustomButton text="بررسی" type="submit" disabled={code.length !== 5} />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default CodeVerification;
