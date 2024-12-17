import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NameInput from '../../atoms/Inputs/NameInput';
import EmailInput from '../../atoms/Inputs/EmailInput';
import PhoneNumberInput from '../../atoms/Inputs/PhoneNumberInput';
import PasswordInput from '../../atoms/Inputs/PasswordInput';
import Button from '../../atoms/Buttons/Button';
import CustomLink from '../../atoms/Links/CustomLink';
import PopupBox from '../../molecules/PopupBox/PopupBox';
import axios from 'axios';

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
      const response = await axios.post('https://kalado.com/signup', formData);
      console.log('Login successful:', response.data);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <PopupBox onClose={onClose}>
      <form onSubmit={handleSubmit}>
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
          <Button
            text="ثبت‌نام"
            type="submit"
          />
        </Box>
        <CustomLink
          to="/login"
          onClick={(e) => { e.preventDefault(); onOpenLogin(); }}
          color="primary"
          text="در صورت داشتن حساب کاربری اینجا را کلیک کنید"
        />
      </form>
    </PopupBox>
  );
};

export default SignupForm;