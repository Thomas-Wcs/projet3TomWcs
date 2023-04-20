import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid/node";
import { Box } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

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

    const [name, email, firstname, role, isPremium] = value;
    const newUser = { name, email, firstname, role, isPremium };

    await axios.put(`http://localhost:5000/users/${id}`, newUser);
    getUserData();
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
      headerName: "Name",
      width: 200,
      type: "string",
      editable: true,
    },
    {
      field: "firstname",
      headerName: "FirstName",
      width: 200,
      type: "string",
      editable: true,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 250,
      type: "string",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 130,
      editable: true,
    },
    {
      field: "isPremium",
      headerName: "Premium",
      type: "boolean",
      width: 130,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            fontFamily: "PT Sans",
            backgroundColor: "green",
            margin: "1em",
            padding: "0.9em",
            borderRadius: "20%",
          }}
          onClick={() =>
            handleCellEditCommit({
              id: params.id,
              field: ["name", "email", "firstname", "role", "isPremium"],
              value: [
                params.row.name,
                params.row.email,
                params.row.firstname,
                params.row.role,
                params.row.isPremium,
              ],
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
      width: 130,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            fontFamily: "PT Sans",
            backgroundColor: "red",
            margin: "1em",
            padding: "0.9em",
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
    firstname: personne.firstname,
    email: personne.email,
    role: personne.role,
    isPremium: personne.isPremium,
  }));

  return (
    <Box sx={{ height: 800, width: "100%", backgroundColor: "black" }}>
      <h1>Users</h1>

      <DataGrid
        rows={personnels}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        style={{
          height: "80%",
          backgroundColor: "gray",
          borderRadius: "1%",
          margin: "0px 5em 0px 5em",
          padding: "1em",
          fontSize: "20px",
          fontFamily: "PT Sans",
          with: "100%",
          border: "3px solid rgb(16, 188, 221)",
          color: "black",
        }}
      />
      <div style={{ backgroundColor: "black", height: "500px" }} />
    </Box>
  );
}
