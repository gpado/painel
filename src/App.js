import './utils/auth.ts';
import { keycloak } from './utils/auth.ts';
import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Login from './pages/Login.jsx';
import ConsultUsers from "./pages/ConsultUsers/ConsultUsers";

function App() {
  return (
    <React.StrictMode>
      <ConsultUsers />
      {/* <ReactKeycloakProvider authClient={keycloak}>
        <Login />
      </ReactKeycloakProvider> */}
    </React.StrictMode>
  );
}

export default App;