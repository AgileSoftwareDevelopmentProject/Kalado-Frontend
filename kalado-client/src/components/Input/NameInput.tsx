import React from 'react';
import './UserInput.css';

interface NameInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({
    name,
    placeholder = "نام",
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false
}) => {
    return (
        <div>
            <input
                type="text"
                name={name}
                placeholder={isStarNeeded ? `* ${placeholder}` : placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                className="input"
            />
        </div>
    );
};

export default NameInput;
