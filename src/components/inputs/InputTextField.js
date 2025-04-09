import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: '#f4f6fb',
          borderRadius: '16px',
          backgroundColor: '#7BA1A6', 
          '&.Mui-focused': {
            backgroundColor: '#7BA1A6'
          },
          "&:hover": {
            backgroundColor: "#7BA1A6", 
          },
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f4f6fb'
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
    accent: {
      main: '#b84b24',
    },
  },
});

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
    <ThemeProvider theme={darkTheme}>
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
          label="Entrée"
          variant="filled"
          // OnFocus conservé mais ne déclenchera pas de nouveau fetch
          onFocus={() => console.log("Focus - Liste déjà chargée")}
        />
      )}
      onKeyDown={e => {
        e.key === 'Enter' && e.preventDefault()
      }}
    />
    </ThemeProvider>
  );
}