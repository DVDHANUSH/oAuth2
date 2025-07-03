import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  realm: "micro-dev",
  url: "http://localhost:9190",
  clientId: "mind-up",
  pkceMethod: "S256",
});
export default keycloak;
