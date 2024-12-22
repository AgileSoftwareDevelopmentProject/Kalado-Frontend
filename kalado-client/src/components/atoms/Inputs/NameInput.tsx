import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';

interface NameInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false
}) => {
    return (
        <TextField
            type="text"
            name={name}
            placeholder={isStarNeeded ? `${placeholder} *` : placeholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            sx={{
                width: '70%',
                '& .MuiInputBase-root::after': {
                    borderBottom: '2px solid #D74101',
                },
            }}
        />
    );
};

export default NameInput;
