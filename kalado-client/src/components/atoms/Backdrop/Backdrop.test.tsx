import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Backdrop from './Backdrop';

describe('Backdrop Component', () => {
    it('renders correctly when open', () => {
        const { getByTestId } = render(
            <Backdrop open={true} onClick={() => { }} data-testid="backdrop">
                <div>Test Child</div>
            </Backdrop>
        );

        const backdrop = getByTestId('backdrop');
        expect(backdrop).toBeInTheDocument();
        expect(backdrop).toHaveStyle('background-color: rgba(39, 44, 72, 0.7)');
    });

    it('does not render when closed', () => {
        const { queryByTestId } = render(
            <Backdrop open={false} onClick={() => { }} data-testid="backdrop" />
        );

        const backdrop = queryByTestId('backdrop');
        expect(backdrop).not.toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByTestId } = render(
            <Backdrop open={true} onClick={handleClick} data-testid="backdrop" />
        );

        const backdrop = getByTestId('backdrop');
        fireEvent.click(backdrop);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            <Backdrop open={true} onClick={() => { }}>
                <div>Test Child</div>
            </Backdrop>
        );

        expect(getByText('Test Child')).toBeInTheDocument();
    });
});
