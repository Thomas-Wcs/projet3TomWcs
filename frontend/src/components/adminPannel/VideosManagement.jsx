import React, { useState, useEffect } from "react";
import Video from "./Video";

function VideosManagement() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteVideo = (video) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la video${video} ?`
    );

    if (confirmDelete) {
      fetch(`http://localhost:5000/videos/${video}`, {
        method: "DELETE",
      })
        .then(() => {
          // eslint-disable-next-line no-alert
          window.alert(`La video ${video} a été supprimé avec succès`);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="user-management">
      <h1>Videos</h1>
      {videos.map((video) => (
        <Video
          key={video.id}
          videos={video}
          onDeleteVideo={handleDeleteVideo}
        />
      ))}
    </div>
  );
}

export default VideosManagement;
