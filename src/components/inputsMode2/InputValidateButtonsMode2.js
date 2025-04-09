import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function InputValidateButtons({ 
    onValidate,
    isCorrect
}) {
    return (
        <Box sx={{ mt: 2 }}>
            <Button
                variant="contained"
                onClick={onValidate}
                disabled={isCorrect}
                sx={{
                    minWidth: 120,
                    height: 40
                }}
            >
                Valider
            </Button>
        </Box>
    );
}
