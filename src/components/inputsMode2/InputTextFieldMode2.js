import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function InputTextField({ onProfessorSelect, showClue, remainingTries  }) {
    const [professors, setProfessors] = useState([]);

    // // Fetch professors when component mounts
    // useEffect(() => {
    //     fetchProfessors();
    // }, []);

    // const fetchProfessors = () => {
    //     axios.get('/api/professorsName')
    //         .then(response => {
    //             setProfessors(response.data.listNames);
    //             console.log('Professors loaded:', response.data.listNames);
    //         })
    //         .catch(error => {
    //             console.log('Error fetching data', error);
    //         });
    // };

    useEffect(() => {
        const mockProfessors = [
            'Professor X',
            'Professor Y',
            'Professor Z',
            'Dr. Strange',
            'Dr. Who',
        ];
        setProfessors(mockProfessors);
        console.log('Mock professors loaded:', mockProfessors);
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                textAlign: 'center',
                width: '80%',
                maxWidth: '600px',
                margin: 'auto',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Which professor is the author?
            </Typography>

            <Typography variant="h6" sx={{ mb: 3, fontStyle: 'italic' }}>
                "name articles"
            </Typography>

            <Autocomplete
                disablePortal
                options={professors}
                sx={{ width: 300, margin: 'auto' }}
                onChange={(event, newValue) => onProfessorSelect(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{ border: 1, bgcolor: 'white' }}
                        label="Enter professor name"
                        variant="filled"
                        color="success"
                    />
                )}
            />

            {showClue && (
                <Typography variant="body1" sx={{ mt: 2, color: 'red' }}>
                    {`Abstract Clue (${remainingTries} ${remainingTries === 1 ? 'try' : 'tries'} remaining)`}
                </Typography>
            )}
        </Box>
    );
}