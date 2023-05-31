import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { success, isAdmin } = useAuth();
  const [isSearchClosed, setIsSearchClosed] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const searchOnGoogle = () => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(` "bientot on pourras chercher sur notre site : ${textSearch}`);
  };

  const checkboxRef = useRef();

  function handleSearch() {
    if (textSearch) {
      searchOnGoogle(textSearch);
    }
  }

  function expand() {
    setIsSearchClosed(!isSearchClosed);
    setTextSearch("");
  }

  function handleLinkClick() {
    checkboxRef.current.checked = false;
  }

  function clickToLogout() {
    checkboxRef.current.checked = false;
    navigate("/connexion");
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
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setTextSearch("");
                    expand();
                  }
                }}
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
                  Acceuil
                </Link>
              </li>
              {success ? (
                <li>
                  <Link to="/connexion" onClick={() => handleLinkClick()}>
                    Connexion
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={() => handleLinkClick()}>
                    Profil
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li>
                  <Link to="/adminPanel/" onClick={() => handleLinkClick()}>
                    Administrateur
                  </Link>
                </li>
              )}
              {!success && (
                <button
                  className="user-button"
                  type="button"
                  onClick={clickToLogout}
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
