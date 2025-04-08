import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from "../components/buttons/VerticalGroup";
import "./home.css";
import { ThemeProvider,createTheme } from '@mui/material/styles';

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
      main: '#3F5B73',
    },
  },
});


export default function MainLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BackgroundBox className="centered-container"  theme={darkTheme}>
        <div className="header-container" >
        <img
            src="/titre_crop.png"
            alt="Guess the Protocol Logo"
            className="logo-image"
          />
          <p className="subtitle">Le jeu de TC !</p>
        </div>
        <ButtonGroup />
      </BackgroundBox>
    </ThemeProvider>
  );
}
