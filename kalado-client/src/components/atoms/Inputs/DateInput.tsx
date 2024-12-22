import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextFieldProps } from '@mui/material/TextField';

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
                label={label}
                value={value}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
                renderInput={(params: TextFieldProps) => (
                    <TextField {...params} fullWidth variant="outlined" />
                )}
            />
        </LocalizationProvider>
    );
};

export default DateInput;
