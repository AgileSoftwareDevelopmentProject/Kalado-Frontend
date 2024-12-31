import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder, onChange, onSearch }) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('navbar.searchbar');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'right', mr: 3 }}>
            <TextField
                variant="outlined"
                placeholder={translatedPlaceholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                size="small"
                sx={{
                    width: '40%',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 30,
                    }
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton onClick={onSearch} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        ),
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;
