import React, { useState } from 'react';
import './SignupForm.css';
import PasswordInput from '../Input/PasswordInput';
import NameInput from '../Input/NameInput';
import { FaTimes } from 'react-icons/fa';


const SignupForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // First-Name Input
  const [firstName, setFirstName] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  // Last-Name Input
  const [lastName, setLastName] = useState('');

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="signup-popup">
      <div className="signup-header">
        <img src="/path/to/logo.png" alt="Logo" className="logo" />
        <button onClick={onClose} className="close-button">
          <FaTimes size={24} color="#FFFFFF" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <NameInput
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <NameInput
          placeholder="نام‌خانوادگی"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="شماره تلفن"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <PasswordInput placeholder="رمز عبور" />
        <PasswordInput placeholder="تکرار رمز عبور" />
        <button type="submit" className="signup-button">ثبت‌نام</button>
      </form>
      <p className="login-link">
        <a href="/login">در صورت داشتن حساب کاربری اینجا را کلیک کنید</a>
      </p>
    </div>
  );
};

export default SignupForm;
