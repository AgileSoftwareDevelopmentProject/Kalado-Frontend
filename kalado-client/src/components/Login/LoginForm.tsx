import React, { useState } from 'react';
import './Loginform.css';
import EmailInput from '../Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';
import { FaTimes } from 'react-icons/fa';


const SignupForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="login-popup">
            <div className="login-header">
                {/* <img src="/path/to/logo.png" alt="Logo" className="logo" /> */}
                <p style={{ fontSize: '30px', color: '#D74101', fontWeight: 'Bold', padding: '0px' }}>کالادو</p>
                <button onClick={onClose} className="close-button">
                    <FaTimes size={24} color="#FFFFFF" />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <EmailInput
                    value={formData.email}
                    onChange={handleChange}
                />
                <PasswordInput
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="login-button">ورود</button>
                <p>
                    <a href="/signup" className="signup-link">ایجاد حساب جدید</a>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;
