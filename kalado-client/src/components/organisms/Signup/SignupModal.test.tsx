import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignupModal from './SignupModal';

describe('SignupModal', () => {
    const mockOnClose = jest.fn();
    const mockOnOpenLogin = jest.fn();
    const mockOnSignUpSuccess = jest.fn();

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('renders correctly when open is true', () => {
        const { getByText } = render(
            <SignupModal
                open={true}
                onClose={mockOnClose}
                onOpenLogin={mockOnOpenLogin}
                onSignUpSuccess={mockOnSignUpSuccess}
            />
        );

        // Check if SignupForm is rendered (you may need to adjust this based on how SignupForm renders)
        expect(getByText(/signup_form.signup_btn/i)).toBeInTheDocument(); // Assuming "signup" is part of SignupForm text
    });

    test('does not render when open is false', () => {
        const { queryByText } = render(
            <SignupModal
                open={false}
                onClose={mockOnClose}
                onOpenLogin={mockOnOpenLogin}
                onSignUpSuccess={mockOnSignUpSuccess}
            />
        );

        // Check that SignupForm is not rendered
        expect(queryByText(/signup_form.signup_btn/i)).not.toBeInTheDocument();
    });

    test('calls onClose when backdrop is clicked', () => {
        const { getByTestId } = render(
            <SignupModal
                open={true}
                onClose={mockOnClose}
                onOpenLogin={mockOnOpenLogin}
                onSignUpSuccess={mockOnSignUpSuccess}
            />
        );

        // Simulate a click on the backdrop
        fireEvent.click(getByTestId('backdrop')); // Assuming Backdrop has a data-testid="backdrop"

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside SignupForm', () => {
        const { getByTestId } = render(
            <SignupModal
                open={true}
                onClose={mockOnClose}
                onOpenLogin={mockOnOpenLogin}
                onSignUpSuccess={mockOnSignUpSuccess}
            />
        );

        // Simulate a click inside SignupForm (you may need to adjust this selector)
        fireEvent.click(getByTestId('signup-form')); // Assuming SignupForm has a data-testid="signup-form"

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
