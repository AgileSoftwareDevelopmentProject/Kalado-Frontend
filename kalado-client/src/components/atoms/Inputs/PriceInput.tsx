import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface PriceInputProps {
    name: string;
    placeholder?: string;
    value: number;
    onChange: (value: number) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
    currency?: string;
}

const PriceInput: React.FC<PriceInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false,
    currency = "تومان",
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.price');
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(value ? value.toString() : '');
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setInputValue(rawValue);
        const numericValue = parseInt(rawValue, 10);
        onChange(isNaN(numericValue) ? 0 : numericValue);
    };

    return (
        <TextField
            type="text"
            name={name}
            placeholder={isStarNeeded ? `${translatedPlaceholder} *` : translatedPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            {currency}
                        </InputAdornment>
                    ),
                    inputMode: 'numeric',
                },
            }}
            sx={{
                width: '70%',
                '& .MuiInputBase-root::after': {
                    borderBottom: '2px solid #D74101',
                },
            }}
        />
    );
};

export default PriceInput;
