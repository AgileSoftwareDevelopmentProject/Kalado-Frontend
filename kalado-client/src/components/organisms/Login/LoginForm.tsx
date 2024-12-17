import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EmailInput from '../../atoms/Inputs/EmailInput';
import PasswordInput from '../../atoms/Inputs/PasswordInput';
import Button from '../../atoms/Buttons/Button';
import Logo from '../../atoms/Logo/Logo';
import CustomLink from '../../atoms/Links/CustomLink';
import CloseButton from '../../atoms/Buttons/CloseButton';
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
        if (formData.email && formData.password) {
            // Call the success handler with the username
            onLoginSuccess(formData.email);
            // Optionally clear fields or perform other actions
            onClose(); // Close the form after successful login
        }

        try {
            const response = await axios.post('https://kaladoshop.com/v1/auth/login', formData);
            console.log('Login successful:', response.data);
            onClose();
        } catch (error) {
            console.error('Login error:', error);
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
            <CloseButton onClose={onClose} />
            <form onSubmit={handleSubmit}>
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
                    type="submit" />
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); onOpenSignup(); }}
                    color="primary"
                    text="ایجاد حساب جدید"
                />
            </form>
        </Box>
    );
};

export default LoginForm;