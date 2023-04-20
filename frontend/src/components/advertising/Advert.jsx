import React from "react";
import advert from "../../assets/advert.jpg";
import "../../styles/advert.css";

const Advert = () => {
  return (
    <div className="advert">
      <a href="http://www.google.com">
        <img src={advert} alt="Advertising banner" className="advert_logo" />
      </a>
    </div>
  );
};

export default Advert;
