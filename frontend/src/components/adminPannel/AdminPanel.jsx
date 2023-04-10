import React from "react";
import "../../styles/AdminPannel.css";
import { Link, Route, Routes } from "react-router-dom";
import DataTable from "./DataTable";
import VideosManagement from "./VideosManagement";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      <div className="display-nav-admin">
        <nav>
          <ul>
            <li>
              <Link to="/adminPanel/usersTable">Users</Link>
            </li>
            <li>
              <Link to="/adminPanel/videosTable">Videos</Link>
            </li>
            <li>
              <Link to="/adminPanel/videosTable">Pages</Link>
            </li>
            <li>
              <Link to="/adminPanel/videosTable">Section</Link>
            </li>
            <li>
              <Link to="/adminPanel/videosTable">Pub</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="display-admin-pannel">
        <Routes path="*">
          <Route path="usersTable" element={<DataTable />} />
          <Route path="videosTable" element={<VideosManagement />} />
        </Routes>
      </div>
    </div>
  );
}
