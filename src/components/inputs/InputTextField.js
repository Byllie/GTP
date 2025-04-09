import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
    


    

  return (
    <Autocomplete
      disablePortal
      options={protocols}
      sx={{ width: 300 }}
      onChange={handleChange}
      autoHighlight={true}
      inputValue={inputValue} 
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue); // Met à jour la valeur du champ
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ border: 1, bgcolor: 'white' }}
          label="Entrée"
          variant="filled"
          color="success"
          // OnFocus conservé mais ne déclenchera pas de nouveau fetch
          onFocus={() => console.log("Focus - Liste déjà chargée")}
        />
      )}
      onKeyDown={e => {
        e.key === 'Enter' && e.preventDefault()
      }}
    />
  );
}