import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

// @ts-ignore
const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON);
export const keycloak = new Keycloak({
    url: keycloakConfig['auth-server-url'],
    realm: keycloakConfig['realm'],
    clientId: keycloakConfig['resource']
})

// login-required | check-sso
export const keycloakProviderInitConfig: KeycloakInitOptions = {
    onLoad: "check-sso"
};