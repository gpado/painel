import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import ConsultUsers from "./pages/ConsultUsers";
import Home from "./pages/Home";
import Contracts from "./pages/Contracts";

const TestePage = () => (
    <div>
      <h1>Teste Page</h1>
      <p>Well, this route works...</p>
    </div>
);

const routes = [
  { path: "/teste", element: <TestePage />, isPrivate: false },
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/secured", element: <SecuredPage />, isPrivate: true },
  { path: "/usuarios", element: <ConsultUsers />, isPrivate: true },
  { path: "/contratos", element: <Contracts />, isPrivate: true },
];

const AppRouter = () => {
    const { keycloak, initialized } = useKeycloak();
	console.log(keycloak.authenticated);

    return(
        <>
          {initialized && (
              <Routes>
                {routes.map(({path, element, isPrivate}) => (
                  <Route 
                    key={path} 
                    path={path} 
                    element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element} 
                  />
                ))}
              </Routes>
          )}
        </>
    );
}

export default AppRouter;
