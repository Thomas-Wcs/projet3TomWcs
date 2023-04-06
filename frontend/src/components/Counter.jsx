import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Counter.css";

function Counter() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    laptop: {
      breakpoint: { max: 1024, min: 2999 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      showDots
      responsive={responsive}
      ssr // means to render carousel on server-side.
      infinite
      autoPlaySpeed={1000}
      keyBoardControl
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div className="container">Item 1</div>
      <div className="container">Item 2</div>
      <div className="container">Item 3</div>
      <div className="container">Item 4</div>
      <div className="container">Item 5</div>
      <div className="container">Item 6</div>
      <div className="container">Item 7</div>
      <div className="container">Item 8</div>
      <div className="container">Item 9</div>
    </Carousel>
  );
}

export default Counter;
