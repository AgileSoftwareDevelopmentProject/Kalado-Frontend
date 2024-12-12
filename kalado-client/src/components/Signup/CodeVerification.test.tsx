import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeVerification from './CodeVerification';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CodeVerification Component', () => {
    const mockOnClose = jest.fn();
    const testEmail = 'user@example.com';

    beforeEach(() => {
        mockOnClose.mockClear();
        mockedAxios.post.mockClear();
    });

    it('renders the code verification form', () => {
        render(<CodeVerification email={testEmail} onClose={mockOnClose} />);

        expect(screen.getByText(/لطفا کد تایید ارسال‌شده به ایمیل‌تان را وارد کنید/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /بررسی/i })).toBeInTheDocument();
    });

    it('updates code on input change', () => {
        render(<CodeVerification email={testEmail} onClose={mockOnClose} />);

        const codeInput = screen.getByRole('textbox');
        fireEvent.change(codeInput, { target: { value: '12345' } });

        expect(codeInput).toHaveValue('12345');
    });

    it('submits the form and calls API on success', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Verification successful' } });

        render(<CodeVerification email={testEmail} onClose={mockOnClose} />);

        const codeInput = screen.getByRole('textbox');
        fireEvent.change(codeInput, { target: { value: '12345' } });

        const submitButton = screen.getByRole('button', { name: /بررسی/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('https://kalado.com/verify-code', {
                email: testEmail,
                code: '12345',
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    it('handles errors during verification submission', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

        render(<CodeVerification email={testEmail} onClose={mockOnClose} />);

        const codeInput = screen.getByRole('textbox');
        fireEvent.change(codeInput, { target: { value: '12345' } });

        const submitButton = screen.getByRole('button', { name: /بررسی/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalled();
            expect(screen.getByText(/Invalid code. Please try again./i)).toBeInTheDocument();
            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });

    it('disables the submit button if code length is not 5', () => {
        render(<CodeVerification email={testEmail} onClose={mockOnClose} />);

        const submitButton = screen.getByRole('button', { name: /بررسی/i });

        expect(submitButton).toBeDisabled();

        const codeInput = screen.getByRole('textbox');

        fireEvent.change(codeInput, { target: { value: '1234' } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(codeInput, { target: { value: '12345' } });
        expect(submitButton).toBeEnabled();
    });
});
