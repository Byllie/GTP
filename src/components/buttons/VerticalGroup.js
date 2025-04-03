import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import "./VeticalGroup.css"

const buttons = [
  <Button key="two">Protocoles</Button>,
  <Button key="three">Articles</Button>,
];

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}