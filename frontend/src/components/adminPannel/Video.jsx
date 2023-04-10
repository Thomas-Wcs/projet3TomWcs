import React from "react";
import PropTypes from "prop-types";

function Videos(props) {
  const { videos, onDeleteVideo } = props;

  // const handleManageUser = () => {
  //   // Appeler une fonction pour gérer les droits de l'utilisateur
  //   onManageUser(user.id);
  // };

  const handleDeleteVideo = () => {
    onDeleteVideo(videos.id);
  };

  return (
    <div className="user">
      <h2>{videos.titre}</h2>
      <p>Role : {videos.description_text}</p>
      {/* <button type="button" onClick={handleManageUser}>
        Gérer
      </button> */}
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
  // onManageUser: PropTypes.func.isRequired,
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
