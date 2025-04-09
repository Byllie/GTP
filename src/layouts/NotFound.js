import { Typography } from "@mui/material";
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const BackgroundBox = styled(Box)({
    backgroundImage: `url(/test.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    overflow: 'auto',
    backgroundAttachment: 'fixed', // Ensures the background doesn't zoom out on updates
  });

export default function MainLayout() {
  return (
    <BackgroundBox className="centered-container">
      <Typography variant="h6" style={
        
        {
            mr: 2,
            fontSize: "xxx-large",
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'red',
            textDecoration: 'none',
            bgcolor: 'ff0000'
          }
      }>
        404 Not found</Typography>
    </BackgroundBox>
  );
}