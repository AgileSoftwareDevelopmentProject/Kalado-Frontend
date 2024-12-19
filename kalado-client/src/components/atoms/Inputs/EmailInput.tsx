import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validateEmail } from '../../../validators/validateEmail';

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
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    useEffect(() => {
        const validationResult = validateEmail(value, t);
        setError(!validationResult.valid);
        setHelperText(validationResult.error);
    }, [value, t]);

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
                width: '70%',
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
