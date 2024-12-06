import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Signup/SignupForm.css';

interface PasswordInputProps {
    placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
    const [password, setPassword] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
                type={isVisible ? 'text' : 'password'}
                placeholder={placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-form input"
            />
            <span
                onClick={handleToggleVisibility}
                style={{
                    position: 'absolute',
                    right: '200px',
                    top: '50%',
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
