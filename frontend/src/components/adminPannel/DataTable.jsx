import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid/node";
import { Box } from "@mui/material";
import UserActions from "./UserActions";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  // eslint-disable-next-line no-restricted-syntax
  console.log(rowId);

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
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => <UserActions {...{ params, rowId, setRowId }} />,
    },
    [rowId],
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
        getRowId={(row) => row.id}
        rowsPerPageOptions={(5, 10, 20)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
        checkboxSelection
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
