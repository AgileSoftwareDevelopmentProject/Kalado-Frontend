import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NameInput from '../../atoms/Inputs/NameInput';
import EmailInput from '../../atoms/Inputs/EmailInput';
import PhoneNumberInput from '../../atoms/Inputs/PhoneNumberInput';
import PasswordInput from '../../atoms/Inputs/PasswordInput';
import Button from '../../atoms/Buttons/Button';
import Logo from '../../atoms/Logo/Logo';
import CustomLink from '../../atoms/Links/CustomLink';
import { FaTimes } from 'react-icons/fa';
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
      const response = await axios.post('https://kalado.com/login', formData);
      console.log('Login successful:', response.data);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        padding: 2,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#272C48',
        borderRadius: 10,
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: 3,
      }}
    >
      <Logo />
      <Button
        onClick={onClose}
        children={<FaTimes size={24} />}
        backgroundColor="transparent"
        style={{
          color: 'white',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      />
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
        <Button
          text="ثبت‌نام"
          type="submit" />
        <CustomLink
          to="/login"
          onClick={(e) => { e.preventDefault(); onOpenLogin(); }}
          color="primary"
          text="در صورت داشتن حساب کاربری اینجا را کلیک کنید"
        />
      </form>
    </Box>
  );
};

export default SignupForm;