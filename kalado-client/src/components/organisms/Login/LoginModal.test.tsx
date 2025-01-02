import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginModal from './LoginModal';

describe('LoginModal', () => {
    const mockOnClose = jest.fn();
    const mockOnOpenSignup = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly when open is true', () => {
        const { getByText } = render(
            <LoginModal open={true} onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
        );

        // Check if LoginForm is rendered (you may need to adjust this based on how LoginForm renders)
        expect(getByText(/login/i)).toBeInTheDocument(); // Assuming "login" is part of LoginForm text
    });

    test('does not render when open is false', () => {
        const { queryByText } = render(
            <LoginModal open={false} onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
        );

        // Check that LoginForm is not rendered
        expect(queryByText(/login/i)).not.toBeInTheDocument();
    });

    test('calls onClose when backdrop is clicked', () => {
        const { getByTestId } = render(
            <LoginModal open={true} onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
        );

        // Simulate a click on the backdrop
        fireEvent.click(getByTestId('backdrop')); // Assuming Backdrop has a data-testid="backdrop"

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside LoginForm', () => {
        const { getByTestId } = render(
            <LoginModal open={true} onClose={mockOnClose} onOpenSignup={mockOnOpenSignup} />
        );

        // Simulate a click inside LoginForm (you may need to adjust this selector)
        fireEvent.click(getByTestId('login-form')); // Assuming LoginForm has a data-testid="login-form"

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
