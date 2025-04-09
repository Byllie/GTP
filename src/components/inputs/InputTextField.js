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
  const [inputValue, setInputValue] = useState('');
  const hasFetched = useRef(false);
  const [selectedValue, setSelectedValue] = useState(null);


  const handleChange = (event, newValue) => {
    if (newValue) {
      onProtocolSelect(newValue);
    }
  };
    


    

  return (
    <ThemeProvider theme={darkTheme}>
    <Autocomplete
      disablePortal
      options={protocols}
      sx={{
        width: "100vmin",
        height: '11vmin',
        paddingTop: "5vmin",
        '& .MuiInputBase-root': {
          height: '11vmin', // hauteur du champ
          fontSize: '4vmin', // taille du texte dans le champ
        },
        '& .MuiInputBase-input': {
          fontSize: '4vmin', // taille du texte dans le champ (input lui-même)
          padding: '2vmin',  // padding interne pour aérer un peu
        },
        '& .MuiFormLabel-root': {
          fontSize: '3.5vmin', // taille du label "Entrée"
        },
      }}
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