import React, { useState } from 'react';
import './UserInput.css';

interface DescriptionInputProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isRequired?: boolean;
    isStarNeeded?: boolean;
    maxLength?: number;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
    name,
    value,
    onChange,
    placeholder = "توضیحات",
    isRequired = false,
    isStarNeeded = false,
    maxLength = 500
}) => {
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        onChange(newValue);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <textarea
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={isStarNeeded ? `* ${placeholder}` : placeholder}
                required={isRequired}
                maxLength={maxLength}
                className="input"
            />
        </div>
    );
};

export default DescriptionInput;
