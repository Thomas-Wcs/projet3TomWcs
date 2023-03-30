import React, { useState, useEffect } from "react";
import Video from "./Video";

function VideosManagement() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setVideos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // const handleManageUser = () => {
  //   // console.log(`Gestion de l'utilisateur ${userId}`);
  // };

  // const handleDeleteUser = (user) => {
  //   // eslint-disable-next-line no-alert
  //   const confirmDelete = window.confirm(
  //     `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user} ?`
  //   );

  //   if (confirmDelete) {
  //     fetch(`http://localhost:5000/users/${user}`, {
  //       method: "DELETE",
  //     })
  //       .then(() => {
  //         // eslint-disable-next-line no-alert
  //         window.alert(`L'utilisateur ${user} a été supprimé avec succès`);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };

  return (
    <div className="user-management">
      <h1>videos</h1>
      {videos.map((video) => (
        <Video
          key={video.id}
          videos={video}
          // onManageUser={handleManageUser}
          // onDeleteUser={handleDeleteUser}
        />
      ))}
    </div>
  );
}

export default VideosManagement;
