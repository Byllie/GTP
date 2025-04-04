import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protocoles from "./layouts/Protocoles";
import Articles from "./layouts/Articles";
import Home from "./layouts/home"
import ResponsiveAppBar from "./components/appbar/ResponsiveAppBar";
import NotFound from "./layouts/NotFound"
import { useLocation } from "react-router-dom";


function Layout() {
  const location = useLocation(); // Récupère l'URL actuelle

  // Vérifie si on est sur la page d'accueil
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <ResponsiveAppBar />} {/* Cache la navbar sur Home */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocoles" element={<Protocoles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
