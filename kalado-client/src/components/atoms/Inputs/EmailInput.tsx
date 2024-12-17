import React from 'react';
import TextField from '@mui/material/TextField';

interface EmailInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    error?: boolean;
    helperText?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
    name,
    placeholder = "ایمیل",
    value,
    onChange,
    isRequired = true,
    error = false,
    helperText = ''
}) => {
    return (
        <TextField
            type="email"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            error={error}
            helperText={helperText}
            sx={{
                width: '80%',
                '& .MuiInputBase-root': {
                    borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                        borderBottom: '2px solid white',
                    },
                    '&.Mui-focused': {
                        borderBottom: '2px solid transparent',
                        '&:before': {
                            borderBottom: 'none',
                        },
                    },
                },
                '& .MuiFormLabel-root': {
                    color: 'white',
                },
                '& .MuiInputBase-input': {
                    textAlign: 'right',
                    color: 'white',
                }
            }}
        />
    );
};

export default EmailInput;
