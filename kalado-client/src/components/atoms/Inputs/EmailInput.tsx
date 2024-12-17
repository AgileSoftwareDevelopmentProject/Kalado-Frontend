import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

interface EmailInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    name,
    placeholder = "ایمیل",
    value,
    onChange,
    isRequired = true,
}) => {
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (value) {
            if (!emailRegex.test(value)) {
                setError(true);
                setHelperText('لطفا یک ایمیل معتبر وارد کنید.');
            } else {
                setError(false);
                setHelperText('');
            }
        } else {
            setError(false);
            setHelperText('');
        }
    }, [value]);

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
            helperText={error ? helperText : ''}
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
                },
                '& .MuiFormHelperText-root': {
                    textAlign: 'right',
                    direction: 'rtl',
                }
            }}
        />
    );
};

export default EmailInput;
