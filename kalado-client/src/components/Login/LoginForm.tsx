import React, { useState } from 'react';
import './Loginform.css';
import '../Common.css';
import EmailInput from '../Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface LoginFormProps {
    onClose: () => void;
    onOpenSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onOpenSignup }) => {

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://kalado.com/login', formData);
            console.log('Login successful:', response.data);
            onClose();
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return (
        <div className="login-popup">
            <div className="login-header">
                <img src="/images/logo.png" alt="کالادو" className="logo" />
                <button onClick={onClose} className="close-button" aria-label="close">
                    <FaTimes size={24} color="#FFFFFF" />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <EmailInput
                    name="email"
                    placeholder="ایمیل"
                    value={formData.email}
                    onChange={handleChange}
                />
                <PasswordInput
                    name="password"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="login-button">ورود</button>
                <p>
                    <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); onOpenSignup(); }}>ایجاد حساب جدید</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;