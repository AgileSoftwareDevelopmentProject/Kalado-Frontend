import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { useAuth } from '../../../contexts/AuthContext';
import { loginUser } from '../../../api/services/LoginService';
import { toast } from 'react-toastify';

// Mocking the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mocking the loginUser service
jest.mock('../../../services/LoginService', () => ({
  loginUser: jest.fn(),
}));

// Mocking toast
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('LoginForm', () => {
  const mockOnClose = jest.fn();
  const mockOnOpenSignup = jest.fn();
  const mockSetToken = jest.fn();
  const mockSetUserRole = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
      setUserRole: mockSetUserRole,
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('renders correctly', () => {
    const { getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
    );

    expect(getByText(/login_form.login_btn/i)).toBeInTheDocument();
    expect(getByText(/login_form.signup_link/i)).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
      token: 'fake-token',
      role: 'USER',
    });

    const { getByLabelText, getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
    );

    // Fill in email and password
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(getByText(/login_form.login_btn/i));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('fake-token');
      expect(mockSetUserRole).toHaveBeenCalledWith('USER');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(toast).toHaveBeenCalledWith(expect.stringContaining("success.login"));
    });
  });

  test('handles failed login', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
      message: 'Invalid credentials',
    });

    const { getByLabelText, getByText, getByTestId } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
    );

    // Fill in email and password
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(getByText(/login_form.login_btn/i));

    await waitFor(() => {
      expect(getByTestId('form-error')).toHaveTextContent('Invalid credentials');
      expect(mockSetToken).not.toHaveBeenCalled();
      expect(mockSetUserRole).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  test('calls onOpenSignup when signup link is clicked', () => {
    const { getByText } = render(
      <LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
    );

    fireEvent.click(getByText(/login_form.signup_link/i));

    expect(mockOnOpenSignup).toHaveBeenCalledTimes(1);
  });
});
