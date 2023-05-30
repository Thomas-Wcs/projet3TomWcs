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

function SectionCategory({ sectionName }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [data, setData] = useState([]);

  const api = useAPI();

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

  // Pour éliminer les noms de catégories qui sont dupliqués
  const uniqueCategories = data.filter((item, index) => {
    return (
      data.findIndex((object) => {
        return object.name === item.name;
      }) === index
    );
  });

  function handleCategory(category) {
    setVideoNumber(0);
    setSelectedCategory(category);
    const translateX = 0; // Remet le translateX à zero pour revenir au début du container
    listRef.current.style.transform = `translateX(${translateX}px)`;
  }

  function handleClick(direction) {
    let videoWidth = 670; // Largeur d'une video
    if (videoNumber > 0) {
      const distanceBack = -(videoWidth * videoNumber);
      listRef.current.style.transform = `translateX(${distanceBack}px)`;
    }
    const filteredData = selectedCategory
      ? data.filter((item) => item.name === selectedCategory)
      : data;

    const nbVideos = filteredData.length;
    const widthContainer = listRef.current.clientWidth; // indique la longueur totale du container qui contient toutes les videos
    const windowWidth = window.innerWidth; // largeur de l'écran
    const nbVideosDisplayedPerClick = Math.round(windowWidth / 650); // Le nbre de videos affichées à l'écran par clic

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

  return (
    <div className="list">
      <div className="wrapper-sectionName-buttons">
        <h1 className="section-name">{sectionName}</h1>
        <div className="button-wrapper">
          <button type="submit" className="follow-btn">
            À SUIVRE
          </button>
          <button
            type="submit"
            className="next-btn"
            onClick={() => handleClick("right")}
          >
            VOIR PLUS{" "}
          </button>
        </div>
      </div>

      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="category-container">
          {uniqueCategories.map((item) => (
            <button
              key={item.id}
              className="category-btn"
              type="submit"
              onClick={() => handleCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="container container-section" ref={listRef}>
          {!selectedCategory
            ? data.map((item) => (
                <Link to={`/video_description/${item.id}`}>
                  <Video
                    key={item.id}
                    src={`${import.meta.env.VITE_APP_API_URL}${item.link}`}
                    width="650px"
                    height="450px"
                    displayDescription
                    displayDescriptionTitle={item.title}
                    displayDescriptionText={item.description_text}
                    isEnabled
                    isVideoPremium={item.isVideoPremium}
                  />
                </Link>
              ))
            : data
                .filter((item) => item.name === selectedCategory)
                .map((item) => (
                  <Video
                    key={item.id}
                    src={`${import.meta.env.VITE_APP_API_URL}${item.link}`}
                    width="650px"
                    height="450px"
                    displayDescription
                    displayDescriptionTitle={item.title}
                    displayDescriptionText={item.description_text}
                    isVideoPremium={item.isVideoPremium}
                    isVideoPaying={item.isVideoPaying}
                    isEnabled
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
SectionCategory.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
export default SectionCategory;
