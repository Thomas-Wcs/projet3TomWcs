import "../../styles/Header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Profile from "../User/Profile";
import Homepage2 from "../../pages/Homepage2";
import ConnectionPage from "../User/ConnectionPage";

export default function Header() {
  const [isSearchClosed, setIsSearchClosed] = useState(false);

  function expand() {
    setIsSearchClosed(!isSearchClosed);
  }

  return (
    <Router>
      <div>
        <nav>
          <div className="navbar">
            <div className="container nav-container">
              <input className="checkbox" type="checkbox" name="" id="" />
              <div className="hamburger-lines">
                <span className="line line1" />
                <span className="line line2" />
                <span className="line line3" />
              </div>
              <form id="content">
                <input
                  type="text"
                  name="input"
                  className={`input ${isSearchClosed ? "square" : ""}`}
                />
                <button
                  type="button"
                  className={`search ${isSearchClosed ? "close" : ""}`}
                  onClick={expand}
                  aria-label="search"
                />
              </form>
              <div className="menu-items">
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
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Homepage2 />} />
        <Route path="/connexion" element={<ConnectionPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
