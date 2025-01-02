import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CodeVerificationModal from './CodeVerificationModal';

describe('CodeVerificationModal', () => {
    const mockOnClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('renders correctly when open is true', () => {
        const { getByText } = render(
            <CodeVerificationModal open={true} onClose={mockOnClose} />
        );

        // Check if CodeVerificationForm is rendered
        expect(getByText(/code_verification.enter_code/i)).toBeInTheDocument(); // Adjust based on actual text in CodeVerificationForm
    });

    test('does not render when open is false', () => {
        const { queryByText } = render(
            <CodeVerificationModal open={false} onClose={mockOnClose} />
        );

        // Check that CodeVerificationForm is not rendered
        expect(queryByText(/code_verification.enter_code/i)).not.toBeInTheDocument();
    });

    test('calls onClose when backdrop is clicked', () => {
        const { getByTestId } = render(
            <CodeVerificationModal open={true} onClose={mockOnClose} />
        );

        // Simulate a click on the backdrop
        fireEvent.click(getByTestId('backdrop')); // Assuming Backdrop has a data-testid="backdrop"

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside CodeVerificationForm', () => {
        const { getByTestId } = render(
            <CodeVerificationModal open={true} onClose={mockOnClose} />
        );

        // Simulate a click inside CodeVerificationForm (you may need to adjust this selector)
        fireEvent.click(getByTestId('code-verification-form')); // Assuming CodeVerificationForm has a data-testid="code-verification-form"

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
