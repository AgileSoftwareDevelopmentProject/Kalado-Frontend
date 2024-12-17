import React from 'react';
import { Box, Typography, TextField, Button, ButtonGroup } from '@mui/material';

const Filter: React.FC = () => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) < 0) {
      e.target.value = '0';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative', // Change to relative for proper positioning
        width: '300px', // Increase width to 300px
        bgcolor: '#272C48',
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        marginTop: '10px', // Add some space above
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF' }}>
        فیلترها
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'right', color: '#FFFFFF' }}>
          قیمت
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            type="number"
            placeholder="حداقل"
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, mr: 1, bgcolor: 'transparent', '& input::placeholder': { color: '#bbb' } }}
          />
          <TextField
            type="number"
            placeholder="حداکثر"
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, bgcolor: 'transparent', '& input::placeholder': { color: '#bbb' } }}
          />
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mb: 1, textAlign: 'right', color: '#FFFFFF' }}>
        قدمت آگهی
      </Typography>
      <ButtonGroup variant="text" aria-label="ad age options" fullWidth>
        <Button onClick={() => console.log("یک روز clicked")}>یک روز</Button>
        <Button onClick={() => console.log("یک هفته clicked")}>یک هفته</Button>
        <Button onClick={() => console.log("یک ماه clicked")}>یک ماه</Button>
      </ButtonGroup>
    </Box>
  );
};

export default Filter;
