import React from "react";
import "../../styles/Zoom.css";
import CancelIcon from "@mui/icons-material/Cancel";

function Zoom({ banderoleStyle, movie, popup, popupStatut }) {
  return (
    <div className={`zoom ${popupStatut && "open"}`}>
      <div className="zoom_banderole" style={banderoleStyle}>
        <div className="zoom_content">
          <h3 className="zoom_title">{movie?.title || movie?.name}</h3>
          <p>{movie?.overview}</p>
        </div>
        <button className="zoom_close" onClick={popup}>
          <CancelIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default Zoom;
