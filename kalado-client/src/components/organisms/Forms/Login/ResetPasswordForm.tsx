import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PasswordInput, CustomButton, FormError } from '../../../atoms';
import { PopupBox } from '../../../molecules';
import { resetPassword } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validatePassword } from '../../../../validators';
import { useModalContext } from '../../../../contexts';

const ResetPasswordForm: React.FC = () => {
    const { t } = useTranslation();
    const initialFormData = { newPassword: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState<string>('');
    const { isResetPasswordVisible, handleClosePopups, passwordToken } = useModalContext();

    const validateUserInputs = () => {
        const passwordValidationResult = validatePassword(formData.newPassword, t);
        if (!passwordValidationResult.valid) {
            setError(passwordValidationResult.error);
            return false;
        }
        return true;
    };

    const handleClose = () => {
        setFormData(initialFormData);
        setError('');
        handleClosePopups();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateUserInputs()) {
            const response = await resetPassword(passwordToken, formData.newPassword);
            if (response.isSuccess) {
                handleClose();
                toast(t("success.forget_password"));
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <PopupBox open={isResetPasswordVisible} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <p>{t("forget_password_form.enter_new_passwrod")}</p>
                <PasswordInput
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <CustomButton
                    text={t("forget_password_form.change_password_btn")}
                    type="submit"
                />
                <FormError message={error} />
            </form>
        </PopupBox>
    );
};

export default ResetPasswordForm;
