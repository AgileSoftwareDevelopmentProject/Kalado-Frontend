import React from 'react';
import { useTranslation } from 'react-i18next';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface YearInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const YearInput: React.FC<YearInputProps> = ({ label, value, onChange, minDate, maxDate }) => {
    const { i18n } = useTranslation();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <DatePicker
                    label={label || 'Year'}
                    value={value}
                    onChange={onChange}
                    openTo="year"
                    views={['year']}
                    slotProps={{
                        textField: {
                            variant: 'standard',
                            margin: 'normal',
                        },
                    }}
                    sx={{
                        width: '70%'
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default YearInput;
