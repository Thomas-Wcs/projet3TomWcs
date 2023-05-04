import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

export default function AdminWall({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : null;
}

AdminWall.propTypes = {
  children: PropTypes.element.isRequired,
};
