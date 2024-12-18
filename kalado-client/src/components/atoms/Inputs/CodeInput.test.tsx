import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CodeInput from './CodeInput';

describe('CodeInput Component', () => {
    it('renders correctly with default props', () => {
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={() => { }} />
        );

        const input = getByPlaceholderText('کد تایید');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('maxLength', '5');
    });

    it('renders with custom placeholder', () => {
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={() => { }} placeholder="Enter Code" />
        );

        const input = getByPlaceholderText('Enter Code');
        expect(input).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={handleChange} />
        );

        const input = getByPlaceholderText('کد تایید');
        fireEvent.change(input, { target: { value: '1234' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            target: { value: '1234' }
        }));
    });

    it('restricts input length according to maxLength prop', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={handleChange} maxLength={3} />
        );

        const input = getByPlaceholderText('کد تایید');

        fireEvent.change(input, { target: { value: '12345' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            target: { value: '12345' }
        }));

        expect(input.value.length).toBeLessThanOrEqual(3);
    });

    it('renders as required when isRequired is true', () => {
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={() => { }} isRequired={true} />
        );

        const input = getByPlaceholderText('کد تایید');
        expect(input).toBeRequired();
    });

    it('renders as not required when isRequired is false', () => {
        const { getByPlaceholderText } = render(
            <CodeInput value="" onChange={() => { }} isRequired={false} />
        );

        const input = getByPlaceholderText('کد تایید');
        expect(input).not.toBeRequired();
    });
});
