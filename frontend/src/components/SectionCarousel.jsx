import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "../styles/Section.css";
import ReactPlayer from "react-player";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import sectionData from "./SectionData";

function SectionCarousel() {
  const video = {
    height: "100%",
    width: "100%",
    paddingBottom: "56.25%",
  };

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={4}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {sectionData.map((item) => (
          <SwiperSlide>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={item.lien}
                style={video}
                width="100%"
                height="100%"
                playing
                playIcon
                light
              />
            </div>
            <div className="movie-text-container">
              <h4 className="movie-title">{item.titre}</h4>
              <p className="movie-description">{item.description_text}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
      </Swiper>
    </div>
  );
}

export default SectionCarousel;
