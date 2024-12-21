import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface DescriptionInputProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isRequired?: boolean;
    isStarNeeded?: boolean;
    maxLength?: number;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
    name,
    value,
    onChange,
    placeholder = "توضیحات",
    isRequired = false,
    isStarNeeded = false,
    maxLength = 500
}) => {
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        onChange(newValue);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <TextField
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={isStarNeeded ? `* ${placeholder}` : placeholder}
                required={isRequired}
                multiline
                rows={4}
                maxRows={6}
                variant="outlined"
                sx={{
                    width: '70%',
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#D74101',
                        },
                    }
                }}
            />
            <div style={{ color: 'white', textAlign: 'right', marginTop: '5px', marginRight: '100px' }}>
                {charCount}/{maxLength}
            </div>
        </div>
    );
};

export default DescriptionInput;
