import React from 'react';
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
    placeholder = "نام",
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
            inputProps={{
                style: { color: 'white' },
            }}
            sx={{
                width: '70%',
                '& .MuiInputBase-root': {
                    borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                        borderBottom: '2px solid white',
                    },
                    '&.Mui-focused': {
                        borderBottom: '2px solid transparent',
                    },
                },
            }}
        />
    );
};

export default NameInput;
