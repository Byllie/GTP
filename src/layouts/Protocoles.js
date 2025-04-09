import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BasicGrid from "../components/mode1/grid/BasicGrid";

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
    <BackgroundBox>
      <BasicGrid/>
    </BackgroundBox>
  );
}