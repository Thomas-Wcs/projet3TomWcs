import React from "react";
import PropTypes from "prop-types";

function Videos({ videos, onDeleteVideo }) {
  const handleDeleteVideo = () => {
    onDeleteVideo(videos.id);
  };

  return (
    <div className="admin-videos" style={{ backgroundColor: "grey" }}>
      <h2>{videos.titre}</h2>
      <div>{videos.description_text} </div>
      <p>Date d'ajout: {videos.date_publication}</p>
      <button type="button" onClick={handleDeleteVideo}>
        Supprimer
      </button>
    </div>
  );
}

Videos.propTypes = {
  videos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    lien: PropTypes.string.isRequired,
    categorie_id: PropTypes.number.isRequired,
    description_text: PropTypes.string.isRequired,
    date_publication: PropTypes.string.isRequired,
  }),
  onDeleteVideo: PropTypes.func.isRequired,
};

Videos.defaultProps = {
  videos: {
    titre: "toto",
    lien: "toto",
    categorie_id: 0,
    description_text: "toto",
    date_publication: "toto",
  },
};

export default Videos;
