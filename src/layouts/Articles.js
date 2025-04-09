import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GridArticles from "../components/grid2/GridArticles";
import { motion } from 'framer-motion';
import { createTheme } from '@mui/material/styles';



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
// Style du Box pour l'image de fond
const BackgroundBox = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.main,
  backgroundImage :`url(/ChatGPT_fond_noir.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'auto',
  backgroundAttachment: 'fixed', 
  paddingTop: '64px', 
}));

// Composant principal avec transition
export default function MainLayout() {
  return (
    // Animation de fondu pour la page Protocoles
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }} // Durée de la transition d'opacité
    >
    <BackgroundBox theme={darkTheme}>
    <GridArticles />
    </BackgroundBox>
    </motion.div>
  );
}
