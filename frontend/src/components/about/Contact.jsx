import React, { useState } from "react";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import useAPI from "../../api/useAPI";
// import moon from "../../assets/contact2.jpg";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const api = useAPI();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };
    api
      .post("nodeMailer", formData)
      .then((response) => {
        if (response.status === 200) {
          // eslint-disable-next-line no-restricted-syntax
          console.log("toto");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-form-contact-about">
      {/* <div>
        <Parallax pages={4}>
          <ParallaxLayer
            offset={1}
            speed={2}
            style={{ backgroundImage: `url(${moon}) ` }}
          >
            <p>
              WELCOME
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Nom:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Contenu du message:</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={handleMessageChange}
                    required
                  />
                </div>
                <button type="submit">Envoyer</button>
              </form>
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={2} speed={0.5} factor={1.5}>
            <p>
              <div>
                <p>
                  Cher utilisateur, votre satisfaction est notre priorité
                  absolue, c'est pourquoi nous mettons un point d'honneur à vous
                  offrir un service client exceptionnel. <br />
                  Nous sommes à votre disposition pour vous offrir une
                  expérience fluide et agréable, et nous nous engageons à vous
                  fournir des réponses rapides, précises et personnalisées.{" "}
                  <br />
                  Votre feedback est également très important pour nous. Nous
                  apprécions vos commentaires, suggestions et préoccupations,
                  car ils nous aident à améliorer continuellement notre service.
                  Nous vous promettons une réponse dans les plus brefs délais.
                  <br />
                  <br /> Merci encore d'avoir choisi notre service. Nous sommes
                  impatients de vous assister et de vous offrir une expérience
                  client exceptionnelle. <br />
                  <br /> Cordialement, L'équipe du service client
                </p>
              </div>
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={3}>COUCOU</ParallaxLayer>
        </Parallax>
      </div> */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Contenu du message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
      <div>
        <p>
          Cher utilisateur, votre satisfaction est notre priorité absolue, c'est
          pourquoi nous mettons un point d'honneur à vous offrir un service
          client exceptionnel. <br />
          Nous sommes à votre disposition pour vous offrir une expérience fluide
          et agréable, et nous nous engageons à vous fournir des réponses
          rapides, précises et personnalisées. <br />
          <br />
          Votre feedback est également très important pour nous. Nous apprécions
          vos commentaires, suggestions et préoccupations, car ils nous aident à
          améliorer continuellement notre service. Nous vous promettons une
          réponse dans les plus brefs délais.
          <br />
          <br /> Merci encore d'avoir choisi notre service. Nous sommes
          impatients de vous assister et de vous offrir une expérience client
          exceptionnelle. <br />
          <br /> Cordialement, L'équipe du service client
        </p>
      </div>
    </div>
  );
}

export default Contact;
