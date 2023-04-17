import "../../styles/index.css";
import { useState } from "react";
import Registration from "./Registration";

export default function ConnectionPage() {
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [registrationMail, setRegistrationMail] = useState("");
  const [account, setAccount] = useState(true);

  return account ? (
    <div id="connection">
      <img
        src="https://cdn.pixabay.com/photo/2021/07/28/00/57/pyramids-6498038_960_720.jpg"
        alt=""
        className="connection-bg"
      />
      <h2>SE CONNECTER</h2>
      <input
        id="username"
        type="text"
        name="username"
        className="user-input"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="password"
        name="motdepasse"
        className="user-input"
        placeholder="Mot de Passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
      />
      <button type="button" className="user-button">
        Connexion
      </button>
      <h2>S'INSCRIRE</h2>
      <input
        type="text"
        name="Email"
        className="user-input"
        placeholder="Email"
        value={registrationMail}
        onChange={(e) => setRegistrationMail(e.target.value)}
      />
      <button
        type="button"
        className="user-button"
        onClick={() => {
          setAccount(false);
        }}
      >
        Inscription
      </button>
    </div>
  ) : (
    <Registration
      registrationMail={registrationMail}
      setRegistrationMail={setRegistrationMail}
      mail={mail}
      setMail={setMail}
      mdp={mdp}
      setMdp={setMdp}
    />
  );
}
