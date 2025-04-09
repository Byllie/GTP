import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GridArticles from "../components/grid2/GridArticles";
import { motion } from 'framer-motion';

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
    <BackgroundBox>
      <GridArticles/>
    </BackgroundBox>
    // Transition d'opacité sur le BackgroundBox

  );
}
