import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

import useAPI from "../../api/useAPI";

function AdvertAdd() {
  const navigate = useNavigate();

  const [pictures, setPictures] = useState("");

  const [fileUpload, setFileUpload] = useState(null);
  const [advertChanging, setAdvertChanging] = useState(true);

  const api = useAPI();

  const handleAddAdvert = (e) => {
    e.preventDefault();
    const formAdvertData = new FormData();
    formAdvertData.append("pictures", pictures);
    formAdvertData.append("picture_link", fileUpload);

    api
      .post("/adverts", formAdvertData)

      .then(() => {
        setAdvertChanging(!advertChanging);
      })
      .catch((err) => console.error(err));
    navigate("/adminPanel/advertsTable");
  };

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Page de publicités</h2>
      <div className="sectionUpdateForm">
        <div className="sectionUpdateName">
          <label htmlFor="pictures">Titre de la publicité :</label>
          <input
            type="text"
            placeholder="Titre"
            className="sectionUpdateInput"
            value={pictures}
            onChange={(e) => setPictures(e.target.value)}
            name="pictures"
          />
        </div>
        <label htmlFor="picture_link">
          <input
            type="file"
            name="picture_link"
            onChange={(e) => setFileUpload(e.target.files[0])}
            id="file-selection-button"
          />
        </label>
        <button
          type="submit"
          className="sectionUpdateButton"
          onClick={handleAddAdvert}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default AdvertAdd;
