import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    placeholder,
    onChange,
    value
}) => {
    const { i18n } = useTranslation();
    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find(option => option.value === selectedValue) || null;
        onChange(selectedOption);
    };

    return (
        <FormControl variant="standard" sx={{ mb: 2, width: '70%' }}>
            <InputLabel
                sx={{
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                    width: '100%',
                    position: 'absolute',
                    right: 30
                }}
            >
                {placeholder}
            </InputLabel>
            <Select
                value={value ? value.value : ''}
                onChange={handleChange}
                displayEmpty
            >
                {options.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#D74101',
                            }
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
