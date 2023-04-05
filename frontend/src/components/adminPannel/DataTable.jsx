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
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.name || ""} ${params.row.email || ""}`,
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
  }));

  return (
    <div style={{ height: 400, width: "100%", margin: 150 }}>
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
