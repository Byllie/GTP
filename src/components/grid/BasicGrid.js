import React, { useState,useEffect,useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputTextField from '../inputs/InputTextField';
import InputValidateButtons from '../inputs/InputValidateButtons';
import CriteriaSquares from '../criteria/CriteriaSquares';
import axios from 'axios';
import { set } from 'mongoose';

export default function BasicGrid() {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [protocols, setProtocols] = useState([]);
  const [squareRows, setSquareRows] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [showInputs, setShowInputs] = useState(true);

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
    setAttempts(prev => prev + 1);

    setSquareRows(prevRows => [
      {
        id: Date.now(),
                  protocol: selectedProtocol,
                  timestamp: new Date().toLocaleTimeString(),
                  response_data: response_data
      },
      ...prevRows
    ]);
    setSelectedProtocol(null);
  };

  const handlePopupClose = () => {
    setShowInputs(false); // cache les inputs
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

      <Grid item xs={12} display="flex" justifyContent="center">
      <InputValidateButtons
      protocol={selectedProtocol}
      onApiResult={handleApiResult}
      />
      </Grid>

    {/* Liste des résultats */}
    {squareRows.map((row) => (
      <CriteriaSquares
      key={row.id}
      protocol={row.protocol}
      timestamp={row.timestamp}
      response_data={row.response_data}
      onPopupClose={handlePopupClose}
      attempts={attempts}
      />
    ))}
    </Box>
  );
}
