import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputTextField from '../inputsMode2/InputTextFieldMode2';
import InputValidateButtons from '../inputsMode2/InputValidateButtonsMode2';
import CriteriaSquares from '../criteria/CriteriaSquares';

export default function GridArticles() {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [squareRows, setSquareRows] = useState([]); // Array to store multiple rows

  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleApiResult = (response_data) => {
    // Add a new row to the beginning of the array (to show on top)
    setSquareRows(prevRows => [
      { 
        id: Date.now(), // Unique identifier for each row
        professor: selectedProfessor,
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
          <InputTextField onProfessorSelect={handleProfessorSelect} />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputValidateButtons 
            professor={selectedProfessor} 
            onApiResult={handleApiResult}
          />
        </Grid>
      </Grid>

      {/* Render all square rows */}
      {squareRows.map((row) => (
        <CriteriaSquares 
          key={row.id} 
          professor={row.professor}
          timestamp={row.timestamp}
          response_data={row.response_data}
        />
      ))}
    </Box>
  );
}
