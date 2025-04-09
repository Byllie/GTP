import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function InputTextField({ onProtocolSelect,protocols }) {
  const [inputValue, setInputValue] = useState(''); // État pour la valeur du champ de texte
  const hasFetched = useRef(false); // Réf pour suivre si le fetch a été fait
  const [selectedValue, setSelectedValue] = useState(null); // Valeur sélectionnée


  const handleChange = (event, newValue) => {
    if (newValue) {
      onProtocolSelect(newValue);
      // Option: retirer le protocole sélectionné
    }
  };
    // Regarder ici pour que le champ soit réinitialisé et qu'on puisse pas le refaire plusieurs fois
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        if (!inputValue || inputValue.length > 0){
          const firstProtocol = protocols[0]; // Récupère le premier protocole
          setSelectedValue(firstProtocol); // Met à jour la valeur sélectionnée
          setInputValue(firstProtocol); // Met à jour le champ de texte
          onProtocolSelect(firstProtocol);

        }
        setInputValue(''); // Réinitialise la valeur du champ
      }
    };


    

  return (
    <Autocomplete
      disablePortal
      options={protocols}
      sx={{ width: 300 }}
      onChange={handleChange}
      inputValue={inputValue} // Contrôle la valeur du champ
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue); // Met à jour la valeur du champ
      }}
      autoHighlight={true}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ border: 1, bgcolor: 'white' }}
          label="Entrée"
          variant="filled"
          color="success"
          // OnFocus conservé mais ne déclenchera pas de nouveau fetch
          onFocus={() => console.log("Focus - Liste déjà chargée")}
          onKeyDown={handleKeyDown} // Ajout du gestionnaire d'événements
        />
      )}
      onKeyDown={e => {
        e.key === 'Enter' && e.preventDefault()
      }}
    />
  );
}