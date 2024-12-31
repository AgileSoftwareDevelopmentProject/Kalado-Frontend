import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, minDate, maxDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={value}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
                slots={{
                    textField: (params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label={label}
                            sx={{
                                width: '70%',
                                padding: '10px 0',
                                '& .MuiInputLabel-root': {
                                    textAlign: 'right',
                                    width: '100%',
                                },
                            }}
                        />
                    ),
                }}
            />
        </LocalizationProvider>
    );
};

export default DateInput;
