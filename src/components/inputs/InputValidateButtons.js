import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./InputValidateButtons.css";
import { Grid2 } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor : '#0266a7',
          color: '#f4f6fb' // couleur texte par défaut
        },
      },
    },
  },
  palette: {
    background: {
      main: '#04060D',
    },
    primary: {
      main: '#3F5B73',
    },
    text: {
      main: '#f4f6fb',
    },
    secondary: {
      main: '#7BA1A6',
    },
  },
});

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
    "Nom",
    "Layer",
    "Date de création",
    "RFC",
    "Cours"
  ];


  return (
    <ThemeProvider theme={darkTheme}>
    <Box className="criteria-container">
      <Button 
        //sx={{ bgcolor: 'white' }} 
        variant="contained" 
        onClick={handleSubmit}
      >
        Valider
      </Button>

      {showCriteria && (
      <Grid2 container spacing={2} className="criteria-name-grid" alignItems="center">
        {criteriaLabels.map((label, index) => (
          <Grid2 item key={index} xs={4}>
            <div className="criteria-item">
              <Typography color="#f4f6fb">{label}</Typography>
            </div>
          </Grid2>
        ))}
    </Grid2>
      )}
    </Box>
    </ThemeProvider>
  );
}
