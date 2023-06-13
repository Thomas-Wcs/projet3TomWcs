import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import Video from "./Video";

function Section1({ sectionInfo }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const api = useAPI();
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;

  const newFilteredData = data.filter(
    (newVideo) => newVideo.SectionID === sectionInfo.id
  );

  const nbVideos = newFilteredData.length;

  const getVideoData = async () => {
    try {
      if (userInfo.id) {
        const res = await api.get(
          `videos/allVideoAndFavorite/${userInfo.id}/${sectionInfo.id}`
        );
        setData(res.data);
      } else {
        const res = await api.get(`videos`);
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoData();
  }, [refresh]);

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
          <button type="submit" className="next-btn" onClick={() => seeMore}>
            VOIR PLUS
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
          <div className="container container-section" ref={listRef}>
            {newFilteredData.map((video) => {
              const favoriteVideo = data.find(
                (favVideo) =>
                  favVideo.user_id !== null && favVideo.title === video.title
              );
              return (
                <div key={video.id}>
                  <Link to={`/video_description/${video.id}`}>
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
                  {userInfo.email ? (
                    <div className="favorite-text-and-button">
                      {favoriteVideo ? (
                        <button
                          className="favorite-profil-button"
                          type="button"
                          onClick={() =>
                            giveVideoDeleteId(userInfo.id, video.id)
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
                          onClick={() => giveVideoId(userInfo.id, video.id)}
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
        <div>
          {newFilteredData.map((video) => (
            <Link to={`/video_description/${video.id}`}>
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

Section1.propTypes = {
  sectionInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    section_type: PropTypes.string,
  }).isRequired,
};
export default Section1;
