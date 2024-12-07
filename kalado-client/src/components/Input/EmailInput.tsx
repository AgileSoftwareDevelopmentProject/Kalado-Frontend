import React from 'react';
import './UserInput.css';

interface EmailInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ placeholder = "ایمیل", value, onChange, isRequired = true }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="email"
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
