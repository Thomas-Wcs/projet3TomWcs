import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import userRole from "../../utils/users";

export default function EditProfile() {
  const { state } = useLocation();
  const { setIsAdmin, setUserInfo } = useAuth();

  const api = useAPI();

  const [editableContent, setEditableContent] = useState(state);
  const [mdp, setMdp] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [doneMessage, setDoneMessage] = useState(false);

  const relogUser = () => {
    const user = {
      mdp,
      email: editableContent.userInfo.email,
    };

    api
      .post("users/login/", user)
      .then((res) => {
        const { token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserInfo(res.data.user);
        setDoneMessage(true);
        setTimeout(() => {
          setDoneMessage(false);
        }, 3000);
        if (res.data.user.role === userRole.ADMIN) setIsAdmin(true);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(true);
      });
    setTimeout(() => {
      setErrorMessage(false);
    }, 3000);
  };

  const editUser = async () => {
    try {
      await api.put(`users/${state.userInfo.id}`, editableContent.userInfo);
    } catch (error) {
      console.error(error);
    }
    relogUser();
    setMdp("");
  };

  return (
    <div className="user-main-profile">
      <div className="user-adresse-information">
        <div>
          <h3>Info Utilisateur</h3>
          <h4>FistName</h4>
          <div />
          <p>
            <input
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              value={editableContent.userInfo.firstname}
              onChange={(e) =>
                setEditableContent({
                  ...editableContent,
                  userInfo: {
                    ...editableContent.userInfo,
                    firstname: e.target.value,
                  },
                })
              }
            />
          </p>
          <h4>Name</h4>
          <p>
            <input
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              value={editableContent.userInfo.name}
              onChange={(e) =>
                setEditableContent({
                  ...editableContent,
                  userInfo: {
                    ...editableContent.userInfo,
                    name: e.target.value,
                  },
                })
              }
            />
          </p>
          <h4>Email </h4>
          <p>
            <input
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              value={editableContent.userInfo.email}
              onChange={(e) =>
                setEditableContent({
                  ...editableContent,
                  userInfo: {
                    ...editableContent.userInfo,
                    email: e.target.value,
                  },
                })
              }
            />
          </p>
        </div>

        <div className="user-edit-adresse-information">
          <h3>Adresse</h3>
          <h4>Ville</h4>
          <p>Lyon</p>
          <h4>Rue</h4>
          <p>Rue Victor Hugo 42</p>
          <h4>Code Postal </h4>
          <p>69003</p>
          <h4>Tél :</h4>
          <p> 0606060606</p>
          <h4>Complement :</h4>
          <p>Vide</p>
        </div>

        <div>
          <h4>Tapez votre mot de passe pour valider les modifications :</h4>
          <p>
            <input
              type="password"
              style={{ backgroundColor: "white", color: "black" }}
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
            />
          </p>
        </div>
        <div>
          {errorMessage && <p id="password-error">Mot de passe incorrect</p>}
          {doneMessage && <p id="password-error">Mise à jour des infos</p>}
          <button
            className="valide-mdp-button"
            type="button"
            onClick={editUser}
          >
            VALIDER{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

EditProfile.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    firstname: PropTypes.string,
    email: PropTypes.string,
  }),
};
EditProfile.defaultProps = {
  userInfo: {
    name: "",
    firstname: "",
    email: "",
  },
};
