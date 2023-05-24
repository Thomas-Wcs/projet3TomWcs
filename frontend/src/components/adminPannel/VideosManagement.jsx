import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { Box } from "@mui/material";

import moment from "moment";
import { DataGrid } from "@mui/x-data-grid/node";
import useAPI from "../../api/useAPI";
import "../../styles/index.css";
import dataTableStyle from "./DataTableStyle";

function VideosManagement() {
  const api = useAPI();
  const [videos, setVideos] = useState([]);
  const [videosChanging, setVideosChanging] = useState(true);

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
    { field: "title", headerName: "Title", width: 150, editable: true },
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
      field: "name",
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
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/videos/${params.row.id}`}>
              <button className="sectionEditBtn" type="submit">
                Edit
              </button>
            </Link>

            <DeleteOutline
              className="sectionDeleteBtn"
              onClick={() => handleDeleteVideo(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const rows = videos.map((video) => ({
    id: video.id,
    title: video.title,
    description_text: video.description_text,
    category_id: video.category_id,
    link: video.link,
    date_publication: video.date_publication,
    name: video.name,
  }));

  return (
    <div className="user-management">
      <h1>Videos</h1>
      <Link to="/newVideo">
        <PostAddRoundedIcon
          style={{ fontSize: 48, color: "#10bcdd" }}
          className="addButton"
        />
      </Link>
      <Box
        sx={{
          height: 800,
          width: "100%",
          backgroundColor: "black",
        }}
      >
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
      </Box>
    </div>
  );
}

export default VideosManagement;
