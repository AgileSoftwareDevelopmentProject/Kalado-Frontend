import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CloseButton from './CloseButton';

describe('CloseButton Component', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<CloseButton onClose={() => { }} />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('calls onClose when clicked', () => {
        const handleClose = jest.fn();
        const { getByRole } = render(<CloseButton onClose={handleClose} />);

        const button = getByRole('button');
        fireEvent.click(button);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('displays the close icon', () => {
        const { container } = render(<CloseButton onClose={() => { }} />);

        // Check if the FaTimes icon is rendered
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });
});
