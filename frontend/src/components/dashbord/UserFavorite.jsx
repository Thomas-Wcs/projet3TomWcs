import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAPI from "../../api/useAPI";
import Video from "../Sections/Video";

export default function UserFavorite() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-restricted-syntax
  console.log(data);
  const api = useAPI();

  const getVideoData = async () => {
    await api
      .get("videos/favoritesUser")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <p>VIDOES FAVORITES</p>
      <div>
        <div>
          {data.map((video) => (
            <Video
              key={uuidv4()}
              width="300px"
              height="150px"
              displayDescription
              displayDescriptionTitle={video.title}
              displayDescriptionText={video.description_text}
              src={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
              isVideoPremium={video.isVideoPremium}
              isVideoPaying={video.isVideoPaying}
              isEnabled
            />
          ))}
        </div>
      </div>
    </div>
  );
}
