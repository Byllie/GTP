import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Protocoles from "./layouts/Protocoles";
import Articles from "./layouts/Articles";
import Home from "./layouts/home";
import ResponsiveAppBar from "./components/appbar/ResponsiveAppBar";
import NotFound from "./layouts/NotFound";
import { AnimatePresence, motion } from "framer-motion";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'background', // ou une autre couleur du thème
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
}));

const darkTheme = createTheme({
  palette: {
    background: {
      main: '#04060D',
    },
    primary: {
      main: '#00123a',
    },
  },
});


function AnimatedRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // Cache la navbar sur Home

  return (
    <>
      {/* Navbar animée, visible sauf sur la page d'accueil */}
    <ThemeProvider theme={darkTheme}>
      <AnimatePresence>
        {!hideNavbar && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 0,
              width: '100%',
              zIndex: 9999,
              background: 'transparent', // Assure que la navbar n'a pas de fond blanc
            }}
          >
            <ResponsiveAppBar theme={darkTheme}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages avec une transition de fondu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}  // Pour forcer une animation sur chaque changement de page
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}  // Durée du fondu
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/protocoles" element={<Protocoles />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
