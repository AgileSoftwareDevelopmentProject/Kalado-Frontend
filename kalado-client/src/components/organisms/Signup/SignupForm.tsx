import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { signupUser } from '../../../services/SignupService';

interface SignupFormProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onOpenLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: ''
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

    if (formData.password !== formData.passwordRepeat) {
      setError(t("signup_form.error.password_mismatch"));
      return;
    }

    try {
      const response = await signupUser(formData);
      console.log('Signup successful:', response);
      onClose();
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to sign up. Please check your details and try again.');
    }
  };

  return (
    <PopupBox onClose={onClose}>
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
        <NameInput
          name="username"
          placeholder={t("general_inputs.user_name")}
          value={formData.username}
          onChange={handleChange}
          isRequired={true}
        />
        <EmailInput
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <PhoneNumberInput
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          name="passwordRepeat"
          placeholder={t("general_inputs.password_repeat")}
          value={formData.passwordRepeat}
          onChange={handleChange}
        />
        <CustomButton
          text={t("signup_form.signup_btn")}
          type="submit"
          padding="10px 40px"
          margin="30px 0px 0px 0px"
        />
        <CustomLink
          to="/#"
          onClick={(e) => { e.preventDefault(); onOpenLogin(); }}
          color="primary"
          text={t("signup_form.login_link")}
        />
        <FormError message={error} />
      </form>
    </PopupBox>
  );
};

export default SignupForm;
