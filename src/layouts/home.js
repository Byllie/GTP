import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from "../components/buttons/VerticalGroup";
import { motion } from "framer-motion";
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
      <BackgroundBox className="centered-container" theme={darkTheme}>
        {/* Contenu animé */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-container">
            <img
              src="/titre_crop.png"
              alt="Guess the Protocol Logo"
              className="logo-image"
            />
            <p className="subtitle">Le jeu de TC !</p>
          </div>
          <ButtonGroup />
        </motion.div>
       </BackgroundBox>
    </ThemeProvider>
  );
}
