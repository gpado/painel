import React from 'react';
import LoginPage from './pages/LoginPage'; 
import CssBaseline from '@mui/material/CssBaseline';
import './utils/auth.ts';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakProviderInitConfig } from './utils/auth.ts';

const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak} initConfig={keycloakProviderInitConfig}>
    <div>
      <CssBaseline />
      <LoginPage />
    </div>
    </ReactKeycloakProvider>
  );
}

export default App;
