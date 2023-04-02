import React from "react";
import "../../styles/AdminPannel.css";
import UserManagement from "./UserManagement";
import DataTable from "./DataTable";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      Hi Admin
      <UserManagement />
      <DataTable />
    </div>
  );
}
