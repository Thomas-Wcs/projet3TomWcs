import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function SectionUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const getSectionsData = async () => {
      await api.get(`sections/${id}`).then((res) => {
        setSectionData(res.data);
      });
    };
    getSectionsData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSectionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function updateSectionData() {
    api
      .put(`sections/${sectionData.id}`, { name: sectionData.name })
      .then(() => {
        navigate("/adminPanel/sectionsTable");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateSectionData();
  }

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Page de section</h2>
      <form className="sectionUpdateForm" onSubmit={handleSubmit}>
        <div className="sectionUpdateId">
          <label htmlFor="id">Identifiant de la section :</label>
          <input
            type="text"
            placeholder="id"
            value={sectionData.id}
            className="sectionUpdateInput"
            onChange={handleChange}
            name="id"
            disabled
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="name">Nom de la section :</label>
          <input
            type="text"
            placeholder="Section Name"
            className="sectionUpdateInput"
            value={sectionData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <button type="submit" className="sectionUpdateButton">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default SectionUpdate;
