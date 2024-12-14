import { render, screen, fireEvent } from '@testing-library/react';
import DeletePopup from './DeletePopup';


describe('DeletePopup Component', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        render(
            <DeletePopup
                message="آیا از حذف این آگهی اطمینان دارید؟"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );
    });

    test('renders with correct message', () => {
        const messageElement = screen.getByText(/آیا از حذف این آگهی اطمینان دارید\?/i);
        expect(messageElement).toBeInTheDocument();
    });

    test('calls onConfirm when confirm button is clicked', () => {
        const confirmButton = screen.getByRole('button', { name: /check/i });
        fireEvent.click(confirmButton);
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    test('calls onCancel when cancel button is clicked', () => {
        const cancelButton = screen.getByRole('button', { name: /times/i });
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});
