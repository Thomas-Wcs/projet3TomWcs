import "../../styles/Profile.css";

import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Profile() {
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:5000/videos")
      .then((result) => setData(result.data));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div id="profile">
      <h2 className="section-title">MES FAVORIS</h2>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots
        responsive={responsive}
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
        {data.map((item) => (
          <ReactPlayer
            url={item.lien}
            width="100%"
            controls
            className="video-div"
          />
        ))}
      </Carousel>
      <h2 className="section-title">A LA UNE</h2>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots
        responsive={responsive}
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
        {data.map((item) => (
          <ReactPlayer
            key={item.id}
            url={item.lien}
            width="100%"
            controls
            className="video-div"
          />
        ))}
      </Carousel>
    </div>
  );
}
