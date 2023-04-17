import { useState } from "react";
import axios from "axios";
import "../../styles/index.css";
import ConnectionPage from "./ConnectionPage";

export default function Registration() {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: userName,
      email: mail,
      mdp: password,
    };

    axios
      .post("http://localhost:5000/users/", newUser)
      .then((result) => {
        setSuccess(!success);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return success ? (
    <div id="connection">
      <h2>Créez votre compte :</h2>
      <img
        src="https://cdn.pixabay.com/photo/2021/07/28/00/57/pyramids-6498038_960_720.jpg"
        alt=""
        className="connection-bg"
      />
      <input
        type="text"
        className="user-input"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Nom :"
      />

      <input
        type="text"
        className="user-input"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        placeholder="Adresse mail :"
      />
      <input
        type="password"
        className="user-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe :"
      />

      <input type="submit" onClick={handleSubmit} className="user-button" />
    </div>
  ) : (
    <ConnectionPage />
  );
}
