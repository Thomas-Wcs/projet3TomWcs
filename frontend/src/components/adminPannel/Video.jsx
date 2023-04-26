import React, { useState } from "react";
import PropTypes from "prop-types";
import useAPI from "../../api/useAPI";

function Videos({ videos, onDeleteVideo }) {
  const api = useAPI();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategorie, setNewCategorie] = useState();
  const [modify, setModify] = useState(false);

  const handleDeleteVideo = () => {
    onDeleteVideo(videos.id);
  };

  const handleEdit = () => {
    const newVideo = {
      title: newTitle,
      description_text: newDescription,
      category_id: newCategorie,
    };

    api.put(`/videos/${videos.id}`, newVideo).then((resp) => {
      return resp;
    });
  };

  const handleModify = () => {
    setModify(!modify);
  };

  return (
    <div className="admin-videos" style={{ backgroundColor: "grey" }}>
      <div className="video-info">
        <h2>{videos.title}</h2>
        <h2>{videos.description_text} </h2>
        <p>Date d'ajout: {videos.date_publication}</p>
        <button type="button" onClick={handleDeleteVideo}>
          Supprimer
        </button>
        <button type="button" onClick={handleModify}>
          Modifier
        </button>
      </div>
      {modify && (
        <div className="video-update-form">
          <label htmlFor="title">
            Nouveau titre:
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>

          <label htmlFor="description">
            Nouvelle description:
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </label>
          <select onChange={(e) => setNewCategorie(e.target.value)}>
            <option value="1">Animaux</option>
            <option value="2">Sports</option>
            <option value="3">Cuisine</option>
            <option value="4">Voyage</option>
          </select>
          <button type="button" onClick={handleEdit}>
            {" "}
            Modifier
          </button>
        </div>
      )}
    </div>
  );
}

Videos.propTypes = {
  videos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    description_text: PropTypes.string.isRequired,
    date_publication: PropTypes.string.isRequired,
  }),
  onDeleteVideo: PropTypes.func.isRequired,
};

Videos.defaultProps = {
  videos: {
    title: "toto",
    link: "toto",
    category_id: 0,
    description_text: "toto",
    date_publication: "toto",
  },
};

export default Videos;
