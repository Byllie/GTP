import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import './ResponsiveAppBar.css';

const pages = ['Protocoles', 'Articles'];

export default function ResponsiveAppBar({theme}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <ThemeProvider theme={theme}>
    <AppBar className="APPBar-bg" position="static" color="primary">
      <Container className="APPBar-bg" maxWidth="xl">
        <Toolbar disableGutters className="APPBar-bg">
          <Box className='Bouton-SMALL'>
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
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography sx={{ textAlign: 'center' }} component={Link} to={`/${page.toLowerCase()}`}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className='Bouton-FULL'>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`} // Redirige vers /protocoles et /articles
                  sx={{ my: 2, color: 'white', display: 'block', fontSize:"2vmin", marginRight:"7vmin" }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          <Box sx={{ width:'100%', height:'auto' }} />
          <Box component="a" href="/" className='Logo-GTP-Bar'>
            <img src="/titre_crop.png" alt="Logo"/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}