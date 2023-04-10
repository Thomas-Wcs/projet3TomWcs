import React from "react";
import "../../styles/AdminPannel.css";
import { Link, Route, Switch } from "react-router-dom";
import DataTable from "./DataTable";
import VideosManagement from "./VideosManagement";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/admin/usersTable">Users</Link>
            </li>
            <li>
              <Link to="/admin/videosTable">Videos</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path="/admin/usersTable" component={DataTable} />
        <Route path="/admin/videosTable" component={VideosManagement} />
      </Switch>

      {/* <div className="user-pannel">
        <VideosManagement />
      </div>
      <div className="video-pannel" />
      <DataTable /> */}
    </div>
  );
}
