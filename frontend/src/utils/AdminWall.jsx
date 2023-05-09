import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";

export default function AdminWall({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? (
    children
  ) : (
    <div id="img-admin-wall">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F49%2Ff2%2F26%2F49f226612149af8cfe8a7a07218ed8b9.jpg&f=1&nofb=1&ipt=8ef7486bc0015d5893db675456d46974e77b723c8e0c803ec8d01e6ebfc53ebc&ipo=images"
        alt="nedry"
        className="image-nedry"
      />
    </div>
  );
}

AdminWall.propTypes = {
  children: PropTypes.element.isRequired,
};
