import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './LoginForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginForm Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('renders login form correctly', () => {
    render(<SignupForm onClose={mockOnClose} />);

    expect(screen.getByText('کالادو')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('ایمیل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('رمز عبور')).toBeInTheDocument();

    expect(screen.getByText('ورود')).toBeInTheDocument();
    expect(screen.getByText('ایجاد حساب جدید')).toBeInTheDocument();
  });

  test('allows typing into email and password fields', () => {
    render(<SignupForm onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('ایمیل') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('رمز عبور') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls API on form submission and closes the form on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Login successful' } });

    render(<SignupForm onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('ایمیل');
    const passwordInput = screen.getByPlaceholderText('رمز عبور');
    const submitButton = screen.getByText('ورود');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('displays error message on API failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<SignupForm onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('ایمیل');
    const passwordInput = screen.getByPlaceholderText('رمز عبور');
    const submitButton = screen.getByText('ورود');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(console.error).toHaveBeenCalledWith('Login error:', expect.any(Error));
  });

  test('closes the form when close button is clicked', () => {
    render(<SignupForm onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: '' });

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});