import React, { useState, useEffect } from 'react';
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
    placeholder = "قیمت",
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false,
    currency = "تومان",
}) => {

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
            placeholder={isStarNeeded ? `${placeholder} *` : placeholder}
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
                }
            }}
        />
    );
};

export default PriceInput;
