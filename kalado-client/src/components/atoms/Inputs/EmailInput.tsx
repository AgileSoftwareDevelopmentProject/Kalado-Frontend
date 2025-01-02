import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validateEmail } from '../../../validators/validateEmail';

interface EmailInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    disabled?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = true,
    disabled = false,
}) => {
    const { t, i18n } = useTranslation();
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
            name="email"
            placeholder={translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            disabled={disabled}
            variant="standard"
            margin="normal"
            error={error}
            helperText={error ? helperText : ''}
            sx={{
                width: '70%',
                '& .MuiFormHelperText-root': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                }
            }}
        />
    );
};

export default EmailInput;
