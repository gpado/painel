import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: 'https://keycloack-godigital.azurewebsites.net/auth', // URL do servidor Keycloak
 realm: "keycloak-react-auth",
 clientId: "teste",
});

export default keycloak;