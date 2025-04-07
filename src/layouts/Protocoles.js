import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BasicGrid from "../components/grid/BasicGrid";
import { motion } from 'framer-motion';

// Style du Box pour l'image de fond
const BackgroundBox = styled(Box)({
  backgroundImage: `url(/test.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'auto',
  backgroundAttachment: 'fixed', // Assure que l'image de fond reste fixe
  marginTop: '64px', // Ajoute une marge pour décaler le contenu sous la navbar
});

// Composant principal avec transition
export default function Protocoles() {
  return (
    // Animation de fondu pour la page Protocoles
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Durée de la transition d'opacité
    >
      <BackgroundBox>
        {/* Ton contenu ici */}
        <BasicGrid />
      </BackgroundBox>
    </motion.div>
  );
}
