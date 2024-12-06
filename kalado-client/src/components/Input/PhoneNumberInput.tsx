import React from 'react';
import './UserInput.css';

interface PhoneNumberInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ placeholder = "شماره تلفن", value, onChange, isRequired = true }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="tel"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                className="inout"
            />
        </div>
    );
};

export default PhoneNumberInput;
