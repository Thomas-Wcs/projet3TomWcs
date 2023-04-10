import React from "react";
import "../../styles/AdminPannel.css";
import { Link, Route, Routes } from "react-router-dom";
import DataTable from "./DataTable";
import VideosManagement from "./VideosManagement";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/adminPannel/usersTable">Users</Link>
            </li>
            <li>
              <Link to="/adminPannel/videosTable">Videos</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Routes path="adminPannel/*">
          <Route path="usersTable" element={<DataTable />} />
          <Route path="videosTable" element={<VideosManagement />} />
        </Routes>
      </div>

      {/* <div className="user-pannel">
        <VideosManagement />
      </div>
      <div className="video-pannel" />
      <DataTable /> */}
    </div>
  );
}
