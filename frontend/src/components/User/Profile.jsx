import "../../styles/index.css";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../../context/AuthContext";
import AccountMenu from "../dashbord/AccountMenu";

export default function Profile() {
  const { userInfo } = useAuth();

  return (
    <div id="profil-display">
      <h1 className="section-title">Profile</h1>
      <div className="account-menu-display">
        <AccountMenu userInfo={userInfo} />
      </div>
    </div>
  );
}
