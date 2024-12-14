import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import CodeInput from '../Input/CodeInput';
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
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 5); // only digits, max 5 characters
    setCode(sanitizedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kalado.com/verify-code', { email, code });
      console.log('Verification successful:', response.data);
      onClose();
    } catch (error: any) {
      console.error('Verification error:', error);
      const errorMessage =
        error.response?.data?.message ||
        (error.message.includes('Network Error')
          ? 'Network error occurred. Please check your connection.'
          : 'Invalid code. Please try again.');
      setError(errorMessage);
    }
  };

  return (
    <div className="code-verification-popup">
      <div className="code-verification-header">
        <p style={{ fontSize: '30px', color: '#D74101', fontWeight: 'bold' }}>کالادو</p>
        <button onClick={onClose} className="close-button" aria-label="Close">
          <FaTimes size={24} color="#FFFFFF" />
        </button>
      </div>
      <p>لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید</p>
      <form onSubmit={handleSubmit} className="code-verification-form">
        <CodeInput value={code} onChange={handleChange} />
        {error && <p role="alert" className="error-message">{error}</p>}
        <button type="submit" className="code-verification-button" disabled={code.length !== 5}>
          بررسی
        </button>
      </form>
    </div>
  );
};

export default CodeVerification;