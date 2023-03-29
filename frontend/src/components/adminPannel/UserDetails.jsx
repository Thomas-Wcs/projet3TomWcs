import { useParams, useState, useEffect } from "react";
import UserPannel from "./UserPannel";

export default function CupcakeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          mdp: data.mdp,
          email: data.email,
        });
      });
  }, [id]);

  if (!user) {
    return <div>Cet utilisateur n'existe pas</div>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <UserPannel {...{ user }} />
    </>
  );
}
