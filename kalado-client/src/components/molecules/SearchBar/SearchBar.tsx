import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, IconButton, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    placeholder?: string;
    options: string[]; // Add options prop
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder, options, onChange, onSearch }) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('navbar.searchbar');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Box sx={{ flexGrow: 1, mx: 2, textAlign: i18n.language === 'fa' ? 'right' : 'left' }}>
            <Autocomplete
                freeSolo
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={translatedPlaceholder}
                        onKeyDown={handleKeyDown}
                        size="small"
                        sx={{
                            width: '40%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 30,
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={onSearch} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    onChange({ target: { value: newValue || '' } });
                }}
                onInputChange={(event, newInputValue) => {
                    onChange({ target: { value: newInputValue } });
                }}
                inputValue={value}
                clearOnBlur={false}
            />
        </Box>
    );
};

export default SearchBar;
