// LoginForm.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { loginUser } from '../../../services/LoginService';

// Mock the loginUser function
jest.mock('../../../services/LoginService', () => ({
  loginUser: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockOnClose = jest.fn();
  const mockOnOpenSignup = jest.fn();
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} onLoginSuccess={mockOnLoginSuccess} />
    );

    expect(getByText('ورود')).toBeInTheDocument();
    expect(getByText('ایجاد حساب جدید')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument(); // Adjust placeholder if necessary
    expect(getByPlaceholderText('Password')).toBeInTheDocument(); // Adjust placeholder if necessary
  });

  it('updates email and password state on input change', () => {
    const { getByPlaceholderText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} onLoginSuccess={mockOnLoginSuccess} />
    );

    const emailInput = getByPlaceholderText('Email'); // Adjust placeholder if necessary
    const passwordInput = getByPlaceholderText('Password'); // Adjust placeholder if necessary

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls loginUser and handles successful login', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ success: true });

    const { getByPlaceholderText, getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} onLoginSuccess={mockOnLoginSuccess} />
    );

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(getByText('ورود'));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
      expect(mockOnLoginSuccess).toHaveBeenCalledWith('test@example.com');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('handles login error', async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} onLoginSuccess={mockOnLoginSuccess} />
    );

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    fireEvent.click(getByText('ورود'));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled();
      expect(getByText('Invalid email or password')).toBeInTheDocument();
      expect(mockOnClose).not.toHaveBeenCalled(); // Ensure onClose is not called on error
    });
  });

  it('opens signup form when link is clicked', () => {
    const { getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} onLoginSuccess={mockOnLoginSuccess} />
    );

    fireEvent.click(getByText('ایجاد حساب جدید'));

    expect(mockOnOpenSignup).toHaveBeenCalled();
  });
});
