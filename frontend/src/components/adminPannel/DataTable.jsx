import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid/node";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import useAPI from "../../api/useAPI";
import dataTableStyle from "./DataTableStyle";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [rowStates, setRowStates] = useState({});
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

  const ChangeIcon = useCallback((id) => {
    setTimeout(() => {
      const resetStates = { [id]: false };
      setRowStates(resetStates);
    }, 2000);
  }, []);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      updateUser(id, field, value);
      const updatedStates = { [id]: true };
      setRowStates(updatedStates);
      ChangeIcon([id]);
    },
    [rowStates, updateUser]
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      type: "string",
      editable: true,
    },
    {
      field: "firstname",
      headerName: "FirstName",
      width: 220,
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
      type: "singleSelect",
      valueOptions: ["Admin", "User"],
      width: 150,
      editable: true,
    },
    {
      field: "isPremium",
      headerName: "Premium",
      type: "boolean",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Save Edit",
      width: 150,
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
          }}
        >
          {rowStates[params.id] ? (
            <BeenhereIcon style={{ width: "100%" }} />
          ) : (
            <SaveIcon style={{ width: "100%" }} />
          )}
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          type="button"
          style={{
            fontFamily: "PT Sans",
            backgroundColor: "none",
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
        style={dataTableStyle}
      />
      <div style={{ backgroundColor: "black", height: "500px" }} />
    </Box>
  );
}
