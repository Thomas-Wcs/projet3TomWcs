import React, { useState, useEffect } from "react";

export default function PopUp() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("modal-open"); // Ajout de la classe CSS
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open"); // Suppression de la classe CSS
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open"); // Suppression de la classe CSS lors du démontage
    };
  }, [modal]);

  return (
    <div>
      <button className="valide-mdp-button" type="button" onClick={toggleModal}>
        Annuler
      </button>
      <div>
        {modal && (
          <div className="overlay-abo-div" role="dialog" aria-modal="true">
            {modal && (
              <div className="pop-up-abo">
                <p>
                  COUCOU JE SUIS UN TEXTE Nous sommes vraiment désolé. Est tu
                  sur de vouloir supprimer ?
                </p>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={toggleModal}
                >
                  Annuler
                </button>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={toggleModal}
                >
                  Confirmer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
