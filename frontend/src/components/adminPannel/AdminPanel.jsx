import React from "react";
import UserManagement from "./UserManagement";
import VideosManagement from "./VideosManagement";

export default function AdminPanel() {
  return (
    <div>
      Hi Admin
      <UserManagement />
      <VideosManagement />
    </div>
  );
}
