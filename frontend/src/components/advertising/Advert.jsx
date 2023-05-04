import React, { useState, useEffect } from "react";
import "../../styles/Advert.css";
import useAPI from "../../api/useAPI";

const Advert = () => {
  const [adverts, setAdverts] = useState([]);
  const api = useAPI();
  const [currentAdvertIndex, setCurrentAdvertIndex] = useState(0);

  useEffect(() => {
    api
      .get("http://localhost:5000/adverts")
      .then((res) => {
        setAdverts(res.data);
        console.log(res.data);
        setCurrentAdvertIndex(Math.floor(Math.random() * res.data.length));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const currentAdvert = adverts[currentAdvertIndex];
  console.log(currentAdvert);

  return (
    <div className="advert_image">
      {currentAdvert && (
        <a href={currentAdvert.picture_link}>
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
};

export default Advert;
