import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";

import { useAuth } from "../../context/AuthContext";

import PlayButton from "./PlayButton";
import videoLock from "../../assets/imgPremium.png";

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

  return (
    <div className="wrapper-video">
      <video
        src={src}
        poster={
          (!userInfo || userInfo.isPremium === 0) && isVideoPremium === 1
            ? videoLock
            : null
        }
        muted
        ref={videoRef}
        preload="metadata"
        style={{ width, height }}
        onMouseOver={
          isEnabled && userInfo.isPremium === 0 && isVideoPremium === 1
            ? null
            : handleToggleVideo
        }
        onFocus={
          isEnabled && userInfo.isPremium === 0 && isVideoPremium === 1
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
};

Video.defaultProps = {
  title: "",
  displayPlayButton: false,
  displayDescription: false,
  displayDescriptionText: "",
  displayDescriptionTitle: "",
  isEnabled: false,
  isVideoPremium: undefined,
};
export default Video;
