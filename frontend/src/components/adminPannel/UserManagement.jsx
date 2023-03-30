import React, { useState, useEffect } from "react";
import User from "./User";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Effectue une requête pour récupérer les données des utilisateurs et les stocke dans l'état
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleManageUser = () => {
    // console.log(`Gestion de l'utilisateur ${userId}`);
  };

  const handleDeleteUser = (user) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user} ?`
    );

    if (confirmDelete) {
      fetch(`http://localhost:5000/users/${user}`, {
        method: "DELETE",
      })
        .then(() => {
          // eslint-disable-next-line no-alert
          window.alert(`L'utilisateur ${user} a été supprimé avec succès`);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="user-management">
      <h1>Gestion des utilisateurs</h1>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onManageUser={handleManageUser}
          onDeleteUser={handleDeleteUser}
        />
      ))}
    </div>
  );
}

export default UserManagement;
