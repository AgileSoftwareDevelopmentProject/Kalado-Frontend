import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';

interface CodeInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    maxLength?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = true,
    maxLength = 5
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.code');
    return (
        <TextField
            type="text"
            name="code"
            placeholder={translatedPlaceholder}
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
