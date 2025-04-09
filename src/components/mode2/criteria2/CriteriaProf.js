import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function CriteriaProf({ 
    isCorrect, 
    professor, 
    abstract, 
    showFullAbstract 
}) {
    return (
        <Box sx={{ mt: 2 }}>
            <Paper elevation={2} sx={{
                p: 2,
                borderLeft: `4px solid ${isCorrect ? '#4CAF50' : '#F44336'}`,
                backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'
            }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {professor}
                </Typography>
                <Typography color={isCorrect ? 'success.main' : 'error.main'}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                </Typography>
                
                {/* {showFullAbstract && abstract && (
                    <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Full Abstract:
                        </Typography>
                        <Typography variant="body1">
                            {abstract}
                        </Typography>
                    </>
                )} */}
            </Paper>
        </Box>
    );
}