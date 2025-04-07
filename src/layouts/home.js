import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from "../components/buttons/VerticalGroup";
import { motion } from "framer-motion";
import "./home.css";

// Fond statique
const BackgroundBox = styled(Box)({
  backgroundImage: `url(/test.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  overflow: 'auto',
  backgroundAttachment: 'fixed',
});

export default function MainLayout() {
  return (
    <BackgroundBox className="centered-container">
      {/* Contenu animé */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-container">
          <img
            src="/guess_the_protocol.png"
            alt="Guess the Protocol Logo"
            className="logo-image"
          />
          <p className="subtitle">Le jeu de TC !</p>
        </div>
        <ButtonGroup />
      </motion.div>
    </BackgroundBox>
  );
}
