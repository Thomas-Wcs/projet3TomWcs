import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import useAPI from "../../api/useAPI";
import Video from "../Sections/Video";
import Section1 from "../Sections/Section1";

export default function VideoDescription() {
  const [videoData, setVideoData] = useState();
  const api = useAPI();
  const { id } = useParams();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    api.get(`videos/${id}`).then((res) => setVideoData(res.data));
  }, [id]);

  return (
    <div id="video-main">
      {videoData?.date_publication && (
        <div id="video-display">
          <p id="video-date">
            {" "}
            {`${moment(videoData.date_publication).format(
              "DD-MM-YYYY"
            )} || ${duration.toFixed(2)} sec`}{" "}
          </p>

          <Video
            key={videoData.id}
            title={videoData.titre}
            width="100%"
            height="90vh"
            src={`${import.meta.env.VITE_APP_API_URL}${videoData.link}`}
            id="video"
            controls
            duration={duration}
            setDuration={setDuration}
          />
          {videoData.isVideoPremium === 1 && (
            <p id="video-warning">Avertissement accès premium</p>
          )}

          <p id="video-description"> {videoData.description_text} </p>
        </div>
      )}
      <div id="caroussel">
        <Section1 />
      </div>
    </div>
  );
}
