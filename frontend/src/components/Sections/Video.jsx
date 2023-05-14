import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
import { useAuth } from "../../context/AuthContext";
// import thumbnail from "../../assets/images/background-slider.png";
import PlayButton from "./PlayButton";
import videoLock from "../../assets/connect.png";
import HotPot from "../../assets/imgPremium.png";

function Video({
  title,
  width,
  height,
  displayPlayButton,
  displayDescription,
  displayDescriptionText,
  displayDescriptionTitle,
  isEnabled,
  src,
  isVideoPremium,
  isVideoPaying,
}) {
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;

  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const handleToggleVideo = () => {
    const video = videoRef.current;

    if (video.paused) {
      const videoPromise = video.play();
      if (videoPromise !== undefined) {
        videoPromise.catch((error) => {
          console.error(error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      video.pause();
      setIsPlaying(isPlaying);
    }
  };

  let posterImage = null;
  if ((!userInfo || userInfo.isPremium === 0) && isVideoPremium === 1) {
    posterImage = videoLock;
  } else if (userInfo.isVideoPlus === 0 && isVideoPaying === 1) {
    posterImage = HotPot;
  }

  return (
    <div className="wrapper-video">
      <video
        src={src}
        poster={posterImage}
        muted
        ref={videoRef}
        preload="metadata"
        style={{ width, height }}
        onMouseOver={
          (isEnabled &&
            (!userInfo || userInfo.isPremium === 0) &&
            isVideoPremium === 1) ||
          (userInfo.isVideoPlus === 0 && isVideoPaying === 1)
            ? null
            : handleToggleVideo
        }
        onFocus={
          (isEnabled &&
            (!userInfo || userInfo.isPremium === 0) &&
            isVideoPremium === 1) ||
          (userInfo.isVideoPlus === 0 && isVideoPaying === 1)
            ? null
            : handleToggleVideo
        }
      />
      <h3 className="video-title">{title}</h3>
      {displayPlayButton && (
        <PlayButton handleToggleVideo={handleToggleVideo} />
      )}
      {displayDescription && (
        <div className="description-video-wrapper">
          <h4>{displayDescriptionTitle}</h4>
          <p>{displayDescriptionText}</p>
        </div>
      )}
    </div>
  );
}
Video.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  displayPlayButton: PropTypes.bool,
  displayDescription: PropTypes.bool,
  displayDescriptionText: PropTypes.string,
  displayDescriptionTitle: PropTypes.string,
  isEnabled: PropTypes.bool,
  isVideoPremium: PropTypes.number,
  isVideoPaying: PropTypes.number,
};

Video.defaultProps = {
  title: "",
  displayPlayButton: false,
  displayDescription: false,
  displayDescriptionText: "",
  displayDescriptionTitle: "",
  isEnabled: false,
  isVideoPremium: undefined,
  isVideoPaying: undefined,
};
export default Video;
