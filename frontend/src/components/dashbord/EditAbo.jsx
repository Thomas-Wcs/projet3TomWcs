import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import userRole from "../../utils/users";

export default function EditAbo() {
  const { state } = useLocation();

  const { setIsAdmin, setUserInfo } = useAuth();

  const api = useAPI();

  const [editableContent, setEditableContent] = useState(state);
  const [mdp, setMdp] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [doneMessage, setDoneMessage] = useState(false);
  const [editPremium, setEditPremium] = useState(false);
  const [aboMessage, setAboMessage] = useState(false);
  const [errorAbo, setErrorAbo] = useState(false);
  // const [aboActif, setAboActif] = useState(false);

  if (editPremium === true) {
    (async () => {
      try {
        const response = await api.get(`users/${state.userInfo.id}`);
        const { data } = response;

        await api.put(`users/${state.userInfo.id}`, {
          name: data.name,
          email: data.email,
          firstname: data.firstname,
          role: data.role,
          isPremium: data.isPremium,
          isVideoPlus: 1,
        });
        setEditPremium(false);
        setAboMessage(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
        setErrorAbo(true);
      }
    })();
    setTimeout(() => {
      setErrorAbo(false);
    }, 3000);
  }

  const relogUser = () => {
    const user = {
      mdp,
      email: state.userInfo.email,
    };

    api
      .post("users/login/", user)
      .then((res) => {
        const { token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserInfo(res.data.user);
        setDoneMessage(true);
        if (res.data.user.role === userRole.ADMIN) setIsAdmin(true);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
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
          <h3>Gestion de l'Abonnement</h3>
          <h4>FistName</h4>
          <div />
          <p>
            <input
              type="text"
              style={{ backgroundColor: "white", color: "black" }}
              value={
                editableContent.userInfo.firstname
                  ? editableContent.userInfo.firstname
                  : ""
              }
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
        </div>
        <div className="user-adresse-information">
          <h3>Coordnonnées Bancaires</h3>
          <h4>IBAN</h4>
          <p>FR145 1254 5877 XXXX XXXX</p>
          <h4>BIC</h4>
          <p>FR45875</p>
          <h4>Etablissement </h4>
          <p>Crédit Agricole</p>
        </div>
        <div className="user-adresse-information">
          <h3>Abonnement</h3>
          <h4>Premium</h4>
          <p>Premium Plus</p>
          <h4>Renouvellement</h4>
          <p>12/12/2023</p>
          <h4>Facturation </h4>
          <p>Prelevement</p>
        </div>
        <div className="user-abo-message">
          {aboMessage && (
            <p>
              Félicitations vous pouvez maintenant profiter de votre Abonnement
              ! Veuillez vous reconnecter s'il vous plait.
            </p>
          )}
          {errorAbo && <p>Une erreur a eu lieu, contactez votre banque </p>}
        </div>

        {state.userInfo.isVideoPlus === 1 ? (
          <div>
            <button
              className="valide-mdp-button"
              type="button"
              style={{
                backgroundColor: "red",
                color: "black",
                borderRadius: "30px",
              }}
              onClick={() => setEditPremium(true)}
            >
              Annuler Abonnement
            </button>
          </div>
        ) : (
          <div>
            <button
              className="valide-mdp-button"
              type="button"
              onClick={() => setEditPremium(true)}
            >
              Ajouter
            </button>
          </div>
        )}
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
          {}
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

EditAbo.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    firstname: PropTypes.string,
    email: PropTypes.string,
  }),
};
EditAbo.defaultProps = {
  userInfo: {
    name: "",
    firstname: "",
    email: "",
  },
};
