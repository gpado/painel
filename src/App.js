import './utils/auth.ts';
import { keycloak} from './utils/auth.ts';
import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage'; 

function App() {
  return (
    <React.StrictMode>
      <ReactKeycloakProvider authClient={keycloak}>
        <CssBaseline />
        <LoginPage />
      </ReactKeycloakProvider>
    </React.StrictMode>
  );
}

export default App;

