import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { EmailInput, PasswordInput, CustomButton, CustomLink } from '../../atoms';
import { PopupBox } from '../../molecules';
import { login } from '../../../services/apiService';
import { LoginRequest, LoginResponse } from '../../../services/types';

interface LoginFormProps {
    onClose: () => void;
    onOpenSignup: () => void;
    onLoginSuccess: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onOpenSignup, onLoginSuccess }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;

        if (email && password) {
            try {
                const response = await loginUser(email, password);
                if (response.isSuccess) {
                    console.log('Login successful:', response);
                    onLoginSuccess(email);
                    setFormData({ email: '', password: '' });
                    onClose();
                } else {

                    setError(response.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                setError('An error occurred during login. Please try again later.');
            }
        } else {
            setError('Both email and password are required.');
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <EmailInput
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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