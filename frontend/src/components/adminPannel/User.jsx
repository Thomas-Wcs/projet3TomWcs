import React from "react";
import PropTypes from "prop-types";

function User(props) {
  const { user, onManageUser, onDeleteUser } = props;

  const handleManageUser = () => {
    // Appeler une fonction pour gérer les droits de l'utilisateur
    onManageUser(user.id);
  };

  const handleDeleteUser = () => {
    onDeleteUser(user.id);
  };

  return (
    <div className="user">
      <h2>{user.name}</h2>
      <p>Adresse mail : {user.email}</p>
      {/* <p>Role : {user.droit}</p> */}
      <button type="button" onClick={handleManageUser}>
        Gérer
      </button>
      <button type="button" onClick={handleDeleteUser}>
        Supprimer
      </button>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mdp: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onManageUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

User.defaultProps = {
  user: {
    id: 0,
    name: "Toto",
    mdp: "toto",
    email: "toto",
  },
};

export default User;
