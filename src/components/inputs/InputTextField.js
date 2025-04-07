import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function InputTextField({ onProtocolSelect }) {
  const [protocols, setProtocols] = useState([]);
  const hasFetched = useRef(false); // Réf pour suivre si le fetch a été fait

  const fetchProtocols = () => {
    // Ne fetch que si pas déjà fait
    if (!hasFetched.current) {
      hasFetched.current = true; // Marquer comme fetché
      
      axios.get('/api/protocolsName')
        .then(response => {
          const data = response.data?.listNames || [];
          setProtocols(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error("Fetch error:", error);
          setProtocols(["Bonjour", "Banane", "haha"]);
        });
    }
  };

  // Fetch au montage du composant
  useEffect(() => {
    fetchProtocols();
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue) {
      onProtocolSelect(newValue);
      // Option: retirer le protocole sélectionné
      setProtocols(prev => prev.filter(p => p !== newValue));
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={protocols}
      sx={{ width: 300 }}
      onChange={handleChange}
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
    />
  );
}