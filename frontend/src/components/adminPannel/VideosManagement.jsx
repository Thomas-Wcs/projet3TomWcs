import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";
import { DataGrid } from "@mui/x-data-grid/node";
import useAPI from "../../api/useAPI";
import "../../styles/index.css";
import dataTableStyle from "./DataTableStyle";

function VideosManagement() {
  const api = useAPI();
  const [videos, setVideos] = useState([]);
  const [videoTitle, setTitle] = useState("");
  const [categorie, setCategorie] = useState(1);
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [videosChanging, setVideosChanging] = useState(true);

  const handleAddVideos = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description_text", description);
    formData.append("category_id", categorie);
    formData.append("link", fileUpload);
    formData.append("date_publication", Date());

    api
      .post("/videos", formData)
      .then(() => {
        setVideosChanging(!videosChanging);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    api
      .get("/videos")
      .then((data) => {
        setVideos(data.data);
      })
      .catch((error) => console.error(error));
  }, [videosChanging]);

  const handleDeleteVideo = (video) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la video${video} ?`
    );

    if (confirmDelete) {
      api
        .delete(`videos/${video}`)
        .then(() => {
          // eslint-disable-next-line no-alert
          window.alert(`La video ${video} a été supprimé avec succès`);
        })
        .catch((error) => console.error(error));
      setVideosChanging(!videosChanging);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "title", headerName: "Title", width: 350, editable: true },
    {
      field: "description_text",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "category_id",
      headerName: "Category",
      width: 150,
      editable: true,
    },
    {
      field: "section_id",
      headerName: "Section",
      width: 150,
      editable: true,
    },
    { field: "link", headerName: "Link", width: 150, editable: true },
    {
      field: "date_publication",
      headerName: "Date",
      width: 150,
      editable: true,
      renderCell: (params) =>
        moment(params.row.date).format("DD-MM-YYYY HH:MM:SS"),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            fontFamily: "PT Sans",
            backgroundColor: "red",
            height: "90%",
            margin: "1em",
            padding: "0.9em",
            borderRadius: "20%",
            border: "none",
          }}
          onClick={() => handleDeleteVideo(params.row.id)}
        >
          <DeleteIcon style={{ width: "100%" }} />
        </button>
      ),
    },
  ];

  const rows = videos.map((video) => ({
    id: video.id,
    title: video.title,
    description_text: video.description_text,
    category_id: video.category_id,
    link: video.link,
    date_publication: video.date_publication,
  }));

  return (
    <div className="user-management">
      <h1>Videos</h1>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        style={dataTableStyle}
        autoHeight
      />
      <h1>Ajouter une video</h1>
      <div id="title">
        <label htmlFor="Title">
          <input
            type="text"
            placeholder="Title"
            name="Title"
            value={videoTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="descritpion">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor="lien">
          <input
            type="file"
            name="lien"
            onChange={(e) => setFileUpload(e.target.files[0])}
            id="file-selection-button"
          />
        </label>
        <select onChange={(e) => setCategorie(e.target.value)}>
          <option value="1">Animaux</option>
          <option value="2">Sports</option>
          <option value="3">Cuisine</option>
          <option value="4">Voyage</option>
        </select>
        <button
          type="submit"
          onClick={(e) => {
            handleAddVideos(e);
          }}
          id="add-button"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default VideosManagement;
