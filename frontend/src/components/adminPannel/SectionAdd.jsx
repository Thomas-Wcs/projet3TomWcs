import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

import useAPI from "../../api/useAPI";

function SectionAdd() {
  const navigate = useNavigate();
  const api = useAPI();
  const [newSectionData, setNewSectionData] = useState({
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewSectionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function addSectionData() {
    api
      .post("sections", newSectionData)
      .then(() => {
        navigate("/adminPanel/sectionsTable");
      })
      .catch((error) => {
        console.error("Error adding section:", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addSectionData();
  }

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Page de section</h2>

      <form className="sectionUpdateForm" onSubmit={handleSubmit}>
        <div className="sectionUpdateName">
          <label htmlFor="name">Nom de la section :</label>
          <input
            type="text"
            placeholder="Section Name"
            className="sectionUpdateInput"
            value={newSectionData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <button type="submit" className="sectionUpdateButton">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default SectionAdd;
