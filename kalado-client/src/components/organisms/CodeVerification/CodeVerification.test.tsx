import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CodeVerification from './CodeVerification';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CodeVerification Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);

    expect(screen.getByText('کالادو')).toBeInTheDocument();
    expect(screen.getByText('لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'بررسی' })).toBeInTheDocument();
  });

  it('prevents entering invalid characters or code longer than 5 digits', () => {
    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '12345a' } });
    expect(input).toHaveValue('12345'); // ignores invalid character 'a'

    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue('12345'); // truncates to 5 digits
  });

  it('submits the form and calls onClose on successful verification', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Verification successful' } });

    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'بررسی' });

    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
      expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/verify-code', {
        email: 'test@example.com',
        code: '12345',
      });
    });
  });

  it('shows error message on failed verification', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid code. Please try again.' } },
    });

    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'بررسی' });

    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid code. Please try again.');
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('shows a generic error message for network failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'بررسی' });

    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Network error occurred. Please check your connection.'
      );
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the close button is clicked', () => {
    render(<CodeVerification email="test@example.com" onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});