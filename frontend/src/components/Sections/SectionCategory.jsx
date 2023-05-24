import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
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
    setSelectedCategory(category);
  }

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
                    isEnabled
                    isVideoPremium={item.isVideoPremium}
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
