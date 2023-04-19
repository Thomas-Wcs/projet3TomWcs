import React, { useRef, useState } from "react";
import "../styles/Featured.scss";
import "../styles/Section.scss";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Video from "./Video";

function Section() {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect().x;
    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      listRef.current.style.transform = `translateX(${650 + distance}px)`;
    }
    if (direction === "right" && videoNumber < 5) {
      setVideoNumber(videoNumber + 1);
      listRef.current.style.transform = `translateX(${-650 + distance}px)`;
    }
  }

  return (
    <div className="list">
      <h1 className="section-name">teasers</h1>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          disabled={position === 0}
        />
        <div className="container container-section" ref={listRef}>
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
          <Video width="650px" height="450px" isEnabled />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Section;
