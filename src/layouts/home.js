import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from "../components/buttons/VerticalGroup";
import "./home.css";

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
      <div className="header-container">
      <img
          src="/guess_the_protocol.png"
          alt="Guess the Protocol Logo"
          className="logo-image"
        />
        <p className="subtitle">Le jeu de TC !</p>
      </div>
      <ButtonGroup />
    </BackgroundBox>
  );
}
