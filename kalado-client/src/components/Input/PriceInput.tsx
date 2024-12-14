import React, { useState, useEffect } from 'react';
import './UserInput.css';

interface PriceInputProps {
    name: string;
    placeholder?: string;
    value: number;
    onChange: (value: number) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
    currency?: string;
}

const PriceInput: React.FC<PriceInputProps> = ({
    name,
    placeholder = "(تومان) قیمت",
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false,
    currency = "تومان",
}) => {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(value ? value.toString() : '');
    }, [value]);

    const formatPrice = (price: number): string => {
        return price.toLocaleString('fa-IR');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setInputValue(rawValue);
        const numericValue = parseInt(rawValue, 10);
        onChange(isNaN(numericValue) ? 0 : numericValue);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                name={name}
                placeholder={isStarNeeded ? `* ${placeholder}` : placeholder}
                value={inputValue}
                onChange={handleInputChange}
                required={isRequired}
                className="input"
            />
        </div>
    );
};

export default PriceInput;
