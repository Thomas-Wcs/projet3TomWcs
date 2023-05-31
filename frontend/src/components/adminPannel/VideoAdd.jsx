import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

import useAPI from "../../api/useAPI";

function VideoAdd() {
  const navigate = useNavigate();

  const [videoTitle, setTitle] = useState("");
  const [categorie, setCategorie] = useState(1);
  const [description, setDescription] = useState("");
  const [section, setSection] = useState([]);

  const [fileUpload, setFileUpload] = useState(null);
  const [videosChanging, setVideosChanging] = useState(true);
  const [newCategorie, setNewCategorie] = useState({ name: "" });
  const [allCategories, setAllCategories] = useState([]);
  const [allSections, setAllSections] = useState([]);

  const api = useAPI();

  useEffect(() => {
    api.get("category").then((res) => {
      setAllCategories(res.data);
    });
  }, [videosChanging]);

  const handleAddVideos = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description_text", description);
    formData.append("category_id", categorie);
    formData.append("link", fileUpload);
    formData.append("date_publication", Date());
    formData.append("section_id", section);

    api
      .post("/video_section", formData)

      .then(() => {
        setVideosChanging(!videosChanging);
      })
      .catch((err) => console.error(err));
    navigate("/adminPanel/videosTable");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setNewCategorie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function addCategorie() {
    api
      .post("category", newCategorie)
      .then(() => {
        setVideosChanging(!videosChanging);
      })
      .catch((error) => {
        console.error("Error adding categorie:", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addCategorie();
  }

  useEffect(() => {
    api.get("sections").then((res) => setAllSections(res.data));
  }, []);

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Page de video</h2>

      <form className="sectionUpdateForm" onSubmit={handleSubmit}>
        <div className="sectionUpdateName">
          <label htmlFor="title">Titre de la vidéo :</label>
          <input
            type="text"
            placeholder="Titre"
            className="sectionUpdateInput"
            value={videoTitle}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="description_text">Description de la vidéo :</label>
          <input
            type="text"
            placeholder="Description"
            className="sectionUpdateInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description_text"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="category_id">Selectionnez une categorie :</label>

          <select
            name="category_id"
            onChange={(e) => setCategorie(e.target.value)}
          >
            {allCategories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <form className="" onSubmit={handleSubmit}>
            <div className="sectionUpdateName">
              <label htmlFor="name"> Ou insérer une nouvelle categorie :</label>
              <input
                type="text"
                value={newCategorie.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <button type="button" onClick={addCategorie}>
              {" "}
              Ajouter
            </button>
            <label htmlFor="category_id">Ajouter à :</label>

            <div className="section-checkboxes">
              {allSections.map((sect) => (
                <div key={sect.id}>
                  <input
                    type="checkbox"
                    id={`section-${sect.id}`}
                    value={sect.id}
                    checked={section.includes(sect.id)}
                    onChange={(e) => {
                      const sectionId = sect.id;
                      if (e.target.checked) {
                        setSection((prevSections) => [
                          ...prevSections,
                          sectionId,
                        ]);
                      } else {
                        setSection((prevSections) =>
                          prevSections.filter((id) => id !== sectionId)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`section-${sect.id}`}>{sect.name}</label>
                </div>
              ))}
            </div>
          </form>
        </div>
        <label htmlFor="link">
          <input
            type="file"
            name="link"
            onChange={(e) => setFileUpload(e.target.files[0])}
            id="file-selection-button"
          />
        </label>
        <button
          type="submit"
          className="sectionUpdateButton"
          onClick={handleAddVideos}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default VideoAdd;
