import React, { useState, useEffect } from "react";
import hill from "../../../src/assets/ads/hill.jpg";
import mount from "../../../src/assets/ads/mount.jpg";

const Advert = () => {
  const [adverts, setAdverts] = useState([
    {
      img: hill,
      description: "Hills Panorama",
      link: "http://www.example.com/ad1",
    },
    {
      img: mount,
      description: "Mountain Panorama",
      link: "http://www.example.com/ad2",
    },
  ]);

  const [currentAdvertIndex, setCurrentAdvertIndex] = useState(0);

  useEffect(() => {
    setCurrentAdvertIndex(Math.floor(Math.random() * adverts.length));
  }, [adverts]);

  const currentAdvert = adverts[currentAdvertIndex];

  return (
    <div className="advert">
      <a href={currentAdvert.link}>
        <img src={currentAdvert.img} alt={currentAdvert.description} />
      </a>
    </div>
  );
};

export default Advert;
