import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { EmailInput, PasswordInput, CustomButton, CustomLink } from '../../atoms';
import { PopupBox } from '../../molecules';
import { loginUser } from '../../../services/LoginService';

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

    const [error, setError] = useState<string | null>(null);

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
            try {
                const response = await loginUser(formData);
                console.log('Login successful:', response);
                onLoginSuccess(formData.email);
                setFormData({ email: '', password: '' });
                onClose();
            } catch (error) {
                console.error('Login error:', error);
                setError('Invalid email or password');
            }
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                {error && <Typography color="error">{error}</Typography>}
                <EmailInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Box sx={{ mt: 2 }}>
                    <CustomButton text="ورود" type="submit" />
                </Box>
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); onOpenSignup(); }}
                    text="ایجاد حساب جدید"
                />
            </form>
        </PopupBox>
    );
};

export default LoginForm;
