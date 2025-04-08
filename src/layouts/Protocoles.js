import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BasicGrid from "../components/grid/BasicGrid";
import { createTheme } from '@mui/material/styles';

const BackgroundBox = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.main,
  backgroundImage :`url(/ChatGPT_fond_noir.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'auto',
  backgroundAttachment: 'fixed',
}));

const darkTheme = createTheme({
  palette: {
    background: {
      main: '#04060D',
    },
    primary: {
      main: '#002771', //0041bd
    },
    text: {
      main: '#f4f6fb',
    },
    secondary: {
      main: '#0266a7', //014674
    },
  },
});

export default function MainLayout() {
  return (
    <BackgroundBox theme={darkTheme}>
      <BasicGrid/>
    </BackgroundBox>
  );
}