import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { EmailInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { loginUser } from '../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../validators';
import { setToken, setUserRole } from '../../../features/auth/authSlice';
import { openSignup, closePopups } from '../../../features/modal/modalSlice';


const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const initialFormData = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const isLoginVisible = useSelector((state) => state.modal.isLoginVisible);

    const validateUserInputs = () => {
        const emailValidationResult = validateEmail(formData.email, t);
        if (!emailValidationResult.valid) {
            setError(emailValidationResult.error);
            return false;
        }
        return true;
    };

    const handleClose = () => {
        setFormData(initialFormData);
        setError('');
        dispatch(closePopups());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateUserInputs()) {
            const response = await loginUser(formData.email, formData.password);
            if (response.isSuccess) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setUserRole(response.data.role);
                handleClose();
                toast(t("success.login"));
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <PopupBox onOpen={isLoginVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <EmailInput
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isValidatorActive={true}
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
                    onClick={(e) => { e.preventDefault(); dispatch(openSignup()); }}
                    text={t("login_form.signup_link")}
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default LoginForm;
