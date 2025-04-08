import React, { useState,useEffect,useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputTextField from '../inputs/InputTextField';
import InputValidateButtons from '../inputs/InputValidateButtons';
import CriteriaSquares from '../criteria/CriteriaSquares';
import axios from 'axios';
import { set } from 'mongoose';

export default function BasicGrid() {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [protocols, setProtocols] = useState([]);
  
  const [squareRows, setSquareRows] = useState([]); // Array to store multiple rows

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

  useEffect(() => {
      fetchProtocols();
    }, []);

  const handleProtocolSelect = (protocol) => {
    setSelectedProtocol(protocol);
  };

  const handleApiResult = (response_data) => {
    // Add a new row to the beginning of the array (to show on top)
    setSquareRows(prevRows => [
      { 
        id: Date.now(), // Unique identifier for each row
        protocol: selectedProtocol,
        timestamp: new Date().toLocaleTimeString(),
        response_data: response_data
      },
      ...prevRows // Keep previous rows below
    ]);
    setSelectedProtocol(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputTextField 
          onProtocolSelect={handleProtocolSelect} 
          listProtocols={setProtocols}
          protocols={protocols} 
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputValidateButtons 
            protocol={selectedProtocol} 
            onApiResult={handleApiResult}
            listProtocols={setProtocols}

          />
        </Grid>
      </Grid>

      {/* Render all square rows */}
      {squareRows.map((row) => (
        <CriteriaSquares 
          key={row.id} 
          protocol={row.protocol}
          timestamp={row.timestamp}
          response_data={row.response_data}
        />
      ))}
    </Box>
  );
}
