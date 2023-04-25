import React, { useState, useEffect } from "react";
import Video from "./Video";
import useAPI from "../../api/useAPI";
import "../../styles/index.css";

function VideosManagement() {
  const api = useAPI();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState(1);
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const handleAddVideos = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", title);
    formData.append("description_text", description);
    formData.append("categorie_id", categorie);
    formData.append("videos", fileUpload);

    api
      .post("/videos", formData)
      .then((result) => {
        return result;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    api
      .get("/videos")
      .then((data) => {
        setVideos(data.data);
      })
      .catch((error) => console.error(error));
  }, [videos]);

  const handleDeleteVideo = (video) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la video${video} ?`
    );

    if (confirmDelete) {
      api
        .delete(`/videos/${video}`)
        .then(() => {
          // eslint-disable-next-line no-alert
          window.alert(`La video ${video} a été supprimé avec succès`);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="user-management">
      <div id="title">
        <h1>Ajouter une video</h1>
        <form onSubmit={handleAddVideos} id="video-form">
          <label htmlFor="title">
            <input
              type="text"
              placeholder="Titre"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <select onChange={(e) => setCategorie(e.target.value)}>
            <option value="1">Animaux</option>
            <option value="2">Sports</option>
            <option value="3">Cuisine</option>
            <option value="4">Voyage</option>
          </select>
          <label htmlFor="descritpion">
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="lien">
            <input
              type="file"
              name="lien"
              onChange={(e) => setFileUpload(e.target.files[0])}
            />
          </label>
          <button type="submit">Ajouter</button>
        </form>
        <h2>Ajouter une vidéo</h2>
      </div>
      <h1>Videos</h1>
      {videos.map((video) => (
        <Video
          key={video.id}
          videos={video}
          onDeleteVideo={handleDeleteVideo}
        />
      ))}
    </div>
  );
}

export default VideosManagement;
