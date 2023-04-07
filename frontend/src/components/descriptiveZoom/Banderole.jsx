import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Banderole.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InfoIcon from "@mui/icons-material/Info";
import Zoom from "./Zoom";

function Banderole() {
  const [popup, setPopup] = useState(false);

  function handleClickPopup() {
    setPopup(!popup);
  }

  const banderoleStyle = {
    backgroundImage: `url("/src/assets/exemple.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <header className="banderole" style={banderoleStyle}>
      <div className="banderole_content">
        <h1 className="banderole_title">Movie title</h1>
        <p className="banderole_description">Description</p>
        <div className="banderole_buttons">
          <Link to="/player">
            <button
              type="button"
              className="banderole_button banderole_button_play"
            >
              <PlayCircleIcon />
              Lecture
            </button>
          </Link>
          <button
            type="button"
            className="banderole_button"
            onClick={handleClickPopup}
          >
            <InfoIcon />
            Informations
          </button>
        </div>
        <Zoom banderoleStyle={banderoleStyle} popupStatut={popup} />
      </div>
    </header>
  );
}

export default Banderole;
