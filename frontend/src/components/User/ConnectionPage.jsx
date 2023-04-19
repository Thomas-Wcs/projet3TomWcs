import "../../styles/index.css";
import { useState, useRef } from "react";
import axios from "axios";
import useAPI from "../../api/useAPI";
import Registration from "./Registration";

export default function ConnectionPage() {
  const API = useAPI();
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [registrationMail, setRegistrationMail] = useState("");
  const [account, setAccount] = useState(true);
  const [success, setSuccess] = useState(true);
  const [userConnected, setUserConnected] = useState("");

  const refPass = useRef();
  const refMail = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      mdp: refPass.current.value,
      email: refMail.current.value,
    };

    axios
      .post("http://localhost:5000/users/login/", user)
      .then((res) => {
        const { token } = res.data;
        setUserConnected(res.data.user);
        API.defaults.headers.authorization = `Bearer ${token}`;
        setSuccess(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return account ? (
    <div id="connection">
      <img
        src="https://cdn.pixabay.com/photo/2021/07/28/00/57/pyramids-6498038_960_720.jpg"
        alt=""
        className="connection-bg"
      />
      {success ? (
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
            ref={refMail}
          />
          <input
            type="password"
            name="motdepasse"
            className="user-input"
            placeholder="Mot de Passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            ref={refPass}
          />
          <button type="button" className="user-button" onClick={handleSubmit}>
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
        <h2>Bienvenu {userConnected.name}</h2>
      )}
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
