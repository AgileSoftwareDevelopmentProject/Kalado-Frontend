import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validatePassword } from '../../../validators/validatePassword';

interface PasswordInputProps {
    name: string;
    placeholder?: string;
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
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.password');
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    useEffect(() => {
        const validationResult = validatePassword(value, t);
        setError(!validationResult.valid);
        setHelperText(validationResult.error);
    }, [value, t]);

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const handleToggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <TextField
            type={isVisible ? 'text' : 'password'}
            name={name}
            placeholder={translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            error={error}
            helperText={error ? helperText : ''}
            sx={{
                width: '70%',
                '& .MuiInputBase-root::after': {
                    borderBottom: '2px solid #D74101',
                },
                '& .MuiFormHelperText-root': {
                    textAlign: 'right',
                    direction: 'rtl',
                }
            }}
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
        />
    );
};

export default PasswordInput;
