import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CodeInput from '../../atoms/Inputs/CodeInput';
import Button from '../../atoms/Buttons/Button';
import PopupBox from '../../molecules/PopupBox/PopupBox';
import axios from 'axios';

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

        try {
            const response = await axios.post('https://kalado.com/verify-code', {
                email,
                code,
            });

            console.log('Verification successful:', response.data);
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
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <Box sx={{ mt: 2 }}>
                    <Button
                        text="بررسی"
                        type="submit"
                        disabled={code.length !== 5} />
                </Box>
            </form>
        </PopupBox>
    );
};

export default CodeVerification;