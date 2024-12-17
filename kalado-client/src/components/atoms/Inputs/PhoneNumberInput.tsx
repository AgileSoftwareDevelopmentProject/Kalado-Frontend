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
    placeholder = "شماره تلفن",
    value,
    onChange,
    isRequired = true
}) => {
    const { t } = useTranslation();
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
            placeholder={placeholder}
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
                width: '80%',
                '& .MuiInputBase-root': {
                    borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                        borderBottom: '2px solid white',
                    },
                    '&.Mui-focused': {
                        borderBottom: '2px solid transparent',
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

export default PhoneNumberInput;
