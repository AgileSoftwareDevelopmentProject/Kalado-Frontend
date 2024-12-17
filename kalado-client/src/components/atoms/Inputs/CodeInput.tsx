import React from 'react';
import TextField from '@mui/material/TextField';

interface CodeInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    maxLength?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
    placeholder = "کد تایید",
    value,
    onChange,
    isRequired = true,
    maxLength = 5
}) => {
    return (
        <TextField
            type="text"
            name="code"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            fullWidth
            variant="standard"
            margin="normal"
            inputProps={{
                maxLength: maxLength
            }}
            sx={{
                width: '80%',
                '& .MuiInputBase-root': {
                    borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                        borderBottom: '2px solid white',
                    },
                    '&.Mui-focused': {
                        borderBottom: '2px solid white',
                    },
                },
                '& .MuiInputBase-input': {
                    padding: '10px 0',
                    border: 'none',
                },
                '& .MuiFormLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .Mui-focused .MuiFormLabel-root': {
                    color: 'white',
                }
            }}
        />
    );
};

export default CodeInput;
