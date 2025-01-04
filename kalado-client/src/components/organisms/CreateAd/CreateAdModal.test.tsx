import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateAdModal from './CreateAdModal';

describe('CreateAdModal', () => {
    const mockOnClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('renders correctly when open is true', () => {
        const { getByPlaceholderText } = render(
            <CreateAdModal open={true} onClose={mockOnClose} />
        );

        // Check if CreateAdForm is rendered (you may need to adjust this based on how CreateAdForm renders)
        expect(getByPlaceholderText(/create_ad.input.title/i)).toBeInTheDocument(); // Adjust based on actual placeholder
    });

    test('does not render when open is false', () => {
        const { queryByPlaceholderText } = render(
            <CreateAdModal open={false} onClose={mockOnClose} />
        );

        // Check that CreateAdForm is not rendered
        expect(queryByPlaceholderText(/create_ad.input.title/i)).not.toBeInTheDocument();
    });

    test('calls onClose when backdrop is clicked', () => {
        const { getByTestId } = render(
            <CreateAdModal open={true} onClose={mockOnClose} />
        );

        // Simulate a click on the backdrop
        fireEvent.click(getByTestId('backdrop')); // Assuming Backdrop has a data-testid="backdrop"

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside CreateAdForm', () => {
        const { getByTestId } = render(
            <CreateAdModal open={true} onClose={mockOnClose} />
        );

        // Simulate a click inside CreateAdForm (you may need to adjust this selector)
        fireEvent.click(getByTestId('create-ad-form')); // Assuming CreateAdForm has a data-testid="create-ad-form"

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
