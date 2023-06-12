import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import { v4 as uuidv4 } from "uuid";
import useAPI from "../../api/useAPI";

function SectionUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  const [succesMessage, setSuccesMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sectionData, setSectionData] = useState({
    id: "",
    name: "",
    section_type: "",
    order: 0,
  });
  const options = [
    "",
    "section avec catégorie",
    "section sans catégorie",
    "section teasers",
    "section hero",
    "section grande hauteur",
  ];

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
      .put(`sections/${sectionData.id}`, {
        name: sectionData.name,
        order: sectionData.order,
        section_type: sectionData.section_type,
      })
      .then((response) => {
        if (response.status === 204) {
          setSuccesMessage("La modification a été effectuée avec succès!");
          setSucces(true);
        }
        setTimeout(() => navigate("/adminPanel/sectionsTable"), 2000);
      })
      .catch((err) => {
        setError(true);
        if (err.response.status === 409) {
          setErrorMessage("Cette entrée existe déjà");
        } else {
          setErrorMessage("Une erreur est survenue");
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
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
          <div className="sectionUpdateOrder">
            <label htmlFor="name">Ordre :</label>
            <input
              type="number"
              placeholder="Ordre"
              className="sectionUpdateInput"
              value={sectionData.order}
              onChange={handleChange}
              name="order"
              min="1"
              max="10"
              style={{ border: error ? "1px solid red" : "" }}
            />
          </div>

          {error && <p>{errorMessage}</p>}
          {succes && <p style={{ color: "green" }}>{succesMessage}</p>}

          <div className="sectionUpdateSectionType">
            <label htmlFor="name">Type de la section :</label>
            <select
              id="section_type"
              value={sectionData.section_type}
              onChange={handleChange}
              name="section_type"
            >
              {options.map((option) => (
                <option value={option} key={uuidv4()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="sectionUpdateButton">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default SectionUpdate;
