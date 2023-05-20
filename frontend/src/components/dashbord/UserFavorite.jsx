import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player";
import useAPI from "../../api/useAPI";
import "./UserFavorite.css";

export default function UserFavorite() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api = useAPI();

  const getVideoData = async () => {
    try {
      const res = await api.get("videos");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ color: "white" }}>
      <p>VIDEOS FAVORITES</p>
      <div>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="video-grid">
        {filteredData.map((video) => (
          <div key={uuidv4()} className="video-wrapper">
            <div className="video-content">
              <ReactPlayer
                width="100%"
                height="80%"
                url={`${import.meta.env.VITE_APP_API_URL}${video.link}`}
                isVideoPremium={video.isVideoPremium}
                isVideoPaying={video.isVideoPaying}
                controls
                style={{ backgroundColor: "black" }}
              />
              <div>
                <h4 style={{ backgroundColor: "black" }}>{video.title}</h4>
                <div>BONJOUR JE SUIS DU TEXTE...</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
