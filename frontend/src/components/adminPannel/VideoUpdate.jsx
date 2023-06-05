import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
import useAPI from "../../api/useAPI";

function VideoUpdate() {
  const { id } = useParams();
  const api = useAPI();
  const navigate = useNavigate();
  const [allCategory, setCategory] = useState([]);
  const [videoData, setVideoData] = useState();
  const [allSection, setAllSection] = useState();
  const [videoSection, setVideoSection] = useState();

  useEffect(() => {
    const getVideoData = async () => {
      await api.get(`videos/${id}`).then((res) => {
        setVideoData(res.data);
      });
    };
    getVideoData();
  }, [id]);

  useEffect(() => {
    api.get("/category").then((res) => setCategory(res.data));
  }, [id]);

  useEffect(() => {
    api.get("/sections").then((res) => setAllSection(res.data));
  }, [id]);

  useEffect(() => {
    api.get("/video_section").then((res) => {
      const videoSectionData = res.data.find(
        (item) => item.video_id === videoData?.id
      );
      setVideoSection(videoSectionData?.section_id || "");
    });
  }, [videoData?.id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setVideoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSectionChange(e) {
    const { value } = e.target;
    setVideoSection(value);
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

    api
      .put(`video_section/${videoData.video_section_id}`, {
        section_id: videoSection,
        id: videoData.video_section_id,
      })
      .then(() => {
        navigate("/adminPanel/videosTable");
      })
      .catch((err) => {
        console.error(err);
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
            value={videoData?.id}
            className="sectionUpdateInput"
            onChange={(handleChange, handleSectionChange)}
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
            value={videoData?.title}
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
            value={videoData?.description_text}
            onChange={handleChange}
            name="description_text"
          />
        </div>
        <div className="sectionUpdateName">
          {allCategory && (
            <select
              name="category_id"
              value={videoData?.category_id}
              onChange={handleChange}
            >
              {allCategory.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          {allSection && (
            <select
              name="section_id"
              value={videoSection}
              onChange={handleSectionChange}
            >
              {allSection.map((sec) => (
                <option value={sec.id} key={sec.id}>
                  {sec.name}
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
