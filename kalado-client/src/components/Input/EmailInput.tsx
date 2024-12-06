import React from 'react';

interface EmailInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ placeholder = "ایمیل", value, onChange }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="email" // Set the input type to email
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    padding: '10px',
                    border: 'none', // Remove all borders
                    borderBottom: '2px solid #007BFF', // Add a blue bottom border
                    background: 'transparent', // Set background to transparent
                    outline: 'none', // Remove default outline
                    color: '#000', // Text color for visibility
                    fontSize: '16px' // Font size for better readability
                }}
            />
        </div>
    );
};

export default EmailInput;
