import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function CriteriaSquares({ isError, protocol, timestamp }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        mb: 4
      }}
    >
      <Typography 
        variant="subtitle2" 
        gutterBottom
        sx={{ color: 'white' }}  // This makes the text white
      >
        {protocol} - {timestamp}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {['Criteria 1', 'Criteria 2', 'Criteria 3', 'Criteria 4', 'Criteria 5'].map((criteria, index) => (
          <Grid item key={index}>
            <Item
              sx={{
                width: 100,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isError ? '#FF5252' : 
                  index % 2 === 0 ? '#4CAF50' : '#FFC107',
              }}
            >
              {criteria}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}