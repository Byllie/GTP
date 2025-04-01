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
    
    axios.get('api/' + protocol)
      .then(response => {
        if (response.data && response.data === "OK") {
          alert("Protocole trouvé");
          onApiResult(false);
        } else {
          alert("Protocole non trouvé");
          onApiResult(true);
        }
      })
      .catch(error => {
        console.error("API Error:", error);
        alert("Erreur de connexion au serveur.");
        onApiResult(true);
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