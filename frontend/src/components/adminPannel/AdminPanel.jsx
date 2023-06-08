import React from "react";
import "../../styles/index.css";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccountMenu2 from "../dashbord/AccountMenu2";

export default function AdminPanel() {
  const { userInfo } = useAuth();
  return (
    <div className="admin-pannel">
      <div className="display-nav-admin-picture">
        <h1>Panneau d'administration</h1>
      </div>
      <div className="display-nav-admin2">
        <div>
          <div className="user-connected">
            <AccountMenu2 userInfo={userInfo} />
            <p> Admin : {userInfo.name}</p>
            <p> {userInfo.email}</p>
            <button type="button">DECONNEXION</button>
          </div>
          <ul>
            <li>
              <Link to="/adminPanel/usersTable">Users</Link>
            </li>
            <li>
              <Link to="/adminPanel/videosTable">Videos</Link>
            </li>
            <li>
              <Link to="/adminPanel/sectionsTable">Section</Link>
            </li>
            <li>
              <Link to="/adminPanel/AdvertsTable">Pub</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Outlet name="adminPanel" />
      </div>
    </div>
  );
}
