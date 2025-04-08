import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./InputValidateButtons.css";
import { Grid2 } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function InputValidateButtons({ protocol, onApiResult,listProtocols }) {
  const [showCriteria, setShowCriteria] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        if (!protocol || protocol.trim() === '') {
          alert("Veuillez sélectionner un protocole valide.");    
          return;    
        }
        else{
          handleSubmit();
        }

      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [protocol]);

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
          listProtocols(prev => prev.filter(p => p !== protocol));
      })
      .catch(error => {
        console.error("API Error:", error);
        alert("Erreur de connexion au serveur.");
      });
  };

  const criteriaLabels = [
    "Nom",
    "Layer",
    "Date de création",
    "RFC",
    "Cours"
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
      <Grid2 container spacing={2} className="criteria-grid" alignItems="center">
        {criteriaLabels.map((label, index) => (
          <Grid2 item key={index} xs={4}>
            <div className="criteria-item">
              <Typography>{label}</Typography>
            </div>
          </Grid2>
        ))}
    </Grid2>
      )}
    </Box>
  );
}
