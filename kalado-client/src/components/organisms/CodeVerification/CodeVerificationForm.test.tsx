import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CodeVerificationForm from './CodeVerificationForm';
import { verifyCode } from '../../../services/CodeVerificationService';
import { toast } from 'react-toastify';

// Mocking the verifyCode service
jest.mock('../../../services/CodeVerificationService', () => ({
    verifyCode: jest.fn(),
}));

// Mocking toast
jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

describe('CodeVerificationForm', () => {
    const mockOnClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('renders correctly', () => {
        const { getByText } = render(
            <CodeVerificationForm onClose={mockOnClose} />
        );

        expect(getByText(/code_verification.enter_code/i)).toBeInTheDocument();
        expect(getByText(/code_verification.verify_btn/i)).toBeInTheDocument();
    });

    test('handles input change correctly', () => {
        const { getByRole } = render(
            <CodeVerificationForm onClose={mockOnClose} />
        );

        const input = getByRole('textbox'); // Assuming CodeInput renders an input element

        // Test valid input
        fireEvent.change(input, { target: { value: '123456' } });
        expect(input).toHaveValue('123456');

        // Test invalid input (non-numeric)
        fireEvent.change(input, { target: { value: '123abc' } });
        expect(input).toHaveValue('123456'); // Should remain unchanged

        // Test exceeding length
        fireEvent.change(input, { target: { value: '1234567' } });
        expect(input).toHaveValue('123456'); // Should remain unchanged

        // Test backspace
        fireEvent.change(input, { target: { value: '' } });
        expect(input).toHaveValue('');
    });

    test('handles successful code verification', async () => {
        (verifyCode as jest.Mock).mockResolvedValueOnce({
            isSuccess: true,
        });

        const { getByRole, getByText } = render(
            <CodeVerificationForm onClose={mockOnClose} />
        );

        const input = getByRole('textbox');

        // Fill in the code
        fireEvent.change(input, { target: { value: '123456' } });

        // Submit the form
        fireEvent.click(getByText(/code_verification.verify_btn/i));

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
            expect(toast).toHaveBeenCalledWith(expect.stringContaining("success.login"));
        });
    });

    test('handles failed code verification', async () => {
        (verifyCode as jest.Mock).mockResolvedValueOnce({
            isSuccess: false,
            message: 'Invalid code',
        });

        const { getByRole, getByText } = render(
            <CodeVerificationForm onClose={mockOnClose} />
        );

        const input = getByRole('textbox');

        // Fill in the code
        fireEvent.change(input, { target: { value: '123456' } });

        // Submit the form
        fireEvent.click(getByText(/code_verification.verify_btn/i));

        await waitFor(() => {
            expect(getByText('Invalid code')).toBeInTheDocument();
            expect(mockOnClose).not.toHaveBeenCalled();
            expect(toast).not.toHaveBeenCalled();
        });
    });

    test('disables submit button when code length is not 6', () => {
        const { getByRole, getByText } = render(
            <CodeVerificationForm onClose={mockOnClose} />
        );

        const button = getByText(/code_verification.verify_btn/i);

        // Initially disabled
        expect(button).toBeDisabled();

        // Input less than 6 characters
        fireEvent.change(getByRole('textbox'), { target: { value: '123' } });
        expect(button).toBeDisabled();

        // Input exactly 6 characters
        fireEvent.change(getByRole('textbox'), { target: { value: '123456' } });
        expect(button).toBeEnabled();
    });
});
