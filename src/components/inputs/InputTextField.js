import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function InputTextField({ onProtocolSelect }) {
  const [protocols, setProtocols] = useState([]);

  // Fetch protocols when component mounts
  useEffect(() => {
    fetchProtocols();
  }, []);

  const fetchProtocols = () => {
    axios.get('/api/protocolsName')
      .then(response => {
        setProtocols(response.data.listNames);
        console.log('Protocols loaded:', response.data.listNames)
      })
      .catch(error => {
        console.log('Error fetching data',error);
      });
  };

  const handleChange = (event, newValue) => {
    // Only call onProtocolSelect if there's a value
    if (newValue !== null) {
      onProtocolSelect(newValue);
    }
    // Empty input won't trigger any state change
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
          id='input1'
          label="Entrée"
          variant="filled"
          color="success"
          onFocus={fetchProtocols}
        />
      )}
    />
  );
}
