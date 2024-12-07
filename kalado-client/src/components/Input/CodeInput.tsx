import React from 'react';
import './UserInput.css';

interface CodeInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    maxLength?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({ placeholder = "کد تایید", value, onChange, isRequired = true, maxLength = 5 }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                name="code"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                maxLength={maxLength}
                className="input"
            />
        </div>
    );
};

export default CodeInput;
