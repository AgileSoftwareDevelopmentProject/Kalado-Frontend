// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import SignupForm from './SignupForm';
// import axios from 'axios';

// // Mock axios
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('SignupForm Component', () => {
//   const mockOnClose = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(console, 'error').mockImplementation(() => {});
//   });

//   test('allows typing into input fields', () => {
//     render(<SignupForm onClose={mockOnClose} />);

//     // Input fields
//     const firstNameInput = screen.getByPlaceholderText('نام') as HTMLInputElement;
//     const lastNameInput = screen.getByPlaceholderText('نام‌خانوادگی') as HTMLInputElement;
//     const usernameInput = screen.getByPlaceholderText('نام کاربری') as HTMLInputElement;
//     const emailInput = screen.getByPlaceholderText('ایمیل') as HTMLInputElement;
//     const phoneNumberInput = screen.getByPlaceholderText('شماره تلفن') as HTMLInputElement;

//     // Simulate user input
//     fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'TestFirstName' } });
//     fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'TestLastName' } });
//     fireEvent.change(usernameInput, { target: { name: 'username', value: 'TestUsername' } });
//     fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
//     fireEvent.change(phoneNumberInput, { target: { name: 'phoneNumber', value: '1234567890' } });

//     // Check values
//     expect(firstNameInput.value).toBe('TestFirstName');
//     expect(lastNameInput.value).toBe('TestLastName');
//     expect(usernameInput.value).toBe('TestUsername');
//     expect(emailInput.value).toBe('test@example.com');
//     expect(phoneNumberInput.value).toBe('1234567890');
//   });

//   test('calls API on form submission and closes the form on success', async () => {
//     mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Signup successful' } });
  
//     render(<SignupForm onClose={mockOnClose} />);
  
//     fireEvent.change(screen.getByPlaceholderText('نام'), { target: { name: 'firstName', value: 'TestFirstName' } });
//     fireEvent.change(screen.getByPlaceholderText('نام‌خانوادگی'), { target: { name: 'lastName', value: 'TestLastName' } });
//     fireEvent.change(screen.getByPlaceholderText('نام کاربری'), { target: { name: 'username', value: 'TestUsername' } });
//     fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { name: 'email', value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText('شماره تلفن'), { target: { name: 'phoneNumber', value: '1234567890' } });
//     fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { name: 'password', value: 'password123' } });
//     fireEvent.change(screen.getByPlaceholderText('تکرار رمز عبور'), { target: { name: 'passwordRepeat', value: 'password123' } });
  
//     fireEvent.click(screen.getByText('ثبت‌نام'));
  
//     // Wait for API call
//     await waitFor(() => {
//       expect(mockedAxios.post).toHaveBeenCalledWith(
//         'https://kalado.com/login',
//         expect.objectContaining({
//           firstName: 'TestFirstName',
//           lastName: 'TestLastName',
//           username: 'TestUsername',
//           email: 'test@example.com',
//           phoneNumber: '1234567890',
//           password: 'password123',
//           passwordRepeat: 'password123',
//         })
//       );
//     });
  
//     expect(mockOnClose).toHaveBeenCalled();
//   });  

//   test('displays an error message on API failure', async () => {
//     // Mock the axios call to reject with an error
//     mockedAxios.post.mockRejectedValueOnce(new Error('Signup failed'));
  
//     render(<SignupForm onClose={mockOnClose} />);
  
//     // Fill in some required fields
//     fireEvent.change(screen.getByPlaceholderText('نام'), { target: { name: 'firstName', value: 'TestFirstName' } });
//     fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { name: 'email', value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { name: 'password', value: 'password123' } });
  
//     // Click the submit button
//     fireEvent.click(screen.getByText('ثبت‌نام'));
  
//     // Wait for the mocked API call
//     await waitFor(() => {
//       expect(mockedAxios.post).toHaveBeenCalledWith(
//         'https://kalado.com/login',
//         expect.objectContaining({
//           firstName: 'TestFirstName',
//           email: 'test@example.com',
//           password: 'password123',
//         })
//       );
//     });
  
//     // Verify that the error was logged to the console
//     expect(console.error).toHaveBeenCalledWith('Signup error:', expect.any(Error));
//   });  
// });
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignupForm', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    mockedAxios.post.mockClear();
  });

  it('closes the form when the close button is clicked', () => {
    render(<SignupForm onClose={onCloseMock} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('updates form fields on user input', () => {
    render(<SignupForm onClose={onCloseMock} />);

    const firstNameInput = screen.getByPlaceholderText('نام');
    const lastNameInput = screen.getByPlaceholderText('نام‌خانوادگی');
    const usernameInput = screen.getByPlaceholderText('نام کاربری');
    const emailInput = screen.getByPlaceholderText('ایمیل');
    const phoneInput = screen.getByPlaceholderText('شماره تلفن');
    const passwordInput = screen.getByPlaceholderText('رمز عبور');
    const passwordRepeatInput = screen.getByPlaceholderText('تکرار رمز عبور');

    fireEvent.change(firstNameInput, { target: { value: 'Ali' } });
    fireEvent.change(lastNameInput, { target: { value: 'Rezaei' } });
    fireEvent.change(usernameInput, { target: { value: 'alirezaei123' } });
    fireEvent.change(emailInput, { target: { value: 'ali@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '09123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordRepeatInput, { target: { value: 'password123' } });

    expect(firstNameInput).toHaveValue('Ali');
    expect(lastNameInput).toHaveValue('Rezaei');
    expect(usernameInput).toHaveValue('alirezaei123');
    expect(emailInput).toHaveValue('ali@example.com');
    expect(phoneInput).toHaveValue('09123456789');
    expect(passwordInput).toHaveValue('password123');
    expect(passwordRepeatInput).toHaveValue('password123');
  });

  it('submits the form and calls onClose on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Login successful' } });
    render(<SignupForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByPlaceholderText('نام'), { target: { value: 'Ali' } });
    fireEvent.change(screen.getByPlaceholderText('نام‌خانوادگی'), { target: { value: 'Rezaei' } });
    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), { target: { value: 'alirezaei123' } });
    fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { value: 'ali@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('شماره تلفن'), { target: { value: '09123456789' } });
    fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('تکرار رمز عبور'), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: 'ثبت‌نام' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/login', {
        firstName: 'Ali',
        lastName: 'Rezaei',
        username: 'alirezaei123',
        email: 'ali@example.com',
        phoneNumber: '09123456789',
        password: 'password123',
        passwordRepeat: 'password123'
      });
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('handles errors during submission', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
    render(<SignupForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByPlaceholderText('نام'), { target: { value: 'Ali' } });
    fireEvent.change(screen.getByPlaceholderText('نام‌خانوادگی'), { target: { value: 'Rezaei' } });
    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), { target: { value: 'alirezaei123' } });
    fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { value: 'ali@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('شماره تلفن'), { target: { value: '09123456789' } });
    fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('تکرار رمز عبور'), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: 'ثبت‌نام' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });
});
