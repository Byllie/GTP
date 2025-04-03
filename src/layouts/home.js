import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonGroup from "../components/buttons/VerticalGroup"
import "./home.css"

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
      <ButtonGroup />
    </BackgroundBox>
  );
}
