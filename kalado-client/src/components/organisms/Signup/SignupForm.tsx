import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomButton, CustomLink, FormError } from '../../atoms';
import { PopupBox } from '../../molecules';
import { signupUser } from '../../../services/SignupService';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

interface SignupFormProps {
  onClose: () => void;
  onOpenLogin: () => void;
  onSignUpSuccess: (email: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onOpenLogin, onSignUpSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: '',
    role: 'USER'
  });

  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordRepeat) {
      setError(t("signup_form.error.password_mismatch"));
      return;
    }

    try {
      const response = await signupUser(formData.firstName, formData.lastName, formData.email,
        formData.phoneNumber, formData.password);
      console.log('Signup successful:', response);

      onSignUpSuccess(formData.email);
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
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.role === 'ADMIN'}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
              />
            }
            label={t("signup_form.is_admin")}
          />
        </Box>
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
