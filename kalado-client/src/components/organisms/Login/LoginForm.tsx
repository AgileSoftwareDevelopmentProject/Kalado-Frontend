import React, { useState } from 'react';
import './LoginForm.css';
import EmailInput from '../../atoms/Input/EmailInput';
import PasswordInput from '../../atoms/Input/PasswordInput';
import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Logo/Logo';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface LoginFormProps {
    onClose: () => void;
    onOpenSignup: () => void;
    onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onOpenSignup, onLoginSuccess }) => {

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
        // if (formData.email && formData.password) {
        //     // Call the success handler with the username
        //     onLoginSuccess(formData.email);
        //     // Optionally clear fields or perform other actions
        //     setUsername('');
        //     setPassword('');
        //     onClose(); // Close the form after successful login
        // }

        try {
            const response = await axios.post('https://kaladoshop.com/v1/auth/login', formData);
            console.log('Login successful:', response.data);
            onClose();
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return (
        <div className="login-popup">
            <div className="login-header">
                <Logo />
                <Button
                    onClick={onClose}
                    children={<FaTimes size={24} />}
                    style={{
                        color: 'white',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                />
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
                <Button
                    text="ورود"
                    type="submit">
                </Button>
                <p>
                    <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); onOpenSignup(); }}>ایجاد حساب جدید</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;