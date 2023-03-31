import "../styles/Profile.css";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Profile() {
  return (
    <div id="profile">
      <h2 className="section-title">MES FAVORIS</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination
        navigation
        keyboard
        slidesPerView={1}
        speed={800}
        loop
        className="my-swiper"
        breakpoints={{
          925: {
            slidesPerView: 2,
          },
          1350: {
            slidesPerView: 3,
          },
          1780: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />
        </SwiperSlide>
      </Swiper>
      <h2 className="section-title">A LA UNE</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination
        navigation
        keyboard
        slidesPerView={1}
        speed={800}
        loop
        className="my-swiper"
        breakpoints={{
          925: {
            slidesPerView: 2,
          },
          1350: {
            slidesPerView: 3,
          },
          1780: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <div className="test" />{" "}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
