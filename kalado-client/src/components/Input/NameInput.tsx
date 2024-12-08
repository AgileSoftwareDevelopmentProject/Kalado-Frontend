import React from 'react';
import './UserInput.css';

interface NameInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({
    name,
    placeholder = "نام",
    value,
    onChange,
    isRequired = false
}) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
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

export default NameInput;
