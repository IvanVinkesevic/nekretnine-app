import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AllProperties from "./components/AllProperties";
import PropertiesByType from "./components/PropertiesByType";
import Contact from "./components/Contact";
import SubmitProperty from "./components/SubmitProperty";
import PropertyDetails from "./components/PropertyDetails";

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
              ← Povratak na početnu stranicu
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
              <Link to="/">Sve nekretnine</Link>
            </li>
            <li>
              <Link to="/vrste-imanja">Vrste nekretnina</Link>
            </li>
            <li>
              <Link to="/objavi-nekretninu">Oglasi nekretninu</Link>
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
          <Route path="/nekretnina/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
