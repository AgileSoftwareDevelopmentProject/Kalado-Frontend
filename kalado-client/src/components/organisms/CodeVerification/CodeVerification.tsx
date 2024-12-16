import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import CodeInput from '../../atoms/Input/CodeInput';
import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Logo/Logo';
import './CodeVerification.css';

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
            </div>
            <p>لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید</p>
            <form onSubmit={handleSubmit} className="code-verification-form">
                <CodeInput
                    value={code}
                    onChange={handleChange}
                />
                <Button
                    text="بررسی"
                    type="submit"
                    disabled={code.length !== 5}>
                </Button>
            </form>
        </div>
    );
};

export default CodeVerification;