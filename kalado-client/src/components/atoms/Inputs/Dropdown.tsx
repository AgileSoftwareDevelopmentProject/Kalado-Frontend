import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];
    placeholder?: string;
    onChange: (selectedOption: Option | null) => void;
    value?: Option | null;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    onChange,
    value
}) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string;
        const selectedOption = options.find(option => option.value === selectedValue) || null;
        onChange(selectedOption);
    };

    return (
        <FormControl variant="standard" sx={{ mb: 2, width: '70%' }}>
            <InputLabel sx={{ color: 'white', textAlign: 'right', width: '100%' }}>
                {placeholder}
            </InputLabel>
            <Select
                value={value ? value.value : ''}
                onChange={handleChange}
                label={placeholder}
                displayEmpty
                sx={{
                    '& .MuiInputBase-root': {
                        borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                            borderBottom: '2px solid white',
                            backgroundColor: '#D74101'
                        },
                        '&.Mui-focused': {
                            borderBottom: '2px solid transparent',
                        },
                    },
                    color: 'white',
                    textAlign: 'right',
                    '& .MuiSelect-select': {
                        textAlign: 'right',
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value} sx={{ textAlign: 'right' }}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
