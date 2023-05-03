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
  const [categoryClicked, setCategoryCliked] = useState(false);
  const [data, setData] = useState([]);
  const api = useAPI();

  const getVideoData = async () => {
    await api.get("videos").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getVideoData();
  }, []);

  const uniqueCategories = data.filter((item, index) => {
    return (
      data.findIndex((object) => {
        return object.category === item.category;
      }) === index
    );
  });

  function handleCategory(category) {
    setCategoryCliked(!categoryClicked);
    setSelectedCategory(category);
  }

  function handleClick(direction) {
    const distance = listRef.current.getBoundingClientRect().x;
    if (direction === "left" && videoNumber > 0) {
      setVideoNumber(videoNumber - 1);
      listRef.current.style.transform = `translateX(${650 + distance}px)`;
    }
    if (direction === "right" && videoNumber < 15) {
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
              onClick={() => handleCategory(item.category)}
            >
              {item.category}
            </button>
          ))}
        </div>
        <div className="container container-section" ref={listRef}>
          {categoryClicked
            ? data
                .filter((item) => item.category === selectedCategory)
                .map((item) => (
                  <Video
                    key={item.id}
                    src={`${import.meta.env.VITE_APP_API_URL}/${item.link}`}
                    width="650px"
                    height="450px"
                    displayDescription
                    displayDescriptionTitle={item.title}
                    displayDescriptionText={item.description_text}
                    isEnabled
                  />
                ))
            : data.map((item) => (
                <Video
                  key={item.id}
                  src={`${import.meta.env.VITE_APP_API_URL}/${item.link}`}
                  width="650px"
                  height="450px"
                  displayDescription
                  displayDescriptionTitle={item.title}
                  displayDescriptionText={item.description_text}
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
