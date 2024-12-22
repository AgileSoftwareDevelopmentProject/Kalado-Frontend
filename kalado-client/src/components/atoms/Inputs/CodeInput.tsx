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
                '& .MuiInputBase-root::after': {
                    borderBottom: '2px solid #D74101',
                },
            }}
        />
    );
};

export default CodeInput;
