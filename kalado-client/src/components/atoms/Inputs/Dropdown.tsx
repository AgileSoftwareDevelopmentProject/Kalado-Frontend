import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];
    placeholder?: string;
    onChange: (selectedOption: Option | null) => void;
    value?: Option | null;
    isRequired?: boolean;
    errorMessage?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    onChange,
    value,
    isRequired = false,
    errorMessage,
}) => {
    const { i18n } = useTranslation();
    const [error, setError] = useState(false); // tracks if the field has an error

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find(option => option.value === selectedValue) || null;
        onChange(selectedOption);

        // clear error when a valid value is selected
        if (isRequired && selectedOption) {
            setError(false);
        }
    };

    const validate = () => {
        // check if the field is required and has a value
        if (isRequired && (!value || !value.value)) {
            setError(true);
            return false;
        }
        return true;
    };

    return (
        <FormControl
            variant="standard"
            sx={{ mb: 2, width: '70%' }}
            error={error} // highlight the dropdown in red if there's an error
        >
            <InputLabel
                sx={{
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                    width: '100%',
                    position: 'absolute',
                    right: 30,
                }}
            >
                {placeholder}
            </InputLabel>
            <Select
                value={value ? value.value : ''}
                onChange={handleChange}
                displayEmpty
                onBlur={validate} // validate the field on blur
            >
                {options.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#D74101',
                            },
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText>
                    {errorMessage || i18n.t('This field is required')}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default Dropdown;
