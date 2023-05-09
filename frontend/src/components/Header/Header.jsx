import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../api/useAPI";

export default function Header() {
  const api = useAPI();
  const navigate = useNavigate();
  const [isSearchClosed, setIsSearchClosed] = useState(false);
  const { setSuccess, success, setIsAdmin, isAdmin } = useAuth();

  const checkboxRef = useRef();

  function expand() {
    setIsSearchClosed(!isSearchClosed);
  }

  function handleLinkClick() {
    checkboxRef.current.checked = false;
  }

  const handleLogOut = () => {
    delete api.defaults.headers.authorization;
    setSuccess(!success);
    handleLinkClick();
    setIsAdmin(false);
    navigate("/connexion");
  };

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
              {success ? (
                <li>
                  <Link to="/connexion" onClick={() => handleLinkClick()}>
                    Connexion
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={() => handleLinkClick()}>
                    Profile
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li>
                  <Link to="/adminPanel/" onClick={() => handleLinkClick()}>
                    Admin
                  </Link>
                </li>
              )}
              {!success && (
                <button
                  className="user-button"
                  type="button"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
