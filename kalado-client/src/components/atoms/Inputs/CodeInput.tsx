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
            inputProps={{ maxLength }}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
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

export default CodeInput;
