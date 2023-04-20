import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Banderole.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import InfoIcon from "@mui/icons-material/Info";
import Zoom from "./Zoom";
import axios from "axios";
import RequestsAPI from "./RequestsAPI";

function Banderole() {
  const [movie, setMovie] = useState({});
  const [popup, setPopup] = useState(false);

  function handleClickPopup() {
    setPopup(!popup);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(RequestsAPI.fetchTrending);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  const banderoleStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <header className="banderole" style={banderoleStyle}>
      <div className="banderole_content">
        <h1 className="banderole_title">{movie?.title || movie?.name}</h1>
        <p className="banderole_description">{movie?.overview}</p>
        <div className="banderole_buttons">
          <Link to={`/video/${movie?.id}`}>
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
        <Zoom
          banderoleStyle={banderoleStyle}
          movie={movie}
          popup={handleClickPopup}
          popupStatut={popup}
        />
      </div>
    </header>
  );
}

export default Banderole;
