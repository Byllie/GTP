import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../components/appbar/ResponsiveAppBar';

const BackgroundBox = styled(Box)({
  backgroundImage: `url(/test.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
});

export default function MainLayout({ children }) {
  return (
    <BackgroundBox>
      <ResponsiveAppBar />
      {children}
    </BackgroundBox>
  );
}