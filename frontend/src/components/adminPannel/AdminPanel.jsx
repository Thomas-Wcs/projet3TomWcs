import React from "react";
import "../../scss/index.css";
import { Link, Outlet } from "react-router-dom";
import "../../styles/index.css";
import monImage from "../../assets/imagedemo.png";

export default function AdminPanel() {
  return (
    <div className="admin-pannel">
      <div className="display-nav-admin">
        <div className="user-connected">
          <img src={monImage} alt="Profil de l'utilisateur" />
          <p>INFORMATIONS</p>
          <p>Admin-Thomas@admin.com</p>
          <button type="button">DECONNEXION</button>
        </div>
        <h1>Panneau d'administration</h1>
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
        <Outlet />
      </div>
    </div>
  );
}
