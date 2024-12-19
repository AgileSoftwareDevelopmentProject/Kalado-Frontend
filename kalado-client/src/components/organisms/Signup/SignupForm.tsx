import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { NameInput, EmailInput, PhoneNumberInput, PasswordInput, CustomButton, CustomLink } from '../../atoms';
import { PopupBox } from '../../molecules';
import { signupUser } from '../../../services/SignupService';

interface SignupFormProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onOpenLogin }) => {
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
        {error && <Typography color="error">{error}</Typography>}
        <NameInput
          name="firstName"
          placeholder="نام"
          value={formData.firstName}
          onChange={handleChange}
          isRequired={true}
        />
        <NameInput
          name="lastName"
          placeholder="نام‌خانوادگی"
          value={formData.lastName}
          onChange={handleChange}
          isRequired={true}
        />
        <NameInput
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={handleChange}
          isRequired={true}
        />
        <EmailInput
          name="email"
          placeholder="ایمیل"
          value={formData.email}
          onChange={handleChange}
        />
        <PhoneNumberInput
          name="phoneNumber"
          placeholder="شماره تلفن"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          name="passwordRepeat"
          placeholder="تکرار رمز عبور"
          value={formData.passwordRepeat}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2 }}>
          <CustomButton text="ثبت‌نام" type="submit" />
        </Box>
        <CustomLink
          to="/#"
          onClick={(e) => { e.preventDefault(); onOpenLogin(); }}
          color="primary"
          text="در صورت داشتن حساب کاربری اینجا را کلیک کنید"
        />
      </form>
    </PopupBox>
  );
};

export default SignupForm;
