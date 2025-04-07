import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protocoles from "./layouts/Protocoles";
import Articles from "./layouts/Articles";
import Home from "./layouts/home"
import ResponsiveAppBar from "./components/appbar/ResponsiveAppBar";
import NotFound from "./layouts/NotFound";
import Box from '@mui/material/Box';
import { useLocation } from "react-router-dom";
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
      main: '#3F5B73',
    },
  },
});

function Layout() {
  const location = useLocation(); // Récupère l'URL actuelle

  const hideNavbar = location.pathname === "/";

  return (
    <ThemeProvider theme={darkTheme}>
    <BackgroundBox backgroundColor="background">
      {!hideNavbar && <ResponsiveAppBar theme={darkTheme} />} {/* Cache la navbar sur Home */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocoles" element={<Protocoles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BackgroundBox>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

