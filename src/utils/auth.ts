import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://keycloack-godigital.azurewebsites.net/auth', // URL do servidor Keycloak
  realm: 'conesp', // Nome do realm no Keycloak
  clientId: 'painel-react', // Nome do cliente para sua aplicação React
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
