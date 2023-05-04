import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid/node";
import "../../styles/index.css";
import { Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import dataTableStyle from "./DataTableStyle";
import useAPI from "../../api/useAPI";

function SectionsManagement() {
  const [data, setData] = useState([]);
  const api = useAPI();
  const [editSection, setEditSection] = useState(false);

  const getSectionsData = async () => {
    await api.get("sections").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getSectionsData();
  }, []);

  const sections = data.map((section) => ({
    id: section.id,
    name: section.name,
  }));

  const updateSection = async (id, field, value) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setData(updatedData);

    const [name] = value;
    const newSection = { name };

    await api.put(`sections/${id}`, newSection);
    getSectionsData();
  };

  useEffect(() => {
    getSectionsData();
  }, []);
  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      updateSection(id, field, value);
    },
    [updateSection]
  );

  const deleteSection = async (id) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      ` Êtes-vous sûr de vouloir supprimer la section ${id} `
    );

    if (confirmDelete) {
      await api.delete(`sections/${id}`);
      getSectionsData();
    }
  };

  useEffect(() => {
    getSectionsData();
  }, []);

  const columns = [
    { field: "id", headerName: "Section id", width: 250 },
    {
      field: "name",
      headerName: "Section name",
      width: 250,
      editable: true,
      type: "string",
    },
    {
      field: "edit",
      headerName: "Confirm",
      width: 130,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            fontFamily: "PT Sans",
            backgroundColor: "grey",
            height: "90%",
            margin: "1em",
            padding: "0.9em",
            borderRadius: "20%",
            border: "none",
          }}
          onClick={() => {
            handleCellEditCommit({
              id: params.id,
              field: ["name"],
              value: [params.row.name],
            });
            setEditSection(true);

            setTimeout(() => {
              setEditSection(false);
            }, 2000);
          }}
        >
          {editSection ? (
            <CheckCircleIcon
              style={{ width: "100%", backgroundColor: "green" }}
            />
          ) : (
            <CheckCircleOutlineIcon style={{ width: "100%" }} />
          )}
        </button>
      ),
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
          onClick={() => deleteSection(params.row.id)}
        >
          <DeleteIcon style={{ width: "100%" }} />
        </button>
      ),
    },
  ];
  return (
    <div style={{ maxWidth: "100%" }}>
      <h1>Sections</h1>
      <Box
        sx={{
          height: 800,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <DataGrid
          rows={sections}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          style={dataTableStyle}
        />
        <div style={{ backgroundColor: "black", height: "500px" }} />
      </Box>
    </div>
  );
}

export default SectionsManagement;
