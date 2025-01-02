import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validatePhoneNumber } from '../../../validators/validatePhoneNumber';

interface PhoneNumberInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = true
}) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.phone_number');
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    useEffect(() => {
        const validationResult = validatePhoneNumber(value, t);
        setError(!validationResult.valid);
        setHelperText(validationResult.error);
    }, [value, t]);

    return (
        <TextField
            type="tel"
            name="phoneNumber"
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
                '& .MuiFormHelperText-root': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                },
                '& input': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                }
            }}
        />
    );
};

export default PhoneNumberInput;
