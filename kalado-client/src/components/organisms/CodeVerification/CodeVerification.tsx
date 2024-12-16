import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { FaTimes } from 'react-icons/fa';
import CodeInput from '../../atoms/Inputs/CodeInput';
import Button from '../../atoms/Buttons/Button';
import Logo from '../../atoms/Logo/Logo';
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
        <Box
            sx={{
                width: 350,
                padding: 2,
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#272C48',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: 3,
            }}
        >
            <Logo />
            <Button
                onClick={onClose}
                children={<FaTimes size={24} />}
                backgroundColor="transparent"
                style={{
                    color: 'white',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                }}
            />
            <p>لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید</p>
            <form onSubmit={handleSubmit}>
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <Button
                    text="بررسی"
                    type="submit"
                    disabled={code.length !== 5} />
            </form>
        </Box>
    );
};

export default CodeVerification;