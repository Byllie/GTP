import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor : '#0266a7',
                color: '#f4f6fb',
                width: "30vmin",
                height: '6vmin',
                fontSize: '2.5vmin',
                marginBottom: '2vmin'
              },
            },
          },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    width: "55vmin",
                    height: '15vmin',
                    paddingTop: "5vmin",
                    '& .MuiInputBase-root': {
                    height: '11vmin',
                    fontSize: '5vmin',
                    },
                    '& .MuiInputBase-input': {
                    fontSize: '5vmin',
                    padding: '2vmin',
                    },
                    '& .MuiFormLabel-root': {
                    fontSize: '4vmin',
                    },
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
                    color: '#f4f6fb',
                    fontSize: '3vmin'
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

export default function InputValidateButtons({ 
    onValidate,
    isCorrect
}) {
    return (
        <ThemeProvider theme={darkTheme}>
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
        </ThemeProvider>
    );
}
