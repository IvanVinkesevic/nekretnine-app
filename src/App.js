import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AllProperties from "./components/AllProperties";
import PropertiesByType from "./components/PropertiesByType";
import Contact from "./components/Contact";
import SubmitProperty from "./components/SubmitProperty";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="app-header">
          <div className="header-content">
            <a
              href="https://ivanvinkesevic.github.io/DidIvanovidvori/"
              style={{ marginLeft: "20px", color: "white" }}
            >
              ← Povratak na glavnu stranicu
            </a>
            {/*  LOGO: */}
            <img src="/irs-logo2.png" alt="Platforma Logo" className="logo" />
            {/* PROMIJENI NASLOV: */}
            <h1>
              Kuće na selu -<span> Pronađite svoj kutak mira</span>{" "}
            </h1>
          </div>
        </header>

        {/* NAVIGACIJA: */}
        <nav>
          <ul>
            <li>
              <Link to="/">Sve kuće na selu</Link>
            </li>
            <li>
              <Link to="/vrste-imanja">Vrste imanja</Link>
            </li>
            <li>
              <Link to="/objavi-nekretninu">Objavi nekretninu</Link>
            </li>
            <li>
              <Link to="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<AllProperties />} />
          <Route path="/vrste-imanja" element={<PropertiesByType />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/objavi-nekretninu" element={<SubmitProperty />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
