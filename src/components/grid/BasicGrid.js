import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputTextField from '../inputs/InputTextField';
import InputValidateButtons from '../inputs/InputValidateButtons';
import CriteriaSquares from '../criteria/CriteriaSquares';

export default function BasicGrid() {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [squareRows, setSquareRows] = useState([]); // Array to store multiple rows

  const handleProtocolSelect = (protocol) => {
    setSelectedProtocol(protocol);
  };

  const handleApiResult = (response_data) => {
    // Add a new row to the beginning of the array (to show on top)
    setSquareRows(prevRows => [
      { 
        id: Date.now(), // Unique identifier for each row
        protocol: selectedProtocol,
        timestamp: new Date().toLocaleTimeString(),
        response_data: response_data
      },
      ...prevRows // Keep previous rows below
    ]);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputTextField onProtocolSelect={handleProtocolSelect} />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputValidateButtons 
            protocol={selectedProtocol} 
            onApiResult={handleApiResult}
          />
        </Grid>
      </Grid>

      {/* Render all square rows */}
      {squareRows.map((row) => (
        <CriteriaSquares 
          key={row.id} 
          protocol={row.protocol}
          timestamp={row.timestamp}
          response_data={row.response_data}
        />
      ))}
    </Box>
  );
}
