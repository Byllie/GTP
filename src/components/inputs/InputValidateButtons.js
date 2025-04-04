import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function InputValidateButtons({ protocol, onApiResult }) {
  const handleSubmit = () => {
    if (!protocol || protocol.trim() === '') {
      alert("Veuillez sélectionner un protocole valide.");
      return;
    }
    
    axios.get('api/guessprotocol/' + protocol)
      .then(response => {
          console.log(response.data);
          onApiResult(response.data);
      })
      .catch(error => {
        console.error("API Error:", error);
        alert("Erreur de connexion au serveur.");
      });
  };

  return (
    <Box>
      <Button 
        sx={{ bgcolor: 'white' }} 
        variant="outlined" 
        onClick={handleSubmit}
      >
        Valider
      </Button>
    </Box>
  );
}
