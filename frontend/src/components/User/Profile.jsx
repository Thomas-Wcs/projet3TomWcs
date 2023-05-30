import "../../styles/index.css";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../../context/AuthContext";
import AccountMenu from "../dashbord/AccountMenu";

export default function Profile() {
  const { userInfo, reset } = useAuth();

  return (
    <div id="profil-display">
      <img
        src="/src/assets/images.png"
        alt="logo du site"
        style={{ width: " 300px", height: "100px" }}
      />
      <h1 className="section-title">Profile</h1>
      <div className="account-menu-display">
        <AccountMenu userInfo={userInfo} reset={reset} />
      </div>
    </div>
  );
}
