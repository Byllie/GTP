import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function CriteriaProf({ professor, isCorrect }) {
    return (
        <Box sx={{ my: 2 }}>
        <Paper
        elevation={3}
        sx={{
            backgroundColor: isCorrect ? '#e6f4ea' : '#fcebea',
            border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        }}
        >
        <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
        {professor}
        </Typography>
        <Typography
        variant="body1"
        sx={{
            fontWeight: 'bold',
            color: isCorrect ? '#28a745' : '#dc3545',
        }}
        >
        {isCorrect ? 'Bonne réponse' : 'Mauvaise réponse'}
        </Typography>
        </Paper>
        </Box>
    );
}

