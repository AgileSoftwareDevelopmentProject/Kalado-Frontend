import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%', mr: 3 }}>
            <TextField
                variant="outlined"
                placeholder="جستجوی کالا"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                size="small"
                sx={{
                    width: '40%',
                    borderRadius: 30,
                    bgcolor: 'transparent',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 30,
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& input': {
                        color: 'white',
                    },
                    '& input::placeholder': {
                        color: 'white',
                        opacity: 1,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={onSearch}
                            aria-label="search"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'white',
                                borderRadius: 0,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;
