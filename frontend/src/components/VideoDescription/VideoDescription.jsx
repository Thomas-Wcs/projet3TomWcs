import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../api/useAPI";
import Video from "../Sections/Video";
import SectionDescription from "./SectionDescription";

export default function VideoDescription() {
  const [videoData, setVideoData] = useState();
  const api = useAPI();
  const { id } = useParams();
  const [duration, setDuration] = useState(0);
  const { userInfo } = useAuth();
  if (!userInfo?.isPremium) userInfo.isPremium = 0;

  useEffect(() => {
    api.get(`videos/${id}`).then((res) => setVideoData(res.data));
  }, [id]);

  return (
    <div id="video-main">
      {videoData?.date_publication && (
        <div id="video-display">
          <p id="video-date">
            {`${moment(videoData.date_publication).format(
              "DD-MM-YYYY"
            )} || ${duration.toFixed(2)} sec`}
          </p>
          <Video
            key={uuidv4()}
            title={videoData.titre}
            width="100%"
            height="90vh"
            src={`${import.meta.env.VITE_APP_API_URL}${videoData.link}`}
            id="video"
            isVideoPremium={videoData.isVideoPremium}
            isVideoPaying={videoData.isVideoPaying}
            controls={
              ((!userInfo || userInfo.isPremium === 0) &&
                videoData.isVideoPremium === 1) ||
              (userInfo.isVideoPlus === 0 && videoData.isVideoPaying === 1)
                ? null
                : true
            }
            duration={duration}
            setDuration={setDuration}
            isEnabled
          />
          {videoData.isVideoPremium === 1 && (
            <p id="video-warning">Avertissement accès premium</p>
          )}
          <p id="video-description"> {videoData.description_text} </p>
        </div>
      )}
      <div id="caroussel">
        <SectionDescription />
      </div>
    </div>
  );
}
