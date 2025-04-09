import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function InputValidateButtons({ professor }) {
  const handleSubmit = () => {
    if (!professor) {
      alert("Please select a professor first");
      return;
    }
  };

  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        sx={{ mb: 2 }}
      >
        Valider
      </Button>
    </Box>
  );
}