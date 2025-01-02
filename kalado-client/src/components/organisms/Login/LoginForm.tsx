import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmailInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { loginUser } from '../../../services/LoginService';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';

interface LoginFormProps {
    onClose: () => void;
    onOpenSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onOpenSignup }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string>('');

    const { setToken, setUserRole } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToken('1234');
        const response = await loginUser(formData.email, formData.password);
        if (response.isSuccess) {
            setToken(response.token);
            setUserRole(response.role);
            setFormData({ email: '', password: '' });
            onClose();
            toast(t("success.login"));
        } else {
            setError(response.message);
        }
    };

    return (
        <PopupBox onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <EmailInput
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <CustomButton
                    text={t("login_form.login_btn")}
                    type="submit"
                />
                <CustomLink
                    to="/#"
                    onClick={(e) => { e.preventDefault(); onOpenSignup(); }}
                    text={t("login_form.signup_link")}
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default LoginForm;
