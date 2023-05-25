import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import { useParams } from "react-router-dom";
import useAPI from "../../api/useAPI";

export default function VideoDescription() {
  const [videoData, setVideoData] = useState();
  const api = useAPI();
  const { id } = useParams();

  useEffect(() => {
    api.get(`videos/${id}`).then((res) => setVideoData(res.data));
  }, [id]);

  return (
    <div id="video-main">
      {videoData?.date_publication && (
        <div id="video-display">
          <p id="video-date"> {videoData.date_publication} </p>

          <video
            src={`${import.meta.env.VITE_APP_API_URL}${videoData.link}`}
            id="video"
          />
          {videoData.isVideoPremium === 0 && <p>Avertissement accès premium</p>}

          <p id="video-description"> {videoData.description_text} </p>
        </div>
      )}
    </div>
  );
}
