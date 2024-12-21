import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { EmailInput, PasswordInput, CustomButton, CustomLink } from '../../atoms';
import { PopupBox } from '../../molecules';
import { loginUser } from '../../../services/LoginService';

interface LoginFormProps {
    onClose: () => void;
    onOpenSignup: () => void;
    onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onOpenSignup, onLoginSuccess }) => {
    const { t } = useTranslation();
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
                <CustomButton
                    text={t("login_form.login_btn")}
                    type="submit"
                    padding="10px 40px"
                    margin="30px 0px 0px 0px"
                />
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); onOpenSignup(); }}
                    text={t("login_form.signup_link")}
                />
                {error && <Typography color="error">{error}</Typography>}
            </form>
        </PopupBox>
    );
};

export default LoginForm;
