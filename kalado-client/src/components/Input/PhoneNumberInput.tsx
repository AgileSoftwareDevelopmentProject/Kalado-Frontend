import React from 'react';
import './UserInput.css';


interface PhoneNumberInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    name,
    placeholder = "شماره تلفن",
    value,
    onChange,
    isRequired = true
}) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="tel"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                className="input"
            />
        </div>
    );
};

export default PhoneNumberInput;