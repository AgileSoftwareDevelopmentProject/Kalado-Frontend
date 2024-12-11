import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import CodeInput from '../Input/CodeInput';
import './CodeVerification.css';
import '../Common.css';

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
        <div className="code-verification-popup">
            <div className="code-verification-header">
                <img src="/images/logo.png" alt="کالادو" className="logo" />
                <button onClick={onClose} className="close-button">
                    <FaTimes size={24} color="#FFFFFF" />
                </button>
            </div>
            <p>لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید</p>
            <form onSubmit={handleSubmit} className="code-verification-form">
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <button type="submit" className="code-verification-button" disabled={code.length !== 5}>بررسی</button>
            </form>
        </div>
    );
};

export default CodeVerification;
