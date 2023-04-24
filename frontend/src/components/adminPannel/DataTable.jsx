import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid/node";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useAPI from "../../api/useAPI";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [isEditUser, setIsEditUser] = useState(false);
  const api = useAPI();

  const getUserData = async () => {
    await api.get("users").then((res) => {
      setData(res.data);
    });
  };

  const deleteUser = async (id) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      ` Êtes-vous sûr de vouloir supprimer l'utilisateur ${id} `
    );

    if (confirmDelete) {
      await api.delete(`users/${id}`);
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

    const [name, email, firstname, role, isPremium] = value;
    const newUser = { name, email, firstname, role, isPremium };

    await api.put(`users/${id}`, newUser);
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
            height: "90%",
            margin: "1em",
            padding: "0.9em",
            borderRadius: "20%",
            border: "none",
          }}
          onClick={() => {
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
            });
            setIsEditUser(true);

            setTimeout(() => {
              setIsEditUser(false);
            }, 2000);
          }}
        >
          {isEditUser ? (
            <CheckCircleIcon style={{ width: "100%" }} />
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
          onClick={() => deleteUser(params.row.id)}
        >
          <DeleteIcon style={{ width: "100%" }} />
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
