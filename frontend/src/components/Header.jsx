import "../styles/Header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import ConnectionPage from "./User/ConnectionPage";

export default function Header() {
  return (
    <Router>
      <div id="header">
        <div id="label">
          <input type="checkbox" />
          <span className="menu">
            {" "}
            <span className="hamburger" />{" "}
          </span>
          <ul>
            <li>
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/connexion">Connexion</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/profile">Profile</Link>{" "}
            </li>
          </ul>
          <div id="input">
            <input
              type="text"
              name="search"
              id="search-bar"
              placeholder="Chercher une vidéo"
            />
          </div>
          <img
            src="src/assets/loupe.png"
            alt="recherche"
            id="header-search-icon"
          />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<ConnectionPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
