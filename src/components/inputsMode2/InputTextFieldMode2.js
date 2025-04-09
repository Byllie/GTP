import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    color: '#f4f6fb',
                    borderRadius: '16px',
                    backgroundColor: '#7BA1A6',
                    '&.Mui-focused': {
                        backgroundColor: '#7BA1A6'
                    },
                    "&:hover": {
                        backgroundColor: "#7BA1A6",
                    },
                }
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#f4f6fb'
                },
            },
        },
    },
    palette: {
        background: {
            main: '#04060D',
        },
        primary: {
            main: '#3F5B73',
        },
        text: {
            main: '#f4f6fb',
        },
        secondary: {
            main: '#7BA1A6',
        },
        accent: {
            main: '#b84b24',
        },
    },
});

export default function InputTextField({ onProfessorSelect, loading, professors, articleTitle, remainingTries, showClue }) {
    const [inputValue, setInputValue] = useState('');

    return (
        <ThemeProvider theme={darkTheme}>
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                marginTop: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                textAlign: 'center',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight:'auto',
                width: '100%',
            }}
        >
        <Typography variant="h5" gutterBottom>
        Quel professeur est l’auteur ?
        </Typography>

        {loading ? (
            <CircularProgress sx={{ my: 2 }} />
        ) : (
            <>
            <Typography variant="h6" sx={{ mb: 3, fontStyle: 'italic' }}>
            « {articleTitle} »
            </Typography>

            <Autocomplete
            disablePortal
            options={professors}
            sx={{ width: 300, margin: '0 auto' }}
            onChange={(_, newValue) => onProfessorSelect(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Choisir un professeur"
                variant="filled"
                fullWidth
                />
            )}
            onKeyDown={e => {
                if (e.key === 'Enter') e.preventDefault();
            }}
            />

            {remainingTries > 0 && showClue && (
                <Typography variant="body2" sx={{ mt: 2, color: "error.main" }}>
                Indice sur le résumé dans ({remainingTries} {remainingTries === 1 ? 'tentative' : 'tentatives'})
                </Typography>
            )}
            </>
        )}
        </Box>
        </ThemeProvider>
    );
}
