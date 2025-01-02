import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import { signupUser } from '../../../services/SignupService';
import { toast } from 'react-toastify';

// Mocking the signupUser service
jest.mock('../../../services/SignupService', () => ({
  signupUser: jest.fn(),
}));

// Mocking toast
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('SignupForm', () => {
  const mockOnClose = jest.fn();
  const mockOnOpenLogin = jest.fn();
  const mockOnSignUpSuccess = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupForm onClose={mockOnClose} onOpenLogin={mockOnOpenLogin} onSignUpSuccess={mockOnSignUpSuccess} />
    );

    expect(getByPlaceholderText(/general_inputs.first_name/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/general_inputs.last_name/i)).toBeInTheDocument();
    expect(getByText(/signup_form.signup_btn/i)).toBeInTheDocument();
    expect(getByText(/signup_form.login_link/i)).toBeInTheDocument();
  });

  test('handles successful signup', async () => {
    (signupUser as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
    });

    const { getByPlaceholderText, getByText } = render(
      <SignupForm onClose={mockOnClose} onOpenLogin={mockOnOpenLogin} onSignUpSuccess={mockOnSignUpSuccess} />
    );

    // Fill in form fields
    fireEvent.change(getByPlaceholderText(/general_inputs.first_name/i), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.last_name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText(/phone_number/i), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.password_repeat/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(getByText(/signup_form.signup_btn/i));

    await waitFor(() => {
      expect(mockOnSignUpSuccess).toHaveBeenCalledWith('john.doe@example.com');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(toast).toHaveBeenCalledWith(expect.stringContaining("success.signup"));
    });
  });

  test('handles password mismatch error', async () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupForm onClose={mockOnClose} onOpenLogin={mockOnOpenLogin} onSignUpSuccess={mockOnSignUpSuccess} />
    );

    // Fill in form fields with mismatched passwords
    fireEvent.change(getByPlaceholderText(/general_inputs.first_name/i), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.last_name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText(/phone_number/i), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.password_repeat/i), { target: { value: 'differentPassword' } });

    // Submit the form
    fireEvent.click(getByText(/signup_form.signup_btn/i));

    await waitFor(() => {
      expect(getByText(/signup_form.error.password_mismatch/i)).toBeInTheDocument();
      expect(mockOnSignUpSuccess).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  test('handles failed signup', async () => {
    (signupUser as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
      message: 'Signup failed',
    });

    const { getByPlaceholderText, getByText } = render(
      <SignupForm onClose={mockOnClose} onOpenLogin={mockOnOpenLogin} onSignUpSuccess={mockOnSignUpSuccess} />
    );

    // Fill in form fields
    fireEvent.change(getByPlaceholderText(/general_inputs.first_name/i), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.last_name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText(/phone_number/i), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText(/general_inputs.password_repeat/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(getByText(/signup_form.signup_btn/i));

    await waitFor(() => {
      expect(getByText('Signup failed')).toBeInTheDocument();
      expect(mockOnSignUpSuccess).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  test('calls onOpenLogin when login link is clicked', () => {
    const { getByText } = render(
      <SignupForm onClose={mockOnClose} onOpenLogin={mockOnOpenLogin} onSignUpSuccess={mockOnSignUpSuccess} />
    );

    fireEvent.click(getByText(/signup_form.login_link/i));

    expect(mockOnOpenLogin).toHaveBeenCalledTimes(1);
  });
});
