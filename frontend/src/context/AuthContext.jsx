import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [success, setSuccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const context = useMemo(
    () => ({
      success,
      setSuccess,
      isAdmin,
      setIsAdmin,
      userInfo,
      isUser,
      setUserInfo,
      setIsUser,
    }),
    [success, setSuccess, isAdmin, setIsAdmin, userInfo, setUserInfo]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
