import React from "react";
import "../../styles/Zoom.css";
import CancelIcon from "@mui/icons-material/Cancel";

function Zoom() {
  return (
    <div className="open">
      Zoom
      <div className="zoom_banderole">
        <div className="zoom_content">
          <h3 className="zoom_title">Titre</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            magni alias eius ipsum cum, quibusdam voluptatibus rem neque modi
            totam animi eius ullam error magnam aut eaque itaque?
          </p>
        </div>
        <button className="zoom_close" type="button">
          <CancelIcon />
        </button>
      </div>
    </div>
  );
}

export default Zoom;
