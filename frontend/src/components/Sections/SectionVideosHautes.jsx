/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Video from "./Video";
import useAPI from "../../api/useAPI";

function SectionVideosHautes({ sectionInfo }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(true);

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
    const totalRestVideosTotalWidth = videoWidth * restVideo;

    if (
      direction === "right" &&
      restVideo > 0 &&
      restVideo <= nbVideos &&
      nbVideos >= nbVideosDisplayedPerClick &&
      totalRestVideosTotalWidth > windowWidth
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

  function seeMore() {
    setShowMore(!showMore);
  }

  return (
    <div className="list">
      <div className="wrapper-sectionName-buttons">
        <h1 className="section-name">{sectionInfo.name}</h1>
        <div className="button-wrapper">
          <button type="submit" className="follow-btn">
            À SUIVRE
          </button>
          {showMore ? (
            <button
              type="submit"
              className="next-btn"
              onClick={() => seeMore()}
            >
              VOIR PLUS{" "}
            </button>
          ) : (
            <button
              type="submit"
              className="next-btn"
              onClick={() => seeMore()}
            >
              VOIR MOINS{" "}
            </button>
          )}
        </div>
      </div>
      {showMore ? (
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            disabled={position === 0}
          />
          <div className="container container-section" ref={listRef}>
            {data.map((video, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Link to={`/video_description/${video.id}`} key={index}>
                <Video
                  width="650px"
                  height="750px"
                  displayDescription
                  displayDescriptionTitle={video.title}
                  displayDescriptionText={video.description_text}
                  src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
                  isVideoPremium={video.isVideoPremium}
                  isVideoPaying={video.isVideoPaying}
                  isEnabled
                />
              </Link>
            ))}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      ) : (
        <div id="display-all">
          {data.map((video, index) => (
            <Link to={`/video_description/${video.id}`} key={index}>
              <Video
                width="650px"
                height="450px"
                displayDescription
                displayDescriptionTitle={video.title}
                displayDescriptionText={video.description_text}
                src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
                isVideoPremium={video.isVideoPremium}
                isVideoPaying={video.isVideoPaying}
                isEnabled
              />
            </Link>
          ))}
        </div>
      )}
      )
    </div>
  );
}

SectionVideosHautes.propTypes = {
  sectionInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    section_type: PropTypes.string,
  }).isRequired,
};

export default SectionVideosHautes;
