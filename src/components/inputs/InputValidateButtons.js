import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./InputValidateButtons.css";
import { Grid2 } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function InputValidateButtons({ protocol, onApiResult }) {
  const [showCriteria, setShowCriteria] = useState(false);

  const handleSubmit = () => {
    if (!protocol || protocol.trim() === '') {
      alert("Veuillez sélectionner un protocole valide.");
      return;
    }

    axios.get('api/guessprotocol/' + protocol)
      .then(response => {
          console.log(response.data);
          onApiResult(response.data);
          setShowCriteria(true); // Show the criteria after successful response
      })
      .catch(error => {
        console.error("API Error:", error);
        alert("Erreur de connexion au serveur.");
      });
  };

  const criteriaLabels = [
    "Layer",
    "Date de création",
    "RFC",
    "Cours",
    "Nom",
    "Wiki"
  ];


  return (
    <Box className="criteria-container">
      <Button 
        sx={{ bgcolor: 'white' }} 
        variant="outlined" 
        onClick={handleSubmit}
      >
        Valider
      </Button>

      {showCriteria && (
      <Grid2 container spacing={2} className="criteria-grid">
        {criteriaLabels.map((label, index) => (
          <Grid2 item key={index}>
            <div className="criteria-item-wrapper">
              <Typography className="criteria-label">{label}</Typography>
            </div>
          </Grid2>
        ))}
      </Grid2>
      )}
    </Box>
  );
}
