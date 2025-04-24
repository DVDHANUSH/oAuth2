import "./App.css";
import { useAuth } from "./config/authcontext";
function App() {
  const { isAuthenticated, setIsAuthenticated, keycloak } = useAuth();
  console.log(isAuthenticated);

  console.log(keycloak);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Welcom to Oauth Application Frontend.</h1>
          <h1>UserName : {keycloak.tokenParsed.preferred_username}</h1>
          <h1>User Information</h1>
          <h2>Email : {keycloak.tokenParsed.email}</h2>
          <h2>
            Roles :{" "}
            {keycloak.realmAccess.roles.map((item) => (
              <span>{item},</span>
            ))}
          </h2>
          <h1>
            {isAuthenticated
              ? "User is Authenticated"
              : "User is not authenticated"}
          </h1>

          <button
            onClick={() => {
              keycloak.logout();
              console.log("User is Logged");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>Login required</h1>
          <button
            onClick={() => {
              keycloak.login();
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
export default App;
