import React from 'react';
import './UserInput.css';

interface NameInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({ placeholder = "نام", value, onChange, isRequired = false }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                className="input"
            />
        </div>
    );
};

export default NameInput;
