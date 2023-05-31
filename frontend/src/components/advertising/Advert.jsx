import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function Advert() {
  const [advert, setAdvert] = useState([]);
  const api = useAPI();
  const [currentAdvertIndex, setCurrentAdvertIndex] = useState(0);

  useEffect(() => {
    api
      .get("/adverts")
      .then((res) => {
        setAdvert(res.data);
        setCurrentAdvertIndex(Math.floor(Math.random() * res.data.length));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const currentAdvert = advert[currentAdvertIndex];

  return (
    <div className="advert_image">
      {currentAdvert && (
        <a href="https://www.wildcodeschool.com/fr-FR">
          <img
            src={`${import.meta.env.VITE_APP_API_URL}/${
              currentAdvert.picture_link
            }`}
            alt={currentAdvert.pictures}
            className="advert_position"
          />
        </a>
      )}
    </div>
  );
}

export default Advert;
