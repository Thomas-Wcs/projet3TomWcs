import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./aboutPage.css";
import logoOrigins from "../../assets/images.png";

function AboutPage() {
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

    return () => {
      hiddenElementsRef.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const hiddenElements = [];
  // eslint-disable-next-line no-restricted-syntax
  console.log(hiddenElements);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 4; index++) {
    const ref = useRef(null);
    hiddenElements.push(ref);

    useEffect(() => {
      if (ref.current) {
        hiddenElementsRef.current.push(ref.current);
      }
    }, [ref]);
  }

  return (
    <div className="about-main-section">
      {hiddenElements.map((ref, index) => (
        <section className="hidden" key={uuidv4()} ref={ref}>
          <h2>Section {index + 2}</h2>
          <p>
            Bienvenue sur notre plateforme vidéo en ligne ! Nous nous engageons
            à vous fournir une large sélection de vidéos de haute qualité pour
            votre divertissement. Que vous recherchiez des films, des séries
            télévisées, des documentaires ou du contenu éducatif, nous avons ce
            qu'il vous faut.
          </p>
          <p>
            Notre option premium offre un accès exclusif à encore plus de
            contenus passionnants. Passez à la version premium et débloquez un
            monde de vidéos supplémentaires, de streaming sans publicité et de
            téléchargements hors ligne. Ne manquez pas cette expérience de
            visionnage améliorée !
          </p>
          <img src={logoOrigins} alt="" />
          <button type="button">Contactez-nous</button>
        </section>
      ))}
    </div>
  );
}

export default AboutPage;
