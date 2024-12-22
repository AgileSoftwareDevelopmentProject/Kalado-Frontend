import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validatePhoneNumber } from '../../../validators/validatePhoneNumber';


interface PhoneNumberInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = true
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.phone_number');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        const validationResult = validatePhoneNumber(inputValue, t);
        setError(validationResult.error);

        onChange(e);
    };

    return (
        <TextField
            type="tel"
            name={name}
            placeholder={translatedPlaceholder}
            value={value}
            onChange={handleChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            error={!!error}
            helperText={error}
            inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            sx={{
                width: '70%',
                '& .MuiInputBase-input': {
                    textAlign: 'right',
                    color: 'white',
                },
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

export default PhoneNumberInput;
