import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginForm Component', () => {
  const mockOnClose = jest.fn();
  const mockOnOpenSignUp = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnOpenSignUp.mockClear();
    mockedAxios.post.mockClear();
  });

  it('closes the form when the close button is clicked', () => {
    render(<LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignUp} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('updates inputs on user input', () => {
    render(<LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignUp} />);

    const emailInput = screen.getByPlaceholderText('ایمیل');
    const passwordInput = screen.getByPlaceholderText('رمز عبور');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mysecret' } });

    expect(emailInput).toHaveValue('user@example.com');
    expect(passwordInput).toHaveValue('mysecret');
  });

  it('submits form and calls onClose on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Login successful' } });
    render(<LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignUp} />);

    fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { value: 'mypassword' } });

    const loginButton = screen.getByRole('button', { name: 'ورود' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/login', {
        email: 'user@example.com',
        password: 'mypassword'
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('handles errors during login submission', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
    render(<LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignUp} />);

    fireEvent.change(screen.getByPlaceholderText('ایمیل'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('رمز عبور'), { target: { value: 'mypassword' } });

    const loginButton = screen.getByRole('button', { name: 'ورود' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  it('opens sign up form when signup link is clicked', () => {
    render(<LoginForm onClose={mockOnClose} onOpenSignup={mockOnOpenSignUp} />);

    const signupLink = screen.getByRole('link', { name: /ایجاد حساب جدید/i });
    fireEvent.click(signupLink);

    expect(mockOnOpenSignUp).toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});