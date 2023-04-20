import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Featured.scss";
import "../../styles/Section.scss";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Video from "./Video";
import data from "./Data";

function SectionCategory({ sectionName }) {
  const listRef = useRef();
  const [position] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryClicked, setCategoryCliked] = useState(false);

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
    if (direction === "right" && videoNumber < 5) {
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
                    src={item.lien}
                    width="650px"
                    height="450px"
                    displayDescription
                    displayDescriptionTitle={item.titre}
                    displayDescriptionText={item.description_text}
                    isEnabled
                  />
                ))
            : data.map((item) => (
                <Video
                  key={item.id}
                  src={item.lien}
                  width="650px"
                  height="450px"
                  displayDescription
                  displayDescriptionTitle={item.titre}
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
