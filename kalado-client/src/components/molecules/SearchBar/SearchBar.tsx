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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                placeholder="جستجوی کالا"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                size="small"
                sx={{
                    flexGrow: 1,
                    borderRadius: 30, // Set border radius to 30
                    bgcolor: 'transparent',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Change border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Change border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Change border color when focused
                        },
                    },
                    '& input::placeholder': {
                        color: 'white', // Set placeholder color to white
                        opacity: 1, // Ensure full opacity
                    },
                }}
            />
            <IconButton
                onClick={onSearch}
                aria-label="search"
                sx={{
                    bgcolor: 'transparent', // Transparent background for the button
                    color: 'white', // Set button text/icon color to white
                    borderRadius: 30, // Optional: set border radius for the button
                    '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)', // Optional hover effect
                    },
                }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
