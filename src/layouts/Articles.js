import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

// Style du Box pour l'image de fond
const BackgroundBox = styled(Box)({
  backgroundImage: `url(/test.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'auto',
  backgroundAttachment: 'fixed', // Assure que l'image de fond reste fixe
});

// Composant principal avec transition
export default function MainLayout() {
  return (
    // Transition d'opacité sur le BackgroundBox
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} // Durée de la transition d'opacité
    >
      <BackgroundBox>
      </BackgroundBox>
    </motion.div>
  );
}
