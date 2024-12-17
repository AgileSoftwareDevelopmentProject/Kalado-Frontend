import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = true
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleToggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <TextField
            type={isVisible ? 'text' : 'password'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            fullWidth
            variant="standard"
            margin="normal"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleToggleVisibility}
                            edge="end"
                            sx={{ color: 'white' }}
                        >
                            {isVisible ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                    </InputAdornment>
                ),
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
                '& .MuiInputBase-input': {
                    textAlign: 'right',
                    color: 'white',
                }
            }}
        />
    );
};

export default PasswordInput;
