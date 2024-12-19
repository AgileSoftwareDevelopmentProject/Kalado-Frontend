import React, { useState } from 'react';
import { CodeInput, CustomButton } from '../../atoms';
import { PopupBox } from '../../molecules';
import { verifyCode } from '../../../services/CodeVerificationService';

interface CodeVerificationProps {
    email: string;
    onClose: () => void;
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ email, onClose }) => {

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
            <p>لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید</p>
            <form onSubmit={handleSubmit}>
                <CodeInput value={code} onChange={handleChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <CustomButton text="بررسی" type="submit" disabled={code.length !== 5} />
                {/* <Box sx={{ mt: 2 }}>
                    
                </Box> */}
            </form>
        </PopupBox>
    );
};

export default CodeVerification;
