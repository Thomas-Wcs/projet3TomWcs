import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [success, setSuccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AuthContext.Provider value={{ success, setSuccess, setIsAdmin, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

AuthContext.propTypes = {
  children: PropTypes.elementType.isRequired,
};
