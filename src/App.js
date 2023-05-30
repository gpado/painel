import React from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import AppRouter from "./AppRouter";

const LoadingKeycloak = () => (
  <div>
    <h1>Carregando...</h1>
    <p>Isso deve levar apenas alguns instantes {";)"}</p>
  </div>
);

function App() {
 return (
  <ReactKeycloakProvider 
    authClient={keycloak}
    LoadingComponent={<LoadingKeycloak />}
    >
    <React.StrictMode>
      <Nav />
      <AppRouter />
    </React.StrictMode>
  </ReactKeycloakProvider>
 );
}

export default App;