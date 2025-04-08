import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GridArticles from "../components/grid2/GridArticles";

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
      <GridArticles/>
    </BackgroundBox>
  );
}
