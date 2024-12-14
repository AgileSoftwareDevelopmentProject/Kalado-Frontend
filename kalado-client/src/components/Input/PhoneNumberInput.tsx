import React, { useState } from 'react';
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

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const iranMobileRegex = /^09\d{9}$/;

        if (iranMobileRegex.test(inputValue) || inputValue === "") {
            setError(null);
        } else {
            setError("لطفا یک شماره تلفن همراه معتبر وارد کنید.");
        }

        onChange(e);
    };

    return (
        <div>
            <input
                type="tel"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={isRequired}
                className="input"
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PhoneNumberInput;
