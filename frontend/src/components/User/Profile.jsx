import "../../styles/index.css";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import useAPI from "../../api/useAPI";
import { useAuth } from "../../context/AuthContext";
import AccountMenu from "../dashbord/AccountMenu";

export default function Profile() {
  const api = useAPI();
  const [data, setData] = useState([]); // eslint-disable-next-line no-restricted-syntax
  console.log(data);
  const { userInfo } = useAuth();
  // eslint-disable-next-line no-restricted-syntax
  console.log(userInfo);

  useEffect(() => {
    api.get("users").then((result) => setData(result.data));
  }, []);

  return (
    <div id="profil-display">
      <h1 className="section-title">Profile</h1>
      <div className="account-menu-display">
        <AccountMenu />
      </div>
    </div>
  );
}
