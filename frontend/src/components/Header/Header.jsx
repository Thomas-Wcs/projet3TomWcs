import { useState, useRef } from "react";

import { Link } from "react-router-dom";

import "../../styles/index.css";

export default function Header() {
  const [isSearchClosed, setIsSearchClosed] = useState(false);

  const checkboxRef = useRef();

  function expand() {
    setIsSearchClosed(!isSearchClosed);
  }

  function handleLinkClick() {
    checkboxRef.current.checked = false;
  }

  return (
    <div id="nav-body">
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input
              className="checkbox"
              type="checkbox"
              name=""
              id=""
              ref={checkboxRef}
            />
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
                <Link to="/" onClick={() => handleLinkClick()}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/connexion" onClick={() => handleLinkClick()}>
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => handleLinkClick()}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/adminPanel/" onClick={() => handleLinkClick()}>
                  Admin
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
