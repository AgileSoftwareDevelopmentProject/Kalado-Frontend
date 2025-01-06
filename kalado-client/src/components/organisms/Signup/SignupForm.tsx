import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomCheckBox, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { signupUser } from '../../../api/services/AuthService';
import { toast } from 'react-toastify';
import { validatePassword, validatePhoneNumber } from '../../../validators';
import { useModalContext } from '../../../contexts';


const SignupForm: React.FC = () => {
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
  const { isSignupVisible, handleOpenLogin, handleOpenCodeVerification } = useModalContext();

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


  const handleClose = () => {
    setFormData(initialFormData);
    setError('');
    handleOpenCodeVerification();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateUserInputs()) {
      const response = await signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role
      });

      if (response.isSuccess) {
        console.log("Register API call");
        console.log(response);
        handleClose();
        toast(t("success.signup"));
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <PopupBox open={isSignupVisible}>
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
          onClick={(e) => { e.preventDefault(); handleOpenLogin(); }}
          text={t("signup_form.login_link")}
        />
        <FormError message={error} />
      </form>
    </PopupBox>
  );
};

export default SignupForm;
