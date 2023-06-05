import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Video from "./Video";
import useAPI from "../../api/useAPI";

function Featured() {
  const listRef = useRef();
  const [position, setPosition] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [data, setData] = useState([]);
  const api = useAPI();
  const videoDisplayed = data.length;

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
          {data.map((video) => (
            <Link to={`/video_description/${video.id}`} key={video.id}>
              <Video
                key={video.id}
                title={video.titre}
                width="100vw"
                height="100vh"
                src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
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

export default Featured;
