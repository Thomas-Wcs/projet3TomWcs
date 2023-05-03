import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid/node";
import Video from "./Video";
import useAPI from "../../api/useAPI";
import "../../styles/index.css";
import dataTableStyle from "./DataTableStyle";

function VideosManagement() {
  const api = useAPI();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState(1);
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const handleAddVideos = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description_text", description);
    formData.append("category_id", categorie);
    formData.append("link", fileUpload);
    formData.append("date_publication", Date());

    api
      .post("/videos", formData)
      .then((result) => {
        return result;
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
  }, [videos]);

  const handleDeleteVideo = (video) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la video${video} ?`
    );

    if (confirmDelete) {
      api
        .delete(`/videos/${video}`)
        .then(() => {
          // eslint-disable-next-line no-alert
          window.alert(`La video ${video} a été supprimé avec succès`);
        })
        .catch((error) => console.error(error));
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "title", headerName: "Title", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    { field: "categorie", headerName: "Categorie", width: 150, editable: true },
    { field: "lien", headerName: "Lien", width: 150, editable: true },
    {
      field: "date",
      headerName: "Date de publication",
      width: 150,
      editable: true,
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
    description: video.description_text,
    categorie: video.category_id,
    lien: video.link,
    date: video.date_publication,
  }));

  return (
    <div className="user-management">
      <h1>Videos</h1>

      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        style={dataTableStyle}
      />
      <h1>Ajouter une video</h1>
      <div id="title">
        <select onChange={(e) => setCategorie(e.target.value)}>
          <option value="1">Animaux</option>
          <option value="2">Sports</option>
          <option value="3">Cuisine</option>
          <option value="4">Voyage</option>
        </select>
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
          />
        </label>
        <button type="submit">Ajouter</button>
      </div>
    </div>
  );
}

export default VideosManagement;
