import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: 'http://localhost:8890/', // URL do servidor Keycloak
 realm: "master",
 clientId: "users-auth",
});

export default keycloak;