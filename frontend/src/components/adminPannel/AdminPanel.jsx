import React from "react";
import "../../styles/AdminPannel.css";
import DataTable from "./DataTable";
// import VideosManagement from "./VideosManagement";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      {/* <VideosManagement /> */}
      <DataTable />
    </div>
  );
}
