import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloakClient from "./Keycloak";
import { ThemeProvider } from '@mui/material/styles';

import customTheme from "./theme.js";
import PrivateRoute from "./helpers/PrivateRoute";

import NavBar from "./components/NavBar";
import AppRouter from "./AppRouter";

const LoadingKeycloak = () => (
  <div>
    <h1>Carregando...</h1>
    <p>Isso deve levar apenas alguns instantes {";)"}</p>
  </div>
);

const App = () => {
	
	return(
	  <ReactKeycloakProvider 
		authClient={keycloakClient}
		LoadingComponent={<LoadingKeycloak />}
		onEvent={(event, error) => {
			console.log(`Evento handled:\n ${event}\nError:`);
			console.log(error);
		}}
	  >
		<BrowserRouter>{/*React.StrictMode*/}
			<ThemeProvider theme={customTheme}>
				<PrivateRoute>
					<NavBar />
				</PrivateRoute>
				<AppRouter />				
			</ThemeProvider>
		</BrowserRouter>
		  
	  </ReactKeycloakProvider>
	);
}

export default App;
