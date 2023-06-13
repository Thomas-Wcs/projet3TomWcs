import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import Video from "./Video";
import useAPI from "../../api/useAPI";

function Featured({ sectionInfo }) {
  const api = useAPI();
  const listRef = useRef();
  const [position, setPosition] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);

  const newFilteredData = data.filter(
    (newVideo) => newVideo.SectionID === sectionInfo.id
  );

  const videoDisplayed = newFilteredData.length;

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
    const distance = listRef.current.getBoundingClientRect();
    const containerWidth = distance.width;
    const videoWidth = containerWidth / videoDisplayed; // Nombre de videos visibles en une fois à l'écran

    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      setPosition(position + videoWidth);
      listRef.current.style.transform = `translateX(${
        position + videoWidth
      }px)`;
    }

    if (direction === "right" && videoNumber < videoDisplayed - 1) {
      setVideoNumber(videoNumber + 1);
      setPosition(position - videoWidth);
      listRef.current.style.transform = `translateX(${
        position - videoWidth
      }px)`;
    }
  }

  return (
    <div className="list">
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="container" ref={listRef}>
          {newFilteredData.map((video, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Link to={`/video_description/${video.id}`} key={index}>
              <Video
                title={video.titre}
                width="100vw"
                height="100vh"
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
    </div>
  );
}

Featured.propTypes = {
  sectionInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    section_type: PropTypes.string,
  }).isRequired,
};

export default Featured;
