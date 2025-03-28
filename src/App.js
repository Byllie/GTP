import './App.css';
import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const BackgroundBox = styled(Box)({
  backgroundImage: `url(/test.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
});
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const fetcher = (...args) => fetch(...args).then(res => res.json())
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

var protocol_list = [{}];
var guess_prot = "";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function CriteriaSquares({ show }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2, // Add some margin-top to separate it from the button
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {['Criteria 1', 'Criteria 2', 'Criteria 3', 'Criteria 4', 'Criteria 5'].map((criteria, index) => (
          <Grid item key={index}>
            <Item
              sx={{
                width: 100,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: index % 2 === 0 ? '#4CAF50' : '#FFC107',
              }}
            >
              {criteria}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function InputValidateButtons({ label_val }) {
  const [showCriteria, setShowCriteria] = useState(false);
  const [data, setData] = useState([]);

  const ask_prot = () => {
    if (!guess_prot) {
      alert("Veuillez sélectionner un protocole.");
      return;
    }
    console.log(guess_prot);
    setShowCriteria(true);
  
    axios.get('api/' + guess_prot)
      .then(response => {
        if (response.data === "OK") {
          alert("Protocole trouvé");
        } else {
          alert("Protocole non trouvé");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={ask_prot}>Valider</Button>
      </Stack>
      <CriteriaSquares show={showCriteria} />
    </Box>
  );
}

function InputTextField() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('api/protocols_list')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  protocol_list = data;
  protocol_list = ["Bonjour", "Banane", "haha"];

  return (
    <Autocomplete
      disablePortal
      options={protocol_list}
      sx={{ width: 300 }}
      onChange={(event, newValue) => guess_prot = newValue}
      renderInput={(params) => <TextField {...params} id='input1' label="Entrée" variant="outlined" onFocus={fetchData} />}
    />
  );
}

function BasicGrid() {
  const [showCriteria, setShowCriteria] = useState(false);

  const handleShowCriteria = () => {
    setShowCriteria(true); // Trigger showing the criteria squares
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* Input Text Field */}
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputTextField />
        </Grid>

        {/* Validation Button */}
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <InputValidateButtons variant="outlined" onClick={handleShowCriteria}>
            Valider
          </InputValidateButtons>
        </Grid>

        {/* Criteria Squares */}
        {showCriteria && (
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <CriteriaSquares />
        </Grid>
        )}
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <BackgroundBox>
      <ResponsiveAppBar />
      <BasicGrid />
    </BackgroundBox>
  );
}

export default App;