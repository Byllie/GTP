import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function InputTextField({ onProfessorSelect, loading, professors, articleTitle, remainingTries, showClue }) {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
                width: '100%',
                maxWidth: 600,
                margin: '0 auto',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Which professor is the author?
            </Typography>

            {loading ? (
                <CircularProgress sx={{ my: 2 }} />
            ) : (
                <>
                    <Typography variant="h6" sx={{ mb: 3, fontStyle: 'italic' }}>
                        "{articleTitle}"
                    </Typography>

                    <Autocomplete
                        options={professors}
                        sx={{ width: 300, margin: '0 auto' }}
                        onChange={(_, newValue) => onProfessorSelect(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select professor"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    {/* Show clue if remainingTries > 0 and showClue is true */}
                    {remainingTries > 0 && showClue && (
                        <Typography variant="body2" sx={{ mt: 2, color: "error.main" }}>
                            {`Abstract Clue in (${remainingTries} ${remainingTries === 1 ? 'try' : 'tries'})`}
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}