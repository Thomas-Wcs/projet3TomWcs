import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./aboutPage.css";
import filmbanderole from "../../assets/filmband.png";
import useAPI from "../../api/useAPI";

function AboutPage() {
  const [data, setData] = useState([]);
  const api = useAPI();
  const hiddenElementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    hiddenElementsRef.current.forEach((el) => observer.observe(el));
  }, [data]);

  useEffect(() => {
    api.get("users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="about-main-section">
      <img className="film-banderole-about" src={filmbanderole} alt="" />
      <div className="texte-about-propos">
        <h1>A propos</h1>
        <p className="about-para-profil-section">
          Le meilleur des films rien que pour vous
        </p>
        <p className="about-para-profil-section">
          Ce site est un projet étudiant réalisé dans le cadre de la formation
          Web Developpeur full-stack de la Wild Code School de Lyon.
          <br />
          <br /> Le projet professionnel de développement web réalisé par des
          étudiants consistait à créer une plateforme OTT (Over-The-Top) de
          streaming vidéo. Ce projet ambitieux visait à offrir aux utilisateurs
          une expérience de divertissement en ligne exceptionnelle, en mettant à
          leur disposition une vaste bibliothèque de contenus vidéo de haute
          qualité. <br /> L'équipe d'étudiants a mis en place une architecture
          solide pour le site de streaming, en utilisant les dernières
          technologies web et en se conformant aux meilleures pratiques de
          développement. <br /> Ils ont conçu une interface utilisateur
          conviviale et attrayante, permettant aux utilisateurs de naviguer
          facilement à travers les différentes sections de la plateforme. L'une
          des principales fonctionnalités du site était la possibilité pour les
          utilisateurs de créer des profils personnalisés. Ces profils leur
          permettaient de sauvegarder leurs vidéos préférées. <br />
          <br />
          Ce projet a été une expérience enrichissante pour les étudiants, leur
          permettant de mettre en pratique leurs connaissances et de se préparer
          à une carrière prometteuse dans le domaine du développement web et du
          divertissement numérique.
          <br />
          <br />
          Merci à Guillaume Cregut et à la WCS de Lyon pour cette formation très
          enrichissante !
          <br />
          <br />
          Voici une brève présentation de l'équipe
        </p>
      </div>
      {data.slice(0, 4).map((item, index) => (
        <section
          className="hidden"
          key={uuidv4()}
          // eslint-disable-next-line no-return-assign
          ref={(ref) => (hiddenElementsRef.current[index] = ref)}
        >
          <img
            className="profil-about-image"
            src={`${import.meta.env.VITE_APP_API_URL}${item.avatar}`}
            alt="developpeur"
          />
          <h2> {item.name} </h2>
          <p className="about-para-profil-section">{item.descriptionProfil}</p>
        </section>
      ))}
      <div>COUCOU</div>
    </div>
  );
}

export default AboutPage;
