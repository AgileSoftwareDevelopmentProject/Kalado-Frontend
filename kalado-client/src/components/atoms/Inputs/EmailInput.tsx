import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validateEmail } from '../../../validators/validateEmail';

interface EmailInputProps {
    name: string;
    placeholder?: string; // Optional placeholder prop
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = true,
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.email');
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
            placeholder={translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            error={error}
            helperText={error ? helperText : ''}
            sx={{
                width: '70%',
                '& .MuiInputBase-root::after': {
                    borderBottom: '2px solid #D74101',
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
