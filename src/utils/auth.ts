import Keycloak from 'keycloak-js';

// @ts-ignore
const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON);
export const keycloak = new Keycloak({
    url: keycloakConfig['auth-server-url'],
    realm: keycloakConfig['realm'],
    clientId: keycloakConfig['resourse']
})


