import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protocoles from "./layouts/Protocoles";
import Articles from "./layouts/Articles";
import Home from "./layouts/home"
import ResponsiveAppBar from "./components/appbar/ResponsiveAppBar";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protocoles" element={<Protocoles />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </Router>
  );
}
export default App;