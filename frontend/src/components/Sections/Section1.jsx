import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Video from "./Video";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";

function Section1({ sectionName }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);
  const [dataUserFavorite, setDataUserFavorite] = useState([]);
  const api = useAPI();
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;

  const getVideoDataUserFavorite = async () => {
    try {
      await api
        .get(`videosUser/${userInfo.id}`)
        .then((res) => setDataUserFavorite(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getVideoDataUserFavorite();
  }, []);

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

  const insertFavoriteVideo = async (newValue) => {
    try {
      await api.post(`videosUser/`, newValue);
    } catch (error) {
      console.error(error);
    }
  };

  const giveVideoId = (userId, videoId) => {
    const newValue = { userId, videoId };
    insertFavoriteVideo(newValue);
    // setTimeout(() => {
    //   getVideoData();
    // }, 2000);
  };

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect().x;
    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      listRef.current.style.transform = `translateX(${650 + distance}px)`;
    }
    if (direction === "right" && videoNumber < 25) {
      setVideoNumber(videoNumber + 1);
      listRef.current.style.transform = `translateX(${-650 + distance}px)`;
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
            VOIR PLUS
          </button>
        </div>
      </div>

      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="container container-section" ref={listRef}>
          {data.map((video) => {
            const favoriteVideo = dataUserFavorite.find(
              (favVideo) => favVideo.title === video.title
            );
            return (
              <div key={video.id}>
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
                {userInfo.email ? (
                  <div className="favorite-text-and-button">
                    <div style={{ color: "white" }}>
                      {dataUserFavorite.title}
                    </div>
                    {favoriteVideo ? (
                      <button
                        className="favorite-profil-button"
                        type="button"
                        // onClick={() => giveVideoId(userInfo.id, video.id)}
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
    </div>
  );
}

Section1.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
export default Section1;
