import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import Video from "./Video";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";

function SectionCategory({ sectionInfo }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMore, setShowMore] = useState(true);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;

  const api = useAPI();

  const getVideoData = async () => {
    try {
      if (userInfo.id) {
        const res = await api.get(`videos/allVideoAndFavorite/${userInfo.id}`);
        setData(res.data);
      } else {
        const res = await api.get(`videos/`);
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const newFilteredData = data.filter(
    (newVideo) => newVideo.SectionID === sectionInfo.id
  );

  useEffect(() => {
    getVideoData();
  }, [refresh]);

  const uniqueCategories = newFilteredData.filter((item, index) => {
    return (
      newFilteredData.findIndex((object) => {
        return object.categorie_name === item.categorie_name;
      }) === index
    );
  });
  function handleCategory(category) {
    setVideoNumber(0);
    setSelectedCategory(category);
    const translateX = 0;
    listRef.current.style.transform = `translateX(${translateX}px)`;
  }

  const deleteFavoriteVideo = (newValue) => {
    api
      .delete(
        `videosUser/${newValue.videoId}?user=${newValue.userId}`,
        newValue
      )
      .then(() => {
        getVideoData();
      });
  };

  const giveVideoDeleteId = (userId, videoId) => {
    const newValue = { userId, videoId };
    deleteFavoriteVideo(newValue);
  };

  const insertFavoriteVideo = async (newValue) => {
    try {
      await api.post(`videosUser/`, newValue).then(() => {
        setRefresh(!refresh);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const giveVideoId = (userId, videoId) => {
    const newValue = { userId, videoId };
    insertFavoriteVideo(newValue);
  };

  function handleClick(direction) {
    let videoWidth = 670; // Largeur d'une video
    if (videoNumber > 0) {
      const distanceBack = -(videoWidth * videoNumber);
      listRef.current.style.transform = `translateX(${distanceBack}px)`;
    }
    const filteredData = selectedCategory
      ? data.filter((item) => item.categorie_name === selectedCategory)
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
          <button type="submit" className="next-btn" onClick={() => seeMore()}>
            {showMore ? "VOIR PLUS" : "VOIR MOINS"}
          </button>
        </div>
      </div>
      {showMore ? (
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            disabled={position === 0}
          />
          <div className="category-container">
            {uniqueCategories.map((item, index) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="category-btn"
                type="submit"
                onClick={() => handleCategory(item.categorie_name)}
              >
                {item.categorie_name}
              </button>
            ))}
          </div>
          <div className="container container-section" ref={listRef}>
            {!selectedCategory
              ? newFilteredData.map((item, index) => {
                  const favoriteVideo = data.find(
                    (favVideo) =>
                      favVideo.user_id !== null && favVideo.title === item.title
                  );
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <Link to={`/video_description/${item.id}`}>
                        <Video
                          src={`${import.meta.env.VITE_APP_API_URL}${
                            item.link
                          }`}
                          width="650px"
                          height="450px"
                          displayDescription
                          displayDescriptionTitle={item.title}
                          displayDescriptionText={item.description_text}
                          isVideoPremium={item.isVideoPremium}
                          isVideoPaying={item.isVideoPaying}
                          isEnabled
                        />
                      </Link>
                      {userInfo.email ? (
                        <div className="favorite-text-and-button">
                          {favoriteVideo ? (
                            <button
                              className="favorite-profil-button"
                              type="button"
                              onClick={() =>
                                giveVideoDeleteId(userInfo.id, item.id)
                              }
                            >
                              <FavoriteIcon
                                style={{ fontSize: "30px", color: "red" }}
                              />
                            </button>
                          ) : (
                            <button
                              className="favorite-profil-button"
                              type="button"
                              onClick={() => giveVideoId(userInfo.id, item.id)}
                            >
                              <FavoriteIcon
                                style={{ fontSize: "30px", color: "white" }}
                              />
                            </button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              : newFilteredData
                  .filter((item) => item.categorie_name === selectedCategory)
                  .map((item, index) => {
                    const favoriteVideo = data.find(
                      (favVideo) =>
                        favVideo.user_id !== null &&
                        favVideo.title === item.title
                    );
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index}>
                        <Video
                          src={`${import.meta.env.VITE_APP_API_URL}${
                            item.link
                          }`}
                          width="650px"
                          height="450px"
                          displayDescription
                          displayDescriptionTitle={item.title}
                          displayDescriptionText={item.description_text}
                          isVideoPremium={item.isVideoPremium}
                          isVideoPaying={item.isVideoPaying}
                          isEnabled
                        />
                        {userInfo.email ? (
                          // eslint-disable-next-line react/no-array-index-key
                          <div className="favorite-text-and-button" key={index}>
                            {favoriteVideo ? (
                              <button
                                className="favorite-profil-button"
                                type="button"
                                onClick={() =>
                                  giveVideoDeleteId(userInfo.id, item.id)
                                }
                              >
                                <FavoriteIcon
                                  style={{ fontSize: "30px", color: "red" }}
                                />
                              </button>
                            ) : (
                              <button
                                className="favorite-profil-button"
                                type="button"
                                onClick={() =>
                                  giveVideoId(userInfo.id, item.id)
                                }
                              >
                                <FavoriteIcon
                                  style={{ fontSize: "30px", color: "white" }}
                                />
                              </button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      ) : (
        <div id="display-all">
          {newFilteredData.map((video, index) => (
            // eslint-disable-next-line react/no-array-index-key
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
    </div>
  );
}
SectionCategory.propTypes = {
  sectionInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    section_type: PropTypes.string,
  }).isRequired,
};
export default SectionCategory;
