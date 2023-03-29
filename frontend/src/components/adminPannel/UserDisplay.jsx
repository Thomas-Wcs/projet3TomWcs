import { useState, useEffect } from "react";
import UserPannel from "./UserPannel";

export default function UserDisplay() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUser(data);
      });
  }, []);

  // const handleSelectChange = (event) => {
  //   setSelectedUser(event.target.value);
  // };

  // const filteredUsers = selected.{id}
  //   ? users.filter((User) => cupcake.accessory_id === selectedAccessory)
  //   : users;

  return (
    <>
      <h1>Users</h1>

      <ul className="cupcake-list" id="cupcake-list">
        {user.map((users) => (
          <li key={user.id} className="cupcake-item">
            <UserPannel users={users} />
          </li>
        ))}
      </ul>
    </>
  );
}
