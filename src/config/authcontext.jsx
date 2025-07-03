import keycloak from "./Keycloak";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // call hoga
    keycloak
      .init({
        // onLoad: "login-required",
        onLoad: "check-sso",
        pkceMethod: "S256",
      })
      .then((authenticated) => {
        console.log("user login success", authenticated);
        setIsAuthenticated(authenticated);
        setKeycloakInstance(keycloak);
      })
      .catch((error) => {
        {
          console.log("error", error);
          console.log("user login fail");
        }
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        keycloak: keycloakInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
