import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor : '#ffffff',
    //       color: '#f4f6fb' // couleur texte par défaut
    //     },
    //   },
    // },
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
        },
        // '&:after': {
        //     borderBottomLeftRadius: '12px',
        //     borderBottomRightRadius: '12px',
        //     borderBottom: '2px solid #b84b24', // couleur focus
        //   },
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

export default function InputTextField({ onProtocolSelect }) {
  const [protocols, setProtocols] = useState([]);

  const fetchProtocols = () => {
    axios.get('/api/protocolsName')
      .then(response => {
        setProtocols(response.data.listNames);
        console.log(response.data.listNames)
      })
      .catch(error => {
        console.log(error);
        setProtocols(["Bonjour", "Banane", "haha"]);
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
    <ThemeProvider theme={darkTheme}>
    <Autocomplete
      disablePortal
      options={protocols}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          id='input1'
          label="Entrée"
          variant="filled"
          onFocus={fetchProtocols}
        />
      )}
    />
    </ThemeProvider>
  );
}
