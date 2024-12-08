import React, { useState } from 'react';
import './SignupForm.css';
import NameInput from '../Input/NameInput';
import EmailInput from '../Input/EmailInput';
import PhoneNumberInput from '../Input/PhoneNumberInput';
import PasswordInput from '../Input/PasswordInput';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
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
    <div className="signup-popup">
      <div className="signup-header">
        <p style={{ fontSize: '30px', color: '#D74101', fontWeight: 'Bold', padding: '0px' }}>کالادو</p>
        <button onClick={onClose} className="close-button" aria-label="close">
          <FaTimes size={24} color="#FFFFFF" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <button type="submit" className="signup-button">ثبت‌نام</button>
        <p>
          <a href="/login" className="login-link">در صورت داشتن حساب کاربری اینجا را کلیک کنید</a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;