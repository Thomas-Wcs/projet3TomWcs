import React, { useRef, useState } from "react";
import "../../styles/Featured.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Video from "./Video";

function Featured() {
  const listRef = useRef();
  const [position, setPosition] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect();
    const containerWidth = distance.width;

    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      setPosition(position + containerWidth);

      listRef.current.style.transform = `translateX(${
        position + containerWidth
      }px)`;
    }

    if (direction === "right" && videoNumber < 3) {
      setVideoNumber(videoNumber + 1);
      setPosition(position - containerWidth);
      listRef.current.style.transform = `translateX(${
        position - containerWidth
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
          <Video
            title="titre1"
            width="100vw"
            height="100vh"
            displayPlayButton
          />
          <Video
            title="titre2"
            width="100vw"
            height="100vh"
            displayPlayButton
          />
          <Video
            title="titre3"
            width="100vw"
            height="100vh"
            displayPlayButton
          />
          <Video
            title="titre4"
            width="100vw"
            height="100vh"
            displayPlayButton
          />
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
