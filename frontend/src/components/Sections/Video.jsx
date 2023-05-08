import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/index.css";
// import thumbnail from "../../assets/images/background-slider.png";
import PlayButton from "./PlayButton";

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
}) {
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
        // poster={thumbnail}
        muted
        ref={videoRef}
        preload="metadata"
        style={{ width, height }}
        onMouseOver={isEnabled ? handleToggleVideo : undefined}
        onFocus={isEnabled ? handleToggleVideo : undefined}
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
};

Video.defaultProps = {
  title: "",
  displayPlayButton: false,
  displayDescription: false,
  displayDescriptionText: "",
  displayDescriptionTitle: "",
  isEnabled: false,
};
export default Video;
