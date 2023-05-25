import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function VideoUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [allCategory, setCategory] = useState();
  const [videoData, setVideoData] = useState({
    id: "",
    category_id: "",
    link: "",
    description_text: "",
    title: "",
  });

  useEffect(() => {
    api.get("/category").then((res) => setCategory(res.data));
  }, [id]);

  useEffect(() => {
    const getVideoData = async () => {
      await api.get(`videos/${id}`).then((res) => {
        setVideoData(res.data);
      });
    };
    getVideoData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setVideoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function updateVideoData() {
    api
      .put(`videos/${videoData.id}`, {
        title: videoData.title,
        description_text: videoData.description_text,
        link: videoData.link,
        category_id: videoData.category_id,
      })
      .then(() => {
        navigate("/adminPanel/videosTable");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateVideoData();
  }

  return (
    <div className="sectionUpdate">
      <h2 className="sectionUpdateTitle">Edition de la video</h2>
      <form className="sectionUpdateForm" onSubmit={handleSubmit}>
        <div className="sectionUpdateId">
          <label htmlFor="id">Identifiant de la video :</label>
          <input
            type="text"
            placeholder="id"
            value={videoData.id}
            className="sectionUpdateInput"
            onChange={handleChange}
            name="id"
            disabled
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="title">Titre de la vidéo :</label>
          <input
            type="text"
            placeholder="Titre de la video"
            className="sectionUpdateInput"
            value={videoData.title}
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="sectionUpdateName">
          <label htmlFor="description_text">Description :</label>
          <input
            type="text"
            placeholder="Description"
            className="sectionUpdateInput"
            value={videoData.description_text}
            onChange={handleChange}
            name="description_text"
          />
        </div>
        <div className="sectionUpdateName">
          {allCategory?.name && (
            <select
              name="category_id"
              value={videoData.category_id}
              onChange={handleChange}
            >
              {allCategory.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" className="sectionUpdateButton">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default VideoUpdate;
