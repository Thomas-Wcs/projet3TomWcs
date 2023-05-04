import "../../styles/index.css";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const api = useAPI();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-restricted-syntax
  console.log(data);
  const { userInfo } = useAuth();

  useEffect(() => {
    api.get("videos").then((result) => setData(result.data));
  }, []);

  return (
    <div id="profile">
      <h1 className="section-title">{userInfo.email}</h1>
      <h2 className="section-title">MES FAVORIS</h2>
    </div>
  );
}
