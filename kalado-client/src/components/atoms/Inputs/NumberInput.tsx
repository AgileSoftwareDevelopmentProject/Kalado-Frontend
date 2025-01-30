import React from 'react';
import TextField from '@mui/material/TextField';

interface NumberInputProps {
    name: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
    name,
    placeholder,
    onChange,
}) => {
    return (
        <TextField
            type="number"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
        />
    );
};

export default NumberInput;
