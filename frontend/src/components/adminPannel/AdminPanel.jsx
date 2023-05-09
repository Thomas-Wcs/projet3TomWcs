import React from "react";
import "../../scss/index.css";
import { Link, Outlet } from "react-router-dom";
import "../../styles/index.css";
import monImage from "../../assets/imagedemo.png";
import { useAuth } from "../../context/AuthContext";

export default function AdminPanel() {
  const { userInfo } = useAuth();
  return (
    <div className="admin-pannel">
      <div className="display-nav-admin">
        <div className="user-connected">
          <img src={monImage} alt="Profil de l'utilisateur" />
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <button type="button">DECONNEXION</button>
        </div>
        <h1>Panneau d'administration</h1>
      </div>
      <div className="display-nav-admin2">
        <div>
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
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
