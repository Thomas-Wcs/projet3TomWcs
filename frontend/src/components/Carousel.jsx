import React from "react";
import "./Carousel.css";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";

import thumbnail from "../assets/images/background-slider.png";
// eslint-disable-next-line import/extensions
import data from "./Data.js";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

function Carousel() {
  const video = {
    height: "100%",
    width: "100%",
    paddingBottom: "56.25%",
  };

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
        }}

        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {data.map((item) => (
          <SwiperSlide>
            <div className="player-wrapper">
              <h2 className="slide-captions">{item.titre}</h2>
              <ReactPlayer
                className="react-player"
                url={item.lien}
                style={video}
                width="100%"
                height="100%"
                playing
                playIcon={<button type="submit">VISIONNER</button>}
                light={<img src={thumbnail} alt="Thumbnail" />}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
      </Swiper>
      <section />
    </div>
  );
}

export default Carousel;
