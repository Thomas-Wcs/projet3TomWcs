import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid/node";
import { Box } from "@mui/material";
// import UserActions from "./UserActions";

export default function DataTable() {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    await axios.get("http://localhost:5000/users").then((res) => {
      setData(res.data);
    });
  };

  const deleteUser = async (id) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      ` Êtes-vous sûr de vouloir supprimer l'utilisateur ${id} `
    );

    if (confirmDelete) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUserData();
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUser = async (id, field, value) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setData(updatedData);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Nouvelles données de l'utilisateur ${id}:`, {
      [field]: value,
    });

    await axios.put(`http://localhost:5000/users/${id}`, { [field]: value });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      updateUser(id, field, value);
    },
    [updateUser]
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "First name",
      width: 130,
      type: "string",
      editable: true,
    },
    {
      field: "email",
      headerName: "email",
      width: 130,
      type: "string",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Name + Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.name || ""} ${params.row.email || ""}`,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            backgroundColor: "green",
            margin: "1em",
            padding: "1em",
            borderRadius: "20%",
          }}
          onClick={() =>
            handleCellEditCommit({
              id: params.id,
              field: "name",
              value: params.row.name,
            })
          }
        >
          Edit
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            backgroundColor: "red",
            margin: "1em",
            padding: "1em",
            borderRadius: "20%",
          }}
          onClick={() => deleteUser(params.row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const personnels = data.map((personne) => ({
    id: personne.id,
    name: personne.name,
    email: personne.email,
  }));

  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <h1>Users</h1>
      <DataGrid
        rows={personnels}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        style={{
          height: "100%",
          backgroundColor: "grey",
          margin: "1em",
          fontSize: "18px",
          with: "100%",
        }}
      />
    </Box>
  );
}
