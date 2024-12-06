import React, { useState } from 'react';
import './SignupForm.css';
import NameInput from '../Input/NameInput';
import EmailInput from '../Input/EmailInput';
import PhoneNumberInput from '../Input/PhoneNumberInput';
import PasswordInput from '../Input/PasswordInput';
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

  // Username Input
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Email Input
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Phone Number Input
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Password Input
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Password Repeat Input
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handlePasswordRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeat(e.target.value);
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
          isRequired={true}
        />
        <NameInput
          placeholder="نام‌خانوادگی"
          value={lastName}
          onChange={handleLastNameChange}
          isRequired={true}
        />
        <NameInput
          placeholder="نام کاربری"
          value={username}
          onChange={handleUsernameChange}
          isRequired={true}
        />
        <EmailInput
          value={email}
          onChange={handleEmailChange}
        />
        <PhoneNumberInput
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
        <PasswordInput
          placeholder="رمز عبور"
          value={password}
          onChange={handlePasswordChange}
        />
        <PasswordInput
          placeholder="تکرار رمز عبور"
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
        <button type="submit" className="signup-button">ثبت‌نام</button>
      </form>
      <p className="login-link">
        <a href="/login">در صورت داشتن حساب کاربری اینجا را کلیک کنید</a>
      </p>
    </div>
  );
};

export default SignupForm;
