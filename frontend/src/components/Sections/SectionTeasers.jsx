import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import useAPI from "../../api/useAPI";
import Video from "./Video";

function SectionTeasers({ sectionName }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);
  const api = useAPI();
  const nbVideos = data.length;

  const getVideoData = async () => {
    await api
      .get("videos")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVideoData();
  }, []);

  function handleClick(direction) {
    const widthContainer = listRef.current.clientWidth; // indique la longueur totale du container qui contient toutes les videos
    const windowWidth = window.innerWidth; // largeur de l'écran
    const nbVideosDisplayedPerClick = Math.round(windowWidth / 650); // Le nbre de videos affichées à l'écran par clic

    let videoWidth = 670; // Largeur d'une video
    const totalWidthVideos = videoWidth * nbVideos;
    const totalEmptySpace = widthContainer - totalWidthVideos; // indique le nombre total d'espace vide sur le container
    const whatToAddToVideoWidth = Math.ceil(totalEmptySpace / nbVideos);
    videoWidth += whatToAddToVideoWidth;

    const restVideo = nbVideos - videoNumber; // Nombre de videos restantes avant d'arriver à la fin de la liste

    if (
      direction === "right" &&
      restVideo > 0 &&
      restVideo <= nbVideos &&
      nbVideos >= nbVideosDisplayedPerClick
    ) {
      const newVideoNumber = videoNumber + 1;
      const translateX = -(newVideoNumber * videoWidth);
      setVideoNumber(newVideoNumber);

      listRef.current.style.transform = `translateX(${translateX}px)`;
    }

    if (direction === "left" && videoNumber > 0) {
      const newVideoNumber = videoNumber - 1;
      const translateX = -(newVideoNumber * videoWidth);
      setVideoNumber(newVideoNumber);
      listRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }

  return (
    <div className="list">
      <h1 className="section-name">{sectionName}</h1>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="container container-section" ref={listRef}>
          {data.map((video) => (
            <Video
              key={video.id}
              width="650px"
              height="450px"
              isEnabled
              src={`${import.meta.env.VITE_APP_API_URL}/${video.link}`}
            />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

SectionTeasers.propTypes = {
  sectionName: PropTypes.string.isRequired,
};

export default SectionTeasers;
