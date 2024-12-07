import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import CodeInput from '../Input/CodeInput';
import './CodeVerification.css';

interface CodeVerificationProps {
    email: string; // Email address for which the code was sent
    onClose: () => void; // Function to close the verification form
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ email, onClose }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Allow only digits and limit length to 5
        if (/^\d*$/.test(value) && value.length <= 5) {
            setCode(value); // Update the code state
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
                {/* <img src="/path/to/logo.png" alt="Logo" className="logo" /> */}
                <p style={{ fontSize: '30px', color: '#D74101', fontWeight: 'Bold', padding: '0px' }}>کالادو</p>
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
