import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid/node";

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

  const editUser = async (id, updatedValues) => {
    await axios.patch(`http://localhost:5000/users/${id}`, updatedValues);
    getUserData(); // Mettre à jour la liste des utilisateurs après configuration
  };

  useEffect(() => {
    getUserData();
  }, []);

  // eslint-disable-next-line no-restricted-syntax
  // console.log(data);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First name", width: 130 },
    { field: "email", headerName: "email", width: 130 },
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
          onClick={() =>
            editUser(params.row.id, {
              name: "azazzp",
              email: "nouveau@email.com",
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
        <button type="button" onClick={() => deleteUser(params.row.id)}>
          Delete
        </button>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
  }));

  return (
    <div style={{ height: 700, width: "80%", margin: 50 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={1}
        rowsPerPageOptions={1}
        checkboxSelection
      />
    </div>
  );
}
