import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomCheckBox, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { signupUser } from '../../../services/SignupService';
import { toast } from 'react-toastify';
import { validatePassword, validatePhoneNumber } from '../../../validators';


interface SignupFormProps {
  onClose: () => void;
  onOpenLogin: () => void;
  onSignUpSuccess: (email: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onOpenLogin, onSignUpSuccess }) => {
  const { t } = useTranslation();
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: '',
    role: 'USER'
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'isAdmin') {
      setFormData(prevData => ({
        ...prevData,
        role: checked ? 'ADMIN' : 'USER'
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateUserInputs = () => {
    const phoneValidationResult = validatePhoneNumber(formData.phoneNumber, t);
    if (!phoneValidationResult.valid) {
      setError(phoneValidationResult.error);
      return false;
    }

    const passwordValidationResult = validatePassword(formData.password, t);
    if (!passwordValidationResult.valid) {
      setError(passwordValidationResult.error);
      return false;
    }

    if (formData.password !== formData.passwordRepeat) {
      setError(t("signup_form.error.password_mismatch"));
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateUserInputs()) {
      // Signup API call
      const response = await signupUser(formData.firstName, formData.lastName, formData.email, formData.phoneNumber, formData.password);
      if (response.isSuccess) {
        onSignUpSuccess(formData.email);
        handleClose();
        toast(t("success.signup"));
      } else {
        setError(response.message);
      }
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setError('');
    onClose();
  };

  return (
    <PopupBox onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <NameInput
          name="firstName"
          placeholder={t("general_inputs.first_name")}
          value={formData.firstName}
          onChange={handleChange}
          isRequired={true}
        />
        <NameInput
          name="lastName"
          placeholder={t("general_inputs.last_name")}
          value={formData.lastName}
          onChange={handleChange}
          isRequired={true}
        />
        <EmailInput
          value={formData.email}
          onChange={handleChange}
          isValidatorActive={true}
        />
        <PhoneNumberInput
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          isValidatorActive={true}
        />
        <PasswordInput
          name="passwordRepeat"
          placeholder={t("general_inputs.password_repeat")}
          value={formData.passwordRepeat}
          onChange={handleChange}
        />
        <CustomCheckBox
          label={t("signup_form.is_admin")}
          checked={formData.role === 'ADMIN'}
          onChange={handleChange}
          name="isAdmin"
          id="isAdminCheckbox"
        />
        <CustomButton
          text={t("signup_form.signup_btn")}
          type="submit"
        />
        <CustomLink
          to="/#"
          onClick={(e) => { e.preventDefault(); onOpenLogin(); }}
          text={t("signup_form.login_link")}
        />
        <FormError message={error} />
      </form>
    </PopupBox>
  );
};

export default SignupForm;
