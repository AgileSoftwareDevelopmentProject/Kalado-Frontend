import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './UserInput.css';


interface PasswordInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = true
}) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type={isVisible ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={isRequired}
                className="input"
            />
            <span
                onClick={handleToggleVisibility}
                style={{
                    position: 'absolute',
                    left: '45px',
                    top: '45%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                }}
            >
                {isVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
        </div>
    );
};

export default PasswordInput;