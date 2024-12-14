import React from 'react';
import './UserInput.css';

interface EmailInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    name,
    placeholder = "ایمیل",
    value,
    onChange,
    isRequired = true
}) => {
    return (
        <div>
            <input
                type="email"
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

export default EmailInput;
