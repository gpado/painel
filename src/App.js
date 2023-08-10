import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak";
import NavBar from "./components/NavBar";
import AppRouter from "./AppRouter";

const LoadingKeycloak = () => (
  <div>
    <h1>Carregando...</h1>
    <p>Isso deve levar apenas alguns instantes {";)"}</p>
  </div>
);

const App = () => (
  <BrowserRouter>//React.StrictMode
    <NavBar />
    <AppRouter />
  </BrowserRouter>
  // <ReactKeycloakProvider 
  //   authClient={keycloak}
  //   LoadingComponent={<LoadingKeycloak />}
  // >
  // </ReactKeycloakProvider>
);

export default App;
